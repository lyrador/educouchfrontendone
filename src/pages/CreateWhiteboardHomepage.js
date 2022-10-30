createWhiteboardHomepage.js

import React, { useState, useEffect, useRef } from 'react';
import ShowChooseNamePanel from '../components/WhiteboardComponents/ShowChooseNamePanel';
import WhiteboardDrawer from '../components/WhiteboardComponents/WhiteboardDrawer';
import styles from '../css/layout.module.scss';
import {
    Grid, Typography, Tabs, Tab, Button, TextField, Stack, Box
} from '@mui/material';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import joinCall from '../assets/startCall.jpg';
import '../css/whiteboardHomepage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createRoom } from '../services/createRoom';
import { checkRoomInvitation } from '../services/checkRoomInvitation';
import Spinner from '../components/WhiteboardComponents/Spinner';
import { getRoom } from '../services/getRoom';
import { useAuth } from '../context/AuthProvider';


export default function CreateWhiteboardHomepage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;
    var username = user.username;

    // const [username, setUsername] = useState('')
    const [roomName, setRoomName] = useState('');
    const [roomAddress, setRoomAddress] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [connecting, setConnecting] = useState(false);

    // const handleInputChange = (e) => {
    //     setUsername(e.target.value)
    // }

    // ui part
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // useEffect(() => {

    //     if (showCreateRoom) {
    //         if (username && roomName) setButton(styles.closeBtn)
    //         else setButton(styles.closeBtnDisabled)
    //     } else {
    //         if (username && roomAddress) setButton(styles.closeBtn)
    //         else setButton(styles.closeBtnDisabled)
    //     }
    // }, [username, roomName, roomAddress])

    // const openSbackbar = (msg) => {
    //     setOpen(true);
    //     setSnackbarMsg(msg);
    // }

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        if (roomName === "") {
            const warningMessage = "Unable to create a room with empty name.";
            toast.warn(warningMessage)
            return;
        }
        const successMessage = 'User ' + username + ' has successfully created room ' + roomName;
        toast.info(successMessage);

        const participants = [];

        await createRoom(
            username,
            roomName,
            '',
            participants
        ).then((resp) => {
            navigate(`/room/${resp.roomId}?username=${username}`);
        })
            .catch((err) => console.log(err));
    }

    const handleJoinRoom = (e) => {
        e.preventDefault();
        if (roomAddress !== "" && password !== "") {
            checkRoomInvitation(roomAddress, password)
                .then((resp) => {
                    setLoading(true);
                    setConnecting(true);
                    navigate(`/room/${roomAddress}?username=${username}`);
                })
                .catch((err) => {
                    var errorMessage = 'Room doesn\'t exist or wrong passcode'
                    toast.error(errorMessage);
                })
        } else {
            toast.warn("Please fill in the room ID and password!");
        }

    }

    // const changePanel = () => {
    //     setShowCreateRoom(!showCreateRoom)
    //     setButton(styles.closeBtnDisabled)
    // }

    // ui parts
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <WhiteboardDrawer></WhiteboardDrawer>
                </Grid>
                <Grid item xs={10}>
                    <ToastContainer></ToastContainer>
                    <Typography variant="h5">
                        Create New Whiteboard Session
                    </Typography>
                    <br/>
                    <br/>
                    <div className="whiteboard-container">
                        <div className="whiteboard-illustration">
                            <img src={joinCall} />
                        </div>
                        <br/>
                        <br/>
                        <div className="whiteboard-form">
                            <Box>
                                <TextField id="create-room-name" label="Pick a room name: 👉" variant="outlined" onChange={e => setRoomName(e.target.value)} fullWidth />
                                <br />
                                <br />

                                <Button style = {{width: "20%"}} variant="contained" onClick={handleCreateRoom}>Create Room</Button>

                            </Box>
                        </div>
                    </div>

                </Grid>
            </Grid>




        </div>

    )
}