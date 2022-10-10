import { useState } from 'react';
import * as React from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import LearnerCoursesDrawer from '../components/LearnerCourseDrawer';
import { Grid, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, MonthView, DayView, Appointments, AppointmentTooltip, AppointmentForm, Toolbar, ViewSwitcher, DateNavigator, TodayButton, ConfirmationDialog, DragDropProvider, Resources } from '@devexpress/dx-react-scheduler-material-ui';


const LearnerCourseCalender = (props) => {

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

    //to get the classRuns of the instructor
    React.useEffect(() => {
        fetch("http://localhost:8080/classRun/getClassRunsFromInstructorId/" + user.userId)
            .then((res) => res.json())
            .then((result) => {
                setClassRuns(result)
            })
    }, []);

    const currentViewNameChange = (currentViewName) => {
        setCurrentViewName(currentViewName);
    }

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/event/courses/" + courseId + "/events").
            then(res => res.json()).then((result) => {
                setEvents(result);
            }
            )
    }, [refreshPage]);


    const allowDrag = ({ id }) => !(id == 0);

    console.log(events);

    const BooleanEditor = (props) => {
        return <AppointmentForm.BooleanEditor {...props} readOnly />;
    };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCoursesDrawer courseId={courseId}></LearnerCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
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
                        </Scheduler>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LearnerCourseCalender;




