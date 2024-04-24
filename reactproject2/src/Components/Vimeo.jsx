import React, { useEffect, useState } from 'react';
import '../Styles/Components/Vimeo.css';


const Vimeo = () => {
    const [showVideo, setShowVideo] = useState(false);

    // Use a useEffect to delay showing the video
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 3000); // Adjust the delay time as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
        <main id="welcome" className="section full static">
            <div className={`wrapper ${showVideo ? 'hidden' : ''}`}>
                <header>
                    <h1 id="company-name">Pokuong Lao</h1>
                </header>
                <div id="key-phrases">
                    <div>Software Developer</div>
                    <div>Real Estate Agent</div>
                    <div>Marathon Runner</div>
                </div>
            </div>
            <div id="bgvid" className={`video-container ${showVideo ? 'visible' : ''}`}> 
                    <iframe title="Pokuonglao Splash Video"
                        src="https://player.vimeo.com/video/141187410?background=1&autoplay=1&loop=1&byline=0&title=0"
                    >
                </iframe>
                
            </div>
            </main>
        </>
    );
};

export default Vimeo;