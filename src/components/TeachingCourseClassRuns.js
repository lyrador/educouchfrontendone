import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from '../components/TeachingCoursesDrawer';
import { Container, Paper, Box, Button, MenuItem, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAuth } from "../context/AuthProvider";

import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';

export default function TeachingCourseClassRuns(props) {

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Class Events
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Event ID</TableCell>
                                            <TableCell align="right">Title</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Start Time</TableCell>
                                            <TableCell align="right">End Time</TableCell>
                                            <TableCell align="right" width="700">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.classEvents.map((classEventRow) => (
                                            <TableRow key={classEventRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {classEventRow.eventId}
                                                </TableCell>
                                                <TableCell align="right">{classEventRow.title}</TableCell>
                                                <TableCell align="right">{classEventRow.eventDescription}</TableCell>
                                                <TableCell align="right">{classEventRow.startDate.substring(0, 10)}</TableCell>
                                                <TableCell align="right">{classEventRow.startDate.substring(11, 16)}</TableCell>
                                                <TableCell align="right">{classEventRow.endDate.substring(11, 16)}</TableCell>
                                                <TableCell align="right">
                                                    <div>
                                                        <IconButton
                                                            aria-label="settings"
                                                            onClick={(event) => handleClickDeleteEventDialogOpen(event, classEventRow.eventId)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        {/* <IconButton
                                                            aria-label="settings"
                                                            onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}
                                                        >
                                                            <DoneIcon />
                                                        </IconButton> */}
                                                        <IconButton
                                                            aria-label="settings"
                                                            onClick={(event) => deleteClassEvent(event, classEventRow.eventId)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell>New Class Event</TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 100 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 140 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Date" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 100 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="Start Time" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    // inputProps={{style: {fontSize: 11}}}
                                                    // size="small"
                                                    sx={{ width: 80 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField id="outlined-basic" label="End Time" variant="outlined" fullWidth
                                                    style={{ margin: '6px 0' }}
                                                    value={classRunStartTime}
                                                    sx={{ width: 80 }}
                                                    InputProps={{ sx: { height: '35px' }, style: { fontSize: 15 } }}
                                                    onChange={(e) => setClassRunStartTime(e.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <div>
                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={(event) => handleClickDeleteDialogOpen(event, row.classRunId)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="settings"
                                                        onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}
                                                    >
                                                        <DoneIcon />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={13} style={{ textAlign: "center" }}>
                                                <Button variant='contained' onClick={(event) => generateClassEventsForClassRun(event, row.classRunId)}>
                                                    <AddIcon style={{fontSize: '16px'}}/>
                                                    Add New Class Event
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    const [deleteEventDialogOpen, setDeleteEventDialogOpen] = React.useState(false);
    const [classEventIdToDelete, setClassEventIdToDelete] = useState("");

    const handleClickDeleteEventDialogOpen = (event, classEventId) => {
        setClassEventIdToDelete(classEventId);
        setDeleteEventDialogOpen(true);
    };

    const handleDeleteEventDialogClose = () => {
        setDeleteEventDialogOpen(false);
    };

    // const handleClickEditDialogOpen = (event, forumId, forumTitle) => {
    //     setEditForumTitle(forumTitle);
    //     setForumIdToEdit(forumId);
    //     setEditDialogOpen(true);
    // };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };


    return (
        <div>
            {/* <div>
                <Dialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are editing this forum"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new forum details
                        </DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="Discussion Title"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={editForumTitle}
                            onChange={(e) => setEditForumTitle(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editForum} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> */}
            <div>
                <Dialog
                    open={deleteEventDialogOpen}
                    onClose={handleDeleteEventDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this class event?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You cannot undo this action. Confirm delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteEventDialogClose}>Cancel</Button>
                        <Button onClick={deleteClassEvent} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>);


}