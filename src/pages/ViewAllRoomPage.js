import React, { useState, useEffect, useRef } from 'react';
import ShowChooseNamePanel from '../components/WhiteboardComponents/ShowChooseNamePanel';
import WhiteboardDrawer from '../components/WhiteboardComponents/WhiteboardDrawer';
import styles from '../css/layout.module.scss';
import {
    Grid, Typography, Divider, TableCell, TableRow, TableContainer, Paper, Table, TableHead, TableBody
} from '@mui/material';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/whiteboardHomepage.css';
import { getAllRooms } from '../services/getAllRooms';
import { generatePath } from 'react-router-dom';
import { ListItemText } from '@material-ui/core';

export default function ViewAllRoomPage() {

    const [rooms, setRooms] = useState([]);
    const [refreshPage, setRefreshPage] = useState('');

    useEffect(() => {
        setRefreshPage(false);
        fetch("http://localhost:8080/api/v1/rooms/all")
            .then((res) => res.json())
            .then((result) => {
                setRooms(result);
                console.log('Rooms are ' + JSON.stringify(result));
            });
    }, [refreshPage]);

    const renderEmptyRowMessage = () => {
        if (rooms && rooms.length !== 0) {
            return;
        } else {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                        There are currently no whiteboard session!
                    </TableCell>
                </TableRow>
            );
        }
    };

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <WhiteboardDrawer></WhiteboardDrawer>
                </Grid>
                <Grid item xs={10}>
                    <ToastContainer></ToastContainer>
                    <Typography variant="h5">
                        View All Existing Rooms
                    </Typography>
                    <br />
                    <Divider></Divider>
                    <br />
                    <Typography variant="h6">Please refrain from entering any room unless invited.</Typography>
                    <div style={{ padding: "2%" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Room ID</TableCell>
                                        <TableCell>Room password</TableCell>
                                        <TableCell>Room name</TableCell>
                                        <TableCell>Creator</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderEmptyRowMessage()}
                                    {rooms && rooms.map((room) => (
                                        <TableRow
                                            key={room.roomId}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell>{room.roomId}</TableCell>
                                            <TableCell>{room.password}</TableCell>
                                            <TableCell>{room.roomName}</TableCell>
                                            <TableCell>{room.organizers[0]}</TableCell>
                                            {/* <TableCell>
                                                <List dense={dense}>
                                                    {generate(
                                                        <ListItemText primary={educator}></ListItemText>
                                                    )}
                                                </List>
                                            </TableCell> */}

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>




        </div >

    )
}