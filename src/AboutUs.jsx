const AboutUs = () => {
    return ( <>
    <div className="aboutusdiv">
    <h2 style={{fontSize:'10vh',
            fontWeight:'900'
          }}>Why PixelHire?</h2>
        <div className="aboutus">
  <section className="our-mission">
    <h2 style={{ fontSize: '10vh', fontWeight: '900' }}>Our Mission</h2>
    <p>
      At <strong>PixelHire</strong>, our mission is to make the process of hiring photographers and videographers simple, transparent, and accessible—especially for local communities and small events.
    </p>
  </section>

  <section className="our-vision">
    <h2>Our Vision</h2>
    <p>
      We envision a platform where every creative professional—regardless of their scale—can showcase their work, find clients, and grow without needing a big studio or social media fame.
    </p>
  </section>

  <section className="the-problem">
    <h2>The Problem</h2>
    <p>
      In cities like <strong>Lahore</strong>, finding a trustworthy photographer or videographer is still a difficult and unorganized process. 
      Most people rely on word-of-mouth, Instagram pages, or referrals that don’t offer transparency around pricing, availability, or the quality of work.
    </p>
    <p>
      This becomes even harder in <strong>local communities</strong>. Families planning events like weddings or birthdays often struggle to find professionals within their budget. 
      Meanwhile, small-scale creators lack platforms to showcase their work and connect with clients.
    </p>
  </section>

  <section className="our-solution">
    <h2>Our Solution: PixelHire</h2>
    <p>
      <strong>PixelHire</strong> is a centralized platform that bridges the gap between clients and creatives. Clients can discover professionals nearby, view real portfolios, check availability, and book instantly—all in one place.
    </p>
  </section>
</div>

          </div>

    </> );
}
 
export default AboutUs;