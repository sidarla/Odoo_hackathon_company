import styled from 'styled-components';

export const AuthContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
    padding: 2rem;
`;

export const AuthCard = styled.div`
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    width: 100%;
    max-width: ${props => props.wide ? '800px' : '400px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(90deg, #00c6ff, #0072ff);
    }
`;

export const Title = styled.h2`
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #333;
    font-weight: 800;
    text-align: center;
`;

export const ToggleContainer = styled.div`
    display: flex;
    background: #f0f2f5;
    padding: 5px;
    border-radius: 50px;
    margin-bottom: 2rem;
    width: 100%;
    max-width: 300px;
    position: relative;
`;

export const ToggleButton = styled.button`
    flex: 1;
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    background: ${props => props.active ? 'linear-gradient(90deg, #00c6ff, #0072ff)' : 'transparent'};
    color: ${props => props.active ? '#fff' : '#666'};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: ${props => props.active ? '0 4px 15px rgba(0, 114, 255, 0.3)' : 'none'};

    &:hover {
        color: ${props => props.active ? '#fff' : '#333'};
    }
`;

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
`;

export const InputGroup = styled.div`
    position: relative;
    width: 100%;
`;

export const Input = styled.input`
    width: 100%;
    padding: 1rem 1.2rem;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;

    &:focus {
        border-color: #0072ff;
        background: #fff;
        box-shadow: 0 0 0 4px rgba(0, 114, 255, 0.1);
        outline: none;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 1rem 1.2rem;
    border: 2px solid #e1e1e1;
    border-radius: 12px;
    font-size: 1rem;
    transition: all 0.3s ease;
    background: #f8f9fa;
    resize: vertical;
    min-height: 100px;

    &:focus {
        border-color: #0072ff;
        background: #fff;
        box-shadow: 0 0 0 4px rgba(0, 114, 255, 0.1);
        outline: none;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #00c6ff, #0072ff);
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    margin-top: 1rem;
    box-shadow: 0 4px 15px rgba(0, 114, 255, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 114, 255, 0.4);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;
