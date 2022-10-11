import * as React from 'react';
import { useState } from 'react';
import {
    Grid, Box, Stepper, Step, StepLabel, Button, Divider, Card, CardContent, CardActions,
    Chip, Stack, Paper, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions,
    Snackbar, Alert
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LearnerCourseDrawer from './LearnerCourseDrawer';
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
import { useNavigate } from 'react-router-dom';


const steps = ['Select class run schedule', 'Enrollment guidelines', 'Payment', 'Completed'];

const publicKey = "pk_test_51LnPrnBx7BYbBg97eaxGtJNPIBG88wK36CGBCzldo5RmE5w3F9G7JKI7sOLafQB6yBdgfVsz6VHUpx5ja4LeVhp700UuLU3SOn";
const stripePromise = loadStripe(publicKey);

//days of week
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export default function ClassRunReschedule({ courseId, oldClassRunId}) {
    // user
    const auth = useAuth();
    const user = auth.user;
    // stepper
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep == 0) {
            if (classRunChosen === '') {
                alert('Please choose one of the class run!');
                return;
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    // list of class runs
    const [listOfClassRun, setListOfClassRun] = useState([]);
    const [classRunChosen, setClassRunChosen] = useState('');

    React.useEffect(() => {
        var url = "http://localhost:8080/classRun/getAvailableClassRuns/" + courseId;
        fetch(url).
            then(res => res.json())
            .then((result) => {
                setListOfClassRun(result);
            }
            )
    }, []);

    const chooseClassRun = (num) => {
        setClassRunChosen(num);
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
    const checkout = (num_to_pay) => {
        
        if (num_to_pay != 0) {
            setAmountToBePaid(num_to_pay);
            var url = "http://localhost:8080/payment/checkout?amount=" + num_to_pay;
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
    const [paymentDialogBox, setPaymentDialogBox] = useState(false);

    const openPaymentDialogBox = () => {
        setPaymentDialogBox(true);
    };

    const closePaymentDialogBox = () => {
        setPaymentDialogBox(false);
    };

    // sending over record payment
    const rescheduleAndPayRemainingCourseFee = () => {
        // send request to create payment record
        const paymentRecord = { "currClassRunId": oldClassRunId, "newClassRunId": classRunChosen.classRunId, "learnerId": user.userId, "amount": amountToBePaid };
        console.log('Deposit record is ' + JSON.stringify(paymentRecord));
        var url = "http://localhost:8080/payment/changeClassRunAndPayCourseFee";
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentRecord)

        }).
            then(res => res.json())
            .then((result) => {
                setListOfClassRun(result);
            }
            )
    }

    // opening refund dialog box
    const [refundDialogBox, setRefundDialogBox] = useState(false);

    const openRefundDialogBox = () => {
        setRefundDialogBox(true);
    };

    const closeRefundDialogBox = () => {
        setRefundDialogBox(false);
    };

    // navigate to course refund success page
    const navigate = useNavigate();
    const navigateRefundSuccessPage = () => {
        navigate(`/learnerCourseDetails/${courseId}/successRefundRequest`);

    };

    const filingRefund = () => {
        // send request to create payment record
        var refundAmount = currentCourse.courseFee * 0.90;
        console.log('Amount is ' + refundAmount);
        const paymentRecord = { "learnerId": user.userId, "classRunId": oldClassRunId, "amount": currentCourse.courseFee * 0.90 };
        var url = "http://localhost:8080/payment/refundDepositRequest";
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentRecord)

        })
        .then(() => {
            closeRefundDialogBox();
            navigateRefundSuccessPage();
        }
            )
            // .catch((err) => {
            //     setIsError(true);
            //     setMessage(err);
            //     handleOpenNotification();
            //     setIsError(true);
            // });
        
        
    };

    // notification
    const [message, setMessage] = useState('');
    const [openNotification, setOpenNotification] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleOpenNotification = () => {
        setOpenNotification(true);
    };

    const handleCloseNotification = () => {
        setOpenNotification(false);
    }


    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCourseDrawer courseId={courseId} learnerStatus = {false}></LearnerCourseDrawer>
                </Grid>
                <Grid item xs={8}>
                    <Snackbar
                        open={openNotification && (!isError)}
                        autoHideDuration={5000}
                        onClose={handleCloseNotification}
                    >
                        <Alert
                            onClose={handleCloseNotification}
                            severity="success"
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={openNotification && isError}
                        autoHideDuration={5000}
                        onClose={handleCloseNotification}
                    >
                        <Alert
                            onClose={handleCloseNotification}
                            severity="error"
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                    <Typography variant="h4">Class Run Reschedule</Typography>
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
                                We are sorry to inform you that the class run you have chosen previously is unavailable. Please choose a new class run.
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Class Run Chosen: <Chip label={classRunChosen.classRunId} variant="outlined" />
                            </Typography>
                            <br />
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

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
                                                    <CardActions>
                                                        <Button size="small" onClick={() => chooseClassRun(classRun)}>Choose</Button>
                                                    </CardActions>
                                                </Card>
                                            ))
                                    }
                                </Stack>

                                <br />

                            </Box>
                            <br />
                            <br />
                            <Stack
                                direction="row"
                                spacing={2}
                            >
                                <Button onClick={openRefundDialogBox} variant="contained">
                                    Refund my deposit
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
                                            The step you just took
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot color="secondary">
                                                <WatchLaterIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                Your class run is unavailable.
                                            </Typography>
                                            <Typography>You need to choose another class run in order to be enrolled in the course. Otherwise, you can file for a refund.</Typography>
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
                                            <Typography>Make the full payment to confirm your enrolment now.</Typography>
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
                    {activeStep === 2 && (
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
                                            <TableCell align="right">{classRunChosen.classRunStart} - {classRunChosen.classRunEnd}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Time
                                            </TableCell>
                                            <TableCell align="right">{classRunChosen.classRunStartTime} - {classRunChosen.classRunEndTime}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                Days of week
                                            </TableCell>
                                            <TableCell align="right">  {classRunChosen.classRunDaysOfTheWeek.map(x => { return (<p>{weekday[x]}</p>) })}</TableCell>
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
                                                Deposit Paid
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
                                <Button onClick={() => checkout(currentCourse.courseFee * 0.90)} variant="contained" startIcon={<ShoppingCartIcon />}>
                                    Checkout
                                </Button>




                            </Stack>


                        </React.Fragment>
                    )}
                    {activeStep === 3 && (
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
                        <CheckoutForm clientSecret={clientSecret} closePaymentDialogBox={closePaymentDialogBox} handleNext={handleNext} requestTransactionRecord={rescheduleAndPayRemainingCourseFee} />
                    </Elements>
                </DialogContent>
            </Dialog>
            <Dialog open={refundDialogBox} onClose={closeRefundDialogBox} fullWidth="lg">
                <DialogContent>
                    <DialogContentText>
                        Requesting for Deposit Refund
                    </DialogContentText>
                    <br />
                    <Divider></Divider>
                    <br />
                    <Typography>Are you sure you would like to do a refund? Once you do a refund, you can no longer enroll in this course.</Typography>

                </DialogContent>
                <DialogActions>
                    <Button onClick={filingRefund}>Refund</Button>
                    <Button onClick={closeRefundDialogBox}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>

    );
}