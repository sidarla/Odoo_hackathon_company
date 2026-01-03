import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    AuthContainer,
    AuthCard,
    Title,
    ToggleContainer,
    ToggleButton,
    Form,
    Input,
    SubmitButton
} from '../components/AuthStyles';

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
            alert('Login Failed: ' + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <Title>Welcome Back</Title>

                <ToggleContainer>
                    <ToggleButton active={true}>Login</ToggleButton>
                    <ToggleButton active={false} onClick={() => navigate('/signup')}>Signup</ToggleButton>
                </ToggleContainer>

                <Form onSubmit={handleSubmit}>
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
                    <SubmitButton type="submit">Login</SubmitButton>
                </Form>
            </AuthCard>
        </AuthContainer>
    );
};

export default Login;

