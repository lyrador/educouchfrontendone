import { useState } from 'react';
import * as React from "react";
import { useParams } from 'react-router-dom';
import LearnerCoursesDrawer from '../components/LearnerCourseDrawer';
import { Typography, Paper, Card, Button, Box, Grid, MenuItem, Chip, Stack, CardContent,
Divider  } from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

//days of week
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const ClassRunListPage = () => {

    const auth = useAuth();
    const user = auth.user;

    var courseId = useParams();
    courseId = courseId.courseId;

    const [listOfClassRun, setListOfClassRun] = useState([]);
    React.useEffect(() => {
        var url = "http://localhost:8080/course/getClassRunByCourseId/" + courseId;
        fetch(url).
            then(res => res.json())
            .then((result) => {
                setListOfClassRun(result);
            }
            )
    }, []);


    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCoursesDrawer courseId={courseId}></LearnerCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant = "h4">
                        List of class runs
                    </Typography>
                    <br />
                    <Divider/>
                    <br />
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        {listOfClassRun && listOfClassRun.length > 0 &&
                            listOfClassRun
                                .map((classRun) => (
                                    <Card sx={{ minWidth: 275 }}>

                                        <CardContent>
                                            <CalendarMonthIcon></CalendarMonthIcon>
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                Class Run Id: {classRun.classRunId}
                                            </Typography>
                                            <Divider></Divider>
                                            <br />
                                            <Typography variant="h6" component="div">
                                                {classRun.classRunDaysOfTheWeek.map(x => { return (<Typography variant="h6">{weekday[x]} </Typography>) })}
                                            </Typography>
                                            <br />
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {classRun.classRunStartTime} - {classRun.classRunEndTime}
                                            </Typography>
                                            <Typography variant="body2">
                                                Start Date: {classRun.classRunStart}
                                            </Typography>

                                            <Typography variant="body2">
                                                End Date: {classRun.classRunEnd}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))
                        }
                    </Stack>

                </Grid>
            </Grid>
        </div>
    );
}

export default ClassRunListPage;
