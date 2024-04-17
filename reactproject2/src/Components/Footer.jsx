import '../Styles/Components/Footer.css';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import icons from Font Awesome

const SignupFooter = () => {
    return (
        <aside id="signup-footer" className="section white static">
            <div className="wrapper">
                <div className="content center">
                    <div id="social-icons">
                        {/*<a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>*/}
                        {/*<a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>*/}
                        <a href="https://www.linkedin.com/in/pokuong-lao-471239159/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://www.github.com/pokuonglao" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        {/* Add more social media icons as needed */}
                    </div>
                </div>
                </div>
        
            {/*<div className="wrapper">*/}
            {/*    <div className="content center optin_form" data-listid="2010830637" data-user="5,8">*/}
            {/*        <div id="signup-title">Subscribe to Pokuong's Newsletter</div>*/}
            {/*        <p>Sign up with your email address to receive news and updates.</p>*/}
            {/*        <div id="optin-response" className="message"></div>*/}
            {/*        <div className="form_group">*/}
            {/*            <div className="form_item combo_item">*/}
            {/*                <input type="email" name="email_address" placeholder="Email address..." autoComplete="email" aria-label="Email Address" />*/}
            {/*                <button type="button" className="black submit">Sign Up</button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            </aside>
    );
};

export default SignupFooter;