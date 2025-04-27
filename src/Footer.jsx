import React from 'react'
import { useLocation } from "react-router-dom"

const Footer = () => {

    const {pathname} = useLocation();
    const hideFooterRoutes = ['/login', '/signup'];

    const showFooter = !hideFooterRoutes.includes(pathname.toLowerCase());

    return !showFooter ? null : (
        <footer
            style={{
                backgroundColor: '#ffffff', // white background
                color: '#000000',
                borderTop: '1px solid #e0e0e0', // subtle border for separation
                marginTop: '2rem',
                
            }}
        >
            <div className="footer-content" style={{ display: 'flex', margin: '0 auto'}}>
                <div className="footer-left" style={{ flex: '2', marginBottom: '1rem' }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>PixelHire</h4>
                    <p>Connecting you with trusted photographers and videographers nearby.</p>
                    <p>© 2025 PixelHire. All rights reserved.</p>
                </div>

                <div className="footer-links" style={{ flex: '1', marginBottom: '1rem' }}>
                    <h5 style={{ marginBottom: '0.5rem' }}>Quick Links</h5>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><a href="#" style={{ color: '#000000', textDecoration: 'none' }}>Home</a></li>
                        <li><a href="#" style={{ color: '#000000', textDecoration: 'none' }}>About</a></li>
                        <li><a href="#" style={{ color: '#000000', textDecoration: 'none' }}>Contact</a></li>
                        <li><a href="#" style={{ color: '#000000', textDecoration: 'none' }}>Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="footer-contact" style={{ flex: '1', marginBottom: '1rem' }}>
                    <h5 style={{ marginBottom: '0.5rem' }}>Contact Us</h5>
                    <p>Email: <a href="mailto:support@pixelhire.com" style={{ color: '#000000', textDecoration: 'none' }}>support@pixelhire.com</a></p>
                    <p>Instagram: <a href="https://instagram.com/pixelhire" target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'none' }}>@pixelhire</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer