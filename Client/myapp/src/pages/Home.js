import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    min-height: 100vh;
`;

const HeroSection = styled.div`
    margin-bottom: 3rem;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
`;

const SearchBarContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    background: #fff;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    align-items: center;
`;

const SearchInput = styled.input`
    flex: 2;
    padding: 1rem 1.5rem;
    border: 2px solid #eee;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s;
    outline: none;

    &:focus {
        border-color: var(--secondary);
        box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.1);
    }
`;

const FilterButton = styled.button`
    padding: 1rem 1.5rem;
    background: #f8f9fa;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    color: var(--dark);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: var(--secondary);
        color: white;
        transform: translateY(-2px);
    }
`;

const Section = styled.div`
    margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
    margin-bottom: 1.5rem;
    font-size: 2rem;
    color: var(--dark);
    font-weight: 800;
    position: relative;
    display: inline-block;

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, var(--secondary), transparent);
        border-radius: 2px;
    }
`;

const CardGrid = styled.div`
    display: flex;
    gap: 1.5rem;
    overflow-x: auto;
    padding: 1rem 0.5rem 2rem 0.5rem;
    scroll-behavior: smooth;
    
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #bbb;
    }
`;

const Card = styled.div`
    min-width: 250px;
    height: 300px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid #eee;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0,0,0,0.12);
    }
`;

const CardImage = styled.div`
    height: 180px;
    background: #eee;
    background-image: url(${props => props.bg || 'https://via.placeholder.com/300'});
    background-size: cover;
    background-position: center;
`;

const CardContent = styled.div`
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CardTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--dark);
`;

const CardMeta = styled.span`
    font-size: 0.9rem;
    color: #666;
`;

const PlanTripFAB = styled(Link)`
    position: fixed;
    bottom: 40px;
    right: 40px;
    background: linear-gradient(135deg, var(--primary) 0%, #ff8e8e 100%);
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.1rem;
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 100;
    
    &:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 15px 35px rgba(255, 107, 107, 0.6);
    }
`;

const Home = () => {
    // Placeholder logic for carousel images
    const carouselImages = [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1500&q=80',
        'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=1500&q=80'
    ];

    const topDestinations = [
        { name: 'Paris, France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=60' },
        { name: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=60' },
        { name: 'New York, USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?auto=format&fit=crop&w=500&q=60' },
        { name: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=60' },
        { name: 'Rome, Italy', img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=500&q=60' }
    ];

    return (
        <Container>
            <HeroSection>
                <Carousel images={carouselImages} />
            </HeroSection>

            <SearchBarContainer>
                <SearchInput placeholder="Where do you want to go?" />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by</FilterButton>
            </SearchBarContainer>

            <Section>
                <SectionTitle>Top Regional Selections</SectionTitle>
                <CardGrid>
                    {topDestinations.map((dest, i) => (
                        <Card key={i}>
                            <CardImage bg={dest.img} />
                            <CardContent>
                                <CardTitle>{dest.name}</CardTitle>
                                <CardMeta>Explore Now →</CardMeta>
                            </CardContent>
                        </Card>
                    ))}
                </CardGrid>
            </Section>

            <Section>
                <SectionTitle>Your Previous Trips</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    <Card style={{ height: 'auto', minHeight: '200px' }}>
                        <CardContent>
                            <CardTitle>Summer in Italy</CardTitle>
                            <p style={{ color: '#666', marginBottom: '1rem' }}>July 2024 • 10 Days</p>
                            <CardMeta style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Completed ✓</CardMeta>
                        </CardContent>
                    </Card>
                    <Card style={{ height: 'auto', minHeight: '200px' }}>
                        <CardContent>
                            <CardTitle>Weekend in Mountains</CardTitle>
                            <p style={{ color: '#666', marginBottom: '1rem' }}>Oct 2024 • 3 Days</p>
                            <CardMeta style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Completed ✓</CardMeta>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            <Section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <SectionTitle>Recent Stories from Community</SectionTitle>
                    <Link to="/community" style={{ color: 'var(--secondary)', fontWeight: '700', textDecoration: 'none' }}>View All Stories →</Link>
                </div>
                <CardGrid>
                    {[
                        { user: 'Elena R.', loc: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=500&q=60' },
                        { user: 'Sarah J.', loc: 'Reykjavik, Iceland', img: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=500&q=60' },
                        { user: 'Marco V.', loc: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=60' },
                        { user: 'James T.', loc: 'Manhattan, NYC', img: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?auto=format&fit=crop&w=500&q=60' }
                    ].map((story, i) => (
                        <Card key={i} style={{ minWidth: '200px', height: '280px' }}>
                            <CardImage bg={story.img} style={{ height: '150px' }} />
                            <CardContent style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <div style={{ width: '25px', height: '25px', borderRadius: '50%', background: '#eee', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {story.user[0]}
                                    </div>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{story.user}</span>
                                </div>
                                <p style={{ fontSize: '0.8rem', color: '#888' }}>📍 {story.loc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </CardGrid>
            </Section>

            <PlanTripFAB to="/create-trip">
                <span style={{ fontSize: '1.5rem' }}>+</span> Plan a new trip
            </PlanTripFAB>
        </Container>
    );
};

export default Home;

