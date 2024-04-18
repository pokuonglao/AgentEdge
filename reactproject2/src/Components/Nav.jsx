import { Outlet,useLocation,Link } from "react-router-dom";
import PropTypes from 'prop-types';

import '../Styles/Components/Nav.css';

const Nav = ({ isAuthenticated }) => {
    let location = useLocation();
    const currentPage = location.pathname;

    return (
        <main>
            <header id="header" data-page={currentPage}>
                <nav className="wrapper">
                    <a id="logo" href="/">Pokuong Lao</a>
                    <span className="mobile_menu"></span>
                    <ul className="menu">
                        <li>
                            <a data-anchor="pokuong" href="/about">About
                                <span></span>
                            </a>
                        </li>
                        {/* Other navigation items */}
                        <li className="private">
                            <a data-anchor="private" href="/login">
                                Login
                                <span></span>
                            </a>

                        </li>
                        {isAuthenticated && (
                            <>
                                <li><Link to="/client">Client</Link></li>
                                
                            </>
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
