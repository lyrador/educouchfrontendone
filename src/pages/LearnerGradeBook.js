import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, Alert, Snackbar,
     DialogContentText, DialogTitle, Card, CardContent, Box } from '@mui/material';
import { useState } from 'react';
import LearnerCoursesDrawer from '../components/LearnerCourseDrawer';
import { useAuth } from '../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';



function LearnerGradeBook() {

    // list of gradebook entries
    const [gradeBookEntries, setGradeBookEntries] = useState([]);

    //user
    const auth = useAuth();
    const user = auth.user;

    //course
    var courseId = useParams();
    courseId = courseId.courseId;

    const [refreshPage, setRefreshPage] = useState('');


      function learnerScoreDisplay(params) {
        if (params.row.published) {
        return `${params.row.learnerScore}`;
        } else {
            return "--"
        }
      }

    const columns = [
        { field: 'assessmentName', headerName: 'Assessment Name', width: 250},
        { field: 'assessmentMax', headerName: 'Max Score', width: 250},
        {
            field: 'published',
            headerName: 'Graded',
            type : 'boolean',
            width: 250,
                  },
        {
          field: 'learnerScore',
          headerName: 'Your Score',
          width: 250,
          valueGetter: learnerScoreDisplay,

        },
      ];

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/gradeBookEntry/getByLearnerAndCourseId?learnerId=" + user.userId + "&courseId=" + courseId)
            .then(res => res.json())
            .then((result) => {
                setGradeBookEntries(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, [courseId, refreshPage, user.userId]);



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                <LearnerCoursesDrawer></LearnerCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        Learner Gradebook
                    </Typography>
                    <divider></divider>
                    <br />
                    <Box sx={{ 
                        height: 800, 
                        width: '100%'
                         }}>
                        {gradeBookEntries.length > 0 &&
                            // gradeBookEntries
                            //     .map((gb) => ( <Card sx={{ minWidth: 275 }}>
                            //         <CardContent>
                            //           <Typography variant="h5" component="div">
                            //             {gb.assessmentName}
                            //           </Typography>
                            //           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            //             {gb.learnerScore && gb.learnerScore}
                            //             {!gb.learnerScore && "Ungraded"}
                            //             /{gb.assessmentMax}
                            //           </Typography>
                            //         </CardContent>
                            //       </Card>))
                            <DataGrid getRowId={(row)=>row.gradeBookEntryId}
                            rows={gradeBookEntries}
                            columns={columns}                    
                          />
                        }
                        {gradeBookEntries.length <= 0 &&
                            <p>This course currently doesn't have any assessments.</p>
                        }
                    </Box>




                </Grid>
            </Grid>




        </div>
    )


}

export default LearnerGradeBook;