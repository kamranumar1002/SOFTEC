import React from 'react'
import { useLocation } from "react-router-dom"

const Footer = () => {

    const {pathname} = useLocation();
    const hideFooterRoutes = ['/login', '/signup'];

    const showFooter = !hideFooterRoutes.includes(pathname.toLowerCase());

    return !showFooter ?  null :  (
    <footer>
        <div className="footer-content">
        <div className="footer-left">
            <h4>PixelHire</h4>
            <p>Connecting you with trusted photographers and videographers nearby.</p>
            <p>© 2025 PixelHire. All rights reserved.</p>
        </div>

        <div className="footer-links">
            <h5>Quick Links</h5>
            <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            </ul>
        </div>

        <div className="footer-contact">
            <h5>Contact Us</h5>
            <p>Email: support@pixelhire.com</p>
            <p>Instagram: @pixelhire</p>
        </div>
        </div>
    </footer>
  )
}

export default Footer