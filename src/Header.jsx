import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from './assets/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in by checking the presence of the access token
        if (localStorage.getItem('access_token')) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Clear localStorage and update the login state
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to the login page
    };

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '70px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 2rem 1rem 2rem',
                backgroundColor: '#f9f9f9', // soft white shade
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
                zIndex: 1000,
            }}
        >
            <img
                className="logo-img"
                src={logo}
                alt="Logo"
                onClick={() => navigate('/')}
            />

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button className="homebutton" onClick={() => navigate("/Aboutus")}>
                    About us
                </button>

                {!isLoggedIn && (
                    <button className="homebutton" onClick={() => navigate("/signup")}>
                        Join now
                    </button>
                )}

                <button
                    className="homebutton"
                    onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
                >
                    {isLoggedIn ? "Log out" : "Log in"}
                </button>
            </div>
        </nav>
    );
};

export default Header;