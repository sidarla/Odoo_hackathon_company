import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Nav = styled.nav`
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--dark);
`;

const NavMenu = styled.div`
    display: flex;
    gap: 2rem;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled(Link)`
    color: var(--dark);
    font-weight: 500;
    &:hover {
        color: var(--primary);
    }
`;

const Button = styled.button`
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    border: none;
    background: var(--primary);
    color: #fff;
    font-weight: 600;
    transition: 0.3s;

    &:hover {
        background: #ff5252;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Nav>
            <Logo to="/">GlobeTrotter</Logo>
            <NavMenu>
                <NavLink to="/">Home</NavLink>
                {token ? (
                    <>
                        <NavLink to="/my-trips">My Trips</NavLink>
                        <NavLink to="/create-trip">Plan Trip</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                        <NavLink to="/community">Community</NavLink>
                        <NavLink to="/calendar">Calendar</NavLink>
                        <NavLink to="/admin">Admin</NavLink>
                        <Button onClick={handleLogout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <Link to="/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </>
                )}
            </NavMenu>
        </Nav>
    );
};

export default Navbar;
