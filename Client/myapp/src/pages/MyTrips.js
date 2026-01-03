import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Container = styled.div`
    max-width: 1000px;
    margin: 2rem auto;
    padding: 1rem;
`;

const Header = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #000;
    border-radius: 8px;
`;

const FilterButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 1px solid #000;
    border-radius: 8px;
    &:hover { background: #f9f9f9; }
`;

const Section = styled.div`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const TripCard = styled.div`
    background: #fff;
    border: 1px solid #000;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 120px;
    font-size: 1.5rem;
    text-align: center;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
`;

const MyTrips = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const res = await api.get('/trips');
                setTrips(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTrips();
    }, []);

    // Helper to filter trips logic can be expanded. 
    // For now assuming backend returns all and we filter here or just list them.
    // The mockup had "Ongoing", "Up-coming", "Completed" sections.
    const ongoing = trips.filter(t => t.status === 'ongoing');
    const upcoming = trips.filter(t => t.status === 'upcoming');
    const completed = trips.filter(t => t.status === 'completed');

    // If no status logic yet, just putting all in Upcoming for demo unless we add status to CreateTrip
    // Default in model is 'upcoming'

    return (
        <Container>
            <Header>
                <SearchInput placeholder="Search bar ......" />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by...</FilterButton>
            </Header>

            <Section>
                <SectionTitle>Ongoing</SectionTitle>
                {ongoing.length > 0 ? ongoing.map(trip => (
                    <Link to={`/itinerary/${trip.id}`} key={trip.id}>
                        <TripCard>Short Over View of {trip.name}</TripCard>
                    </Link>
                )) : <p>No ongoing trips</p>}
            </Section>

            <Section>
                <SectionTitle>Up-coming</SectionTitle>
                {upcoming.length > 0 || (ongoing.length === 0 && completed.length === 0) ? (upcoming.length > 0 ? upcoming : trips).map(trip => (
                    <Link to={`/itinerary/${trip.id}`} key={trip.id}>
                        <TripCard>Short Over View of {trip.name}</TripCard>
                    </Link>
                )) : <p>No upcoming trips</p>}
            </Section>

            <Section>
                <SectionTitle>Completed</SectionTitle>
                {completed.length > 0 ? completed.map(trip => (
                    <Link to={`/itinerary/${trip.id}`} key={trip.id}>
                        <TripCard>Short Over View of {trip.name}</TripCard>
                    </Link>
                )) : <p>No completed trips</p>}
            </Section>
        </Container>
    );
};

export default MyTrips;
