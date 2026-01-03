import styled from 'styled-components';

export const PageContainer = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
    min-height: 80vh;
`;

export const Section = styled.section`
    margin-bottom: 4rem;
`;

export const SectionTitle = styled.h2`
    margin-bottom: 2rem;
    font-size: 2rem;
    color: var(--dark);
    font-weight: 800;
    position: relative;
    display: inline-block;

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 60%;
        height: 4px;
        background: var(--secondary);
        border-radius: 2px;
    }
`;

export const Card = styled.div`
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    padding: 2rem;
    border: 1px solid #f0f0f0;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.1);
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s;
    outline: none;

    &:focus {
        border-color: var(--secondary);
        box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.1);
    }
`;

export const GradientButton = styled.button`
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

    &:active {
        transform: translateY(0);
    }

    &:disabled {
        background: #ccc;
        cursor: not-allowed;
        box-shadow: none;
    }
`;

export const SecondaryButton = styled.button`
    background: #fff;
    color: var(--dark);
    padding: 1rem 2rem;
    border-radius: 50px;
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

export const Badge = styled.span`
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    background: ${props => {
        if (props.type === 'ongoing') return 'rgba(78, 205, 196, 0.15)';
        if (props.type === 'completed') return 'rgba(0, 0, 0, 0.05)';
        return 'rgba(255, 107, 107, 0.1)';
    }};
    color: ${props => {
        if (props.type === 'ongoing') return '#2dbba7';
        if (props.type === 'completed') return '#666';
        return '#ff6b6b';
    }};
`;
