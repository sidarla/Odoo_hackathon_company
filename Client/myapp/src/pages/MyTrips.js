import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import {
    PageContainer,
    Section,
    SectionTitle,
    Card,
    Input,
    SecondaryButton,
    Badge
} from '../components/SharedStyles';

const Header = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 4rem;
    flex-wrap: wrap;
    background: white;
    padding: 1.5rem;
    border-radius: 20px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.03);
    align-items: center;
`;

const TripGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
`;

const TripCard = styled(Card)`
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
`;

const TripImage = styled.div`
    height: 180px;
    background: #f8f9fa url(${props => props.src || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=500&q=60'}) center/cover no-repeat;
`;

const TripInfo = styled.div`
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const CardActions = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    border-top: 1px solid #f0f0f0;
    padding-top: 1.5rem;
`;

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTrips = useCallback(async () => {
        try {
            const res = await api.get('/trips');
            setTrips(res.data || []);
        } catch (err) {
            console.error('Error fetching trips:', err);
            setTrips([]);
        }
    }, []);

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    const handleMarkCompleted = async (e, tripId) => {
        e.preventDefault(); // Prevent navigating to the link
        e.stopPropagation();
        try {
            await api.put(`/trips/${tripId}`, { status: 'completed' });
            fetchTrips();
        } catch (err) {
            console.error('Error marking trip as completed:', err);
            alert('Failed to update trip status');
        }
    };

    const filteredTrips = trips.filter(t =>
        t.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ongoing = filteredTrips.filter(t => t.status === 'ongoing');
    const upcoming = filteredTrips.filter(t => t.status === 'upcoming');
    const completed = filteredTrips.filter(t => t.status === 'completed');

    const renderTripCard = (trip) => (
        <Link to={`/itinerary/${trip.id}/view`} key={trip.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <TripCard>
                <TripImage src={trip.coverPhoto} />
                <TripInfo>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--dark)' }}>{trip.name}</h4>
                        <Badge type={trip.status}>{trip.status}</Badge>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        📍 {trip.place || 'Multiple Cities'}
                    </p>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '600' }}>
                        {trip.startDate ? new Date(trip.startDate).toLocaleDateString() : 'TBD'} - {trip.endDate ? new Date(trip.endDate).toLocaleDateString() : 'TBD'}
                    </div>

                    <CardActions>
                        <SecondaryButton style={{ flex: 1, padding: '0.6rem' }}>View Plan</SecondaryButton>
                        {trip.status !== 'completed' && (
                            <SecondaryButton
                                onClick={(e) => handleMarkCompleted(e, trip.id)}
                                style={{
                                    flex: 1,
                                    padding: '0.6rem',
                                    background: 'linear-gradient(135deg, #2dbba7 0%, #1a9c8a 100%)',
                                    color: 'white',
                                    border: 'none'
                                }}
                            >
                                Mark Done
                            </SecondaryButton>
                        )}
                    </CardActions>
                </TripInfo>
            </TripCard>
        </Link>
    );

    return (
        <PageContainer>
            <Header>
                <div style={{ flex: 2, position: 'relative' }}>
                    <Input
                        placeholder="Search your adventures..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <SecondaryButton>Filter</SecondaryButton>
                <SecondaryButton>Sort by</SecondaryButton>
            </Header>

            {ongoing.length > 0 && (
                <Section>
                    <SectionTitle>Ongoing Trips</SectionTitle>
                    <TripGrid>{ongoing.map(renderTripCard)}</TripGrid>
                </Section>
            )}

            <Section>
                <SectionTitle>Upcoming Adventures</SectionTitle>
                {upcoming.length > 0 ? (
                    <TripGrid>{upcoming.map(renderTripCard)}</TripGrid>
                ) : (
                    <Card style={{ textAlign: 'center', padding: '4rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>No upcoming trips yet</h3>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>Ready to explore the world? Start planning your next journey!</p>
                        <Link to="/create-trip">
                            <SecondaryButton>+ Start Planning</SecondaryButton>
                        </Link>
                    </Card>
                )}
            </Section>

            {completed.length > 0 && (
                <Section style={{ opacity: 0.85 }}>
                    <SectionTitle>Past Memories</SectionTitle>
                    <TripGrid>{completed.map(renderTripCard)}</TripGrid>
                </Section>
            )}
        </PageContainer>
    );
};

export default MyTrips;


