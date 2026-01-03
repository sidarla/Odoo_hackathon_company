import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const Container = styled.div`
    max-width: 800px;
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
    margin-bottom: 2rem;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
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
    border: 1px solid #000;
    border-radius: 8px;
    font-size: 1rem;
`;

const FilterButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 1px solid #000;
    border-radius: 8px;
    cursor: pointer;
    &:hover { background: #f9f9f9; }
`;

const ResultsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const ResultCard = styled.div`
    padding: 1.5rem;
    border: 1px solid #000;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #333;
    background: #fff;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background: #f0f0f0;
    }
`;

// Mock Data for demonstration
const MOCK_RESULTS = [
    { id: 1, name: 'Paragliding in Interlaken', details: 'Duration: 2h | Cost: $180' },
    { id: 2, name: 'City Walking Tour', details: 'Duration: 3h | Cost: $20' },
    { id: 3, name: 'Mountain Hiking', details: 'Duration: 5h | Cost: Free' },
    { id: 4, name: 'Lake Boat Trip', details: 'Duration: 1.5h | Cost: $45' },
    { id: 5, name: 'Museum Visit', details: 'Duration: 2h | Cost: $15' },
];

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);

    return (
        <Container>
            <Header>
                <Title>GlobalTrotter</Title>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #000' }}></div>
            </Header>

            <SearchBarContainer>
                <SearchInput
                    placeholder="Paragliding..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by...</FilterButton>
            </SearchBarContainer>

            <h3>Results</h3>
            <ResultsList>
                {MOCK_RESULTS.map(result => (
                    <ResultCard key={result.id}>
                        {result.name} - {result.details}
                    </ResultCard>
                ))}
            </ResultsList>
        </Container>
    );
};

export default SearchPage;
