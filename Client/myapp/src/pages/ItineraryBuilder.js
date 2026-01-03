import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    PageContainer,
    Card,
    Input,
    GradientButton,
    SecondaryButton,
    SectionTitle
} from '../components/SharedStyles';

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;

const SectionCard = styled(Card)`
    margin-bottom: 2rem;
    border-left: 5px solid var(--secondary);
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s;
    outline: none;
    resize: none;
    min-height: 100px;

    &:focus {
        border-color: var(--secondary);
        box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.1);
    }
`;

const AddButton = styled.button`
    width: 100%;
    padding: 2rem;
    background: #f8f9fa;
    border: 2px dashed #ddd;
    border-radius: 20px;
    color: #888;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    &:hover {
        background: #f0f7f6;
        border-color: var(--secondary);
        color: var(--secondary);
    }
`;

const ItineraryBuilder = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({
        type: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: ''
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get(`/trips/${tripId}/items`);
                setItems(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
    }, [tripId]);

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddItem = async () => {
        if (!newItem.type) return alert('Please enter a section type');
        try {
            const res = await api.post(`/trips/${tripId}/items`, newItem);
            setItems([...items, res.data]);
            setNewItem({ type: '', description: '', startDate: '', endDate: '', budget: '' });
        } catch (err) {
            console.error(err);
            alert('Error adding section');
        }
    };

    return (
        <PageContainer>
            <Header>
                <div>
                    <SectionTitle>Build Your Itinerary</SectionTitle>
                    <p style={{ color: '#666' }}>Add stops, activities, and budget details for your trip</p>
                </div>
                <SecondaryButton onClick={() => navigate(`/itinerary/${tripId}/view`)}>View Final Plan</SecondaryButton>
            </Header>

            {items.map((item, index) => (
                <SectionCard key={item.id}>
                    <SectionHeader>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--dark)' }}>Stop {index + 1}: {item.type}</h3>
                        <div style={{ color: 'var(--secondary)', fontWeight: '700' }}>${item.budget || '0'}</div>
                    </SectionHeader>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>{item.description}</p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#888' }}>
                        <span>📅 {item.startDate && new Date(item.startDate).toLocaleDateString()} - {item.endDate && new Date(item.endDate).toLocaleDateString()}</span>
                    </div>
                </SectionCard>
            ))}

            <Card style={{ marginTop: '4rem', background: '#fff' }}>
                <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Add New Stop / Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <Input
                            name="type"
                            placeholder="Section Type (e.g. Travel, Hotel, Museum Visit)"
                            value={newItem.type}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextArea
                            name="description"
                            placeholder="Describe what you'll be doing here..."
                            value={newItem.description}
                            onChange={handleChange}
                        />
                    </div>
                    <FormRow>
                        <Input
                            type="date"
                            name="startDate"
                            value={newItem.startDate}
                            onChange={handleChange}
                        />
                        <Input
                            type="date"
                            name="endDate"
                            value={newItem.endDate}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            name="budget"
                            placeholder="Estimated Budget ($)"
                            value={newItem.budget}
                            onChange={handleChange}
                        />
                    </FormRow>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <GradientButton onClick={handleAddItem}>Save Stop</GradientButton>
                    </div>
                </div>
            </Card>

            <div style={{ margin: '3rem 0' }}>
                <AddButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                    <span style={{ fontSize: '2rem' }}>+</span> Add Another Section
                </AddButton>
            </div>
        </PageContainer>
    );
};

export default ItineraryBuilder;

