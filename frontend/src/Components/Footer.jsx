import '../Styles/Components/Footer.css';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'; // Import icons from Font Awesome

const SignupFooter = () => {
    return (
        <aside id="signup-footer" className="section white static">
            <div className="wrapper">
                <div className="content center">
                    <div id="social-icons">
                        <a href="https://www.facebook.com/people/Pokuong-Lao/61564783691370/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
                        <a href="https://www.instagram.com/pokuonglao" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/pokuong-lao-a03879325/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <div id="footer-info">
                        <div>&copy; {new Date().getFullYear()} Pokuong Lao. All Rights Reserved.</div>
                        <div>Created By Pokuong Lao</div>
                        <div>DRE# 02227706</div>
                    </div>
                        {/* Add more social media icons as needed */}
                    </div>
                </div>
                </div>
            </aside>
    );
};

export default SignupFooter;