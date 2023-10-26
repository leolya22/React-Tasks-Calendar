import { FC } from "react";
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import { RouteNames } from "../../router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const NavBar: FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.auth);
    const {logout} = useActions();

    return ( 
        isAuth ? 
        <>
            <p className={styles.user}>{user.username}</p>
            <nav className={styles.navBar}>
                <Link to={RouteNames.LOGIN} onClick={logout} className={styles.navBarItem}>Logout</Link>
                <Link to={RouteNames.LOGIN} onClick={logout} className={styles.navBarItem}>Logout</Link>
                <Link to={RouteNames.LOGIN} onClick={logout} className={styles.navBarItem}>Logout</Link>
            </nav>
        </>
        :
            <nav className={styles.navBar}>
                <Link to={RouteNames.LOGIN} className={styles.navBarItem}>Login</Link>
                <Link to={RouteNames.LOGIN} className={styles.navBarItem}>Login</Link>
                <Link to={RouteNames.LOGIN} className={styles.navBarItem}>Login</Link>
            </nav>
    );
}

export default NavBar;