import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
    Container, Paper, Button, MenuItem, Stack,
    InputLabel, OutlinedInput, InputAdornment
} from '@mui/material';
import { useAuth } from "../context/AuthProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TeachingCourseCreate() {

    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const [refreshPage, setRefreshPage] = useState('')

    const handleClickSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };






    const auth = useAuth();
    const user = auth.user;

    const paperStyle = {
        padding: '50px 20px',
        width: 600,
        margin: "20px auto",
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1'
    }

    const ageGroups = [
        {
            value: 'Adults',
        },
        {
            value: 'Kids',
        },
    ];

    const [courseCode, setCourseCode] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseTimeline, setCourseTimeline] = useState('')
    const [courseMaxScore, setCourseMaxScore] = useState('')
    const [ageGroup, setAgeGroup] = useState('')
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [courseFee, setCourseFee] = useState(0);
    const [courseCodeError, setCourseCodeError] = useState({ value: false, errorMessage: '' })
    const [courseTitleError, setCourseTitleError] = useState({ value: false, errorMessage: '' })
    const [courseDescriptionError, setCourseDescriptionError] = useState({ value: false, errorMessage: '' })
    const [courseTimelineError, setCourseTimelineError] = useState({ value: false, errorMessage: '' })
    const [courseMaxScoreError, setCourseMaxScoreError] = useState({ value: false, errorMessage: '' })
    const [ageGroupError, setAgeGroupError] = useState({ value: false, errorMessage: '' })
    const [startDateError, setStartDateError] = useState({ value: false, errorMessage: '' });
    const [endDateError, setEndDateError] = useState({ value: false, errorMessage: '' });
    const [courseFeeError, setCourseFeeError] = useState({ value: false, errorMessage: '' });

    const handleStartDateChange = (newStartDate) => {
        var result = newStartDate.add(8, 'hours');
        setStartDate(result);
    };

    const handleEndDateChange = (newEndDate) => {
        var result = newEndDate.add(8, 'hours');
        setEndDate(result);
    };

    const [instructor, setInstructor] = React.useState('');

    React.useEffect(() => {
        setRefreshPage(false)
        fetch("http://localhost:8080/educator/findInstructor?instructorUsername=" + user.username)
            .then((res) => res.json())
            .then((result) => {
                setInstructor(result)
                console.log(instructor)
            })
    }, [refreshPage]);


    const handleChange1 = (event) => {
        setAgeGroup(event.target.value);
    };


    const handleClick = (e) => {
        e.preventDefault()
        const course = { courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup, startDate, endDate, courseFee }
        setCourseCodeError({ value: false, errorMessage: '' })
        setCourseTitleError({ value: false, errorMessage: '' })
        setCourseDescriptionError({ value: false, errorMessage: '' })
        setCourseTimelineError({ value: false, errorMessage: '' })
        setCourseMaxScoreError({ value: false, errorMessage: '' })
        setAgeGroupError({ value: false, errorMessage: '' });
        setStartDateError({ value: false, errorMessage: '' });
        setEndDateError({ value: false, errorMessage: '' });
        setCourseFeeError({ value: false, errorMessage: '' })

        if (courseCode == '') {
            setCourseCodeError({ value: true, errorMessage: 'You must enter a course code' })
        }
        if (courseTitle == '') {
            setCourseTitleError({ value: true, errorMessage: 'You must enter a course title' })
        }
        if (courseDescription == '') {
            setCourseDescriptionError({ value: true, errorMessage: 'You must enter a course description' })
        }
        if (courseTimeline == '') {
            setCourseTimelineError({ value: true, errorMessage: 'You must enter a course timeline' })
        }
        if (courseMaxScore == '') {
            setCourseMaxScoreError({ value: true, errorMessage: 'You must enter a course max score' })
        }
        if (ageGroup == '') {
            setAgeGroupError({ value: true, errorMessage: 'You must select a course age group' })
        }
        if (startDate == '') {
            setStartDateError({ value: true, errorMessage: 'You must choose a start date.' });
        }
        if (endDate == '') {
            setEndDateError({ value: true, errorMessage: 'You must choose an end date.' });
        }
        if (courseFee === 0) {
            setCourseFeeError({ value: true, errorMessage: 'Course fee must be more than 0' });
        }

        const newStartDate = startDate;
        const newEndDate = endDate;
        const dateComparisonBoolean = newEndDate < newStartDate;

        if (dateComparisonBoolean) {
            setEndDateError({
                value: true,
                errorMessage: "Assessment End Date cannot be earlier than Start Date!",
            });
            setStartDateError({
                value: true,
                errorMessage: "Assessment End Date cannot be earlier than Start Date!",
            });
        }

        if (courseCode && courseTitle && courseDescription && courseTimeline && courseMaxScore &&
            ageGroup && startDate && endDate && courseFee) {
            fetch("http://localhost:8080/course/" + instructor.instructorId + "/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(course)
            }).then(() => {
                console.log("New Course Created Successfully!")
                setRefreshPage(true)
                setCourseCode("")
                setCourseTitle("")
                setCourseDescription("")
                setCourseTimeline("")
                setCourseMaxScore("")
                setAgeGroup("")
                setStartDate("");
                setEndDate("");
                handleClickSnackbar()
                setCourseFee(0);
            })
        }
    }


    return (
        <form noValidate autoComplete='off' onSubmit={handleClick}>
            <Container>
                <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        Course Initialised Succesfully!
                    </Alert>
                </Snackbar>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{ color: "blue" }}> Create New Course </h1>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Course Code" variant="outlined" fullWidth
                            required
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            error={courseCodeError.value}
                            helperText={courseCodeError.errorMessage}
                        />

                        <TextField id="outlined-basic" label="Course Title" variant="outlined" fullWidth
                            required
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            error={courseTitleError.value}
                            helperText={courseTitleError.errorMessage}
                        />


                        <TextField id="outlined-multiline-static" label="Course Description" multiline rows={6} fullWidth defaultValue="" style={{ whiteSpace: "pre-line" }}
                            required
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value.replace(/↵/g, "\n"))}
                            error={courseDescriptionError.value}
                            helperText={courseDescriptionError.errorMessage}
                        />

                        <TextField id="outlined-multiline-static" label="Course Timeline" multiline rows={6} fullWidth defaultValue=""
                            required
                            value={courseTimeline}
                            onChange={(e) => setCourseTimeline(e.target.value)}
                            error={courseTimelineError.value}
                            helperText={courseTimelineError.errorMessage}
                        />

                        <TextField id="outlined-basic" label="Course Max Score" variant="outlined" fullWidth
                            required
                            value={courseMaxScore}
                            onChange={(e) => setCourseMaxScore(e.target.value)}
                            error={courseMaxScoreError.value}
                            helperText={courseMaxScoreError.errorMessage}
                        />

                        <TextField id="outlined-select-age" select label="Age Group" fullWidth
                            required
                            value={ageGroup}
                            onChange={handleChange1}
                            error={ageGroupError.value}
                            helperText={ageGroupError.errorMessage}
                        >
                            {ageGroups.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>

                        <InputLabel htmlFor="outlined-adornment-amount">Course fee</InputLabel>
                        <OutlinedInput
                            label="Course fee"
                            id="outlined-adornment-amount"
                            value={courseFee}
                            onChange={(e) => setCourseFee(e.target.value)}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            fullWidth
                        />

                        <Stack spacing={1}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Start Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={startDateError.value}
                                            helperText={startDateError.errorMessage}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="DD/MM/YYYY"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={endDateError.value}
                                            helperText={endDateError.errorMessage}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Stack>

                        <Button variant="outlined" onClick={handleClick}>Submit</Button>
                    </Box>
                </Paper>
            </Container>
        </form>
    );
}
