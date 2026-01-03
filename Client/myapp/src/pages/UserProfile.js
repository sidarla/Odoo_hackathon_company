import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import {
    PageContainer,
    Card,
    Input,
    SecondaryButton,
    SectionTitle,
    Badge
} from '../components/SharedStyles';

const ProfileHeader = styled(Card)`
    display: flex;
    gap: 3rem;
    align-items: center;
    background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
    margin-bottom: 4rem;
    padding: 3rem;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const ProfileImage = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    border: 5px solid white;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    background: #f0f0f0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: #ccc;
`;

const UserInfo = styled.div`
    flex: 1;
`;

const TripGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
`;

const MiniTripCard = styled(Card)`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
`;

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [trips, setTrips] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/users/profile');
                setUser(userRes.data);
                setEditForm(userRes.data);

                const tripsRes = await api.get('/trips');
                setTrips(tripsRes.data || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async () => {
        try {
            const res = await api.put('/users/profile', editForm);
            setUser(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert('Error updating profile');
        }
    };

    if (!user) return <PageContainer>Loading...</PageContainer>;

    const upcoming = trips.filter(t => t.status === 'upcoming' || t.status === 'ongoing');
    const past = trips.filter(t => t.status === 'completed');

    return (
        <PageContainer>
            <ProfileHeader>
                <ProfileImage>
                    {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : '👤'}
                </ProfileImage>
                <UserInfo>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                            {isEditing ? (
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <Input value={editForm.firstName || ''} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} placeholder="First Name" />
                                    <Input value={editForm.lastName || ''} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} placeholder="Last Name" />
                                </div>
                            ) : (
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--dark)' }}>
                                    {user.firstName} {user.lastName}
                                </h1>
                            )}
                            <p style={{ color: '#888', fontWeight: '600' }}>@{user.username}</p>
                        </div>
                        <SecondaryButton onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}>
                            {isEditing ? 'Save Profile' : 'Edit Profile'}
                        </SecondaryButton>
                    </div>

                    {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Input value={editForm.city || ''} onChange={e => setEditForm({ ...editForm, city: e.target.value })} placeholder="City" />
                            <Input value={editForm.country || ''} onChange={e => setEditForm({ ...editForm, country: e.target.value })} placeholder="Country" />
                            <Input value={editForm.additionalInfo || ''} onChange={e => setEditForm({ ...editForm, additionalInfo: e.target.value })} placeholder="About Me" />
                        </div>
                    ) : (
                        <div style={{ marginTop: '1.5rem', color: '#666', lineHeight: '1.6' }}>
                            <p>📍 {user.city}, {user.country}</p>
                            <p style={{ marginTop: '0.5rem' }}>{user.additionalInfo || "No bio yet. Start by telling the community about your travel style!"}</p>
                        </div>
                    )}
                </UserInfo>
            </ProfileHeader>

            <SectionTitle>My Adventures</SectionTitle>
            <TripGrid>
                {upcoming.length > 0 ? upcoming.map(trip => (
                    <MiniTripCard key={trip.id}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <Badge type={trip.status}>{trip.status}</Badge>
                                <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{new Date(trip.startDate).toLocaleDateString()}</span>
                            </div>
                            <h4 style={{ fontSize: '1.2rem', color: 'var(--dark)' }}>{trip.name}</h4>
                        </div>
                        <Link to={`/itinerary/${trip.id}/view`} style={{ textDecoration: 'none', marginTop: '1.5rem' }}>
                            <SecondaryButton style={{ width: '100%', padding: '0.6rem' }}>View Plan</SecondaryButton>
                        </Link>
                    </MiniTripCard>
                )) : <p style={{ color: '#aaa' }}>No upcoming trips.</p>}
            </TripGrid>

            <SectionTitle>Past Memories</SectionTitle>
            <TripGrid>
                {past.length > 0 ? past.map(trip => (
                    <MiniTripCard key={trip.id}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <Badge type="completed">completed</Badge>
                                <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{new Date(trip.endDate).toLocaleDateString()}</span>
                            </div>
                            <h4 style={{ fontSize: '1.2rem', color: 'var(--dark)' }}>{trip.name}</h4>
                        </div>
                        <Link to={`/itinerary/${trip.id}/view`} style={{ textDecoration: 'none', marginTop: '1.5rem' }}>
                            <SecondaryButton style={{ width: '100%', padding: '0.6rem' }}>View Itinerary</SecondaryButton>
                        </Link>
                    </MiniTripCard>
                )) : <p style={{ color: '#aaa' }}>No completed trips yet.</p>}
            </TripGrid>
        </PageContainer>
    );
};

export default UserProfile;

