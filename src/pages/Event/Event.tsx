import { FC, useState, useEffect } from "react";
import EventCalendar from "../../components/EventCalendar";
import styles from './Event.module.css'
import EventForm from "../../components/EventForm/EventForm";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { IEvent } from "../../models/IEvent";
import { Modal } from "antd";

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const { guests, events } = useTypedSelector(state => state.event);
    const { username } = useTypedSelector(state => state.auth.user);

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        createEvent(event, username);
    }

    useEffect(() => {
        fetchGuests();
        fetchEvents(username);
    }, [])

    return ( 
        <div className={styles.calendar}>
            <button className={styles.button} onClick={() => setModalVisible(true)}>Add Event</button>
            <EventCalendar events={events}/>
            <Modal 
                title='Add Event'
                open={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </div>
    );
}

export default Event;