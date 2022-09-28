import { useState } from 'react';
import  { ViewState } from '@devexpress/dx-react-scheduler';
import { EditingState } from '@devexpress/dx-react-scheduler';
import { IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';



const TeachingCourseCalender = () => {
    return (
        <div id="calender">
            <Scheduler>
                <ViewState />
                <EditingState />
                <IntegratedEditing />
                <WeekView />
                <Appointments />
                <AppointmentForm />
            </Scheduler>
        </div>
    ); 
}

export default TeachingCourseCalender; 




