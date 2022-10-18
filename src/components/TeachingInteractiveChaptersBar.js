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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractiveChaptersBar(props) {

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

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
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
        if (prevOpenMenu.current === true && openMenu === false) {
            anchorRef.current.focus();
        }

        prevOpenMenu.current = openMenu;
    }, [openMenu]);

    //paths
    const location = useLocation();
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const bookId = location.pathname.split("/")[4];

    const [refreshPage, setRefreshPage] = useState("");

    const [deleteMode, setDeleteMode] = useState(false);

    // //retrieve all
    // const [books, setBooks] = useState([]);

    // React.useEffect(() => {
    //     setRefreshPage(false);
    //     fetch("http://localhost:8080/interactiveBooks/courses/" + bookId + "/interactiveBookss")
    //         .then((res) => res.json())
    //         .then((result) => {
    //             setBooks(result);
    //             console.log(result);
    //         });
    // }, [refreshPage]);

    function createData(interactiveChapterId, chapterIndex, chapterTitle, chapterDescription) {
        return { interactiveChapterId, chapterIndex, chapterTitle, chapterDescription };
    }

    const chapters = [
        createData(1, 1, 'Plant Systems', "Hello"),
        createData(2, 2, 'Human Systems', "Hello"),
        createData(3, 3, 'Skeletal Systems', "Hello"),
        createData(4, 4, 'Muscular Systems', "Hello"),
        createData(5, 5, 'Digestive Systems', "Hello"),
        createData(6, 6, 'Circulatory Systems', "Hello"),
        createData(7, 7, 'Planet Systems', "Hello"),
        createData(8, 8, 'World Systems', "Hello"),
    ]

    //create
    const [newChapterTitle, setNewChapterTitle] = useState("");
    const [newChapterDescription, setNewChapterDescription] = useState("");

    const [chapterTitleError, setChapterTitleError] = useState({ value: false, errorMessage: "" });
    const [chapterDescriptionError, setChapterDescriptionError] = useState({ value: false, errorMessage: "" });

    const [open, setOpen] = React.useState(false);

    //delete
    const [chapterIdToDelete, setChapterIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //edit
    const [editedChapterTitle, setEditedChapterTitle] = useState("");
    const [editedChapterDescription, setEditedChapterDescription] = useState("");
    const [chapterIdToEdit, setChapterIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
    };

    const toggleDeleteMode = () => {
        if (deleteMode) {
            setDeleteMode(false)
        } else {
            setDeleteMode(true)
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDeleteDialogOpen = (event, chapterId) => {
        setChapterIdToDelete(chapterId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = (event, chapterId, chapterTitle) => {
        setEditedChapterTitle(chapterTitle);
        setChapterIdToEdit(chapterId);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const createNewChapter = async (e) => {
        e.preventDefault();
        setChapterTitleError({ value: false, errorMessage: "" });
        setChapterDescriptionError({ value: false, errorMessage: "" });
        if (newChapterTitle == "") {
            setChapterTitleError({ value: true, errorMessage: "Interactive Chapter title cannot be empty!" });
        }
        if (newChapterDescription == "") {
            setChapterDescriptionError({ value: true, errorMessage: "Interactive Chapter description cannot be empty!" });
        }
        if (newChapterTitle && newChapterDescription) {
            var chapterTitle = newChapterTitle
            var chapterDescription = newChapterDescription
            const newChapter = { chapterTitle, chapterDescription }
            console.log(newChapter);
            try {
                const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + bookId + "/interactiveChapters", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newChapter),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("New Chapter Created Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleClose();
            handleClickSnackbar();
            setNewChapterTitle("");
        };
    }

    const deleteChapter = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + chapterIdToDelete, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Interactive Chapter Deleted Successfully!");
                handleClickDeleteSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshPage(true);
        handleDeleteDialogClose();
        handleClickDeleteSnackbar();
    };

    const editChapter = async (e) => {
        e.preventDefault();
        setChapterTitleError({ value: false, errorMessage: "" });
        setChapterDescriptionError({ value: false, errorMessage: "" });
        if (newChapterTitle == "") {
            setChapterTitleError({ value: true, errorMessage: "Interactive Chapter title cannot be empty!" });
        }
        if (newChapterDescription == "") {
            setChapterDescriptionError({ value: true, errorMessage: "Interactive Chapter description cannot be empty!" });
        }
        if (newChapterTitle && newChapterDescription) {
            var interactiveChapterTitle = newChapterTitle
            var interactiveChapterDescription = newChapterDescription
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
            setRefreshPage(true);
            handleEditDialogClose();
            handleClickEditSnackbar();
        };
    }

    const renderEmptyRowMessage = () => {
        if (chapters.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                        There are currently no interactive chapters in this book!
                    </TableCell>
                </TableRow>
            );
        }
    };

    const renderExtraActions = (
        bookId,
        bookTitle,
        bookMaxScore
    ) => {
        return (
            <div>
                <IconButton
                    aria-label="settings"
                    onClick={(event) => handleClickDeleteDialogOpen(event, chapterIdToDelete)}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    aria-label="settings"
                    onClick={(event) =>
                        handleClickEditDialogOpen(event, chapterIdToEdit, editedChapterTitle, editedChapterDescription)
                    }
                >
                    <EditIcon />
                </IconButton>
            </div>
        );
    };

    return (
        <div>
            <div id="sidenavbar" className="sidebar">
                {/* <a href="#" className="settings" onclick="closeNav()"><SettingsIcon /></a> */}
                <div style={{ float: 'left' }}>
                    <Link to={`${booksPath}`} style={{ textDecoration: 'none' }}>
                        <Button variant="text" style={{ fontSize: '10px' }}>
                            <ArrowBackIcon />
                        </Button>
                    </Link>
                </div>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "85%" }}>
                        <h2>Interactive Chapters</h2>
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
                                                    <MenuItem onClick={handleClickDeleteDialogOpen}>
                                                        <DeleteIcon style={{ color: 'grey' }} />
                                                        &nbsp;
                                                        Delete All Chapters
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClickDeleteDialogOpen}>
                                                        <LowPriorityIcon style={{ color: 'grey' }} />
                                                        &nbsp;
                                                        Reorder Chapters
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
                {renderEmptyRowMessage}
                {deleteMode == false &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                        {chapters.map((chapter) => (
                            <div>
                                <div className="chapterLine">Chapter {chapter.chapterIndex} - {chapter.chapterTitle}</div>
                                <Divider />
                            </div>
                        ))}
                    </div>
                }
                {deleteMode &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                        {chapters.map((chapter) => (
                            <div>
                                <div style={{ width: "100%", display: "flex" }}>
                                    <div style={{ width: "10%", paddingLeft: "8px" }}>
                                        <IconButton
                                            aria-label="settings"
                                            onClick={(event) => handleClickDeleteDialogOpen(event)}
                                        >
                                            <RemoveCircleIcon style={{ color: "red" }} />
                                        </IconButton>
                                    </div>
                                    <div className="deleteJiggle" style={{ width: "85%", paddingLeft: "8px" }} >
                                        <div className="chapterLine">Chapter {chapter.chapterIndex} - {chapter.chapterTitle}</div>
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
                    <DialogTitle>Create New Interactive Chapter</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined-basic"
                            label="Interactive Chapter Title"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newChapterTitle}
                            onChange={(e) => setNewChapterTitle(e.target.value)}
                            error={chapterTitleError.value}
                            helperText={chapterTitleError.errorMessage}
                        />
                        <TextField
                            id="outlined-multiline-static" multiline rows={6}
                            label="Interactive Chapter Description"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newChapterDescription}
                            onChange={(e) => setNewChapterDescription(e.target.value)}
                            error={chapterDescriptionError.value}
                            helperText={chapterDescriptionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewChapter}>Create</Button>
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
                        {"Delete this interactive chapter?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will delete all the pages inside the
                            chapter. You will not be able to undo this action. Are you sure you
                            want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deleteChapter} autoFocus>
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
                        {"You are editing this interactive chapter"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new interactive chapter details
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
                            error={chapterDescriptionError.value}
                            helperText={chapterDescriptionError.errorMessage}
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
                            error={chapterDescriptionError.value}
                            helperText={chapterDescriptionError.errorMessage}
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
                            value={newChapterTitle}
                            onChange={(e) => setNewChapterTitle(e.target.value)}
                            error={chapterTitleError.value}
                            helperText={chapterTitleError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Interactive Book Max Score"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newChapterDescription}
                            onChange={(e) => setNewChapterDescription(e.target.value)}
                            error={chapterDescriptionError.value}
                            helperText={chapterDescriptionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSettings}>Cancel</Button>
                        <Button onClick={createNewChapter}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default TeachingInteractiveChaptersBar;
