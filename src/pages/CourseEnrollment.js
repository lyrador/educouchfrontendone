import * as React from 'react';
import { useState } from 'react';
import { Grid, Box, Stepper, Step, StepLabel, Button, Divider, Card, CardContent, CardActions,
      Chip, Stack } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimNelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';

const steps = ['Select class run schedule', 'Enrollment guidelines', 'Payment', 'Payment Summary'];

export default function CourseEnrollment() {

    var courseId = useParams();
    courseId = courseId.courseId;

    // stepper
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep == 0) {
            if (classRunIdChosen === -1) {
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
    const [classRunIdChosen, setClassRunIdChosen] = useState(-1);

    React.useEffect(() => {
        var url = "http://localhost:8080/course/getClassRunByCourseId/" + courseId;
        fetch(url).
            then(res => res.json())
            .then((result) => {
                setListOfClassRun(result);
            }
            )
    }, []);

    const chooseClassRun = (num) => {
        setClassRunIdChosen(num);
    };



    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h4">Course Enrollment</Typography>
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
                                Select a class run that fits your schedule!
                            </Typography>
                            <br />
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Class Run Chosen: <Chip label={classRunIdChosen} variant="outlined" />
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
                                                        <Typography variant="h7" component="div">
                                                            Start: {classRun.classRunStart}
                                                        </Typography>
                                                        <Typography variant="h7" component="div">
                                                            End: {classRun.classRunEnd}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button size="small" onClick={() => chooseClassRun(classRun.classRunId)}>Choose</Button>
                                                    </CardActions>
                                                </Card>
                                            ))
                                    }
                                </Stack>

                                <br />

                            </Box>
                            <br />
                            <br />
                            <Button onClick={handleNext} variant="contained">
                                Next
                            </Button>
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
                                        <TimelineOppositeContent
                                            sx={{ m: 'auto 0' }}
                                            align="right"
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            9:30 am
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot>
                                                <FastfoodIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                Eat
                                            </Typography>
                                            <Typography>Because you need strength</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineOppositeContent
                                            sx={{ m: 'auto 0' }}
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            10:00 am
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot color="primary">
                                                <LaptopMacIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                Code
                                            </Typography>
                                            <Typography>Because it&apos;s awesome!</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineConnector />
                                            <TimelineDot color="primary" variant="outlined">
                                                <HotelIcon />
                                            </TimelineDot>
                                            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                Sleep
                                            </Typography>
                                            <Typography>Because you need rest</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                            <TimelineDot color="secondary">
                                                <RepeatIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                                            <Typography variant="h6" component="span">
                                                Repeat
                                            </Typography>
                                            <Typography>Because this is the life you love!</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            </div>
                            <Button onClick={handleNext} variant="contained">
                                Next
                            </Button>
                        </React.Fragment>
                    )}
                </Grid>
            </Grid>
        </>

    );
}