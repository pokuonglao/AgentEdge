import React, { useEffect, useState } from 'react';
import '../Styles/Components/Vimeo.css';

const Vimeo = () => {
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <main id="welcome" className="section full static">
            <div className={`wrapper ${showVideo ? 'hidden' : ''}`}>
                <header>
                    <h1 id="company-name">Pokuong Lao</h1>
                </header>
                <div id="key-phrases">
                    <div>Software Developer</div>
                    <div>Real Estate Agent</div>
                </div>
            </div>
            <div id="bgvid" className={`video-container ${showVideo ? 'visible' : ''}`}>
                {showVideo && (
                    <iframe
                        title="Pokuong Lao Splash Video"
                        src="https://player.vimeo.com/video/141187410?background=1&autoplay=1&loop=1&byline=0&title=0"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                    />
                )}
            </div>

            {/* Scroll Down Icon */}
            <div className="scroll-icon">
                <span>↓ Scroll Down</span>
            </div>
        </main>
    );
};

export default Vimeo;
