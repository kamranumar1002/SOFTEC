import React from "react";
import {useNavigate} from "react-router-dom"
import image1 from './assets/image 2.avif';
import image2 from './assets/image 3.avif';
import image3 from './assets/image 4.avif';
import image4 from './assets/image1.avif';
import image5 from './assets/image 5.avif';



const Home = () => {
  const navigate=useNavigate();
    return (<>

<section
  className="hero"
  style={{
    backgroundImage: `url(${image4})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '95vw',
    padding: '4rem 2rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    textAlign: 'left',
    position: 'relative' 
  }}
>
  
<nav
  style={{
    position: 'absolute',
    top: '1rem',
    right: '2rem',
    display: 'flex',
    gap: '1rem',
  }}
>
  <button className="homebutton" onClick={() => navigate("/Aboutus")}>About us</button>
  <button className="homebutton" onClick={() => navigate("/Contactus")}>Contact us</button>

  <div className="dropdown">
    <button className="homebutton">Join now ▾</button>
    <div className="dropdown-content">
      <button onClick={() => navigate("/creatorSignup")}>Join as Creator</button>
      <button onClick={() => navigate("/clientSignup")}>Join as Client</button>
    </div>
  </div>

  <button className="homebutton" onClick={() => navigate("/login")}>Log in</button>
</nav>


  <h2 style={{ fontSize: '14vh', fontWeight: '900' }}>PixelHire</h2>
  <h2 style={{ fontSize: '5vh', fontWeight: '900', width:'40vw' }}>Connect With Perfect Photographers To Capture Your Special Moments</h2>

</section>




        
          <div className="homeinfocontainer1">
          <img className="homeimage2" src={image3}></img>


          <div className="homeinfocontainerinside">
          <h4 >For Photographers/Videographers:</h4>
          <ul >
            <li>Make a profile and upload their work</li>
            <li>Choose what type of shoots they offer (weddings, events, products, etc.)</li>
            <li>Set their working hours and price range</li>
            <li>Get booking requests quickly</li>
            <li>Build a career even without a big studio or team</li>
          </ul>
          </div>
          </div>


<div className="homeinfocontainer2">
         

<div className="homeinfocontainerinside2">
       <h4>For Clients:</h4> 
       <ul>
<li>Create a post with event details (place, date, type, and budget)</li> 
<li>See who’s available nearby</li>
<li>Check photos, read reviews, and compare prices</li> 
<li>Book a professional or send them a request</li>
<li>Leave a rating after the shoot</li>
<li>Easily hire someone for personal or family events</li>
</ul>
</div>
<img className="homeimage3" src={image1}></img>
</div>
        
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
        </>
      );
    };
export default Home;