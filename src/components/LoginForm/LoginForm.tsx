import { FC, useState } from 'react';
import styles from './LoginForm.module.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from './types';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../../store/reducers/auth/action-creators';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const LoginForm: FC = () => {
    const dispatch = useDispatch();
    const {error} = useTypedSelector(state => state.auth);
    const [username, setUsername] = useState('');
    const [password, setPasword] = useState('');


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(AuthActionCreators.login(username, password));
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()
    
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {error && 
                <div className={styles.err}>{error}</div>
            }
            <div className={styles.input_div}>
                <input 
                    className={styles.form_input} 
                    placeholder='Username' 
                    {...register("username", { required: true })} 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                {errors.username && <span className={styles.error}>The username is required</span>}
            </div>
            <div className={styles.input_div}>
                <input 
                    className={styles.form_input} 
                    placeholder='Password' 
                    {...register("password", { required: true })} 
                    value={password}
                    onChange={e => setPasword(e.target.value)}
                    type='password'
                />
                {errors.password && <span className={styles.error}>The password is required</span>}
            </div>
            <input className={styles.form_button} type="submit" value='Login' />
        </form>
    );
}

export default LoginForm;