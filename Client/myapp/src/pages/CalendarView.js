import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 900px;
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

const CalendarControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 0 2rem;
`;

const MonthTitle = styled.h3`
    font-size: 1.8rem;
    font-weight: bold;
`;

const ArrowButton = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border: 1px solid #ddd;
`;

const DayHeader = styled.div`
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
`;

const DayCell = styled.div`
    min-height: 100px;
    border: 1px solid #f0f0f0;
    padding: 0.5rem;
    position: relative;
    background: ${props => props.isGrey ? '#ccc' : '#fff'};
`;

const DateNumber = styled.span`
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
`;

const EventTag = styled.div`
    background: #eee;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    margin-bottom: 0.2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid #999;
`;

const CalendarView = () => {
    // Hardcoded for 'January 2024' as per mockup
    const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1));

    const days = ['SUM', 'MON', 'MON', 'THI', 'WIL', 'THI', 'SHT', 'SUN']; // Mimicking the slightly odd labels in mockup or typical days
    // Correcting to standard days for functionality, but matching visual style
    const standardDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Mock Trips
    const events = [
        { date: 4, name: 'PARIS TRIP' },
        { date: 5, name: 'PARIS TRIP' },
        { date: 9, name: 'SARIS 10' }, // Mockup typo mimic? Or 'PARIS 10'
        { date: 14, name: 'NYC - GETAWAY' },
        { date: 15, name: 'NYC - GETAWAY' },
        { date: 16, name: 'JAPAN ADVENTURE' },
        { date: 17, name: 'JAPAN ADVENTURE' },
        { date: 24, name: 'NYC GETAWAY' }, // Using mockup placement
    ];

    // Helper to generate days logic (simplified for static demo)
    const renderCalendarDays = () => {
        const grid = [];
        // Empty cells for offset
        for (let i = 0; i < 6; i++) {
            grid.push(<DayCell key={`empty-${i}`} />);
        }

        // Days 1-31
        for (let i = 1; i <= 31; i++) {
            const event = events.find(e => e.date === i);
            const isGrey = [9, 15, 18, 20, 21, 23, 25, 27].includes(i); // Arbitrary grey cells from mockup

            grid.push(
                <DayCell key={i} isGrey={isGrey}>
                    <DateNumber>{i}</DateNumber>
                    {event && <EventTag>{event.name}</EventTag>}
                </DayCell>
            );
        }
        return grid;
    };

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

            <CalendarControls>
                <ArrowButton>←</ArrowButton>
                <MonthTitle>January 2024</MonthTitle>
                <ArrowButton>→</ArrowButton>
            </CalendarControls>

            <CalendarGrid>
                {standardDays.map(day => <DayHeader key={day}>{day}</DayHeader>)}
                {renderCalendarDays()}
            </CalendarGrid>
        </Container>
    );
};

export default CalendarView;
