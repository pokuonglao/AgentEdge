import '../Styles/Pages/About.css';
import Footer from '../Components/Footer';
import profileImage from '../../public/IMG_7420.jpg';
import ContactForm from '../Components/ContactForm'



const Pokuong = () => {
    
    return (
        <>
            <aside id="chris-hero" className="section black minhalf active">
                <div className="wrapper center">
                    <div id="stat-highlight">
                        <div className="stat">
                            <div className="statbox">
                                {/*<span className="count">1</span>*/}
                                {/*<span className="label">Completed Marathon</span>*/}
                            </div>
                        </div>
                    </div>
                    <div id="pull-quote">
                        <div className="quote">"Your best interest is also my best interest!"</div>
                        <div className="source">~ Pokuong Lao</div>
                    </div>
                </div>
                <span className="mask black"></span>
            </aside>

            <main id="chris-bio" className="section white static">
                <div className="wrapper">
                    <div className="content split aligntop">
                        <div className="left">
                            <div id="user-image">
                                <img src={profileImage} alt="pokuong lao photo" className="fit" />
                            </div>
                            <address id="user-contact">
                                <div className="phone">(626) 268-1136</div>
                                <a href="mailto:pokuonglaorealtor@gmail.com" className="email">pokuonglaorealtor@gmail.com</a>
                            </address>
                        </div>
                        <div className="right">
                            <header>
                                <h1>Pokuong Lao</h1>
                            </header>
                            <p>
                            As a dedicated real estate agent, I am always looking out for you and finding the best deals, 
                            making me an unstoppable force in the real estate industry. 
                            Along with hard work, I offer effective business marketing and a clear plan of action. 
                            My goal is to provide above-expectation service through exceptional marketing and negotiating skills. 
                            I value professionalism, integrity, and a strong work ethic. 
                            I perform diligently under pressure and solve unexpected problems with ease. 
                            My enthusiasm and optimism ensure a positive and productive experience for every client.</p>
                        </div>
                    </div>
                </div>
            </main> 
            <ContactForm/>
            <Footer/>
        </>
    );
};

export default Pokuong;