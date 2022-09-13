import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';


function TeachingDiscussion(props) {

    let { moduleCode } = useParams();

    //paths
    const location = useLocation();
    const forumPath = location.pathname.split('/').slice(0,4).join('/')
    const discussionsPath = location.pathname.split('/').slice(0,5).join('/')

    console.log(location.state)
    const discussionName = location.state.discussionName;
    const forumName = location.state.forumName;

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <LinkMaterial underline="hover" color="inherit" href={`${forumPath}`}>
                            Forum
                        </LinkMaterial>
                        <Link to={`${discussionsPath}`} 
                            state={{ discussionName: discussionName, forumName: forumName }} 
                            style={{textDecoration: 'none', color: 'grey'}}>
                            <LinkMaterial underline="hover" color="inherit">
                                {forumName}
                            </LinkMaterial>
                        </Link>
                        <Link to={`${location.pathname}`} 
                            state={{ discussionName: discussionName, forumName: forumName }} 
                            style={{textDecoration: 'none', color: 'grey'}}>
                            <LinkMaterial underline="hover" color="inherit">
                                {discussionName}
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                </Grid>
            </Grid>
        </div>
    )
}

export default TeachingDiscussion;