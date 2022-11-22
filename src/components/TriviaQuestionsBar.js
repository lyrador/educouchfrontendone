import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
import TeachingCoursesDrawer from "./TeachingCoursesDrawer";
import { Grid } from "@mui/material";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

import { Button } from "@mui/material";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Divider from '@mui/material/Divider';

import "../css/TeachingInteractiveBook.css";
import InteractiveBookDrawer from "./InteractiveBookDrawer";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloseIcon from '@mui/icons-material/Close';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import tick from "../assets/accept.png";
import warning from "../assets/warning.png";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TriviaQuestionBar(props) {

    const questionTypeEnums = [{ value: "Four Options" }, { value: "True or False" }];

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

    //settings menu
    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => { setOpenMenu((prevOpen) => !prevOpen) };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) { return }
        setOpenMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        } else if (event.key === 'Escape') {
            setOpenMenu(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpenMenu = React.useRef(openMenu);
    React.useEffect(() => {
        if (prevOpenMenu.current === true && openMenu === false) { anchorRef.current.focus() }
        prevOpenMenu.current = openMenu;
    }, [openMenu]);

    //paths
    const location = useLocation();
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const triviaQuizId = location.pathname.split("/")[5];

    const [deleteMode, setDeleteMode] = useState(false);

    //create
    const [newQuestionTitle, setNewQuestionTitle] = useState("");
    const [newQuestionHasTimeLimit, setNewQuestionHasTimeLimit] = useState(false);
    const [newQuestionTimeLimit, setNewQuestionTimeLimit] = useState("");
    const [newQuestionType, setNewQuestionType] = useState("Four Options");
    const handleChangeNewQuestionType = (event) => {
        setNewQuestionType(event.target.value);
    };

    const [questionTitleError, setQuestionTitleError] = useState({ value: false, errorMessage: "" });
    const [questionTimeLimitError, setQuestionTimeLimitError] = useState({ value: false, errorMessage: "" });

    const handleSelectQuestionHasTimeLimit = (event) => {
        setNewQuestionHasTimeLimit(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //delete
    const [triviaQuestionIdToDelete, setTriviaQuestionIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [deleteAllDialogOpen, setDeleteAllDialogOpen] = React.useState(false);

    const handleClickDeleteDialogOpen = (event, triviaQuestionId) => {
        setTriviaQuestionIdToDelete(triviaQuestionId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const toggleDeleteMode = () => {
        if (deleteMode) {
            setDeleteMode(false)
        } else {
            setDeleteMode(true)
        }
    };

    const handleClickDeleteAllDialogOpen = (event) => {
        setDeleteAllDialogOpen(true);
    };

    const handleDeleteAllDialogClose = () => {
        setDeleteAllDialogOpen(false);
    };

    //edit
    const [editedChapterTitle, setEditedChapterTitle] = useState("");
    const [editedChapterDescription, setEditedChapterDescription] = useState("");
    const [chapterIdToEdit, setChapterIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);

    const handleClickEditDialogOpen = (event, chapterId, chapterTitle) => {
        setEditedChapterTitle(chapterTitle);
        setChapterIdToEdit(chapterId);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    //reorder
    const [reorderDialogOpen, setReorderDialogOpen] = React.useState(false);


    const handleClickReorderDialogOpen = (event) => {
        setReorderDialogOpen(true);
    };

    const handleReorderDialogClose = () => {
        setReorderDialogOpen(false);
    };

    function handleOnDragEnd(result) {
        console.log(result)
        const questionItems = Array.from(props.questionsToBeReordered)
        const [reorderedQuestionItem] = questionItems.splice(result.source.index, 1)
        questionItems.splice(result.destination.index, 0, reorderedQuestionItem)
        props.setQuestionsToBeReordered(questionItems)
        console.log(props.questionsToBeReordered)
    }

    //settings
    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    //changes was made dialog
    const [changesWasMadeDialogOpen, setChangesWasMadeDialogOpen] = React.useState(false);
    const openChangesWasMadeDialog = () => {
        setChangesWasMadeDialogOpen(true);
    };

    const closeChangesWasMadeDialog = () => {
        setChangesWasMadeDialogOpen(false);
    };

    const handleQuestionChange = (event, questionId, questionNumber) => {
        // props.setCheckForChanges(true)
        // if (props.changesToQuestionWasMade || props.questionIdToBrowse == "") {
        props.setQuestionIdToBrowse(questionId)
        props.setQuestionNumberToBrowse(questionNumber)
        // }
        // props.setCheckForChanges(false)
    };

    const createNewQuestion = async (e) => {
        e.preventDefault();
        setQuestionTitleError({ value: false, errorMessage: "" });
        setQuestionTimeLimitError({ value: false, errorMessage: "" });
        if (newQuestionTitle == "") {
            setQuestionTitleError({ value: true, errorMessage: "Question title cannot be empty!" });
        }
        // if (newQuestionHasTimeLimit == true && newQuestionTimeLimit == "") {
        //     setQuestionTimeLimitError({ value: true, errorMessage: "Question time limit cannot be empty!" });
        // }
        if (newQuestionTimeLimit == "") {
            setQuestionTimeLimitError({ value: true, errorMessage: "Question time limit cannot be empty!" });
        }
        if (newQuestionTitle && newQuestionTimeLimit) {
            var questionTitle = newQuestionTitle
            var hasTimeLimit = false
            var questionTimeLimit = newQuestionTimeLimit
            var triviaQuestionType = newQuestionType
            const newQuestion = { questionTitle, hasTimeLimit, questionTimeLimit, triviaQuestionType }
            console.log(newQuestion);
            try {
                const response = await fetch("http://localhost:8080/triviaQuestion/" + triviaQuizId + "/triviaQuestions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newQuestion),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("New Question Created Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            props.setRefreshPageChild(true)
            handleClose();
            handleClickSnackbar();
            setNewQuestionTitle("");
            setNewQuestionTimeLimit("")
        };
    }

    const deleteQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/triviaQuestion/triviaQuestions/" + triviaQuestionIdToDelete, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Trivia Question Deleted Successfully!");
                handleClickDeleteSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        props.setRefreshPageChild(true);
        handleDeleteDialogClose();
        handleClickDeleteSnackbar();
    };

    const deleteAllChapters = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + triviaQuizId + "/deleteAll", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("All Interactive Chapters Deleted Successfully!");
                handleClickDeleteSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        props.setRefreshPageChild(true);
        handleDeleteAllDialogClose();
        handleClickDeleteSnackbar();
    };

    const editChapter = async (e) => {
        e.preventDefault();
        setQuestionTitleError({ value: false, errorMessage: "" });
        setQuestionTimeLimitError({ value: false, errorMessage: "" });
        if (newQuestionTitle == "") {
            setQuestionTitleError({ value: true, errorMessage: "Interactive Chapter title cannot be empty!" });
        }
        if (newQuestionTimeLimit == "") {
            setQuestionTimeLimitError({ value: true, errorMessage: "Interactive Chapter description cannot be empty!" });
        }
        if (newQuestionTitle && newQuestionTimeLimit) {
            var interactiveChapterTitle = newQuestionTitle
            var interactiveChapterDescription = newQuestionTimeLimit
            const editedChapter = { interactiveChapterTitle, interactiveChapterDescription }
            console.log(editedChapter);
            try {
                const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + chapterIdToEdit, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedChapter),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Interactive Chapter Edited Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            props.setRefreshPageChild(true);
            handleEditDialogClose();
            handleClickEditSnackbar();
        };
    }

    const reorderQuestions = async (e) => {
        e.preventDefault();
        for (var i = 0; i < props.questionsToBeReordered.length; i++) {
            props.questionsToBeReordered[i].questionNumber = i + 1
        }
        try {
            const response = await fetch("http://localhost:8080/triviaQuestion/triviaQuiz/" + triviaQuizId + "/reorderQuestions", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(props.questionsToBeReordered),
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Questions Reordered Successfully!");
                handleClickSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        props.setRefreshPageChild(true);
        handleReorderDialogClose();
        handleClickEditSnackbar();
    }

    const renderEmptyRowMessage = () => {
        if (props.questions.length === 0) {
            return (
                <div>
                    <div className="chapterLine" style={{ textAlign: 'center' }}>
                        There are no questions!
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <div id="sidenavbar" className="sidebar">
                <div style={{ float: 'left' }}>
                    <Link to={`${booksPath}`} style={{ textDecoration: 'none' }}>
                        <Button variant="text" style={{ fontSize: '10px' }}>
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                </div>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "85%" }}>
                        <h2>Questions</h2>
                    </div>
                    <div style={{ width: "5%" }} >
                        <div>
                            <IconButton
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={openMenu ? 'composition-menu' : undefined}
                                aria-expanded={openMenu ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <SettingsIcon />
                            </IconButton>
                            <Popper
                                open={openMenu}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom-start"
                                transition
                                disablePortal
                                style={{
                                    zIndex: 10
                                }}
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseMenu}>
                                                <MenuList
                                                    autoFocusItem={openMenu}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <MenuItem onClick={handleClickDeleteAllDialogOpen}>
                                                        <DeleteIcon style={{ color: 'grey' }} />
                                                        &nbsp;
                                                        Delete All Questions
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClickReorderDialogOpen}>
                                                        <LowPriorityIcon style={{ color: 'grey' }} />
                                                        &nbsp;
                                                        Reorder Questions
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </div>
                </div>
                <Divider />
                {renderEmptyRowMessage()}
                {deleteMode == false &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                        {props.questions.map((question) => (
                            <div>
                                <Button onClick={(event) => handleQuestionChange(event, question.triviaQuestionId, question.questionNumber)} fullWidth
                                    style={{ justifyContent: "flex-start", textTransform: 'none', backgroundColor: props.questionIdToBrowse == question.triviaQuestionId ? "#e5e5e5" : "" }}>
                                    <div className="chapterLine" style={{ width: "90%", textAlign: "left" }}>Q{question.questionNumber} - {question.questionTitle}</div>
                                    {question.questionIsValid &&
                                        <div style={{ float: "right", textAlign: "right" }}>
                                            <img src={tick} style={{ height: "20px", width: "20px", objectFit: "contain", marginTop: "6px" }} />
                                        </div>
                                    }
                                    {!question.questionIsValid &&
                                        <div style={{ float: "right", textAlign: "right" }}>
                                            <img src={warning} style={{ height: "20px", width: "20px", objectFit: "contain", marginTop: "6px" }} />
                                        </div>
                                    }
                                </Button>
                                <Divider />
                            </div>
                        ))}
                    </div>
                }
                {deleteMode &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                        {props.questions.map((question) => (
                            <div>
                                <div style={{ width: "100%", display: "flex" }}>
                                    <div style={{ width: "10%", paddingLeft: "10px", paddingTop: '6px' }}>
                                        <IconButton
                                            aria-label="settings"
                                            onClick={(event) => handleClickDeleteDialogOpen(event, question.triviaQuestionId)}
                                        >
                                            <RemoveCircleIcon style={{ color: "red" }} />
                                        </IconButton>
                                    </div>
                                    <div className="deleteJiggle" style={{ width: "85%", paddingLeft: "8px" }} >
                                        <Button fullWidth style={{ justifyContent: "flex-start" }}>
                                            <div className="chapterLine">Q{question.questionNumber} - {question.questionTitle}</div>
                                        </Button>
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        ))}
                    </div>
                }
                <div style={{ height: "10%" }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <Button
                            className="btn-upload"
                            color="primary"
                            component="span"
                            variant="contained"
                            onClick={handleClickOpen}
                            style={{ width: "40%", marginRight: "10px" }}
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                        {deleteMode == false &&
                            <Button
                                className="btn-upload"
                                color="secondary"
                                component="span"
                                variant="contained"
                                onClick={toggleDeleteMode}
                                style={{
                                    width: "40%",
                                    // backgroundColor: "tomato"
                                }}
                                startIcon={<DeleteIcon />}
                            >
                                Remove
                            </Button>
                        }

                        {deleteMode == true &&
                            <Button
                                className="btn-upload"
                                color="secondary"
                                component="span"
                                variant="contained"
                                onClick={toggleDeleteMode}
                                style={{
                                    width: "40%",
                                    backgroundColor: "grey"
                                }}
                                startIcon={<CloseIcon />}
                            >
                                Cancel
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Chapter Created Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Chapter Deleted Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Chapter Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >
                    Error!
                </Alert>
            </Snackbar>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Trivia Question</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined-basic"
                            label="Trivia Question Title"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newQuestionTitle}
                            onChange={(e) => setNewQuestionTitle(e.target.value)}
                            error={questionTitleError.value}
                            helperText={questionTitleError.errorMessage}
                        />
                        <TextField id="outlined-select-age" select label="Question Type" fullWidth
                            style={{ margin: '6px 0' }}
                            value={newQuestionType}
                            onChange={handleChangeNewQuestionType}
                            required
                        >
                            {questionTypeEnums.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* <FormControl>
                            <FormLabel id="controlled-radio-buttons-group">Has Time Limit</FormLabel>
                            <RadioGroup
                                aria-labelledby="controlled-radio-buttons-group"
                                name="radio-buttons-group"
                                value={newQuestionHasTimeLimit}
                                onChange={handleSelectQuestionHasTimeLimit}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl> */}
                        <TextField
                            id="outlined-basic"
                            label="Trivia Question Time Limit (Seconds)"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newQuestionTimeLimit}
                            onChange={(e) => setNewQuestionTimeLimit(e.target.value)}
                            error={questionTimeLimitError.value}
                            helperText={questionTimeLimitError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewQuestion}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this question?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will not be able to undo this action. Are you sure you
                            want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteQuestion} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={deleteAllDialogOpen}
                    onClose={handleDeleteAllDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete all questions?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You will not be able to undo this action.
                            Are you sure you want to delete all the questions?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteAllDialogClose}>Cancel</Button>
                        <Button onClick={deleteAllChapters} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are editing this question"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new question details
                        </DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="Interactive Chapter Title"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedChapterTitle}
                            required
                            onChange={(e) => setEditedChapterTitle(e.target.value)}
                            error={questionTimeLimitError.value}
                            helperText={questionTimeLimitError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Interactive Chapter Description"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedChapterDescription}
                            required
                            onChange={(e) => setEditedChapterDescription(e.target.value)}
                            error={questionTimeLimitError.value}
                            helperText={questionTimeLimitError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editChapter} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={openSettings} onClose={handleCloseSettings}>
                    <DialogTitle>Interactive Chapters Settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You are in the chapters settings
                        </DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="Interactive Book Title"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newQuestionTitle}
                            onChange={(e) => setNewQuestionTitle(e.target.value)}
                            error={questionTitleError.value}
                            helperText={questionTitleError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Interactive Book Max Score"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newQuestionTimeLimit}
                            onChange={(e) => setNewQuestionTimeLimit(e.target.value)}
                            error={questionTimeLimitError.value}
                            helperText={questionTimeLimitError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSettings}>Cancel</Button>
                        <Button onClick={createNewQuestion}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={reorderDialogOpen} onClose={handleReorderDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth={'sm'} fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Chapter Re-Ordering"}
                    </DialogTitle>
                    <DialogContent>
                        <div style={{ width: '60%', margin: 'auto', display: 'flex' }}>
                            <div style={{ width: '15%' }}>
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div style={{ borderStyle: 'solid', borderWidth: '1px', margin: '0 4px 2px 0', width: '100%', textAlign: 'center', backgroundColor: 'cadetblue' }}>
                                                <h3>New</h3>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul style={{ listStyleType: 'none' }}>
                                    {props.questionsToBeReordered.map(({ questionNumber, chapterTitle }, index) => {
                                        return (
                                            <li>
                                                <div style={{ display: 'flex', width: '100%' }}>
                                                    <div style={{ borderStyle: 'solid', borderWidth: '1px', margin: '0 4px 2px 0', width: '100%', textAlign: 'center', backgroundColor: 'aquamarine' }}>
                                                        <h3>{index + 1}</h3>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div style={{ width: '85%' }}>
                                <ul style={{ listStyleType: 'none' }}>
                                    <li>
                                        <div style={{ display: 'flex', width: '100%' }}>
                                            <div style={{ borderStyle: 'solid', borderWidth: '1px', marginBottom: '2px', width: '100%', textAlign: 'center', backgroundColor: 'cadetblue' }}>
                                                <h3 style={{ marginLeft: '5px' }}>Previous</h3>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="chaptersReordering">
                                        {(provided) =>
                                            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyleType: 'none' }}>
                                                {props.questionsToBeReordered.map(({ questionNumber, questionTitle }, index) => {
                                                    return (
                                                        <Draggable key={questionNumber} draggableId={questionNumber} index={index}>
                                                            {(provided) => (
                                                                <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                    <div style={{ display: 'flex', width: '100%' }}>
                                                                        {((index + 1).toString() == questionNumber) &&
                                                                            <div style={{ borderStyle: 'solid', borderWidth: '1px', marginBottom: '2px', width: '100%', borderRadius: '10px' }}>
                                                                                <h3 style={{ marginLeft: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{questionNumber} - {questionTitle}</h3>
                                                                            </div>
                                                                        }
                                                                        {((index + 1).toString() != questionNumber) &&
                                                                            <div style={{ borderStyle: 'solid', borderWidth: '1px', marginBottom: '2px', width: '100%', borderRadius: '10px', backgroundColor: 'yellow' }}>
                                                                                <h3 style={{ marginLeft: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{questionNumber} - {questionTitle}</h3>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </li>
                                                            )}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </ul>
                                        }
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleReorderDialogClose}>Cancel</Button>
                        <Button onClick={reorderQuestions} autoFocus>
                            Reorder
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
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
            </div>
        </div>
    );
}
