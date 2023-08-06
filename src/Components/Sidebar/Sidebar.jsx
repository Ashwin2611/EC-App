import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useSelector } from "react-redux";

function Sidebar() {
  const location = useLocation();
  const user = useSelector((state) => state.user.value);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Link
          to="/home"
          className={`${styles.link} ${
            location.pathname === "/home" ? styles.active : " "
          } `}
        >
          Home
        </Link>
        {!user.admin ? (
          <Link
            to="/blood-donor"
            className={`${styles.link} ${
              location.pathname === "/blood-donor" ? styles.active : " "
            }`}
          >
            Blood Donor
          </Link>
        ) : (
          " "
        )}
        <Link
          to="/userprofile"
          className={`${styles.link} ${
            location.pathname === "/userprofile"
              ? styles.active
              : `${
                  location.pathname === "/clubregistration"
                    ? styles.active
                    : " "
                }`
          }`}
        >
          User Profile
        </Link>
        {user.adminInClubCount ? (
          <Link
            to="/memberRequest"
            className={`${styles.link} ${
              location.pathname === "/memberRequest" ? styles.active : " "
            }`}
          >
            Member Request
          </Link>
        ) : (
          ""
        )}
        {user.adminInClubCount ? (
          <Link
            to="/newPost"
            className={`${styles.link} ${
              location.pathname === "/newPost"
                ? styles.active
                : `${
                    location.pathname === "/textPost"
                      ? styles.active
                      : `${
                          location.pathname === "/imagePost"
                            ? styles.active
                            : " "
                        }`
                  }`
            }`}
          >
            New Post
          </Link>
        ) : (
          ""
        )}
        {user.adminInClubCount ? (
          <Link
            to="/committee"
            className={`${styles.link} ${
              location.pathname === "/committee" ? styles.active : " "
            }`}
          >
            Committee
          </Link>
        ) : (
          ""
        )}
        {user.admin ? (
          <Link
            to="/mainadmin"
            className={`${styles.link} ${
              location.pathname === "/mainadmin" ? styles.active : " "
            }`}
          >
            Select Club Admin
          </Link>
        ) : (
          ""
        )}
        <Link
          to="/dummy"
          className={`${styles.link} ${
            location.pathname === "/dummy" ? styles.active : " "
          } `}
        >
          dummy
        </Link>
        <Link to="/login" className={`${styles.link} ${styles.logout}`}>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
