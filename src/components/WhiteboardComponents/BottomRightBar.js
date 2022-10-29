import React, { useState, useEffect, useRef } from 'react'
import styles from '../../css/BottomRightBar.module.scss'
import infoPanelStyles from '../../css/ShowInfoPanel.module.scss';
import { ThemeContext } from '../../context/ThemeContext';
import CustomizedSnackbar from './CustomizedSnackbar';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CreateTooltip from './CreateTooltip';
import ReactTooltip from 'react-tooltip';
import { getRoom } from '../../services/getRoom';
import { checkRoomInvitation } from '../../services/checkRoomInvitation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function BottomRightBar({ scale, undo, disabled, setRoomId, roomId }) {
    const { theme, toggle, info } = React.useContext(ThemeContext);
    const [backgroundColor, setBackgroundColor] = useState('#E2E6EA');
    const [color, setColor] = useState('#222');
    const [showJoinRoomPanel, setShowJoinRoomPanel] = useState(false);
    const roomIdRef = useRef(null);
    const passwordRef = useRef(null);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [button, setButton] = useState(infoPanelStyles.closeBtnDisabled);
    const [snackbarMsg, setSnackbarMsg] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    useEffect(() => {
        if (!theme.secondaryColor) return;
        setBackgroundColor(theme.secondaryColor);

        if (!theme.color) return;
        setColor(theme.color);
    }, [theme])

    const setButtonStyle = () => {
        if (roomIdRef.current.value === '') {
            setButton(infoPanelStyles.closeBtnDisabled)
        } else {
            setButton(infoPanelStyles.closeBtn)
        }
    }

    const changeRoom = () => {
        if (roomIdRef.current.value === '' || passwordRef.current.value === '') return
        else {
            if (roomId === roomIdRef.current.value) {
                // User is trying to connect to the same room he's already connected
                toast.warn("You are in this room currently!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                // User tries to connect to a different room, therefor we should check if the room exists in DB
                checkRoomInvitation(roomIdRef.current.value, passwordRef.current.value)
                    .then(() => {
                        setRoomId(roomIdRef.current.value);
                        setShowJoinRoomPanel(false);
                        setButton(infoPanelStyles.closeBtnDisabled)
                        toast.info("Successfully changed your room.", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    })
                    .catch((err) => {
                        toast.error("Room doesn't exist, or wrong passcode!", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    })
            }
        }
    }

    const copyID = () => {
        setSnackbarMsg('ID Copied to Clipboard!')
        setShowSnackbar(true)
        setSnackbarSeverity("info");
    }

    return (
        <>
            {showJoinRoomPanel &&
                <div className={infoPanelStyles.infoPanel}>
                    <div className={infoPanelStyles.inner}>
                        <div className={infoPanelStyles.middle}>
                            <div className={infoPanelStyles.enterId}>
                                <h1 className={infoPanelStyles.heading}>Enter ID:</h1>
                                <input className={infoPanelStyles.input} placeholder="Enter room ID here" ref={roomIdRef} onChange={setButtonStyle} />
                            </div>
                            <div className={infoPanelStyles.enterId}>
                                <h1 className={infoPanelStyles.heading}>Enter passcode:</h1>
                                <input className={infoPanelStyles.input} placeholder="Enter passcode here" ref={passwordRef} onChange={setButtonStyle} />
                            </div>
                        </div>
                        <div className={infoPanelStyles.bottom}>
                            <div className={button} onClick={changeRoom}>Join Room</div>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.bottomRightBar}>

                {/* Copy Current Room ID */}
                <CopyToClipboard
                    text={roomId}
                    onCopy={copyID}
                >
                    <div>
                        <a data-tip data-for='copyRoomAddress' className={styles.toggleTheme} style={{ background: `${backgroundColor}`, color: `${color}` }}> 🔗 </a>
                        <ReactTooltip id='copyRoomAddress' type='info' effect="solid">
                            <span>Copy ID </span>
                        </ReactTooltip>
                    </div>
                </CopyToClipboard>

                {/* Change Room */}
                <CreateTooltip
                    id='joinRoom'
                    background={{ background: `${backgroundColor}`, color: `${color}` }}
                    action={() => setShowJoinRoomPanel(!showJoinRoomPanel)}
                    stylesClass={styles.toggleTheme}
                    icon='🚪'
                    type={'info'}
                    effect='solid'
                    text={'Change Room'}
                />

                <div className={styles.scale} style={{ background: `${backgroundColor}`, color: `${color}` }}>Scale: {scale.toFixed(1)}</div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default BottomRightBar