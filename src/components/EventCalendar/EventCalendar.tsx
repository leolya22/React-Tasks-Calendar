import { FC } from "react";
import { IEvent } from "../../models/IEvent";
import { Calendar } from 'antd';
import styles from './EventCalendar.module.css'

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = () => {
    return ( 
        <div className={styles.flex}>
            <button className={styles.button}>Add Event</button>
            <Calendar className={styles.calendar} />
        </div>
    );
}

export default EventCalendar;