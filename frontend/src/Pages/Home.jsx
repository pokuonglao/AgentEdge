import React from 'react';
import Vimeo from '../Components/Vimeo';
import AboutMe from '../Components/AboutMe';
import Footer from '../Components/Footer';
import PropertyListing from '../Components/PropertyListing';
import ContactForm from '../Components/ContactForm';



const Home = () => {
    return (
        <>
        <Vimeo />
        <AboutMe />
        <PropertyListing />
        <ContactForm />
        <Footer />
        </>
    );
};

export default Home;
