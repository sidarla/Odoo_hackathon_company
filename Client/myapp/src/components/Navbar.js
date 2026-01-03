import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Nav = styled.nav`
    height: 80px;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
`;

const Logo = styled(Link)`
    font-size: 1.8rem;
    font-weight: 900;
    text-decoration: none;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const NavMenu = styled.div`
    display: flex;
    gap: 2.5rem;
    align-items: center;

    @media (max-width: 900px) {
        display: none;
    }
`;

const NavLink = styled(Link)`
    color: var(--dark);
    font-weight: 600;
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    opacity: ${props => props.active ? '1' : '0.7'};

    &::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: ${props => props.active ? '100%' : '0'};
        height: 2px;
        background: var(--secondary);
        transition: width 0.3s ease;
    }

    &:hover {
        opacity: 1;
        &::after {
            width: 100%;
        }
    }
`;

const NavButton = styled.button`
    padding: 0.7rem 1.8rem;
    border-radius: 50px;
    border: none;
    background: ${props => props.outline ? 'transparent' : 'linear-gradient(135deg, var(--primary) 0%, #ff8e8e 100%)'};
    color: ${props => props.outline ? 'var(--dark)' : '#fff'};
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    border: ${props => props.outline ? '2px solid #f0f0f0' : 'none'};
    box-shadow: ${props => props.outline ? 'none' : '0 4px 15px rgba(255, 107, 107, 0.3)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: ${props => props.outline ? '0 4px 10px rgba(0,0,0,0.05)' : '0 6px 20px rgba(255, 107, 107, 0.4)'};
        background: ${props => props.outline ? '#f8f9fa' : 'linear-gradient(135deg, #ff5252 0%, #ff8e8e 100%)'};
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <Nav>
            <Logo to="/">GlobeTrotter</Logo>
            <NavMenu>
                <NavLink to="/" active={isActive('/')}>Home</NavLink>
                {token ? (
                    <>
                        <NavLink to="/my-trips" active={isActive('/my-trips')}>My Trips</NavLink>
                        <NavLink to="/create-trip" active={isActive('/create-trip')}>Plan Trip</NavLink>
                        <NavLink to="/calendar" active={isActive('/calendar')}>Calendar</NavLink>
                        <NavLink to="/community" active={isActive('/community')}>Community</NavLink>
                        <div style={{ display: 'flex', gap: '1rem', marginLeft: '1rem' }}>
                            <Link to="/profile" style={{ textDecoration: 'none' }}>
                                <NavButton outline>Profile</NavButton>
                            </Link>
                            <NavButton onClick={handleLogout}>Logout</NavButton>
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <NavButton outline>Login</NavButton>
                        </Link>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <NavButton>Sign Up Free</NavButton>
                        </Link>
                    </div>
                )}
            </NavMenu>
        </Nav>
    );
};

export default Navbar;

