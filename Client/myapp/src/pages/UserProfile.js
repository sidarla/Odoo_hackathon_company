import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Container = styled.div`
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #000;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #ddd;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
`;

const TopSection = styled.div`
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    margin-bottom: 3rem;
    border-bottom: 3px solid #ddd;
    padding-bottom: 2rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ProfileImage = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    text-align: center;
    flex-shrink: 0;
`;

const UserDetailsBox = styled.div`
    flex: 1;
    border: 1px solid #000;
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    min-height: 150px;
`;

const EditButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--primary);
    text-decoration: underline;
    font-size: 0.9rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const TripGrid = styled.div`
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    margin-bottom: 3rem;
`;

const TripCard = styled.div`
    min-width: 200px;
    height: 250px;
    border: 1px solid #000;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    background: #fff;
`;

const ViewButton = styled(Link)`
    padding: 0.5rem 1rem;
    border: 1px solid #000;
    border-radius: 20px;
    background: #fff;
    text-align: center;
    font-weight: bold;
    margin-top: auto;
    width: 100%;
    
    &:hover {
        background: #f0f0f0;
    }
`;

const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
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

                const tripsRes = await api.get('/trips'); // Using existing trips route
                setTrips(tripsRes.data);
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

    if (!user) return <Container>Loading...</Container>;

    const preplannedTrips = trips.filter(t => t.status === 'upcoming' || t.status === 'ongoing');
    const previousTrips = trips.filter(t => t.status === 'completed');

    return (
        <Container>
            <Header>
                <Title>GlobalTrotter</Title>
            </Header>

            <TopSection>
                <ProfileImage>
                    {user.profilePhoto ? <img src={user.profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : "Image of the User"}
                </ProfileImage>
                <UserDetailsBox>
                    <EditButton onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}>
                        {isEditing ? 'Save' : 'Edit info'}
                    </EditButton>

                    {isEditing ? (
                        <>
                            <Input value={editForm.firstName || ''} onChange={e => setEditForm({ ...editForm, firstName: e.target.value })} placeholder="First Name" />
                            <Input value={editForm.lastName || ''} onChange={e => setEditForm({ ...editForm, lastName: e.target.value })} placeholder="Last Name" />
                            <Input value={editForm.city || ''} onChange={e => setEditForm({ ...editForm, city: e.target.value })} placeholder="City" />
                            <Input value={editForm.additionalInfo || ''} onChange={e => setEditForm({ ...editForm, additionalInfo: e.target.value })} placeholder="Additional Info" />
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Location:</strong> {user.city}, {user.country}</p>
                            <p><strong>About:</strong> {user.additionalInfo || "User Details with appropriate option to edit those information..."}</p>
                        </>
                    )}
                </UserDetailsBox>
            </TopSection>

            <SectionTitle>Preplanned Trips</SectionTitle>
            <TripGrid>
                {preplannedTrips.length > 0 ? preplannedTrips.map(trip => (
                    <TripCard key={trip.id}>
                        <div style={{ flex: 1 }}>
                            <h4>{trip.name}</h4>
                            <p>{trip.startDate}</p>
                        </div>
                        <ViewButton to={`/itinerary/${trip.id}`}>View</ViewButton>
                    </TripCard>
                )) : <p>No upcoming trips.</p>}
            </TripGrid>

            <SectionTitle>Previous Trips</SectionTitle>
            <TripGrid>
                {previousTrips.length > 0 ? previousTrips.map(trip => (
                    <TripCard key={trip.id}>
                        <div style={{ flex: 1 }}>
                            <h4>{trip.name}</h4>
                            <p>Ended: {trip.endDate}</p>
                        </div>
                        <ViewButton to={`/itinerary/${trip.id}`}>View</ViewButton>
                    </TripCard>
                )) : <p>No completed trips.</p>}
            </TripGrid>

        </Container>
    );
};

export default UserProfile;
