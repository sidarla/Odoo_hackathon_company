import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    height: 350px;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const Slide = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease-in-out;
`;

const Arrow = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.3);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    backdrop-filter: blur(5px);
    transition: background 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;

    &:hover {
        background: rgba(255, 255, 255, 0.5);
    }

    ${props => props.$left ? 'left: 20px;' : 'right: 20px;'}
`;

const DotsContainer = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.$active ? '#fff' : 'rgba(255,255,255,0.5)'};
    cursor: pointer;
    transition: all 0.3s;
`;

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = React.useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (!images || images.length === 0) return null;

    return (
        <CarouselContainer>
            <Slide style={{ backgroundImage: `url(${images[currentIndex]})` }} />

            {images.length > 1 && (
                <>
                    <Arrow $left onClick={prevSlide}>&#8249;</Arrow>
                    <Arrow onClick={nextSlide}>&#8250;</Arrow>

                    <DotsContainer>
                        {images.map((_, idx) => (
                            <Dot
                                key={idx}
                                $active={idx === currentIndex}
                                onClick={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </DotsContainer>
                </>
            )}
        </CarouselContainer>
    );
};

export default Carousel;
