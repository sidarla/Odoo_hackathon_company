import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    PageContainer,
    Card,
    Input,
    GradientButton,
    SectionTitle
} from '../components/SharedStyles';

const CreateCard = styled(Card)`
    max-width: 800px;
    margin: 0 auto;
`;

const HeroBanner = styled.div`
    height: 250px;
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), 
                url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1500&q=80') center/cover;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -50px;
    color: white;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 2rem;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--dark);
`;

const SuggestionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const SuggestionCard = styled.div`
    height: 120px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px dashed #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    transition: all 0.3s;

    &:hover {
        border-color: var(--secondary);
        color: var(--secondary);
        background: #f0f7f6;
    }
`;

const CreateTrip = () => {
    const [formData, setFormData] = useState({
        place: '',
        startDate: '',
        endDate: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tripData = {
                ...formData,
                name: `Trip to ${formData.place}`,
                description: 'Exciting new journey!'
            };
            const res = await api.post('/trips', tripData);
            navigate(`/itinerary/${res.data.id}/view`);
        } catch (err) {
            console.error(err);
            alert('Error creating trip');
        }
    };

    return (
        <PageContainer>
            <HeroBanner>
                <div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900' }}>Plan Your Next Chapter</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Every journey starts with a single step</p>
                </div>
            </HeroBanner>

            <CreateCard style={{ position: 'relative', background: 'white' }}>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Label>Where are you headed?</Label>
                        <Input
                            name="place"
                            placeholder="e.g. Paris, Tokyo, New York"
                            value={formData.place}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Row>
                        <div>
                            <Label>Departure Date</Label>
                            <Input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Return Date</Label>
                            <Input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Row>

                    <div style={{ marginTop: '2rem' }}>
                        <SectionTitle style={{ fontSize: '1.5rem' }}>Popular Suggestions</SectionTitle>
                        <SuggestionGrid>
                            <SuggestionCard>Eiffel Tower</SuggestionCard>
                            <SuggestionCard>Louvre Museum</SuggestionCard>
                            <SuggestionCard>Mount Fuji</SuggestionCard>
                            <SuggestionCard>Central Park</SuggestionCard>
                        </SuggestionGrid>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                        <GradientButton type="submit">Create Itinerary</GradientButton>
                    </div>
                </Form>
            </CreateCard>
        </PageContainer>
    );
};

export default CreateTrip;

