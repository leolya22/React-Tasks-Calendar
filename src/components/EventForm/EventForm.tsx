import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './EventForm.module.css'
import { EventInputs } from './types';
import { DatePicker, Select } from 'antd';

const EventForm: FC = () => {
    const [description, setDescription] = useState('');

    const onSubmit: SubmitHandler<EventInputs> = () => {
        
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventInputs>()


    return ( 
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.input_div}>
                <input 
                    className={styles.form_input} 
                    placeholder='Event...' 
                    {...register("description", { required: true })} 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                {errors.description && <span className={styles.error}>The description is required</span>}
            </div>
            <DatePicker/>
            <Select>
                
            </Select>
            <input className={styles.form_button} type="submit" value='Add' />
        </form>
    );
}

export default EventForm;