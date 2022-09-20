import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography, Button } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';

function TeachingFileList() {

    var courseId = useParams();
    courseId = courseId.courseId;
    
    // const handleClick = num => {
    //     fetch("http://localhost:8080/folder/getFolderByFolderId/1" + num)
    //     .then(res => res.json())
    //     .then((result) => {
    //         var fol = result;
    //         setFolderList(fol.childFolders)
    //     })
    // }

    const[folderList, setFolderList] = useState([]);

    React.useEffect(()=>{
        fetch("http://localhost:8080/folder/getFoldersByCourseCode/" + courseId)
        .then(res=>res.json())
        .then((result)=>{
            setFolderList(result);
        }
    ).catch((err) => {
        console.log(err.message);
    });}, []);

    

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        Content Files Uploading
                    </Typography>
                    <divider></divider>
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        component="span"
                    //onClick={uploadImage}
                    >
                        Create New Folder
                    </Button>
                    <br/>
                    {
                        folderList
                            .map((folder) => (<TeachingFileComponent folder={folder} courseId = {courseId}></TeachingFileComponent>))
                    }

                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingFileList;