import React, { useState, useEffect, useRef } from 'react'
import styles from '../../css/ShowInfoPanel.module.scss'
import CustomizedSnackbar from './CustomizedSnackbar';
import { createRoom } from '../../services/createRoom';
import { checkRoomInvitation } from '../../services/checkRoomInvitation';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { getRoom } from '../../services/getRoom';
import { useAuth } from '../../context/AuthProvider';

function ShowChooseNamePanel() {
    const navigate = useNavigate();
    const auth = useAuth();
    const user = auth.user;
    var username = user.username;

    const [button, setButton] = useState(styles.closeBtnDisabled);
    const [open, setOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    // const [username, setUsername] = useState('')
    const [roomName, setRoomName] = useState('');
    const [roomAddress, setRoomAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showCreateRoom, setShowCreateRoom] = useState(() => {
        if (user.userType != "LEARNER") {
            return true;
        }
        return false;
    });
    const [loading, setLoading] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [connecting, setConnecting] = useState(false);


    const roomNameRef = useRef(null);
    const roomAddressRef = useRef(null);
    const passwordRef = useRef(null);

    // const handleInputChange = (e) => {
    //     setUsername(e.target.value)
    // }

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    const handleRoomAddressChange = (e) => {
        setRoomAddress(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    useEffect(() => {

        if (showCreateRoom) {
            if (username && roomName) setButton(styles.closeBtn)
            else setButton(styles.closeBtnDisabled)
        } else {
            if (username && roomAddress) setButton(styles.closeBtn)
            else setButton(styles.closeBtnDisabled)
        }
    }, [username, roomName, roomAddress])

    const openSbackbar = (msg) => {
        setOpen(true);
        setSnackbarMsg(msg);
    }

    const handleCreateRoom = async () => {
        if (button !== styles.closeBtnDisabled && showCreateRoom) {
            setLoading(true)
            const message = 'User ' + username + ' has successfully created room ' + roomName;
            openSbackbar(message);

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
    }

    const handleJoinRoom = () => {
        if(button !== styles.closeBtnDisabled && !showCreateRoom) {
             checkRoomInvitation(roomAddress, password)
                    .then((resp) => {
                        setLoading(true);
                        setConnecting(true);
                        navigate(`/room/${roomAddress}?username=${username}`);
                    })
                    .catch((err) => {
                        openSbackbar('Room doesn\'t exist or wrong passcode');
                        setSnackbarSeverity("error");
                        setLoading(false)
                    })
        }
    }

    const changePanel = () => {
        setShowCreateRoom(!showCreateRoom)
        setButton(styles.closeBtnDisabled)
    }

    return (
        <>
            {loading
                ? <Spinner
                    color={'#fff'}
                    loading={loading}
                    connecting={connecting}
                />
                : <div className={styles.infoPanel}>
                    <div className={styles.inner}>
                        <div className={styles.top}>
                            <div className={styles.tabs}>
                                {user.userType != "LEARNER" &&
                                    <p style={{ borderBottom: showCreateRoom ? '2px solid #333' : 'none' }} onClick={changePanel}>Create a Room</p>
                                }

                                <p style={{ borderBottom: !showCreateRoom ? '2px solid #333' : 'none' }} onClick={changePanel}>Join Existing Room</p>
                            </div>
                        </div>
                        <div className={styles.middle}>
                            {/* <div className={styles.enterUsername}>
                                    <p>Pick a username: 👉 </p>
                                    <input className={styles.input} placeholder="Username" ref={usernameRef} onChange={handleInputChange}/>
                                </div> */}
                            {showCreateRoom
                                ? <>
                                    <div className={styles.enterUsername}>
                                        <p>Pick a room name: 👉</p>
                                        <input className={styles.input} placeholder="Room Name" ref={roomNameRef} onChange={handleRoomNameChange} />
                                    </div>
                                </>
                                :
                                <>
                                    <div className={styles.enterUsername}>
                                        <p>Enter Room Address: 👉</p>
                                        <input className={styles.input} placeholder="Room Address" ref={roomAddressRef} onChange={handleRoomAddressChange} />
                                    </div>
                                    <div className={styles.enterUsername}>
                                        <p>Enter Passcode: 👉</p>
                                        <input className={styles.input} placeholder="Password" ref={passwordRef} onChange={handlePasswordChange} />
                                    </div>
                                </>
                            }
                        </div>
                        <div className={styles.bottom}>
                            {showCreateRoom
                                ? <div className={button} onClick={handleCreateRoom}>Create Room</div>
                                : <div className={button} onClick={handleJoinRoom}>Join Room</div>
                            }
                        </div>
                    </div>
                </div>
            }
            <CustomizedSnackbar open={open} setShowSnackbar={setOpen} snackbarMsg={snackbarMsg} severity={snackbarSeverity} />
        </>

    )
}

export default ShowChooseNamePanel;