import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingChildFileList from './TeachingChildFileList.js';
import FolderBreadcrumb from './FolderBreadcrumb.js';
import {
    Grid,
    LinearProgress,
    ThemeProvider,
    createTheme,
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Box,
} from "@mui/material";
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TeachingChildFileCover() {

    var folderId = useParams();
    folderId = folderId.folderId;

    var courseId = useParams();
    courseId = courseId.moduleCode;
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <ToastContainer position="bottom-left"></ToastContainer>
                    <FolderBreadcrumb folderId={folderId} courseId={courseId}></FolderBreadcrumb>
                    <Typography variant="h5">Content Files Uploading</Typography>
                    <divider></divider>
                    <br />
                    <TeachingChildFileList></TeachingChildFileList>
                </Grid>
            </Grid>


        </>

    )
}

export default TeachingChildFileCover;