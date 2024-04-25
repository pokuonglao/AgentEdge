import '../Styles/Pages/About.css';
import Footer from '../Components/Footer';
import profileImage from '../../public/profile-removebg-preview.png';


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
                                <div className="phone">(626) 272-8808</div>
                                <a href="mailto:pokuonglao@outlook.com" className="email">pokuonglao@outlook.com</a>
                            </address>
                        </div>
                        <div className="right">
                            <header>
                                <h1>Pokuong Lao</h1>
                            </header>
                            <p>
                                I'm Pokuong Lao, and I've been deeply involved in .NET development since 2021. At Century 21 Astro, my role revolves around optimizing data workflows using ASP.NET, primarily to assist agents in identifying potential clients. Additionally, I'm passionate about enhancing user interface and experience using JavaScript, ensuring our web applications remain engaging and cutting-edge.

                                In the past, I was fully immersed in ASP.NET and had the opportunity to volunteer on projects involving building rule engines and implementing object-oriented programming to streamline medical data for QTC in an agile scrum pace. This experience sparked my interest in front-end design, prompting me to expand my skills and transition into a full-stack developer role.

                                Looking ahead, I'm eager to leverage my expertise to develop a full web application with backend server functionality and a polished front-end interface for my side business. It's an exciting prospect that combines my technical skills with my entrepreneurial aspirations.

                                Driven by a growing interest in business and marketing, I pursued a real estate license alongside my technical endeavors. This dual focus has equipped me with a unique blend of skills, including a keen eye for digital marketing strategies and an unwavering commitment to delivering results. One of my key strengths is persistence, which has proven invaluable in overcoming challenges, whether in software development or personal endeavors like completing a marathon last year.
                            </p>
                        </div>
                    </div>
                </div>
            </main> 
            <Footer/>
        </>
    );
};

export default Pokuong;