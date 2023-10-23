import { FC } from "react";
import styles from './Login.module.css'
import LoginForm from "../../components/LoginForm/LoginForm";

const Login: FC = () => {
    return ( 
        <main className={styles.login}>
            <LoginForm />
        </main>
    );
}

export default Login;