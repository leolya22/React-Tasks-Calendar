import { FC } from "react";
import { IEvent } from "../models/IEvent";
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import { formatDate } from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Dayjs) => {
        const formatedDate = formatDate(value.toDate());
        const currentDateEvents = props.events.filter(ev => ev.date === formatedDate);
        return (
            <div>
                {currentDateEvents.map((ev, index) => 
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    };

    return ( 
        <>
            <Calendar cellRender={dateCellRender}/>
        </>
    );
}

export default EventCalendar;