// Mls.js

import React, { useState } from 'react';
import '../Styles/Pages/Mls.css';
import Footer from '../Components/Footer';

const Mls = () => {
    const [mlsId, setMlsId] = useState('');
    const [propertyList, setPropertyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setMlsId(event.target.value);
    };

    const username = 'simplyrets';
    const password = 'simplyrets';

    const fetchMls = () => {
        if (!mlsId) return; // Don't fetch if MLS ID is empty
        setLoading(true);
        fetch(`https://api.simplyrets.com/properties/${mlsId}`, {
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password)
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch MLS data');
                }
                return response.json();
            })
            .then(data => {
                // Format price
                const formattedProperty = {
                    ...data,
                    listPrice: formatPrice(data.listPrice)
                };
                setPropertyList([formattedProperty]);
                setError('');
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setError('Failed to fetch MLS data. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    // Function to format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <>
            <div className="container">
                <input
                    type="text"
                    value={mlsId}
                    onChange={handleInputChange}
                    placeholder="Enter MLS ID"
                />
                <p>Enter 1005252</p>
                <button onClick={fetchMls}>Fetch MLS</button>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {propertyList.map(property => (
                    <div key={property.property.id} className="property-listing">
                        <div className="listing-hero">
                            <div className="listing-carousel">
                                <div className="nav-prev"></div>
                                <div className="nav-next"></div>
                                <div className="container">
                                    <div className="image-gallery">
                                        {property.photos.map((photo, index) => (
                                            <img key={index} src={photo} alt={`Photo ${index}`} />
                                        ))}
                                    </div>
                                    <div className="listing-banner">
                                        <div className="wrapper">
                                            <div className="left">
                                                <div className="listing-status">for sale</div>
                                                <div className="listing-price">{property.listPrice}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <header className="listing-header">
                            <h1 className="listing-title">{property.address.full}</h1>
                            <ul className="listing-details">
                                <li><span>{property.property.bedrooms}<span> beds</span></span></li>
                                <li><span>{property.property.bathsFull}<span> baths</span></span></li>
                                <li><span>{property.property.area}<span> sqft</span></span></li>
                            </ul>
                        </header>
                        <div className="listing-description">{property.remarks}</div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default Mls;
