import * as React from 'react';
import { useState } from 'react';
import CourseEnrollment from '../components/CourseEnrollment';
import { loadStripe } from '@stripe/stripe-js';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Card, Button, Box } from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import BookIcon from '@mui/icons-material/Book';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CourseFeePayment from '../components/CourseFeePayment';
import EnrolledStatus from '../components/EnrolledStatus';
import RefundOnTheWay from '../components/RefundOnTheWay';
import ClassRunReschedule from '../components/ClassRunReschedule';


export default function CourseEnrollmentPage() {
    var courseId = useParams();
    courseId = courseId.courseId;

    const auth = useAuth();
    const user = auth.user;

    // Fetching course status
    const [courseLearnerStatus, setCourseLearnerStatus] = useState("");
    const [statusIsLoading, setStatusIsLoading] = useState(true);
    const [refreshPage, setRefreshPage] = useState('');
    function handleStatusChange(status) {
        setCourseLearnerStatus(status);
    };
    const [classRunRegistered, setClassRunRegistered] = useState();


    React.useEffect(() => {
        setRefreshPage(false);
        var url = "http://localhost:8080/course/enquiryCourseStatus?learnerId=" + user.userId + "&courseId=" + courseId;
        console.log('Url is ' + url);

        fetch(url)
            .then(res => res.json())
            .then((result) => {
                console.log('Result is ' + JSON.stringify(result));
                handleStatusChange(result.status);
                if(result.status != "NOTENROLLED") {
                    setClassRunRegistered(result.classRun);
                }
                console.log('Course learner status is ' + courseLearnerStatus);
            })
            .finally(() => {
                setStatusIsLoading(false);
            });
    }, [refreshPage]);

    // navigate to course details page
    const navigate = useNavigate();
    const navigateCourseDetails = () => {
        navigate(`/learnerCourseDetails/${courseId}`);

    };

    if (courseLearnerStatus === "NOTENROLLED") {
        return <CourseEnrollment courseId={courseId} ></CourseEnrollment>;
    } else if (courseLearnerStatus === "DEPOSITPAID") {
        return (
            <>
                <Box sx={{ paddingLeft: 8 }}><Typography variant="h5">Your Course Enrolment Status</Typography></Box>
                
                <br />
                <divider></divider>
                <br />
                <center>
                    <Card sx={{ minWidth: 275, maxWidth: '80%' }}>

                        <div class="timeline">
                            <Timeline position="alternate">
                                <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        align="right"
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        You are here!
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="secondary">
                                            <BookIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Class slot reserved.
                                        </Typography>
                                        <Typography>We have received your deposit. We'll get back to you 7 days before the course start to confirm your slot.</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        7 days before the start start of course start date
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="grey">
                                            <WatchLaterIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Class run availability.
                                        </Typography>
                                        <Typography>If the class run you have chosen is unavailable, we will prompt you to choose another class run. If you can't make it for other class run, we will return the deposit you have paid.</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent
                                        sx={{ m: 'auto 0' }}
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Within 7 Days before the start of the course
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="grey">
                                            <ShoppingCartIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Confirm your enrolment.
                                        </Typography>
                                        <Typography>Make the full payment to confirm your enrolment. Otherwise, your spot will be forfeited and you are not entitled to any refund.</Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineConnector />
                                        <TimelineDot color="grey">
                                            <TaskAltIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                                        <Typography variant="h6" component="span">
                                            Successful enrolment
                                        </Typography>
                                        <Typography>Congratulation 🎓! You are officially enrolled in the course. You will be able to browse through the course materials.</Typography>
                                    </TimelineContent>
                                </TimelineItem>

                            </Timeline>
                        </div>
                    </Card>
                    <br />
                    <br />
                    <Button variant="contained" onClick={navigateCourseDetails}>View course details</Button>

                </center>





            </>
        );
    } else if (courseLearnerStatus === "RESERVED") {
        return(<CourseFeePayment courseId={courseId} classRunRegistered = {classRunRegistered} ></CourseFeePayment>);
    } else if (courseLearnerStatus === "ENROLLED") {
        return(<EnrolledStatus courseId = {courseId}></EnrolledStatus>);
    } else if (courseLearnerStatus === "DROPPED") {
        return(<ClassRunReschedule courseId = {courseId} oldClassRunId = {classRunRegistered.classRunId} ></ClassRunReschedule>);
    } else if (courseLearnerStatus === "REFUNDREQUEST") {
        return(<RefundOnTheWay courseId = {courseId}></RefundOnTheWay>);
    }
}