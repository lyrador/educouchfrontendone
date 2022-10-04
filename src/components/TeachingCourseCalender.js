import { useState } from 'react';
import * as React from "react";
import  { ViewState } from '@devexpress/dx-react-scheduler';
import { EditingState } from '@devexpress/dx-react-scheduler';
import { IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentTooltip, AppointmentForm, Toolbar, DateNavigator, TodayButton, ConfirmationDialog, DragDropProvider} from '@devexpress/dx-react-scheduler-material-ui';



const TeachingCourseCalender = () => {

const [events, setEvents] = useState([])
const views = ['timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth'];
const currentDate = new Date();

const [editingAppointment, setEditingAppointment] = useState('');
const [addedAppointment, setAddedAppointment] = useState({})
const [appointmentChanges, setAppointmentChanges] = useState({})

const [refreshPage, setRefreshPage] = useState('')

const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment); 
}

const changeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges); 
}

const changeEditingAppointment = (editingAppointment) => {
     setEditingAppointment(editingAppointment); 
}

const allowDrag = ({id}) => !(id == 0); 

const commitChanges = ({added, changed, deleted}) => {
    
    if (changed) {

        var title = (appointmentChanges.title === undefined) ? editingAppointment.title : appointmentChanges.title
        var startDate = (appointmentChanges.startDate === undefined) ? editingAppointment.startDate : appointmentChanges.startDate
        var endDate = (appointmentChanges.endDate === undefined) ? editingAppointment.endDate : appointmentChanges.endDate
        var notes = (appointmentChanges.notes == undefined) ? editingAppointment.notes : appointmentChanges.notes
        var allDay = (appointmentChanges.allDay == undefined) ? editingAppointment.allDay : appointmentChanges.allDay
        var id = editingAppointment.id
        const appointment1 = {title, startDate, endDate, notes, allDay, id}; 
        editAppointment(appointment1)
    }

    if (added) {
        //const startingAddedId = events1.length > 0 ? events1[events1.length - 1].id + 1 : 0;
        //events1 = [...events1, { id: startingAddedId, ...added }];
        saveAppointment(addedAppointment)
    }

    if (deleted !== undefined) {
        
        deleteAppointment(editingAppointment); 
    }
}
  
React.useEffect(() => {
    setRefreshPage(false);
    fetch("http://localhost:8080/event/events").
        then(res => res.json()).then((result) => {
            setEvents(result);
        }
        )
}, [refreshPage])

const saveAppointment = (data) => {
    console.log(data)
    fetch("http://localhost:8080/event/events" , {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Event Created Successfully!")
            setRefreshPage(true)
        
        })
}

const editAppointment = (data) => {
    console.log(data)
    fetch("http://localhost:8080/event/events/" + data.id , {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Event Updated Successfully!")
            setRefreshPage(true)
        
        })
}

const deleteAppointment = (data) => {
    console.log(data)
    fetch("http://localhost:8080/event/events/" + data.id , {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            console.log("Event Deleted Successfully!")
            setRefreshPage(true)
        
        })
}

console.log(events); 
    return (
        <div id="calender">
            <Scheduler 
                timeZone="Asia/Singapore"
                data={events}
                views={views}
                defaultCurrentView="timelineDay"
                defaultCurrentDate={currentDate}
                firstDayOfWeek={0}
                >
                <ViewState />
                <WeekView 
                    startDayHour={8}
                    endDayHour={22}
                />
                <EditingState 
                    onCommitChanges={commitChanges}
                    addedAppointment = {addedAppointment}
                    onAddedAppointmentChange={changeAddedAppointment}
                    appointmentChanges={appointmentChanges}
                    onAppointmentChangesChange={changeAppointmentChanges}
                    editingAppointment = {editingAppointment}
                    onEditingAppointmentChange = {changeEditingAppointment}
                />
                <IntegratedEditing />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <ConfirmationDialog
                />
                <AppointmentTooltip
                    showOpenButton
                />
                <DragDropProvider
                    allowDrag = {allowDrag}
                />
                <AppointmentForm />
            </Scheduler>
        </div>
    ); 
}

export default TeachingCourseCalender; 




