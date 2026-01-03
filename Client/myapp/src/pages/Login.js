import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Container = styled.div`
    height: calc(100vh - 80px); /* Subtract Navbar height */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
`;

const Card = styled.div`
    background: #fff;
    padding: 2rem 3rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
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

const Input = styled.input`
    width: 100%;
    padding: 0.8rem 1rem;
    margin-bottom: 1.5rem;
    border: 2px solid #000;
    border-radius: 30px;
    font-size: 1rem;
    outline: none;
    
    &:focus {
        border-color: var(--primary);
    }
`;

const Button = styled.button`
    padding: 0.8rem 2rem;
    border: 2px solid #000;
    border-radius: 30px;
    background: #fff;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    transition: 0.3s;

    &:hover {
        background: #000;
        color: #fff;
    }
`;

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Login Failed');
        }
    };

    return (
        <Container>
            <Card>
                <PhotoCircle>Photo</PhotoCircle>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit">Login Button</Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default Login;
