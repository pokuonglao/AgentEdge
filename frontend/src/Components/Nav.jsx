import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Components/Nav.css';
import Logo from '../../public/Logo.jpg';

const Nav = ({ isAuthenticated }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
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

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <main>
        <header id="header" data-page={currentPage}>
            <nav className="nav-wrapper" aria-label="Main Navigation">
                <Link id="logo" to="/">
                    <img src={Logo} alt="Pokuong Lao Logo" className="logo-image" />
                </Link>
                <div className="burger-menu" onClick={toggleMenu} aria-label="Toggle Menu">
                    ☰
                </div>
                <ul className={`menu ${isMenuOpen ? 'open' : ''}`} role="menu">
                    <li role="menuitem">
                        <Link to="/about/" onClick={() => setIsMenuOpen(false)}>About</Link>
                    </li>
                    <li role="menuitem">
                        <Link to="/properties/" onClick={() => setIsMenuOpen(false)}>Properties</Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li role="menuitem">
                                <Link to="/client" onClick={() => setIsMenuOpen(false)}>Client</Link>
                            </li>
                            <li role="menuitem">
                                <Link to="/propertydashboard" onClick={() => setIsMenuOpen(false)}>Property Dashboard</Link>
                            </li>
                        </>
                    )}
                    <li role="menuitem">
                        <Link to={isAuthenticated ? "#" : "/login/"} onClick={isAuthenticated ? handleLogout : () => setIsMenuOpen(false)}>
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
