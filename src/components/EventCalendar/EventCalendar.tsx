import { FC, useState } from "react";
import { IEvent } from "../../models/IEvent";
import { Calendar, Modal } from 'antd';
import styles from './EventCalendar.module.css'
import EventForm from "../EventForm/EventForm";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return ( 
        <div className={styles.flex}>
            <button className={styles.button} onClick={() => setModalVisible(true)}>Add Event</button>
            <Calendar className={styles.calendar} />
            <Modal 
                title='Add Event'
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm />
            </Modal>
        </div>
    );
}

export default EventCalendar;