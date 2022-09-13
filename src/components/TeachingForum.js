import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import { useState } from 'react';

import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import TeachingForumList from '../components/TeachingForumList';
import TeachingDiscussion from './TeachingDiscussion';

import { Link, useLocation, useParams } from 'react-router-dom';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';


function TeachingForum(props) {

    let { moduleCode } = useParams();

    //paths
    const location = useLocation();
    const forumsPath = location.pathname.split('/').slice(0,4).join('/')
    const discussionsPath = location.pathname

    console.log(location.state)
    const forumName = location.state.forumName;

    function createData(discussionId, discussionName, numofComments, lastActivity) {
        return {discussionId, discussionName, numofComments, lastActivity};
    }
    
    const rows = [
        createData(1, 'Tutorial Grp 1', 20, "1 Sep 2359hrs"),
        createData(2, 'Tutorial Grp 2', 80, "2 Sep 1200hrs"),
        createData(3, 'Tutorial Grp 3', 789, "31 May 2359hrs"),
        createData(4, 'Tutorial Grp 4', 432, "22 Jul 2000hrs"),
    ];

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <LinkMaterial underline="hover" color="inherit" href={`${forumsPath}`}>
                            Forum
                        </LinkMaterial>
                        <Link to={`${discussionsPath}`} 
                            state={{ forumName: forumName }} 
                            style={{textDecoration: 'none', color: 'grey'}}>
                            <LinkMaterial underline="hover" color="inherit">
                                {forumName}
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    <h1>List of Discussions</h1>
                    <div style={{padding: '5%'}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Discussion Name</TableCell>
                                <TableCell>Number of Comments</TableCell>
                                <TableCell>Last Post</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link to={`${discussionsPath}/${row.discussionId}`} 
                                        state={{ discussionName: row.discussionName, forumName: forumName }} 
                                        style={{textDecoration: 'none'}}>
                                            {row.discussionName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.numofComments}</TableCell>
                                    <TableCell>{row.lastActivity}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default TeachingForum;