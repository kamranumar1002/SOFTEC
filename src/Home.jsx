import React from "react";
import image1 from './assets/image 2.avif';
import image3 from './assets/image 4.avif';
import image4 from './assets/image1.avif';


const Home = () => {
  
    return (<>

      <section
        className="hero"
        style={{
            backgroundImage: `url(${image4})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '90vh',
            padding: '4rem 2rem',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            textAlign: 'left',
            position: 'relative',
        }}
        >
        
        
          <h2 style={{ fontSize: '10vh', fontWeight: '900' }}>PixelHire</h2>
          <h2 style={{ fontSize: '5vh', fontWeight: '900', width:'40vw' }}>Connect With Perfect Photographers To Capture Your Special Moments</h2>
        
        </section>
        
        <div style={{maxWidth : "80%", margin: "20px auto"}}>

          <div className="homeinfocontainer1">
              <img className="homeimage2" src={image3}></img>          
              <div className="homeinfocontainerinside">
                  <h4 >For Photographers/Videographers:</h4>
                  <ul>
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

        </div>
        </>
      );
    };
export default Home;