import { useState } from 'react';
import * as React from "react";
import  { ViewState } from '@devexpress/dx-react-scheduler';
import { EditingState } from '@devexpress/dx-react-scheduler';
import { IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';



const TeachingCourseCalender = () => {

const [events, setEvents] = useState([])

React.useEffect(() => {
    fetch("http://localhost:8080/event/events").
        then(res => res.json()).then((result) => {
            setEvents(result);
        }
        )
}, [])

const saveAppointment = (data) => {
    console.log(data)
}

console.log(events); 
    return (
        <div id="calender">
            <Scheduler data={events}>
                <ViewState />
                <EditingState onCommitChanges={saveAppointment}/>
                <IntegratedEditing />
                <WeekView />
                <Appointments />
                <AppointmentForm />
            </Scheduler>
        </div>
    ); 
}

export default TeachingCourseCalender; 




