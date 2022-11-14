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
import axios from 'axios';



function TeachingGradebook() {

    // list of gradebook entries
    const [assessments, setAssessments] = useState([]);


  //paths
  const location = useLocation();
  const gradebookPath = location.pathname.split("/").slice(0, 4).join("/");

  const courseId = location.pathname.split("/")[2];

    const [refreshPage, setRefreshPage] = useState('');



    const handleOnClickPublish = async (e,params) => {
      e.preventDefault();
      var activityState = params.row.published
      const assessmentId = params.row.assessmentId
      console.log(activityState)

      try {
        const response = await axios.put(
            "http://localhost:8080/assessment/togglePublish?assessmentId=" + assessmentId
          );
          // set the state of the user
          const responseData = response.data
          console.log(responseData)
          setRefreshPage(!refreshPage)
          
    } catch (error) {
        // Handle error here
        console.log(error.message)
    }
  };

    const columns = [
        { field: 'title', headerName: 'Assessment Name', width: 250},
        { field: 'assessmentType', headerName: 'Assessment Type', width: 250},
        {
            field: 'assessmentStatus',
            headerName: 'Assessment Status',
            width: 250
          },
          {
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
              return(
                <>
                <Button
                  variant="contained"
                  size="small"
                  tabIndex={params.hasFocus ? 0 : -1}
                //   onClick={(event) => {
                //     handleOnClick(event,params);
                //   }}
                >
                                            <Link
                          to={`${gradebookPath}/${params.row.assessmentId}`}
                          state={{ title: params.row.title, identifier : params.row.assessmentType === "Quiz" ? "1" : "2", isOpen : params.row.isOpen}}
                          style={{ textDecoration: "none" }}
                        >
                          Grade
                        </Link>
                </Button>
                <Button
                variant="contained"
                size="small"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={(event) => {
                  handleOnClickPublish(event,params);
                }}
              >
                {params.row.published? "Unpublish" : "Publish"}
              </Button>
                </>
                
              );
              },
          },
      ];

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/assessment/getAllAssessmentsByCourseId?courseId=" + courseId)
            .then(res => res.json())
            .then((result) => {
                setAssessments(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, [courseId, refreshPage]);



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                <Breadcrumbs aria-label="breadcrumb">
            <LinkMaterial
              underline="hover"
              color="inherit"
              href={`${gradebookPath}`}
            >
              Gradebook
            </LinkMaterial>
          </Breadcrumbs>
                    <Typography variant="h5">
                        Leaner Gradebook
                    </Typography>
                    <divider></divider>
                    <br />
                    <Box sx={{ 
                        height: 800, 
                        width: '80%'
                         }}>
                        {assessments.length > 0 &&
                            <DataGrid getRowId={(row)=>row.assessmentId}
                            rows={assessments}
                            columns={columns}                    
                          />
                        }
                        {assessments.length <= 0 &&
                            <p>This course currently doesn't have any assessments.</p>
                        }
                    </Box>




                </Grid>
            </Grid>




        </div>
    )


}

export default TeachingGradebook;