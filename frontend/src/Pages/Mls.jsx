import React, { useState, useEffect } from 'react';
import '../Styles/Pages/Mls.css';
import Footer from '../Components/Footer';

const Mls = () => {
    const [mlsId, setMlsId] = useState('');
    const [propertyList, setPropertyList] = useState([]);
    const [activeListings, setActiveListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const username = 'simplyrets';
    const password = 'simplyrets';

    useEffect(() => {
        fetchActiveListings();
    }, []);

    const handleInputChange = (event) => {
        setMlsId(event.target.value);
    };

    const fetchMls = () => {
        if (!mlsId) {
            setError('Please enter an MLS ID.');
            return;
        }

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

    const fetchActiveListings = () => {
        setLoading(true);
        fetch('https://api.simplyrets.com/properties?status=Active', {
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password)
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch active listings');
                }
                return response.json();
            })
            .then(data => {
                const formattedProperties = data.map(property => ({
                    ...property,
                    listPrice: formatPrice(property.listPrice)
                }));
                setActiveListings(formattedProperties);
                setError('');
            })
            .catch(error => {
                console.error('Error fetching active listings:', error);
                setError('Failed to fetch active listings. Please try again.');
            })
            .finally(() => setLoading(false));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <>
            <div className="top-container">
                <input
                    type="text"
                    value={mlsId}
                    onChange={handleInputChange}
                    placeholder="Enter MLS ID"
                />
                <button onClick={fetchMls}>Fetch MLS</button>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {propertyList.map(property => (
                    <div key={property.property.id} className="property-listing">
                        <div className="listing-hero">
                            <div className="listing-carousel">
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

            <div className="property-browser">
                <div className="wrapper">
                    <header>
                        <h1 className="screen-reader-text"></h1>
                    </header>
                    <div className="card_container">
                        {activeListings.map((property, index) => (
                            <div key={index} className="listing-card">
                                <div className="thumb listing-thumb">
                                    <div className="image_container">
                                        <img src={property.photos[0]} alt={`Photo of ${property.address.full}`} />
                                    </div>
                                    <div className="listing_status active for-sale-lease">
                                        <span>For Sale</span>
                                    </div>
                                </div>
                                <div className="listing_info">
                                    <div className="listing_id">Listing ID: {property.listingId}</div>
                                    <div className="listing_address">{property.address.full}</div>
                                    <div className="listing_citystate">{property.address.city}, {property.address.state}</div>
                                    <div className="combo_price">{property.listPrice}</div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Mls;
