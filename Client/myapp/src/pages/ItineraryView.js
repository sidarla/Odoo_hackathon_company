import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Carousel from '../components/Carousel';
import { PageContainer, Card } from '../components/SharedStyles';

const HeaderSection = styled.div`
    margin-bottom: 2rem;
`;

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const Brand = styled.h1`
    font-size: 1.5rem;
    color: var(--primary);
    font-weight: 800;
`;

const MarkCompleteBtn = styled.button`
    background: linear-gradient(135deg, var(--secondary) 0%, #2AF598 100%);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(78, 205, 196, 0.4);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(78, 205, 196, 0.6);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
    }
`;

const SearchBarContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 1rem;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    transition: border-color 0.3s;
    outline: none;

    &:focus {
        border-color: var(--secondary);
    }
`;

const FilterButton = styled.button`
    padding: 0.8rem 1.5rem;
    background: #fff;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    font-weight: 600;
    color: var(--dark);
    transition: all 0.2s;

    &:hover {
        border-color: var(--secondary);
        color: var(--secondary);
    }
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    color: var(--dark);
    font-weight: 800;
    position: relative;
    
    &:after {
        content: '';
        display: block;
        width: 60px;
        height: 6px;
        background: var(--primary);
        margin: 10px auto 0;
        border-radius: 3px;
    }
`;

const ColumnsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 4rem;
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 1.1rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const DaySection = styled.div`
    margin-bottom: 4rem;
    position: relative;
    padding-left: 20px;
    border-left: 2px dashed #eee;
`;

const DayLabel = styled.div`
    background: var(--primary);
    color: white;
    padding: 0.6rem 1.5rem;
    border-radius: 30px;
    display: inline-block;
    font-weight: bold;
    position: absolute;
    top: -20px;
    left: -20px;
    z-index: 2;
    box-shadow: 0 4px 10px rgba(255, 107, 107, 0.3);
`;

const ActivityRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 60px; 
    margin-bottom: 2rem;
    position: relative;
`;

const ActivityBox = styled.div`
    flex: 1;
    border: none;
    border-radius: 16px;
    padding: 1.5rem;
    min-height: 80px;
    display: flex;
    align-items: center;
    background: #fff;
    margin-right: 2rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
    border-left: 5px solid var(--secondary);
    font-size: 1.1rem;
    color: var(--dark);
`;

const ExpenseBox = styled.div`
    width: 150px;
    border: none;
    border-radius: 16px;
    padding: 1rem;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    color: var(--primary);
    font-weight: bold;
    font-size: 1.2rem;
`;

const ArrowDown = styled.div`
    position: absolute;
    left: 45%; 
    bottom: -35px;
    font-size: 1.2rem;
    color: #ddd;
    z-index: 1;
`;

const QuickAddSection = styled(Card)`
    margin-bottom: 4rem;
    background: #f8fcfb;
    border: 1px dashed var(--secondary);
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 1.5rem;
`;

const Select = styled.select`
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    font-size: 1rem;
    background: white;
    outline: none;
    transition: all 0.3s;
    cursor: pointer;

    &:focus {
        border-color: var(--secondary);
    }
`;

const GradientButton = styled.button`
    background: linear-gradient(135deg, var(--primary) 0%, #ff8e8e 100%);
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 50px;
    border: none;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 25px rgba(255, 107, 107, 0.4);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
    }
`;

const SecondaryButton = styled.button`
    background: #fff;
    color: var(--dark);
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    border: 2px solid #f0f0f0;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: var(--secondary);
        color: var(--secondary);
        background: #f8fcfb;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s;
    outline: none;

    &:focus {
        border-color: var(--secondary);
    }
`;

const SummaryCard = styled(Card)`
    margin-bottom: 3rem;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: center;
    background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TotalBudget = styled.div`
    text-align: center;
    border-right: 2px solid #eee;
    padding-right: 2rem;

    @media (max-width: 768px) {
        border-right: none;
        border-bottom: 2px solid #eee;
        padding-right: 0;
        padding-bottom: 2rem;
    }

    h3 {
        font-size: 1rem;
        color: #888;
        text-transform: uppercase;
        margin-bottom: 0.5rem;
    }

    span {
        font-size: 2.5rem;
        font-weight: 900;
        color: var(--primary);
    }
`;

const BreakdownContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
`;

const CategoryBox = styled.div`
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
    text-align: center;

    .label {
        font-size: 0.75rem;
        color: #aaa;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 0.5rem;
    }

    .value {
        font-size: 1.1rem;
        font-weight: 800;
        color: var(--dark);
    }
`;

