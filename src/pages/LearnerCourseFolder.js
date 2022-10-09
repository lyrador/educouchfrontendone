import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Grid, Typography, Button, TextField, Dialog, DialogActions, DialogContent, Alert, Snackbar,
     DialogContentText, DialogTitle } from '@mui/material';
import TeachingFileComponent from '../components/TeachingFileComponent';
import { useState } from 'react';
import LearnerCoursesDrawer from '../components/LearnerCourseDrawer';



function LearnerCourseFolder() {

    // list of folders
    const [folderList, setFolderList] = useState([]);

    var courseId = useParams();
    courseId = courseId.courseId;

    const [refreshPage, setRefreshPage] = useState('');

    React.useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/folder/getFoldersByCourseId/" + courseId)
            .then(res => res.json())
            .then((result) => {
                setFolderList(result);
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, [refreshPage]);



    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCoursesDrawer courseId={courseId} learnerStatus = {true}></LearnerCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        Course Folders
                    </Typography>
                    <divider></divider>
                    <br />
                    <div>
                        {folderList.length > 0 &&
                            folderList
                                .map((folder) => (<TeachingFileComponent folder={folder} courseId={courseId} isLearner = {true}></TeachingFileComponent>))
                        }
                        {folderList.length <= 0 &&
                            <p>This course currently doesn't have any teaching folder.</p>
                        }
                    </div>




                </Grid>
            </Grid>




        </div>
    )


}

export default LearnerCourseFolder;