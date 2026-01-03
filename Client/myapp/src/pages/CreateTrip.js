import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Container = styled.div`
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    border: 1px solid #000;
`;

const Title = styled.h2`
    margin-bottom: 2rem;
    font-size: 1.8rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const FormGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    
    label {
        width: 120px;
        font-weight: 500;
        text-align: right;
    }
`;

const Input = styled.input`
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #000;
    border-radius: 8px;
    font-size: 1rem;
`;

const SectionTitle = styled.h3`
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-top: 1px solid #ddd;
    padding-top: 1rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
`;

const GridItem = styled.div`
    height: 150px;
    border: 1px solid #000;
    border-radius: 12px;
    background: #f9f9f9;
`;

const Button = styled.button`
    padding: 1rem 2rem;
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: bold;
    align-self: center;
    
    &:hover {
        background: #ff5252;
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
            // Logic to calculate name or just use place
            const tripData = {
                ...formData,
                name: `Trip to ${formData.place}`,
                description: 'Generated trip'
            };
            await api.post('/trips', tripData);
            navigate('/my-trips');
        } catch (err) {
            console.error(err);
            alert('Error creating trip');
        }
    };

    return (
        <Container>
            <Title>Create a new trip</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <label>Select a Place:</label>
                    <Input name="place" value={formData.place} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <label>Start Date:</label>
                    <Input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <label>End Date:</label>
                    <Input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                </FormGroup>

                <SectionTitle>Suggestion for Places to Visit/Activites to preform</SectionTitle>
                <Grid>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                    <GridItem></GridItem>
                </Grid>

                <Button type="submit">Create Trip</Button>
            </Form>
        </Container>
    );
};

export default CreateTrip;
