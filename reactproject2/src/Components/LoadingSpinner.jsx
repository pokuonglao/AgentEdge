import React from 'react';
import '../Styles/Components/LoadingSpinner.css';

function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            {/* Use any loading spinner or animation library, or create your own */}
            <div className="spinner"></div>
        </div>
    );
}

export default LoadingSpinner;
