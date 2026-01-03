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
    TextArea,
    SubmitButton,
    Grid
} from '../components/AuthStyles';

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
            alert('Registration Failed: ' + (err.response?.data?.msg || err.message));
        }
    };

    return (
        <AuthContainer>
            <AuthCard wide>
                <Title>Create Account</Title>

                <ToggleContainer>
                    <ToggleButton active={false} onClick={() => navigate('/login')}>Login</ToggleButton>
                    <ToggleButton active={true}>Signup</ToggleButton>
                </ToggleContainer>

                <Form onSubmit={handleSubmit}>
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

                    <SubmitButton type="submit">Register</SubmitButton>
                </Form>
            </AuthCard>
        </AuthContainer>
    );
};

export default Signup;

