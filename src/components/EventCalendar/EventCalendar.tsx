import { FC, useState, useEffect } from "react";
import { IEvent } from "../../models/IEvent";
import { Calendar, Modal } from 'antd';
import styles from './EventCalendar.module.css'
import EventForm from "../EventForm/EventForm";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent} = useActions();
    const {guests, events} = useTypedSelector(state => state.event);

    useEffect(() => {
        fetchGuests();
    }, [])

    return ( 
        <div className={styles.flex}>
            <button className={styles.button} onClick={() => setModalVisible(true)}>Add Event</button>
            {JSON.stringify(events)}
            <Calendar className={styles.calendar} />
            <Modal 
                title='Add Event'
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm guests={guests} submit={event => createEvent(event)}/>
            </Modal>
        </div>
    );
}

export default EventCalendar;