const ItineraryView = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [items, setItems] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({
        type: 'Activity',
        description: '',
        startDate: '',
        budget: ''
    });

    const defaultImages = [
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1350&q=80',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80'
    ];

    // Category Map for Icons/Labels
    const categoryIcons = {
        'Food': '🍴',
        'Stay': '🏨',
        'Transport': '🚗',
        'Activity': '🎢',
        'Shopping': '🛍️',
        'Flight': '✈️',
        'Miscellaneous': '⚙️'
    };

    const fetchTrip = useCallback(async () => {
        try {
            const res = await api.get(`/trips/${tripId}`);
            setTrip(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [tripId]);

    const fetchItems = useCallback(async () => {
        try {
            const res = await api.get(`/trips/${tripId}/items`);
            const sorted = res.data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            setItems(sorted);
        } catch (err) {
            console.error(err);
        }
    }, [tripId]);

    useEffect(() => {
        fetchTrip();
        fetchItems();
    }, [fetchTrip, fetchItems]);

    const handleMarkCompleted = async () => {
        try {
            await api.put(`/trips/${tripId}`, { status: 'completed' });
            fetchTrip();
            alert('Trip marked as completed!');
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    const handleAddItem = async () => {
        if (!newItem.description || !newItem.startDate) return alert('Please fill in description and date');
        try {
            const res = await api.post(`/trips/${tripId}/items`, newItem);
            setItems(prev => [...prev, res.data].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)));
            setNewItem({ type: 'Activity', description: '', startDate: '', budget: '' });
            setIsAdding(false);
        } catch (err) {
            console.error(err);
            alert('Error adding item');
        }
    };

    const totalBudget = items.reduce((sum, item) => sum + (parseFloat(item.budget) || 0), 0);

    const breakdown = items.reduce((acc, item) => {
        const cat = item.type || 'Miscellaneous';
        acc[cat] = (acc[cat] || 0) + (parseFloat(item.budget) || 0);
        return acc;
    }, {});

    const groupedItems = items.reduce((acc, item) => {
        const date = item.startDate ? item.startDate.split('T')[0] : 'Unscheduled';
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});

    const carouselImages = trip?.coverPhoto ? [trip.coverPhoto, ...defaultImages] : defaultImages;

    return (
        <PageContainer>
            <HeaderSection>
                <TopBar>
                    <Brand>GlobalTrotter</Brand>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <SecondaryButton onClick={() => setIsAdding(!isAdding)}>
                            {isAdding ? 'Cancel' : '+ Add Activity'}
                        </SecondaryButton>
                        <MarkCompleteBtn
                            onClick={handleMarkCompleted}
                            disabled={trip?.status === 'completed'}
                        >
                            {trip?.status === 'completed' ? 'Trip Completed ✓' : 'Mark as Completed'}
                        </MarkCompleteBtn>
                    </div>
                </TopBar>

                <Carousel images={carouselImages} />
            </HeaderSection>

            <Title>{trip?.name || 'Itinerary'}</Title>

            <SummaryCard>
                <TotalBudget>
                    <h3>Total Est. Cost</h3>
                    <span>${totalBudget.toLocaleString()}</span>
                </TotalBudget>
                <BreakdownContainer>
                    {Object.entries(breakdown).map(([cat, amount]) => (
                        <CategoryBox key={cat}>
                            <div style={{ fontSize: '1.5rem' }}>{categoryIcons[cat] || '📍'}</div>
                            <div className="label">{cat}</div>
                            <div className="value">${amount.toLocaleString()}</div>
                        </CategoryBox>
                    ))}
                    {Object.keys(breakdown).length === 0 && (
                        <p style={{ color: '#aaa', fontStyle: 'italic', gridColumn: 'span 3' }}>No expenses recorded yet.</p>
                    )}
                </BreakdownContainer>
            </SummaryCard>

            {isAdding && (
                <QuickAddSection>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '800' }}>Quick Add New Activity</h3>
                    <FormRow>
                        <Select
                            value={newItem.type}
                            onChange={e => setNewItem({ ...newItem, type: e.target.value })}
                        >
                            {Object.keys(categoryIcons).map(cat => (
                                <option key={cat} value={cat}>{categoryIcons[cat]} {cat}</option>
                            ))}
                        </Select>
                        <Input
                            placeholder="What are you planned? (e.g. Scuba Diving)"
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                        />
                    </FormRow>
                    <FormRow>
                        <Input
                            type="date"
                            value={newItem.startDate}
                            onChange={e => setNewItem({ ...newItem, startDate: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Estimated Budget ($)"
                            value={newItem.budget}
                            onChange={e => setNewItem({ ...newItem, budget: e.target.value })}
                        />
                        <GradientButton
                            style={{ padding: '0.8rem' }}
                            onClick={handleAddItem}
                        >
                            Save to Itinerary
                        </GradientButton>
                    </FormRow>
                </QuickAddSection>
            )}

            <ColumnsHeader>
                <span>Activity / Destination</span>
                <span>Estimated Cost</span>
            </ColumnsHeader>

            {Object.keys(groupedItems).map((date, dayIndex) => (
                <DaySection key={date}>
                    <DayLabel>Day {dayIndex + 1} — {new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</DayLabel>
                    {groupedItems[date].map((item, index) => (
                        <React.Fragment key={item.id}>
                            <ActivityRow>
                                <ActivityBox>
                                    <div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                                            <span style={{ fontSize: '1.2rem' }}>{categoryIcons[item.type] || '📍'}</span>
                                            <strong style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.type}</strong>
                                        </div>
                                        <div style={{ fontSize: '1.05rem', color: '#444' }}>
                                            {item.description}
                                        </div>
                                    </div>
                                </ActivityBox>
                                <ExpenseBox>{item.budget ? `$${parseFloat(item.budget).toLocaleString()}` : '-'}</ExpenseBox>

                                {index < groupedItems[date].length - 1 && (
                                    <ArrowDown>↓</ArrowDown>
                                )}
                            </ActivityRow>
                        </React.Fragment>
                    ))}
                </DaySection>
            ))}
        </PageContainer>
    );
};

export default ItineraryView;

