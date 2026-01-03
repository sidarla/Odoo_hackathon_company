import React, { useState } from 'react';
import styled from 'styled-components';
import {
    PageContainer,
    Card,
    SectionTitle,
    SecondaryButton
} from '../components/SharedStyles';

const CalendarWrapper = styled(Card)`
    padding: 2rem;
    margin-top: 2rem;
`;

const CalendarControls = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
`;

const MonthTitle = styled.h3`
    font-size: 2rem;
    font-weight: 800;
    color: var(--dark);
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: #eee;
    border: 1px solid #eee;
    border-radius: 12px;
    overflow: hidden;
`;

const DayHeader = styled.div`
    padding: 1.2rem;
    text-align: center;
    font-weight: 800;
    background: #f8f9fa;
    color: var(--dark);
    font-size: 0.8rem;
    letter-spacing: 1px;
`;

const DayCell = styled.div`
    min-height: 120px;
    background: ${props => props.isGrey ? '#fafafa' : '#fff'};
    padding: 0.8rem;
    transition: all 0.2s;

    &:hover {
        background: #fdfdfd;
        z-index: 1;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.02);
    }
`;

const DateNumber = styled.span`
    font-weight: 700;
    color: ${props => props.isGrey ? '#ccc' : 'var(--dark)'};
    font-size: 1.1rem;
    display: block;
    margin-bottom: 0.8rem;
`;

const EventTag = styled.div`
    background: ${props => props.color || 'var(--secondary)'};
    color: white;
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 6px;
    margin-bottom: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CalendarView = () => {
    const standardDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const events = [
        { date: 4, name: 'PARIS TRIP', color: '#FF6B6B' },
        { date: 5, name: 'PARIS TRIP', color: '#FF6B6B' },
        { date: 9, name: 'FLIGHT 10:00', color: '#4ECDC4' },
        { date: 14, name: 'NYC GETAWAY', color: '#FFE66D', textColor: '#000' },
        { date: 15, name: 'NYC GETAWAY', color: '#FFE66D', textColor: '#000' },
        { date: 16, name: 'MT. FUJI HIKE', color: '#4ECDC4' },
        { date: 17, name: 'MT. FUJI HIKE', color: '#4ECDC4' },
        { date: 24, name: 'CITY TOUR', color: '#292F36' },
    ];

    const renderCalendarDays = () => {
        const grid = [];
        for (let i = 0; i < 6; i++) {
            grid.push(<DayCell key={`empty-${i}`} isGrey={true} />);
        }

        for (let i = 1; i <= 31; i++) {
            const dayEvents = events.filter(e => e.date === i);
            const isToday = i === 3; // For demo purpose

            grid.push(
                <DayCell key={i} style={isToday ? { border: '2px solid var(--secondary)' } : {}}>
                    <DateNumber>{i}</DateNumber>
                    {dayEvents.map((event, idx) => (
                        <EventTag key={idx} color={event.color} style={event.textColor ? { color: event.textColor } : {}}>
                            {event.name}
                        </EventTag>
                    ))}
                </DayCell>
            );
        }
        return grid;
    };

    return (
        <PageContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <SectionTitle>Travel Calendar</SectionTitle>
                <SecondaryButton>+ Add Event</SecondaryButton>
            </div>

            <CalendarWrapper>
                <CalendarControls>
                    <SecondaryButton style={{ padding: '0.5rem 1rem' }}>← Previous</SecondaryButton>
                    <MonthTitle>January 2024</MonthTitle>
                    <SecondaryButton style={{ padding: '0.5rem 1rem' }}>Next →</SecondaryButton>
                </CalendarControls>

                <CalendarGrid>
                    {standardDays.map(day => <DayHeader key={day}>{day}</DayHeader>)}
                    {renderCalendarDays()}
                </CalendarGrid>
            </CalendarWrapper>
        </PageContainer>
    );
};

export default CalendarView;

