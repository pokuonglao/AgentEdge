import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import useLocation for conditional button rendering
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel CSS
import '../Styles/Pages/PropertyListingPage.css';
import Footer from '../Components/Footer';
import ContactForm from '../Components/ContactForm';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(6); // Set the number of properties to display per page

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

    // Calculate total pages
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    // Get the properties for the current page
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading properties...</div>;
    }

    if (error) {
        return <div>Error fetching properties: {error}</div>;
    }

    return (
        <>
            <div className="property-page">
                <div className="property-section__wrapper">
                    <h2 className="property-page-title">Featured Properties</h2>
                    <div className="property-list">
                        {currentProperties.map(property => (
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
                                    <p className="property-item__description">{truncateDescription(property.description, 100)} {/* Limit description to 100 characters */}
                                    {property.description.length > 100 && (
                                        <Link to={`/property/${property.id}`} className="read-more">Read more</Link>
                                    )}</p>
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

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <ContactForm/>
            <Footer />
        </>
    );
};

export default PropertyListing;
