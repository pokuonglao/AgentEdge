import React from 'react';
import '../Styles/Components/AboutMe.css';
import profileImage from '../../public/IMG_7420.jpg';

const AboutMe = () => {
    return (
        <section className="about-section" aria-labelledby="about-title">
            <div className="about-section__wrapper">
                <div className="about-section__left">
                    <div className="about-section__thumb" style={{ backgroundImage: `url(${profileImage})` }} aria-hidden="true"></div>
                </div>
                <div className="about-section__right">
                    <h2 id="about-title" className="about-section__title">Pokuong Lao</h2>
                    <p className="about-section__text">
                        As a dedicated real estate agent, I am always looking out for you and finding the best deals, 
                        making me an unstoppable force in the real estate industry. Along with hard work, I offer effective 
                        business marketing and a clear plan of action. My goal is to provide above-expectation service through 
                        exceptional marketing and negotiating skills. I value professionalism, integrity, and a strong work ethic. 
                        I perform diligently under pressure and solve unexpected problems with ease. My enthusiasm and optimism 
                        ensure a positive and productive experience for every client.
                    </p>
                    <address className="about-section__contact">
                        <div className="about-section__phone">
                            <a href="tel:+16262681136" aria-label="Call Pokuong Lao">(626) 268-1136</a>
                        </div>
                        <a href="mailto:pokuonglaorealtor@gmail.com" className="about-section__email" aria-label="Email Pokuong Lao">pokuonglaorealtor@gmail.com</a>
                    </address>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
