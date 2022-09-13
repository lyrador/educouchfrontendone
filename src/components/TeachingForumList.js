import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid } from '@mui/material';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMaterial from '@mui/material/Link';

function TeachingForumList(props) {

    //paths
    const location = useLocation();
    const forumPath = location.pathname.split('/').slice(0,4).join('/')

    const moduleCode = useParams();

    console.log(moduleCode);

    function createData(forumId, forumName, numofDiscussions, lastActivity) {
        return {forumId, forumName, numofDiscussions, lastActivity};
    }
    
    const rows = [
        createData(1, 'Finding Agile Squad Teammates', 159, "23 Aug 2359hrs"),
        createData(2, 'Tutorial Swaps', 237, "1 Sep 1200hrs"),
        createData(3, 'Clarifications on Assignment 1', 262, "2 May 2359hrs"),
        createData(4, 'Queries on Final Exam', 305, "13 Sep 2000hrs"),
    ];

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer moduleCode={moduleCode}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <LinkMaterial underline="hover" color="inherit" href={`${forumPath}`}>
                            Forum
                        </LinkMaterial>
                    </Breadcrumbs>
                    <h1>List of Forums</h1>
                    <div style={{padding: '5%'}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>Forum Name</TableCell>
                                <TableCell>Number of Discussions</TableCell>
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
                                        <Link to={`${forumPath}/${row.forumId}`} state={{ forumName: row.forumName }} style={{textDecoration: 'none'}}>
                                            {row.forumName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{row.numofDiscussions}</TableCell>
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

export default TeachingForumList;