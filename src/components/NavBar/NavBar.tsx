import { FC } from "react";
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import { RouteNames } from "../../router";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const NavBar: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth);
    return ( 
        isAuth ? 
        <>
            <p className={styles.user}>Leo Lyapunov</p>
            <nav className={styles.navBar}>
                <Link to={RouteNames.LOGIN} className={styles.navBarItem}>Logout</Link>
                <Link to={RouteNames.LOGIN} className={styles.navBarItem}>Logout</Link>
                <Link to={RouteNames.LOGIN} className={styles.navBarItem}>Logout</Link>
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