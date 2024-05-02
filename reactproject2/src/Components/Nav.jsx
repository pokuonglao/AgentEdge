import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Components/Nav.css';
import Logo from '../../public/Logo.jpg';



const Nav = ({ isAuthenticated, }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated);
    let location = useLocation();
    const currentPage = location.pathname;

    useEffect(() => {
        // Check if user is already authenticated on component mount
        const authStatus = localStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, []);

    const handleLogout = () => {
        // Clear authentication status from localStorage
        localStorage.removeItem('isAuthenticated');
        // Update authentication state in component
        setIsAuth(false);
        // Redirect to the login page
        window.location.href = '/login/'; // You can use react-router's history to navigate instead
    };

    return (
        <main>
            <header id="header" data-page={currentPage}>
                <nav className="wrapper">
                    <a id="logo" href="/"><img src={Logo} alt="pokuong lao photo" className="fit" /></a>
                    <span className="mobile_menu"></span>
                    <ul className="menu">
                        <li>
                            <a data-anchor="pokuong" href="/about/">About
                                <span></span>
                            </a>
                        </li>
                        {/* Other navigation items */}
                        <li className="private">
                            <a data-anchor="private" href="/login/" onClick={isAuthenticated ? handleLogout : null}>
                                {isAuthenticated ? "Logout" : "Login"} {/* Toggle Login/Logout based on authentication status */}
                                <span></span>
                            </a>
                        </li>
                        {isAuthenticated && (
                            
                                <li><Link to="/client">Client</Link></li>
                                
                            
                        )}
                    </ul>
                </nav>
            </header>
            <Outlet />
            </main>
    );
};
Nav.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Nav;

// Custom hook to access authentication context

