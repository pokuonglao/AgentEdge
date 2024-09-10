import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel CSS
import '../Styles/Components/PropertyListing.css';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch('https://d129impgfwqu0k.cloudfront.net/Properties/getAllProperties') // Ensure this matches your backend route
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Sort the properties from latest to oldest based on `id`
                const sortedProperties = data.sort((a, b) => b.id - a.id); // Replace `id` with `createdAt` if you have a date field
                setProperties(sortedProperties);
                setProperties(data.slice(0, 6)); // Limit the number of listings to top 6
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Function to truncate long descriptions
    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description; // Return full description if within the limit
        }
        return description.slice(0, maxLength) + '...'; // Truncate and add ellipsis
    };

    if (loading) {
        return <div>Loading properties...</div>;
    }

    if (error) {
        return <div>Error fetching properties: {error}</div>;
    }

    return (
        <section className="property-section">
            <div className="property-section__wrapper">
                <h2 className="property-section__title">Featured Properties</h2>
                <div className="property-list">
                    {properties.map(property => (
                        <div key={property.id} className="property-item">
                            <Carousel
                                showArrows={true}
                                infiniteLoop={true}
                                showThumbs={false}
                                showStatus={false}
                                autoPlay={true}
                                interval={3000}
                            >
                                {property.imageUrls.map((url, index) => (
                                    <div key={index}>
                                        <img src={url} alt={`Property image ${index + 1}`} className="property-item__image" />
                                    </div>
                                ))}
                            </Carousel>
                            <Link to={`/property/${property.id}`}>
                                <h3 className="property-item__title">{property.title}</h3>
                                <p className="property-item__status">{property.status}</p>
                                <p className="property-item__location">{property.address}</p>
                                
                                {/* Truncate long descriptions */}
                                <p className="property-item__description">
                                    {truncateDescription(property.description, 100)} {/* Limit description to 100 characters */}
                                    {property.description.length > 100 && (
                                        <Link to={`/property/${property.id}`} className="read-more">Read more</Link>
                                    )}
                                </p>

                                <div className="property-item__details">
                                    <p>Beds: {property.beds}</p>
                                    <p>Baths: {property.baths}</p>
                                    <p>Square Feet: {property.squareFeet.toLocaleString()}</p>
                                    <p>Lot Size: {property.lotSize.toLocaleString()} sq ft</p>
                                </div>
                                <p className="property-item__price">${property.price.toLocaleString()}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="browse-all-btn-wrapper">
                    <Link to="/properties" className="browse-all-btn">Browse All Properties</Link>
                </div>
            </div>
        </section>
    );
};

export default PropertyListing;
