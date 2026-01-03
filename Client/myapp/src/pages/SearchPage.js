import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import {
    PageContainer,
    Card,
    Input,
    SecondaryButton,
    SectionTitle
} from '../components/SharedStyles';

const SearchHeader = styled.div`
    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
    padding: 4rem 2rem;
    border-radius: 30px;
    margin-bottom: -40px;
    color: white;
    text-align: center;
`;

const SearchContent = styled(Card)`
    max-width: 900px;
    margin: 0 auto;
    background: white;
    position: relative;
    z-index: 10;
`;

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
`;

const ResultCard = styled(Card)`
    padding: 0;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
    }
`;

const ResultImage = styled.div`
    height: 150px;
    background: #ddd url(${props => props.src || 'https://via.placeholder.com/300'}) center/cover;
`;

const ResultInfo = styled.div`
    padding: 1.5rem;
`;

const MOCK_RESULTS = [
    { id: 1, name: 'Paragliding in Interlaken', details: 'Experience the Swiss Alps from above', cost: '$180', img: 'https://images.unsplash.com/photo-1533387520461-125032824147?auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Tokyo Street Food Tour', details: 'Taste authentic ramen and sushi', cost: '$45', img: 'https://images.unsplash.com/photo-1504462175914-42f654f15d97?auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Parisian Art Walk', details: 'Guided tour of Montmartre', cost: '$25', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Bali Temple Trek', details: 'Discover hidden spiritual sites', cost: '$60', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=500&q=60' },
    { id: 5, name: 'New York Jazz Night', details: 'Best clubs in Greenwich Village', cost: '$30', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=500&q=60' },
];

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [searchTerm, setSearchTerm] = useState(query);

    const filteredResults = MOCK_RESULTS.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageContainer>
            <SearchHeader>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Explore the World</h1>
                <p style={{ opacity: 0.8 }}>Discover activities, cities, and hidden gems</p>
            </SearchHeader>

            <SearchContent>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <Input
                            placeholder="Search by activity, city or country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <SecondaryButton>Search</SecondaryButton>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <SecondaryButton style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Adventure</SecondaryButton>
                    <SecondaryButton style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Culture</SecondaryButton>
                    <SecondaryButton style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Relaxation</SecondaryButton>
                    <SecondaryButton style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>Food & Drink</SecondaryButton>
                </div>
            </SearchContent>

            <SectionTitle style={{ marginTop: '5rem' }}>Search Results</SectionTitle>

            {filteredResults.length > 0 ? (
                <ResultsGrid>
                    {filteredResults.map(result => (
                        <ResultCard key={result.id}>
                            <ResultImage src={result.img} />
                            <ResultInfo>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{result.name}</h4>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>{result.details}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '800', color: 'var(--secondary)' }}>{result.cost}</span>
                                    <SecondaryButton style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Add to Trip</SecondaryButton>
                                </div>
                            </ResultInfo>
                        </ResultCard>
                    ))}
                </ResultsGrid>
            ) : (
                <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <h3 style={{ color: '#888' }}>No results found for "{searchTerm}"</h3>
                    <p style={{ color: '#aaa' }}>Try searching for "Paris", "Tokyo", or "Adventure"</p>
                </div>
            )}
        </PageContainer>
    );
};

export default SearchPage;

