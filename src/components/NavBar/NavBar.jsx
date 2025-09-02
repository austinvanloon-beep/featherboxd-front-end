import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

import { FaHome, FaFeather, FaPlus, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaSearchLocation, FaSearch, FaInfoCircle } from 'react-icons/fa';

import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.svg';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.container}>
      {/* Left navigation */}
      <ul className={styles.navLeft}>
        <li>
          <Link to='/'>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <FaInfoCircle /> About
          </Link>
        </li>
        {user && (
          <>
            <li>
              <Link to='/sightings'>
                <FaFeather /> Sightings
              </Link>
            </li>
            <li>
              <Link to='/sightings/new'>
                <FaPlus /> Create New
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Center logo */}
      <Link to='/' className={styles.logoGroup}>
        <img src={Logo} alt='Featherboxd Logo' />
        <span className={styles.brandName}></span>
      </Link>

      {/* Right navigation */}
      <ul className={styles.navRight}>
        {user ? (
          <>
            <li>
              <Link to='/location-search'>
                <FaSearchLocation /> External Sightings
              </Link>
            </li>
            <li>
              <Link to='/species-search'>
                <FaSearch /> Species Search
              </Link>
            </li>
            <li>
              <Link to='/' onClick={handleSignOut}>
                <FaSignOutAlt /> Sign Out
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/sign-in'>
                <FaSignInAlt /> Sign In
              </Link>
            </li>
            <li>
              <Link to='/sign-up'>
                <FaUserPlus /> Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;



