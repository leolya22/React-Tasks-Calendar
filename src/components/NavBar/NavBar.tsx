import { FC } from "react";
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import { RouteNames } from "../../router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AuthActionCreators } from "../../store/reducers/auth/action-creators";
import { useDispatch } from "react-redux";

const NavBar: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => dispatch(AuthActionCreators.logout());

    return ( 
        isAuth ? 
        <>
            <p className={styles.user}>Leo Lyapunov</p>
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