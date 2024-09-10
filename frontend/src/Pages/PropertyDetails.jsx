import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Pages/PropertyDetails.css';
import Footer from '../Components/Footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ContactForm from '../Components/ContactForm'; 

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://d129impgfwqu0k.cloudfront.net/Properties/getProperty/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProperty(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading property details...</div>;
    }

    if (error) {
        return <div>Error fetching property details: {error}</div>;
    }

    return (
        <>
            <div className="property-details">
                {/* Hero Section */}
                <div className="hero-image" style={{ backgroundImage: `url(${property.imageUrls[0]})` }}>
                    <div className="hero-overlay">
                        <h1 className="property-title">{property.title}</h1>
                        <p className="property-status">{property.status}</p>
                    </div>
                </div>

                {/* Property Info Section */}
                <div className="property-info">
                    <h2>${property.price.toLocaleString()}</h2>
                    <p>{property.beds} Beds | {property.baths} Baths | {property.squareFeet.toLocaleString()} Sq Ft</p>
                    <p>Lot Size: {property.lotSize.toLocaleString()} sq ft</p>
                    <p>Address: {property.address}</p>
                </div>

                {/* Property Description */}
                <div className="property-description">
                    <h3>Description</h3>
                    <p>{property.description}</p>
                </div>

                {/* Image Gallery Carousel */}
                <div className="property-gallery">
                    <Carousel showArrows={true} infiniteLoop showThumbs={true} showStatus={false} autoPlay interval={4000}>
                        {property.imageUrls.map((url, index) => (
                            <div key={index}>
                                <img src={url} alt={`Property image ${index + 1}`} className="property-details__image" />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            <ContactForm/>
            <Footer />
        </>

    );
};

export default PropertyDetails;
