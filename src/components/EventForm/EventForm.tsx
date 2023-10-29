import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './EventForm.module.css'
import { EventInputs } from './types';
import { DatePicker, Select } from 'antd';
import { IUser } from '../../models/IUser';
import { IEvent } from '../../models/IEvent';
import { Moment } from 'moment';
import { Dayjs } from 'dayjs';
import { formatDate } from '../../utils/date';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const [err, setErr] = useState(false);
    const [errDate, setErrDate] = useState(false);
    const defaultEvent = {
        author: '',
        date: '',
        description: '',
        guest: ''
    }
    const [event, setEvent] = useState<IEvent>(defaultEvent as IEvent);
    const {username} = useTypedSelector(state => state.auth.user);

    const selectDate = (date: Moment | null | Dayjs) => {
        if(date) {
            if(formatDate( date?.toDate() ) < formatDate( new Date())) {
                setErrDate(true);
                setErr(false);
            } else {
                setErrDate(false);
            }   
            setEvent({...event, date: formatDate( date?.toDate() ) });
        } else setEvent({...event, date: '' });
    }

    const onSubmit: SubmitHandler<EventInputs> = () => {
        if(event.date !== '' && event.guest !== '' && !errDate) {
            props.submit({...event, author: username});
            setErr(false);
            
        } else if (errDate) {
            setErr(false);
        } else {
            setErr(true);
        }
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
                    value={event.description}
                    onChange={e => setEvent({...event, description: e.target.value})}
                />
                {errors.description && <span className={styles.error}>The description is required</span>}
            </div>
            <DatePicker onChange={date => selectDate(date)}/>
            {errDate && <div className={styles.err}>You can't add an event for a date in past</div>}
            <Select onChange={(guest: string) => setEvent({...event, guest})}>
                {props.guests.map(guest => 
                    <Select.Option key={guest.username} value={guest.username}>
                        {guest.username}
                    </Select.Option>)}
            </Select>
            {err && <div className={styles.err}>The date/guest are required</div>}
            <input className={styles.form_button} type="submit" value='Add' />
        </form>
    );
}

export default EventForm;