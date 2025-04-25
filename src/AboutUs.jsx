import React from 'react';

const AboutUs = () => {
    return (
        <>
            <div
                className="aboutus-container"
                style={{
                    backgroundImage: `url("https://images.pexels.com/photos/922610/pexels-photo-922610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#ffffff',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        marginBottom: '2rem',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                    }}
                >
                    Why PixelHire?
                </h2>
                <div
                    className="aboutus-content"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        padding: '2rem',
                        borderRadius: '8px',
                        maxWidth: '800px',
                        margin: '0 auto',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <section className="our-mission" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Our Mission</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            At <strong>PixelHire</strong>, our mission is to make the process of hiring photographers and videographers simple, transparent, and accessible—especially for local communities and small events.
                        </p>
                    </section>

                    <section className="our-vision" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Our Vision</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            We envision a platform where every creative professional—regardless of their scale—can showcase their work, find clients, and grow without needing a big studio or social media fame.
                        </p>
                    </section>

                    <section className="the-problem" style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>The Problem</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            In cities like <strong>Lahore</strong>, finding a trustworthy photographer or videographer is still a difficult and unorganized process. Most people rely on word-of-mouth, Instagram pages, or referrals that don’t offer transparency around pricing, availability, or the quality of work.
                        </p>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            This becomes even harder in <strong>local communities</strong>. Families planning events like weddings or birthdays often struggle to find professionals within their budget. Meanwhile, small-scale creators lack platforms to showcase their work and connect with clients.
                        </p>
                    </section>

                    <section className="our-solution">
                        <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>Our Solution: PixelHire</h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                            <strong>PixelHire</strong> is a centralized platform that bridges the gap between clients and creatives. Clients can discover professionals nearby, view real portfolios, check availability, and book instantly—all in one place.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default AboutUs;