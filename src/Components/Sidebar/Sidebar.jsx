import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
    const location=useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link to="/home" className={`${styles.link} ${location.pathname==='/home' ? styles.active : ' '} `}>Home</Link>
        <Link to="/blood-donor" className={`${styles.link} ${location.pathname==='/blood-donor' ? styles.active : ' '}`}>Blood Donor</Link>
        <Link to="/userprofile" className={`${styles.link} ${location.pathname==='/userprofile' ? styles.active : ' '}`}>User Profile</Link>
        <Link to="/memberRequest" className={`${styles.link} ${location.pathname==='/memberRequest' ? styles.active:' '}`}>Member Request</Link>
        <Link to="/newPost" className={`${styles.link} ${location.pathname==='/newPost' ? styles.active:' '}`}>New Post</Link>
        <Link to="/login" className={`${styles.link} ${styles.logout}`}>Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
