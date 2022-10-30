import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, Alert, Snackbar,
     DialogContentText, DialogTitle, Card, CardContent, Box, Breadcrumbs } from '@mui/material';
import { useState } from 'react';
import LearnerCoursesDrawer from '../components/LearnerCourseDrawer';
import { useAuth } from '../context/AuthProvider';
import { DataGrid } from '@mui/x-data-grid';
import LinkMaterial from "@mui/material/Link";
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import { PanoramaSharp } from '@mui/icons-material';



function TeachingGradebookGrading() {
    // list of gradebook entries
    const [learners, setLearners] = useState([]);


    //paths
    const location = useLocation();
    const gradebookPath = location.pathname.split('/').slice(0, 4).join('/')
    const gradingPath = location.pathname

    const courseId = location.pathname.split('/')[2];
    const assessmentId = location.pathname.split('/')[4];
    const title = location.state.title;

    const [refreshPage, setRefreshPage] = useState('');


    const columns = [
        { field: 'learnerName', headerName: 'Learner Name', width: 250},
        { field: 'didAttempt', headerName: 'Attempt', width: 250},
        {
            field: 'quizMax',
            headerName: 'Assessment Max',
            width: 250
          },
          {
            field: 'obtainedScore',
            headerName: 'Learner Score',
            width: 250
          },
          {
            field: 'graded',
            headerName: 'Graded',
            width: 250
          },
          {
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
              return(
                <Button
                  variant="contained"
                  size="small"
                  tabIndex={params.hasFocus ? 0 : -1}
                >
                                            <Link
                          to={`${gradebookPath}/${assessmentId}/${params.row.learnerId}`}
                          state={{ title: title , name : params.row.learnerName, assessmentTotal : params.row.quizMax, isGraded : params.row.graded, learnerScore : params.row.obtainedScore, mcqScore : params.row.learnerMcqScore, isQuiz : params.row.quiz}}
                          style={{ textDecoration: "none" }}
                        >
                          Grade
                           </Link>
                </Button>
              );
              },
          },
      ];

      React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/gradeBookEntry/getLearnerAttemptPage?courseId=" + courseId + "&assessmentId=" + assessmentId)
            .then(res => res.json())
            .then((result) => {
                setLearners(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, [assessmentId, courseId, refreshPage]);



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                <Breadcrumbs aria-label="breadcrumb">
                <Link to={`${gradebookPath}`}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                Gradebook
                            </LinkMaterial>
                        </Link>
                        <Link to={`${gradingPath}`}
                            state={{ title: title }}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="inherit">
                                {title}
                            </LinkMaterial>
                        </Link>
          </Breadcrumbs>
                    <Typography variant="h5">
                        Grading
                    </Typography>
                    <divider></divider>
                    <br />
                    <Box sx={{ 
                        height: 800, 
                        width: '100%'
                         }}>
                        {learners.length > 0 &&
                            <DataGrid getRowId={(row)=>row.learnerId}
                            rows={learners}
                            columns={columns}                    
                          />
                        }
                        {learners.length <= 0 &&
                            <p>This assessment currently doesn't have any learners.</p>
                        }
                    </Box>



                </Grid>
            </Grid>




        </div>
    )


}

export default TeachingGradebookGrading;