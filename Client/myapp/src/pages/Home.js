import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
`;

const Banner = styled.div`
    height: 300px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-bottom: 2rem;
    border: 2px dashed #ccc;
    font-size: 2rem;
    color: #888;
`;

const SearchBarContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const FilterButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    &:hover { background: #f9f9f9; }
`;

const Section = styled.div`
    margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--dark);
`;

const CardGrid = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 1rem;
    
    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
    }
`;

const Card = styled.div`
    min-width: 200px;
    height: 150px;
    background: #f0f0f0;
    border-radius: 12px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
`;

const PlanTripFAB = styled(Link)`
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--primary);
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 30px;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
        transform: translateY(-2px);
    }
`;

const Home = () => {
    return (
        <Container>
            <Banner>Banner Image</Banner>

            <SearchBarContainer>
                <SearchInput placeholder="Search bar ......" />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by...</FilterButton>
            </SearchBarContainer>

            <Section>
                <SectionTitle>Top Regional Selections</SectionTitle>
                <CardGrid>
                    <Card>One</Card>
                    <Card>Two</Card>
                    <Card>Three</Card>
                    <Card>Four</Card>
                    <Card>Five</Card>
                </CardGrid>
            </Section>

            <Section>
                <SectionTitle>Previous Trips</SectionTitle>
                <CardGrid style={{ flexDirection: 'column', overflow: 'visible' }}>
                    <Card style={{ width: '100%', height: '100px', justifyContent: 'flex-start', padding: '1rem' }}>Trip 1 Overview</Card>
                    <Card style={{ width: '100%', height: '100px', justifyContent: 'flex-start', padding: '1rem' }}>Trip 2 Overview</Card>
                </CardGrid>
            </Section>

            <PlanTripFAB to="/create-trip">+ Plan a trip</PlanTripFAB>
        </Container>
    );
};

export default Home;
