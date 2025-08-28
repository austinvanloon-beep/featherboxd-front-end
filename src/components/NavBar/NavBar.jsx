import styles from './NavBar.module.css';
import Logo from '../../assets/images/logo.svg';

import { useContext } from 'react';
import { Link } from 'react-router';

import { UserContext } from '../../contexts/UserContext';

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
        <li><Link to='/'>Home</Link></li>
        {user && (
          <>
            <li><Link to='/sightings'>Sightings</Link></li>
            <li><Link to='/sightings/new'>Create New</Link></li>
          </>
        )}
      </ul>

      {/* Center logo and FeatherBOXD text */}
      <Link to='/' className={styles.logoGroup}>
        <img src={Logo} alt='Featherboxd Logo' />
        <span className={styles.brandName}></span>
      </Link>

      {/* Right navigation */}
      <ul className={styles.navRight}>
        {user ? (
          <>
            <li><Link to='/location-search'>By Region</Link></li>
            <li><Link to='/species-search'>By Species</Link></li>
            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to='/sign-in'>Sign In</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;



