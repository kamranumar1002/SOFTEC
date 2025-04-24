import React from 'react'
import {useNavigate} from "react-router-dom"
import logo from './assets/logo.png';


const Header = () => {
    const navigate = useNavigate();

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
            <button className="homebutton" onClick={() => navigate("/Contactus")}>
                Contact us
            </button>
        
            <button className="homebutton" onClick={() => navigate("/signup")}>
                Join now
            </button>
        
            <button className="homebutton" onClick={() => navigate("/login")}>
                Log in
            </button>
            </div>
        </nav>
      
    )
}

export default Header