import { Outlet, useLocation, Link } from "react-router-dom";
import { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Components/Nav.css';
import Logo from '../../public/Logo.jpg';

const Nav = ({ isAuthenticated }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated);
    let location = useLocation();
    const currentPage = location.pathname;

    useEffect(() => {
        const authStatus = localStorage.getItem('isAuthenticated');
        setIsAuth(authStatus === 'true');
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuth(false);
        window.location.href = '/login/';
    };

    return (
        <main>
            <header id="header" data-page={currentPage}>
                <nav className="nav-wrapper">
                    <Link id="logo" to="/">
                        <img src={Logo} alt="Pokuong Lao Logo" className="logo-image" />
                    </Link>
                    <ul className="menu">
                        <li><Link to="/about/">About</Link></li>
                        <li><Link to="/properties/">Properties</Link></li>
                        {isAuthenticated && (
                            <>
                                <li><Link to="/client">Client</Link></li>
                                <li><Link to="/propertydashboard">Property Dashboard</Link></li>
                            </>
                        )}
                        <li>
                            <Link to="/login/" onClick={isAuthenticated ? handleLogout : null}>
                                {isAuthenticated ? "Logout" : "Login"}
                            </Link>
                        </li>
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
