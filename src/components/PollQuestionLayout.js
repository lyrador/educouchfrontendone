import * as React from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import { Grid, Paper, Button, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

//breadcrumb
import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

//form
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

//icons
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AirplayIcon from '@mui/icons-material/Airplay';

//snackbar
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//components and plugins
import ReactPlayer from "react-player";

//pictures
import tick from "../assets/accept.png";
import warning from "../assets/warning.png";
import correct from "../assets/correct.png";
import wrong from "../assets/wrong.png";

//css
import "../css/TriviaQuestionLayout.css";

import { LinearProgress, ThemeProvider, createTheme } from "@mui/material";
import UploadService from "../services/UploadFilesService";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001")

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PollQuestionLayout(props) {

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    const [activatedBoolean, setActivatedBoolean] = useState(false)
    const [pollResponses, setPollResponses] = useState([])
    const [username, setUsername] = useState("hoster2")
    const [room, setRoom] = useState("");

    function generateRandomRoomNumber() {
        let x = "P" + (Math.floor(Math.random() * (99999 - 10000) + 10000))
        return x
    }

    const joinRoom = (roomNumber) => {
        socket.emit("join_room_admin_poll", roomNumber)
    }

    const leaveRoom = () => {
        socket.emit("leave_room_admin_poll", room)
    }

    const deactivateQuestion = () => {
        setRoom("")
        leaveRoom()
        setActivatedBoolean(false)
    }

    const activateQuestion = () => {
        var temp = generateRandomRoomNumber()
        console.log(temp)
        setRoom(temp)
        joinRoom(temp)
        setActivatedBoolean(true)
        sendPollQuestionFromEffect(currentQuestion.pollQuestionTitle)
    }

    const sendPollQuestionFromEffect = (questionTitle) => {
        const pollQuestion = {
            author: username,
            room: room,
            question: questionTitle
        }
        console.log("SEND POLL QUESTION")
        console.log(pollQuestion)
        socket.emit("send_poll_question", pollQuestion)
    }

    // const sendPollQuestion = () => {
    //     const pollQuestion = {
    //         author: username,
    //         room: room,
    //         question: currentQuestion.pollQuestionTitle
    //     }
    //     console.log("SEND POLL QUESTION")
    //     console.log(pollQuestion)
    //     socket.emit("send_poll_question", pollQuestion)
    // }

    React.useEffect(() => {
        // joinRoom()
    }, [])

    React.useEffect(() => {
        socket.on("receive_request_poll_question", (data) => {
            console.log("receive request poll question")
            console.log(currentQuestion)
            if (currentQuestion.pollQuestionTitle) {
                delay(200).then(() => sendPollQuestionFromEffect(currentQuestion.pollQuestionTitle));
            } else {
                fetch("http://localhost:8080/pollQuestion/" + props.pollQuestionId + "/pollQuestions")
                    .then((res) => res.json())
                    .then((result) => {
                        console.log("WAY 2")
                        console.log(result)
                        delay(200).then(() => sendPollQuestionFromEffect(result.pollQuestionTitle));
                    });
            }
        })
        socket.on("receive_poll_response", (data) => {
            console.log("receive poll response")
            const pollerResponse = {
                author: data.author,
                response: data.response,
                room: room
            }
            setPollResponses(pollResponses => [...pollResponses, pollerResponse])
            //persist poll response here
        })
    }, [socket])

    //upload
    const theme = createTheme({
        components: {
            MuiLinearProgress: {
                styleOverrides: {
                    root: { height: 15, borderRadius: 5 },
                    colorPrimary: { backgroundColor: "#EEEEEE" },
                    bar: { borderRadius: 5, backgroundColor: "#1a90ff", },
                },
            },
        },
    });

    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState("https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg");
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadedAttachmentId, setUploadedAttachmentId] = useState("");
    const [openUploadDialog, setOpenUploadDialog] = React.useState(false);

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    };

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
        setMessage("");
    };

    const uploadFile = () => {
        setProgress(0);
        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }).then((response) => {
            setMessage("Succesfully Uploaded!");
            setUploadedAttachmentId(response.data.fileId);
            setIsError(false);
            setIsUploaded(true);
            console.log(response);
        }).catch((err) => {
            setMessage("Could not upload the image!");
            setIsError(true);
            setProgress(0);
            setCurrentFile(undefined);
        });
    };

    //snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleClickSnackbar = () => { setOpenSnackbar(true) };
    const handleCloseSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenSnackbar(false) };

    const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
    const handleClickDeleteSnackbar = () => { setOpenDeleteSnackbar(true) };
    const handleCloseDeleteSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenDeleteSnackbar(false) };

    const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);
    const handleClickEditSnackbar = () => { setOpenEditSnackbar(true) };
    const handleCloseEditSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenEditSnackbar(false) };

    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const handleClickErrorSnackbar = () => { setOpenErrorSnackbar(true) };
    const handleCloseErrorSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenErrorSnackbar(false) };

    //auth
    const auth = useAuth();
    const user = auth.user;

    //paths
    const location = useLocation();
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const bookId = location.pathname.split("/")[4];

    //refresh view
    const [refreshInteractivePage, setRefreshInteractivePage] = useState("");
    const [refreshQuestion, setRefreshQuestion] = useState("");

    //get
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [editedCurrentPollQuestionTitle, setEditedCurrentPollQuestionTitle] = useState("");
    const [editedCurrentQuestionHasTimeLimit, setEditedCurrentQuestionHasTimeLimit] = useState(false);
    const [editedCurrentQuestionTimeLimit, setEditedCurrentQuestionTimeLimit] = useState("");

    const [questionTitleError, setQuestionTitleError] = useState({ value: false, errorMessage: "" });
    const [questionTimeLimitError, setQuestionTimeLimitError] = useState({ value: false, errorMessage: "" });


    React.useEffect(() => {
        fetch("http://localhost:8080/pollQuestion/" + props.pollQuestionId + "/pollQuestions")
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setCurrentQuestion(result);
                setEditedCurrentPollQuestionTitle(result.pollQuestionTitle)
                setEditedCurrentQuestionHasTimeLimit(result.hasTimeLimit)
                setEditedCurrentQuestionTimeLimit(result.questionTimeLimit)
                if (room != "") {
                    sendPollQuestionFromEffect(result.pollQuestionTitle)
                }
                setPollResponses([])
            });
    }, [props.pollQuestionId]);

    const refreshQuestionMethod = (e) => {
        fetch("http://localhost:8080/pollQuestion/" + props.pollQuestionId + "/pollQuestions")
            .then((res) => res.json())
            .then((result) => {
                setCurrentQuestion(result);
                setEditedCurrentPollQuestionTitle(result.pollQuestionTitle)
                setEditedCurrentQuestionHasTimeLimit(result.hasTimeLimit)
                setEditedCurrentQuestionTimeLimit(result.questionTimeLimit)
            });
    }


    //edit
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleClickEditDialogOpen = (event) => {
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };


    const updateQuestionTitle = async () => {
        var pollQuestionTitle = editedCurrentPollQuestionTitle
        var hasTimeLimit = editedCurrentQuestionHasTimeLimit
        var questionTimeLimit = editedCurrentQuestionTimeLimit
        const updatedQuestion = { pollQuestionTitle, hasTimeLimit, questionTimeLimit }
        updateQuestion(updatedQuestion)
        handleEditDialogClose()
    }

    const updateQuestion = async (body) => {
        try {
            console.log(body)
            const response = await fetch("http://localhost:8080/pollQuestion/pollQuestions/" + props.pollQuestionId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            // console.log(response);
            if (response.ok == false) {
                handleClickErrorSnackbar()
            } else {
                console.log("SET REFRESH PAGE CHILD TRUE")
                handleClickSnackbar()
                refreshQuestionMethod()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshQuestion(true)
        handleClickSnackbar()
    }

    const save = () => {
        updateQuestionTitle()
        props.setRefreshPageChild(true)
    };

    const renderVideoImageHolder = () => {
        if (currentQuestion.attachment) {
            if (currentQuestion.attachment.fileType.includes("image")) {
                return (
                    <div>
                        <img
                            src={currentQuestion.attachment.fileURL}
                            alt="Interactive Page Image"
                            width="100%"
                            height="100%"
                            objectFit="contain"
                        />
                    </div>
                );
            }
            else if (currentQuestion.attachment.fileType.includes("video")) {
                return (
                    <div style={{ height: '200px' }}>
                        <ReactPlayer className='video'
                            width='100%'
                            height='100%'
                            controls
                            url={currentQuestion.attachment.fileURL}
                        />
                    </div>
                );
            }
        } else {
            return <div style={{ textAlign: 'center' }}>
                <div>
                    There is no current file!
                </div>
            </div>
        }
    };

    const renderFileRemovalButton = () => {
        if (currentQuestion.attachment) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        className="btn-upload"
                        color="primary"
                        variant="contained"
                        component="span"
                        onClick={removeFileItem}
                    >
                        Remove File
                    </Button>
                </div>
            )
        }
    }

    const removeFileItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/pollQuestion/" + props.pollQuestionId + "/removeFileItem", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("File Item Removed Successfully!");
                handleClickSnackbar()
                refreshQuestionMethod()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        handleCloseUploadDialog();
    }

    const createNewFileItem = async (e) => {
        e.preventDefault();
        var attachmentId = uploadedAttachmentId
        const fileItemRequest = { attachmentId }
        console.log(fileItemRequest);
        try {
            const response = await fetch("http://localhost:8080/pollQuestion/" + props.pollQuestionId + "/addFileItem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fileItemRequest),
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("New File Item Created Successfully!");
                refreshQuestionMethod()
                handleClickSnackbar()
                setCurrentFile(undefined)
                setPreviewImage("https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg")
                setProgress(0)
                setMessage("")
                setIsError(false)
                setIsUploaded(false)
                setUploadedAttachmentId("")
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        handleCloseUploadDialog();
    }


    return (

        <div className="mainLayoutContainer">
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >Poll Updated Succesfully!</Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >Poll Updated Succesfully!</Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >Poll Updated Succesfully!</Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >Error!</Alert>
            </Snackbar>
            <div className="breadcrumbContainer">
            </div>
            <div className="secondaryLayoutContainer">
                <div className="slideLayoutContainer">
                    <Paper elevation={3} className="triviaLayoutContainerPoll">

                        <div className="roomContainerPoll" style={{ textAlign: "center", alignItems: 'center' }}>
                            <Typography variant="h5" style={{ fontStyle: "italic" }}>Room Pin:&nbsp;</Typography>
                            <Typography variant="h5" style={{ fontWeight: "bold" }}>{room ? room : "Not in Progress"}</Typography>
                        </div>

                        <div className="questionTitleContainerPoll" style={{ textAlign: "center", alignItems: 'center' }}>
                            <Typography variant="h3" style={{ fontWeight: "bold", margin: "1%" }}>{currentQuestion.pollQuestionTitle}</Typography>
                        </div>

                        {currentQuestion.attachment && <div className="mediaContainerPollLayout">
                            <div style={{ height: "100%", width: "100%", alignContent: "center", justifyContent: "center", display: "flex" }}>
                                <div style={{ width: "7%" }}></div>
                                <img src={currentQuestion.attachment.fileURL} style={{ height: "100%", width: "90%", objectFit: "contain" }} />
                                <div style={{ width: "7%", height: "100%" }}>
                                </div>
                            </div>
                        </div>
                        }

                        <div className="pollOptionsContainer">
                            {pollResponses.map((pollResponse) => (
                                <div className="pollBubble">
                                    <h1>{pollResponse.response}</h1>
                                    <h5 className="pollCorner">{pollResponse.author}</h5>
                                </div>
                            ))}
                        </div>
                    </Paper>
                </div>
                <div style={{ width: "20%", height: "100%" }}>
                    <div id="sidenavbar2" className="sidebarPage">
                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "85%" }}>
                                <h2>Session Settings</h2>
                                <Divider />
                            </div>
                        </div>
                        <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            {!activatedBoolean && props.pollQuestionId &&
                                <Button className="btn-upload" color="secondary" component="span" variant="outlined"
                                    onClick={activateQuestion}
                                    style={{ width: "80%", marginTop: "10px" }}
                                    startIcon={<AirplayIcon />}
                                >
                                    Activate
                                </Button>
                            }
                            {activatedBoolean && props.pollQuestionId &&
                                <Button className="btn-upload" color="secondary" component="span" variant="contained"
                                    onClick={deactivateQuestion}
                                    style={{ width: "80%", marginTop: "10px" }}
                                    startIcon={<AirplayIcon />}
                                >
                                    Deactivate
                                </Button>
                            }
                        </div>
                        <br></br>
                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "85%" }}>
                                <h2>Question Settings</h2>
                                <Divider />
                            </div>
                        </div>
                        {/* <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            <TextField id="outlined-basic" label="Time Limit (seconds)" fullWidth defaultValue="" required
                                style={{ margin: "20px 5px 0 0", width: "77%" }}
                                value={editedCurrentQuestionTimeLimit}
                                onChange={(e) => setEditedCurrentQuestionTimeLimit(e.target.value)}
                                error={questionTimeLimitError.value}
                                helperText={questionTimeLimitError.errorMessage}
                            />
                        </div>
                        <br /> */}
                        {/* <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            {props.pollQuestionId &&
                                <Button className="btn-upload" color="primary" component="span" variant="contained"
                                    onClick={save}
                                    style={{ width: "80%", marginTop: "10px" }}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            }
                        </div> */}
                        <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            {props.pollQuestionId &&
                                <Button className="btn-upload" color="primary" component="span" variant="contained"
                                    onClick={handleClickEditDialogOpen}
                                    style={{ width: "80%", marginTop: "10px" }}
                                    startIcon={<EditIcon />}
                                >
                                    Edit
                                </Button>
                            }
                        </div>
                        <br />

                        {/* <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "85%" }}>
                                <h2>Validity</h2>
                                <Divider />
                            </div>
                        </div>
                        <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>

                        </div> */}
                    </div>
                </div>
            </div>

            {/* <div>
                <Dialog
                    open={changesWasMadeDialogOpen}
                    onClose={closeChangesWasMadeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Prompt: Unsaved Changes"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            There are unsaved changes. Would you like to save the changes?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeChangesWasMadeDialog}>Cancel</Button>
                        <Button onClick={closeChangesWasMadeDialog} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>  */}

            <div>
                <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogContent>
                        <h3 style={{ fontWeight: 'normal' }}>Current File</h3>
                        {renderVideoImageHolder()}
                        {renderFileRemovalButton()}
                        <br></br>
                        <h3 style={{ fontWeight: 'normal' }}>New File</h3>
                        <div>
                            {previewImage && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img
                                        className="preview my20"
                                        src={previewImage}
                                        alt=""
                                        style={{ height: "40%", width: "40%", justifySelf: 'center' }}
                                    />
                                </div>
                            )}
                            {currentFile && (
                                <Box className="my20" display="flex" alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <ThemeProvider theme={theme}>
                                            <LinearProgress variant="determinate" value={progress} />
                                        </ThemeProvider>
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >{`${progress}%`}</Typography>
                                    </Box>
                                </Box>
                            )}
                            {message && (
                                <Typography
                                    variant="subtitle2"
                                    className={`upload-message ${isError ? "error" : ""}`}
                                >
                                    {message}
                                </Typography>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <label htmlFor="btn-upload">
                                    <input
                                        id="btn-upload"
                                        name="btn-upload"
                                        style={{ display: "none" }}
                                        type="file"
                                        accept="/*"
                                        onChange={selectFile}
                                    />
                                    <Button className="btn-choose" variant="outlined" component="span">
                                        Choose File
                                    </Button>
                                </label>
                                <Button
                                    className="btn-upload"
                                    color="primary"
                                    variant="contained"
                                    component="span"
                                    disabled={!currentFile}
                                    onClick={uploadFile}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseUploadDialog}>Cancel</Button>
                        <Button onClick={createNewFileItem}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={editDialogOpen} onClose={handleEditDialogClose} maxWidth={'md'} fullWidth={true}>
                    <DialogTitle>Edit Poll</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined-basic"
                            label="Question Title"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0", marginTop: "20px", backgroundColor: "white" }}
                            sx={{ width: "95%" }}
                            InputProps={{ sx: { height: 80, fontSize: "20px" } }}
                            InputLabelProps={{ sx: { fontSize: "22px", paddingTop: "5px" } }}
                            value={editedCurrentPollQuestionTitle}
                            required
                            onChange={(e) => setEditedCurrentPollQuestionTitle(e.target.value)}
                            error={questionTitleError.value}
                            helperText={questionTitleError.errorMessage}
                        />
                        <div className="mediaContainerPoll">
                            {!currentQuestion.attachment &&
                                <IconButton color="primary" aria-label="upload picture" component="label" style={{ height: "25%", top: "37%" }} onClick={handleOpenUploadDialog}>
                                    <AddPhotoAlternateIcon style={{ fontSize: "60px" }} />
                                </IconButton>
                            }
                            {currentQuestion.attachment &&
                                <div style={{ height: "100%", width: "100%", alignContent: "center", justifyContent: "center", display: "flex" }}>
                                    <div style={{ width: "7%" }}></div>
                                    <img src={currentQuestion.attachment.fileURL} style={{ padding: "5% 0", height: "100%", width: "84%", objectFit: "contain" }} />
                                    <div style={{ width: "7%", height: "100%" }}>
                                        <IconButton color="primary" aria-label="delete" style={{ top: "85%", right: "2%", objectFit: "contain" }} onClick={handleOpenUploadDialog}>
                                            <DeleteIcon style={{ fontSize: "30px" }} />
                                        </IconButton>
                                    </div>
                                </div>
                            }
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={updateQuestionTitle}>Edit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div >
    );
}