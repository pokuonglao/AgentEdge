import React, { useState } from 'react';
import '../Styles/Pages/Property.css';

const PropertyDashboard = () => {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        description: '',
        price: '',
        status:'',
        beds: '',
        baths: '',
        squareFeet: '',
        lotSize: '',
        imageUrls: [],
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle image URL addition
    const handleAddImageUrl = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            imageUrls: value.split(',').map((url) => url.trim()), // Split by commas and trim spaces
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (
            !formData.title ||
            !formData.address ||
            !formData.price ||
            !formData.status ||
            !formData.beds ||
            !formData.baths ||
            !formData.squareFeet ||
            !formData.imageUrls.length
        ) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const response = await fetch('https://d129impgfwqu0k.cloudfront.net/Properties/addProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add property');
            }

            setSuccess('Property added successfully!');
            setError(null);
            setFormData({
                title: '',
                address: '',
                description: '',
                price: '',
                status: '',
                beds: '',
                baths: '',
                squareFeet: '',
                lotSize: '',
                imageUrls: [],
            });
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="property-dashboard">
            <h2>Add New Property</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Status</label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="beds">Beds</label>
                    <input
                        type="number"
                        id="beds"
                        name="beds"
                        value={formData.beds}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="baths">Baths</label>
                    <input
                        type="number"
                        id="baths"
                        name="baths"
                        value={formData.baths}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="squareFeet">Square Feet</label>
                    <input
                        type="number"
                        id="squareFeet"
                        name="squareFeet"
                        value={formData.squareFeet}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lotSize">Lot Size</label>
                    <input
                        type="number"
                        id="lotSize"
                        name="lotSize"
                        value={formData.lotSize}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrls">Image URLs (comma-separated)</label>
                    <input
                        type="text"
                        id="imageUrls"
                        name="imageUrls"
                        value={formData.imageUrls.join(', ')}
                        onChange={handleAddImageUrl}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Add Property</button>
            </form>
        </div>
    );
};

export default PropertyDashboard;
