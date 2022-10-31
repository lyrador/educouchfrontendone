import React, { useState, useEffect } from 'react'
import styles from '../../css/OnlineUsers.module.scss'
import { ThemeContext } from '../../context/ThemeContext';
import {
    List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Checkbox, Avatar, Button, Divider, Card, CardContent, CardActions,
    Skeleton, Dialog, DialogContent, DialogContentText, DialogTitle, Typography, DialogActions
} from '@mui/material';
import defaultAvatar from '../../assets/defaultAvatar.jpg';
import { useParams, useNavigate } from 'react-router-dom';
import CustomizedSnackbar from './CustomizedSnackbar';
import Spinner from './Spinner';

function OnlineUsers({ usersList }) {

    var roomId = useParams();
    roomId = roomId.roomId;

    const { theme, toggle, dark } = React.useContext(ThemeContext)
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');
    const [usersNotInCall, setUserNotInCallList] = useState([]);

    // snack bar
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // loading
    const [loading, setLoading] = useState(false);





    useEffect(() => {
        if (!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);

        if (!theme.color) return;
        setColor(theme.color);
    }, [theme]);

    useEffect(() => {
        var url = "http://localhost:8080/api/v1/rooms/" + roomId + "/get-learner-not-participants";
        fetch(url).
            then(res => res.json())
            .then((result) => {
                console.log('Result is ' + JSON.stringify(result));
                setUserNotInCallList(result);
            }
            )
    }, [usersList]);

    const refresh = () => {
        var url = "http://localhost:8080/api/v1/rooms/" + roomId + "/get-learner-not-participants";
        fetch(url).
            then(res => res.json())
            .then((result) => {
                console.log('Result is ' + JSON.stringify(result));
                setUserNotInCallList(result);
            }
            )
            .catch((err) => {
                console.log("Error has occured: " + err.message);
            });

    }


    // invite dialog box
    const [inviteDialogBox, setInviteDialogBox] = useState(false);
    const openInviteDialogBox = () => {
        setInviteDialogBox(true);
    };
    const closeInviteDialogBox = () => {
        setInviteDialogBox(false);
    }
    // checkbox
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);

    };


    // invite
    const handleInviteLearner = () => {
        console.log('current checked is ' + JSON.stringify(checked));
        var url = "http://localhost:8080/api/v1/rooms/sendSessionInvitation"
        const data = {
            "roomId": roomId,
            "invitedUsername": checked
        }
        setLoading(true);
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => {

            //notification
            setLoading(false);
            closeInviteDialogBox();
            setSnackbarSeverity("success");
            setSnackbarMsg("Successfully invited learners!");
            setSnackbarOpen(true);
            setChecked([]);

            refresh();

        }).catch((error) => {

            //notification
            setLoading(false);
            closeInviteDialogBox();
            setSnackbarSeverity("error");
            setSnackbarMsg(error.message);
            setSnackbarOpen(true);
            setChecked([]);


        })
    };



    return (
        <>
            <button type="button" onClick={openInviteDialogBox}>
                <div className={styles.onlineUsers} style={{ background: `${backgroundColor}`, color: `${color}` }}>
                    <p>{usersList.length}</p>
                    <p>👤</p>
                </div>

            </button>

            <Dialog open={inviteDialogBox} onClose={closeInviteDialogBox} fullWidth="lg">
                <DialogContent>
                    <DialogTitle>
                        Add more learners
                    </DialogTitle>
                    <Divider></Divider>
                    <br />
                    {loading ?
                        <Skeleton animation="wave" />
                        :
                        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {usersNotInCall && usersNotInCall.map((value) => {
                                const labelId = `checkbox-list-secondary-label-${value}`;
                                return (
                                    <ListItem
                                        key={value}
                                        secondaryAction={
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(value)}
                                                checked={checked.indexOf(value) !== -1}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        }
                                        disablePadding
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={`Avatar n°${value + 1}`}
                                                    src={`defaultAvatar`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={labelId} primary={value} />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>}


                </DialogContent>
                <DialogActions>
                    {!loading &&
                        <>
                            <Button onClick={handleInviteLearner}>Invite</Button>
                            <Button onClick={closeInviteDialogBox}>Close</Button>
                        </>
                    }

                </DialogActions>


            </Dialog>
            <CustomizedSnackbar
                open={snackbarOpen}
                setShowSnackbar={setSnackbarOpen}
                snackbarMsg={snackbarMsg}
                severity={snackbarSeverity}
                transition='left'
                verticalAnchor='top'
                horizontalAnchor='right'
            />

        </>

    )
}

export default OnlineUsers;