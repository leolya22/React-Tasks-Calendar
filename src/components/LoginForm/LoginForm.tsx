import { FC } from 'react';
import styles from './LoginForm.module.css'
import { useForm, SubmitHandler } from 'react-hook-form';
import { Inputs } from './types';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../../store/reducers/auth/action-creators';

const LoginForm: FC = () => {
    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(AuthActionCreators.login('user', '123'));
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    return ( 
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.input_div}>
                <input 
                    className={styles.form_input} 
                    placeholder='Username' 
                    {...register("username", { required: true })} 
                />
                {errors.username && <span className={styles.error}>The username is required</span>}
            </div>
            <div className={styles.input_div}>
                <input className={styles.form_input} placeholder='Password' {...register("password", { required: true })} />
                {errors.password && <span className={styles.error}>The password is required</span>}
            </div>
            <input className={styles.form_button} type="submit" value='Login' />
        </form>
    );
}

export default LoginForm;