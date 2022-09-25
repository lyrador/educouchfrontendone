import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container ,Paper, Button, MenuItem} from '@mui/material';
import { useAuth } from "../context/AuthProvider";

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

    const paperStyle={
        padding: '50px 20px', 
        width:600,
        margin:"20px auto", 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: '1'
    }

    const ageGroups = [
        {
            value:'Adults', 
        }, 
        {
            value: 'Kids',
        },
    ];

    const[courseCode,setCourseCode] = useState('')
    const[courseTitle,setCourseTitle]=useState('')
    const[courseDescription, setCourseDescription] = useState('')
    const[courseTimeline, setCourseTimeline] = useState('')
    const[courseMaxScore, setCourseMaxScore] = useState('')
    const[ageGroup, setAgeGroup] = useState('')
    const[courseCodeError,setCourseCodeError] = useState({value: false, errorMessage:''})
    const[courseTitleError,setCourseTitleError]=useState({value: false, errorMessage:''})
    const[courseDescriptionError, setCourseDescriptionError] = useState({value: false, errorMessage:''})
    const[courseTimelineError, setCourseTimelineError] = useState({value: false, errorMessage:''})
    const[courseMaxScoreError, setCourseMaxScoreError] = useState({value: false, errorMessage:''})
    const[ageGroupError, setAgeGroupError] = useState({value: false, errorMessage:''})

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


    const handleClick=(e)=>{
        e.preventDefault()
        const course={courseCode, courseTitle, courseDescription, courseTimeline, courseMaxScore, ageGroup}
        setCourseCodeError({value:false, errorMessage:''})
        setCourseTitleError({value: false, errorMessage:''})
        setCourseDescriptionError({value: false, errorMessage:''})
        setCourseTimelineError({value: false, errorMessage:''})
        setCourseMaxScoreError({value: false, errorMessage:''})
        setAgeGroupError({value: false, errorMessage:''})

        if (courseCode == '') {
            setCourseCodeError({value:true, errorMessage:'You must enter a course code'})
        }
        if (courseTitle == '') {
            setCourseTitleError({value:true, errorMessage:'You must enter a course title'})
        }
        if (courseDescription == '') {
            setCourseDescriptionError({value:true, errorMessage:'You must enter a course description'})
        }
        if (courseTimeline == '') {
            setCourseTimelineError({value:true, errorMessage:'You must enter a course timeline'})
        }
        if (courseMaxScore == '') {
            setCourseMaxScoreError({value:true, errorMessage:'You must enter a course max score'})
        }
        if (ageGroup == '') {
            setAgeGroupError({value:true, errorMessage:'You must select a course age group'})
        }

        if (courseCode && courseTitle && courseDescription && courseTimeline && courseMaxScore && ageGroup) {
            fetch("http://localhost:8080/course/" + instructor.instructorId + "/courses", {
                method:"POST", 
                headers:{"Content-Type":"application/json"}, 
                body:JSON.stringify(course)
            }).then(()=>{
                console.log("New Course Created Successfully!")  
                setRefreshPage(true)
                setCourseCode("")
                setCourseTitle("")
                setCourseDescription("")
                setCourseTimeline("")
                setCourseMaxScore("")
                setAgeGroup("")
                handleClickSnackbar()
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
                <h1 style={{color: "blue"}}> Create New Course </h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1},
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" label="Course Code" variant="outlined" fullWidth 
            required
            value={courseCode}
            onChange={(e)=>setCourseCode(e.target.value)}
            error={courseCodeError.value}
            helperText={courseCodeError.errorMessage}
            />
            
            <TextField id="outlined-basic" label="Course Title" variant="outlined" fullWidth
            required
            value={courseTitle}
            onChange={(e)=>setCourseTitle(e.target.value)}
            error={courseTitleError.value}
            helperText={courseTitleError.errorMessage}
            />
    
            
            <TextField id="outlined-multiline-static" label="Course Description" multiline rows={6} fullWidth defaultValue="" style={{ whiteSpace: "pre-line" }} 
                required
                value={courseDescription} 
                onChange={(e)=>setCourseDescription(e.target.value.replace(/↵/g, "\n"))}
                error={courseDescriptionError.value}
                helperText={courseDescriptionError.errorMessage}
            />

            <TextField id="outlined-multiline-static" label="Course Timeline" multiline rows={6} fullWidth defaultValue=""
            required
            value={courseTimeline}
            onChange={(e)=>setCourseTimeline(e.target.value)}
            error={courseTimelineError.value}
            helperText={courseTimelineError.errorMessage}
            />

            <TextField id="outlined-basic" label="Course Max Score" variant="outlined" fullWidth
            required
            value={courseMaxScore}
            onChange={(e)=>setCourseMaxScore(e.target.value)}
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

            <Button variant="outlined" onClick={handleClick}>Submit</Button>
            </Box>
            </Paper>
        </Container>
    </form>
  );
}
