import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

const Container = styled.div`
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #000;
`;

const Header = styled.div`
    margin-bottom: 2rem;
`;

const SearchBarContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    border-bottom: 1px solid #000;
    padding-bottom: 1rem;
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
    cursor: pointer;
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.8rem;
`;

const ColumnsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 4rem;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif; /* Mimic mockup font style generally */
`;

const DaySection = styled.div`
    margin-bottom: 3rem;
    position: relative;
`;

const DayLabel = styled.div`
    border: 1px solid #000;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    display: inline-block;
    background: #fff;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`;

const ActivityRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 100px; /* Space for Day label */
    margin-bottom: 1.5rem;
    position: relative;
`;

const ActivityBox = styled.div`
    flex: 1;
    border: 1px solid #000;
    border-radius: 12px;
    padding: 1rem;
    min-height: 60px;
    display: flex;
    align-items: center;
    background: #fff;
    margin-right: 2rem;
`;

const ExpenseBox = styled.div`
    width: 150px;
    border: 1px solid #000;
    border-radius: 12px;
    padding: 1rem;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
`;

const ArrowDown = styled.div`
    position: absolute;
    left: 45%; /* Centered below activity box roughly */
    bottom: -25px; /* Adjust to sit between rows */
    font-size: 1.5rem;
    color: #000;
    z-index: 1;
`;

const ItineraryView = () => {
    const { tripId } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get(`/trips/${tripId}/items`);
                // Sort items by date/time
                const sorted = res.data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                setItems(sorted);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
    }, [tripId]);

    // Group items by Day
    const groupedItems = items.reduce((acc, item) => {
        const date = item.startDate ? item.startDate.split('T')[0] : 'Unscheduled';
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});

    return (
        <Container>
            <Header>GlobalTrotter</Header>
            <SearchBarContainer>
                <SearchInput placeholder="Search bar ......" />
                <FilterButton>Group by</FilterButton>
                <FilterButton>Filter</FilterButton>
                <FilterButton>Sort by...</FilterButton>
            </SearchBarContainer>

            <Title>Itinerary for a selected place</Title>

            <ColumnsHeader>
                <span>Physical Activity</span>
                <span>Expense</span>
            </ColumnsHeader>

            {Object.keys(groupedItems).map((date, dayIndex) => (
                <DaySection key={date}>
                    <DayLabel>Day {dayIndex + 1}</DayLabel>
                    {groupedItems[date].map((item, index) => (
                        <React.Fragment key={item.id}>
                            <ActivityRow>
                                <ActivityBox>{item.description || item.type}</ActivityBox>
                                <ExpenseBox>{item.budget ? `$${item.budget}` : '-'}</ExpenseBox>

                                {/* Show arrow if not the last item in the day */}
                                {index < groupedItems[date].length - 1 && (
                                    <ArrowDown>↓</ArrowDown>
                                )}
                            </ActivityRow>
                        </React.Fragment>
                    ))}
                </DaySection>
            ))}
        </Container>
    );
};

export default ItineraryView;
