import * as React from 'react';

import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';


function TeachingFileList(props) {

    const location = useLocation();
    const moduleCode = useParams();
    
    console.log(moduleCode);

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer moduleCode={moduleCode}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <TeachingFileComponent></TeachingFileComponent>
                </Grid>
            </Grid>
        </div>
    )
}

export default TeachingFileList;