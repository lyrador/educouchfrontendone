import * as React from 'react';
import { useState } from 'react';
import {
    Grid, Box, Stepper, Step, StepLabel, Button, Divider, Card, CardContent, CardActions,
    Chip, Stack, Paper, Dialog, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from '@mui/material/Typography';
import BookIcon from '@mui/icons-material/Book';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import SuccessEnrolment from './SuccessEnrolment';
import { useAuth } from '../context/AuthProvider';
import LearnerCoursesDrawer from './LearnerCourseDrawer';


const steps = ['Course Enrolment Status', 'Payment', 'Completed'];

const publicKey = "pk_test_51LnPrnBx7BYbBg97eaxGtJNPIBG88wK36CGBCzldo5RmE5w3F9G7JKI7sOLafQB6yBdgfVsz6VHUpx5ja4LeVhp700UuLU3SOn";
const stripePromise = loadStripe(publicKey);

//days of week
var weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

export default function CourseFeePayment({ courseId, classRunRegistered }) {
    // user
    const auth = useAuth();
    const user = auth.user;
    // stepper
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };



    // course details
    const [currentCourse, setCurrentCourse] = useState('');

    React.useEffect(() => {
        fetch("http://localhost:8080/course/courses/" + courseId).
            then(res => res.json()).then((result) => {
                setCurrentCourse(result);
            }
            )
    }, {});


    // checkout
    const [amountToBePaid, setAmountToBePaid] = useState(0);
    const [clientSecret, setClientSecret] = useState('');
    const checkout = () => {
        setAmountToBePaid(currentCourse.courseFee * 0.90);
        if (amountToBePaid != 0) {
            var url = "http://localhost:8080/payment/checkout?amount=" + amountToBePaid;
            console.log('Url is ' + url);
            fetch(url).
                then(res => res.json()).then((result) => {
                    setClientSecret(result.clientSecret);
                }
                );


            openPaymentDialogBox();
        } else {
            alert("An error has occured! Please try again!");
        }

    };


    // opening up dialog box
    // rename dialog box
    const [paymentDialogBox, setPaymentDialogBox] = useState(false);

    const openPaymentDialogBox = () => {
        setPaymentDialogBox(true);
    };

    const closePaymentDialogBox = () => {
        setPaymentDialogBox(false);
    };

    // sending over record payment
    const requestFullCourseFeeTransactionRecord = () => {
        // send request to create payment record
        const courseFeeRecord = { "classRunId": classRunRegistered.classRunId, "learnerId": user.userId, "amount": amountToBePaid  };
        console.log('courseFeeRecord ' + JSON.stringify(courseFeeRecord));
        var url = "http://localhost:8080/payment/trackRemainingCourseFee";
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(courseFeeRecord)

        });
    }


    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCoursesDrawer courseId={courseId}></LearnerCoursesDrawer>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4">Course Fee Payment</Typography>
                    <Divider></Divider>
                    <br />
                    <br />
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 && (
                        <React.Fragment>
                            <br />
                            <br />
                            <Typography>
                                Please read the enrollment guideline below.
                            </Typography>
                            <br />
                            <br />
                            <div class="enrollment-guideline">
                                <Timeline position="alternate">
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot color="grey">
                                                <BookIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                Reserve your spot
                                            </Typography>
                                            <Typography>Indicate your interest by paying course deposit.</Typography>
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
                                            Now
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot color="secondary">
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
                            <br />
                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <Button onClick={handleBack} variant="contained">
                                    Back
                                </Button>
                                <Button onClick={handleNext} variant="contained">
                                    Next
                                </Button>


                            </Stack>
                        </React.Fragment>
                    )}
                    {activeStep === 1 && (
                        <React.Fragment>
                            <br />
                            <br />
                            <Typography variant="h5">
                                Course summary
                            </Typography>
                            <br />
                            <br />

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Course Code
                                            </TableCell>
                                            <TableCell align="right">{currentCourse.courseCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Course Title
                                            </TableCell>
                                            <TableCell align="right">{currentCourse.courseTitle}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Course Description
                                            </TableCell>
                                            <TableCell align="right">{currentCourse.courseDescription}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Course Timeline
                                            </TableCell>
                                            <TableCell align="right">{currentCourse.courseTimeline}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br />
                            <br />
                            <Typography variant="h5">
                                Class Run Summary
                            </Typography>
                            <br />
                            <br />

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Date
                                            </TableCell>
                                            <TableCell align="right">{classRunRegistered.classRunStart} - {classRunRegistered.classRunEnd}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Time
                                            </TableCell>
                                            <TableCell align="right">{classRunRegistered.classRunStartTime} - {classRunRegistered.classRunEndTime}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Days of week
                                            </TableCell>
                                            <TableCell align="right">  {classRunRegistered.classRunDaysOfTheWeek.map(x => { return (<p>{weekday[x]}</p>) })}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br />
                            <br />
                            <Typography variant="h5">
                                Payment
                            </Typography>
                            <br />
                            <br />

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Remaining Course Fee
                                            </TableCell>
                                            <TableCell align="right">SGD {currentCourse.courseFee * 0.90}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Deposit Paid Before
                                            </TableCell>
                                            <TableCell align="right">SGD {currentCourse.courseFee * 0.10}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <br />
                            <br />
                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <Button onClick={handleBack} variant="contained">
                                    Back
                                </Button>
                                <Button onClick={checkout} variant="contained" startIcon={<ShoppingCartIcon />}>
                                    Checkout
                                </Button>




                            </Stack>


                        </React.Fragment>
                    )}
                    {activeStep === 2 && (
                        <React.Fragment>

                            <SuccessEnrolment courseName={currentCourse.courseName}></SuccessEnrolment>

                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
            <br />
            <br />
            <Dialog open={paymentDialogBox} onClose={closePaymentDialogBox} fullWidth="lg">
                <DialogContent>
                    <DialogTitle>
                        Card Payment
                    </DialogTitle>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm clientSecret={clientSecret} closePaymentDialogBox={closePaymentDialogBox} handleNext={handleNext} requestTransactionRecord = {requestFullCourseFeeTransactionRecord}/>
                    </Elements>
                </DialogContent>
            </Dialog>
        </>

    );
}