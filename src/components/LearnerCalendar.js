import { useState } from 'react';
import * as React from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import { Grid, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import { ViewState } from '@devexpress/dx-react-scheduler';
import { EditingState } from '@devexpress/dx-react-scheduler';
import { IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, MonthView, DayView, Appointments, AppointmentTooltip, AppointmentForm, Toolbar, ViewSwitcher, DateNavigator, TodayButton, ConfirmationDialog, DragDropProvider, Resources } from '@devexpress/dx-react-scheduler-material-ui';


const LearnerCalendar = (props) => {

    const auth = useAuth();
    const user = auth.user;

    const [events, setEvents] = useState([])
    const views = ['timelineDay', 'timelineWeek', 'timelineWorkWeek', 'timelineMonth'];
    const currentDate = new Date();
    const [editingAppointment, setEditingAppointment] = useState('');
    const [addedAppointment, setAddedAppointment] = useState({})
    const [appointmentChanges, setAppointmentChanges] = useState({})
    const [currentViewName, setCurrentViewName] = useState('work-week')
    const [classRuns, setClassRuns] = React.useState([]);

    const location = useLocation(props);
    const [refreshPage, setRefreshPage] = useState('')
    const courseId = location.pathname.split('/')[2];

    //to get the enrolled classRuns of the learner
    React.useEffect(() => {
        fetch("http://localhost:8080/classRun/getEnrolledClassRun/" + user.userId)
            .then((res) => res.json())
            .then((result) => {
                setClassRuns(result)
            })
    }, []);

    const [openError, setOpenError] = React.useState(false);

    const handleClickOpenError = () => {
        setOpenError(true);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const changeAddedAppointment = (addedAppointment) => {
        setAddedAppointment(addedAppointment);
    }

    const changeAppointmentChanges = (appointmentChanges) => {
        setAppointmentChanges(appointmentChanges);
    }

    const changeEditingAppointment = (editingAppointment) => {
        setEditingAppointment(editingAppointment);
    }

    const currentViewNameChange = (currentViewName) => {
        setCurrentViewName(currentViewName);
    }

    // function Select(props) {
    //     return <AppointmentForm.Select {...props} />;
    // }

    // function BasicLayout({ onFieldChange, appointmentData, ...restProps }) {
    //     const onCustomFieldChange = (nextValue) => {
    //         onFieldChange({ classRunId: nextValue });
    //     };

    //     console.log(appointmentData)

    //     return (
    //         <AppointmentForm.BasicLayout
    //             appointmentData={appointmentData}
    //             onFieldChange={onFieldChange}
    //             {...restProps}
    //         >
    //             <AppointmentForm.Label
    //                 text="Class Runs"
    //                 type="title"
    //             />
    //             <AppointmentForm.Select
    //                 value={appointmentData.classRunId}
    //                 onValueChange={onCustomFieldChange}
    //                 availableOptions={(classRuns.map(v => ({ id: v.classRunId, text: v.classRunId.toString() })))}
    //                 type='filledSelect'
    //                 placeholder="Choose Class Run"
    //             />
    //         </AppointmentForm.BasicLayout>
    //     );
    // };



    // const commitChanges = ({ added, changed, deleted }) => {
    //     console.log(added)
    //     console.log(changed)
    //     console.log(deleted)

    //     if (changed) {

    //         var title = (appointmentChanges.title === undefined) ? editingAppointment.title : appointmentChanges.title
    //         var startDate = (appointmentChanges.startDate === undefined) ? editingAppointment.startDate : appointmentChanges.startDate
    //         var endDate = (appointmentChanges.endDate === undefined) ? editingAppointment.endDate : appointmentChanges.endDate
    //         var notes = (appointmentChanges.notes == undefined) ? editingAppointment.notes : appointmentChanges.notes
    //         var allDay = (appointmentChanges.allDay == undefined) ? editingAppointment.allDay : appointmentChanges.allDay
    //         var classRunId = editingAppointment.classRunId
    //         var id = editingAppointment.id
    //         const appointment1 = { title, startDate, endDate, notes, allDay, id, classRunId };
    //         editAppointment(appointment1)
    //     }

    //     if (added) {
    //         saveAppointment(addedAppointment)
    //     }

    //     if (deleted !== undefined) {

    //         deleteAppointment(editingAppointment);
    //     }
    // }

    //To get all events of the instructor for My Calendar (Learner)
    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/event/learner/" + user.userId + "/events").
            then(res => res.json()).then((result) => {
                setEvents(result);
            }
            )
    }, [refreshPage])

    // //To get all events of the course for course calendar
    // React.useEffect(() => {
    //     setRefreshPage(false);
    //     fetch("http://localhost:8080/event/courses/" + courseId + "/events").
    //         then(res => res.json()).then((result) => {
    //             setEvents(result);
    //         }
    //         )
    // }, [refreshPage])

    // //to just get all events (i just use this for testing the functionality)
    // React.useEffect(() => {
    //     setRefreshPage(false);
    //     fetch("http://localhost:8080/event/events").
    //         then(res => res.json()).then((result) => {
    //             setEvents(result);
    //         }
    //         )
    // }, [refreshPage])



    // const saveAppointment = (data) => {
    //     console.log(data)
    //     if (data.startDate && data.endDate && data.notes && data.title && data.classRun) {
    //         fetch("http://localhost:8080/event/classRun/" + data.classRunMainId + "/events", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data)
    //         }).then(() => {
    //             console.log("Event Created Successfully!")
    //             setRefreshPage(true)

    //         })
    //     } else {
    //         handleClickOpenError()
    //     }
    // }

    // const editAppointment = (data) => {
    //     console.log(data)
    //     if (data.startDate && data.endDate && data.notes && data.title && data.classRun) {
    //         fetch("http://localhost:8080/event/events/" + data.id, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(data)
    //         }).then(() => {
    //             console.log("Event Updated Successfully!")
    //             setRefreshPage(true)

    //         })
    //     } else {
    //         handleClickOpenError()
    //     }
    // }

    // const deleteAppointment = (data) => {
    //     console.log(data)
    //     fetch("http://localhost:8080/event/events/" + data.id, {
    //         method: "DELETE",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data)
    //     }).then(() => {
    //         console.log("Event Deleted Successfully!")
    //         setRefreshPage(true)

    //     })
    // }

    // console.log(classRuns)

    // const allowDrag = ({ id }) => !(id == 0);

    // console.log(events);

    // const BooleanEditor = (props) => {
    //     return <AppointmentForm.BooleanEditor {...props} readOnly />;
    // };

    return (
        <div>
            <Grid container spacing={0}>

                <Grid item >
                    <div id="calender">
                        <Scheduler
                            timeZone="Asia/Singapore"
                            data={events}
                            views={views}
                            defaultCurrentView="timelineDay"
                            defaultCurrentDate={currentDate}
                            firstDayOfWeek={0}
                        >
                            <ViewState
                                defaultCurrentDate={currentDate}
                                currentViewName={currentViewName}
                                onCurrentViewNameChange={currentViewNameChange}
                            />
                            <WeekView
                                startDayHour={8}
                                endDayHour={22}
                            />
                            <WeekView
                                name="work-week"
                                displayName="Work Week"
                                excludedDays={[0, 6]}
                                startDayHour={9}
                                endDayHour={19}
                            />
                            <MonthView />
                            <DayView />
                            {/* <div>
                                {((user.userType === "ORG_ADMIN") || (user.userType === "INSTRUCTOR")) && (
                                    <EditingState
                                        onCommitChanges={commitChanges}
                                        addedAppointment={addedAppointment}
                                        onAddedAppointmentChange={changeAddedAppointment}
                                        appointmentChanges={appointmentChanges}
                                        onAppointmentChangesChange={changeAppointmentChanges}
                                        editingAppointment={editingAppointment}
                                        onEditingAppointmentChange={changeEditingAppointment}
                                    />
                                )}

                            </div> */}
                            {/* <IntegratedEditing /> */}

                            <Appointments />

                            <Resources
                                data={[
                                    {
                                        fieldName: "classRunMainId",
                                        title: "Class Runs",
                                        instances: classRuns
                                    }
                                ]}
                                mainResourceName="classRuns"
                            />

                            <Toolbar />
                            <ViewSwitcher />
                            <DateNavigator />
                            {/* <ConfirmationDialog /> */}

                            <TodayButton />

                            {/* <AppointmentTooltip showOpenButton /> */}
                            {/* <DragDropProvider 
                            allowDrag={allowDrag} 
                            />
                            <AppointmentForm
                                booleanEditorComponent={BooleanEditor}
                            basicLayoutComponent={BasicLayout}
                            selectComponent={Select}
                            /> */}
                        </Scheduler>
                    </div>
                </Grid>
            </Grid>
            {/* <div>
                <Dialog open={openError} onClose={handleCloseError}>
                    <DialogTitle>Incomplete Fields/ Invalid Date</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill all the fields and include a valid start and end date.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseError}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div> */}
        </div>
    );
}

export default LearnerCalendar;




