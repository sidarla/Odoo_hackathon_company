import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Container = styled.div`
    min-height: calc(100vh - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 2rem;
`;

const Card = styled.div`
    background: #fff;
    padding: 2rem 3rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
`;

const PhotoCircle = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #000;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    background: #fff;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1rem;

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid #000;
    border-radius: 30px;
    font-size: 1rem;
    outline: none;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid #000;
    border-radius: 20px;
    font-size: 1rem;
    outline: none;
    resize: none;
    height: 100px;
    margin-bottom: 1.5rem;
`;

const Button = styled.button`
    padding: 0.8rem 2rem;
    border: 2px solid #000;
    border-radius: 30px;
    background: #fff;
    font-size: 1rem;
    font-weight: bold;
    transition: 0.3s;
    
    &:hover {
        background: #000;
        color: #fff;
    }
`;

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        country: '',
        additionalInfo: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Registration Failed');
        }
    };

    return (
        <Container>
            <Card>
                <PhotoCircle>Photo</PhotoCircle>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid>
                        <Input name="firstName" placeholder="First Name" onChange={handleChange} />
                        <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
                    </Grid>
                    <Grid>
                        <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
                        <Input name="phone" placeholder="Phone" onChange={handleChange} />
                    </Grid>
                    <Grid>
                        <Input name="username" placeholder="Username" onChange={handleChange} />
                        <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
                    </Grid>
                    <Grid>
                        <Input name="city" placeholder="City" onChange={handleChange} />
                        <Input name="country" placeholder="Country" onChange={handleChange} />
                    </Grid>
                    <TextArea name="additionalInfo" placeholder="Additional Information ...." onChange={handleChange} />

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit">Register Users</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default Signup;
