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
    border: 1px dashed #aaa; /* Dashed border as per mockup style */
    position: relative;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 1rem;
`;

const Title = styled.h2`
    font-size: 1.5rem;
`;

const CircleIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #000;
`;

const SectionContainer = styled.div`
    border: 1px solid #000;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background: #fff;
`;

const SectionHeader = styled.h3`
    margin-bottom: 1rem;
    font-size: 1.2rem;
`;

const FormRow = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;

const Input = styled.input`
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #000;
    border-radius: 8px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #000;
    border-radius: 8px;
    resize: none;
    height: 80px;
`;

const AddButton = styled.button`
    width: 100%;
    padding: 1rem;
    border: 1px solid #000;
    background: #fff;
    border-radius: 12px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: #f0f0f0;
    }
`;

const ItineraryBuilder = () => {
    const { tripId } = useParams();
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
        try {
            const res = await api.post(`/trips/${tripId}/items`, newItem);
            setItems([...items, res.data]);
            setNewItem({ type: '', description: '', startDate: '', endDate: '', budget: '' }); // Reset form
        } catch (err) {
            console.error(err);
            alert('Error adding section');
        }
    };

    return (
        <Container>
            <Header>
                <Title>GlobalTrotter</Title>
                <CircleIcon />
            </Header>

            {items.map((item, index) => (
                <SectionContainer key={item.id}>
                    <SectionHeader>Section {index + 1}: {item.type}</SectionHeader>
                    <p>{item.description}</p>
                    <FormRow>
                        <div style={{ border: '1px solid #000', borderRadius: '8px', padding: '0.5rem 1rem', flex: 1 }}>
                            Date Range: {item.startDate && item.startDate.split('T')[0]} to {item.endDate && item.endDate.split('T')[0]}
                        </div>
                        <div style={{ border: '1px solid #000', borderRadius: '8px', padding: '0.5rem 1rem', flex: 1 }}>
                            Budget: {item.budget}
                        </div>
                    </FormRow>
                </SectionContainer>
            ))}

            <SectionContainer>
                <SectionHeader>Add New Section</SectionHeader>
                <Input
                    name="type"
                    placeholder="Section Type (e.g. Travel, Hotel)"
                    value={newItem.type}
                    onChange={handleChange}
                    style={{ marginBottom: '1rem' }}
                />
                <TextArea
                    name="description"
                    placeholder="All the necessary information about this section..."
                    value={newItem.description}
                    onChange={handleChange}
                />
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
                        placeholder="Budget"
                        value={newItem.budget}
                        onChange={handleChange}
                    />
                </FormRow>
                <Button style={{ marginTop: '1rem' }} onClick={handleAddItem}>Save Section</Button>
            </SectionContainer>

            <AddButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                <span>+</span> Add another Section
            </AddButton>
        </Container>
    );
};

// Simple styled button for local use
const Button = styled.button`
    padding: 0.5rem 1rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-weight: bold;
`;

export default ItineraryBuilder;
