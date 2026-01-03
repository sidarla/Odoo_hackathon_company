import React from 'react';
import styled from 'styled-components';

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

const SectionTitle = styled.h3`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
`;

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const PostRow = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const AvatarCircle = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #000;
    background: #fff;
    flex-shrink: 0;
`;

const ContentBox = styled.div`
    flex: 1;
    height: 100px;
    border: 1px solid #000;
    border-radius: 12px;
    background: #fff;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center; /* Placeholder text center */
    color: #888;
`;

const Community = () => {
    return (
        <Container>
            <Header>
                <Title>GlobalTrotter</Title>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #000' }}></div>
            </Header>

            <SearchBarContainer>
                <SearchInput placeholder="Search bar ......" />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by...</FilterButton>
            </SearchBarContainer>

            <SectionTitle>Community tab</SectionTitle>

            <PostList>
                {[1, 2, 3, 4].map(id => (
                    <PostRow key={id}>
                        <AvatarCircle />
                        <ContentBox>User Shared Content / Trip Summary</ContentBox>
                    </PostRow>
                ))}
            </PostList>
        </Container>
    );
};

export default Community;
