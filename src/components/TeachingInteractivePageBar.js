import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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

import "../css/TeachingInteractivePage.css";
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
import TextFieldsIcon from '@mui/icons-material/TextFields';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import QuizIcon from '@mui/icons-material/Quiz';

import {
    Typography,
    LinearProgress,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import UploadService from "../services/UploadFilesService";
import CreateInteractiveQuizForm from "../pages/CreateInteractiveQuizForm";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractivePageBar(props) {

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

    //upload
    const theme = createTheme({
        components: {
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        height: 15,
                        borderRadius: 5,
                    },
                    colorPrimary: {
                        backgroundColor: "#EEEEEE",
                    },
                    bar: {
                        borderRadius: 5,
                        backgroundColor: "#1a90ff",
                    },
                },
            },
        },
    });

    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(
        "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg"
    );
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadedAttachmentId, setUploadedAttachmentId] = useState("");

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
        })
            .then((response) => {
                setMessage("Succesfully Uploaded!");
                setUploadedAttachmentId(response.data.fileId);
                setIsError(false);
                setIsUploaded(true);
                console.log(response);
            })
            .catch((err) => {
                setMessage("Could not upload the image!");
                setIsError(true);
                setProgress(0);
                setCurrentFile(undefined);
            });
    };

    //paths
    const location = useLocation();
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const interactiveBookId = location.pathname.split("/")[4];
    // console.log(interactiveBookId); 

    const [refreshPageBar, setRefreshPageBar] = useState("");

    const [deleteMode, setDeleteMode] = useState(false);

    //  //retrieve all chapters of the book
    //  const [pageItems, setPageItems] = useState([]);

    //  React.useEffect(() => {
    //      setRefreshPageBar(false);
    //      fetch("http://localhost:8080/pageItem/interactivePage/" + props.pageId + "/pageItem")
    //          .then((res) => res.json())
    //          .then((result) => {
    //              setPageItems(result);
    //              console.log(result);
    //          });
    //  }, [refreshPageBar]);

    function createData(interactiveChapterId, chapterIndex, chapterTitle, chapterDescription) {
        return { interactiveChapterId, chapterIndex, chapterTitle, chapterDescription };
    }

    const chapters = [
        createData(1, 1, 'Plant Systems', "Hello"),
        createData(2, 2, 'Human Systems', "Hello"),
        createData(3, 3, 'Skeletal Systems', "Hello"),
    ]

    //create
    const [newTextItemWords, setNewTextItemWords] = useState("");

    const [pageItemXPositionError, setPageItemXPositionError] = useState({ value: false, errorMessage: "" });
    const [pageItemYPositionError, setPageItemYPositionError] = useState({ value: false, errorMessage: "" });

    const [open, setOpen] = React.useState(false);
    const [openUploadDialog, setOpenUploadDialog] = React.useState(false);

    //delete
    const [chapterIdToDelete, setChapterIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //edit
    const [editedChapterTitle, setEditedChapterTitle] = useState("");
    const [editedChapterDescription, setEditedChapterDescription] = useState("");
    const [chapterIdToEdit, setChapterIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);
    const [openCreateInteractiveQuizDialog, setOpenCreateInteractiveQuizDialog] = React.useState(false);

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

    const handleOpenCreateInteractiveQuizDialog = () => {
        setOpenCreateInteractiveQuizDialog(true);
    };

    const handleCloseInteractiveQuizDialog = () => {
        setOpenCreateInteractiveQuizDialog(false);
    };

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
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

    const addPageDescription = async (e) => {
        e.preventDefault();
        var pageDescription = newTextItemWords
        var pageNumber = props.pageNumber
        const editedPage = { pageDescription, pageNumber }
        try {
            const response = await fetch("http://localhost:8080/interactivePage/interactivePages/" + props.pageId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedPage),
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Page Description Updated Successfully!");
                handleClickSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshPageBar(true)
        props.setRefreshInteractivePage(true)
        handleClose();
    }

    const createNewFileItem = async (e) => {
        e.preventDefault();
        var attachmentId = uploadedAttachmentId
        const fileItemRequest = { attachmentId }
        console.log(fileItemRequest);
        try {
            const response = await fetch("http://localhost:8080/interactivePage/" + props.pageId + "/addFileItem", {
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
                handleClickSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshPageBar(true)
        props.setRefreshInteractivePage(true)
        handleCloseUploadDialog();
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
        setRefreshPageBar(true);
        handleDeleteDialogClose();
        handleClickDeleteSnackbar();
    };

    // const editChapter = async (e) => {
    //     e.preventDefault();
    //     setPageItemXPositionError({ value: false, errorMessage: "" });
    //     setPageItemYPositionError({ value: false, errorMessage: "" });
    //     const editedChapter = { interactiveChapterTitle, interactiveChapterDescription }
    //     console.log(editedChapter);
    //     try {
    //         const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + chapterIdToEdit, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(editedChapter),
    //         })
    //         console.log(response);
    //         if (response.ok == false) {
    //             console.log("Error");
    //             handleClickErrorSnackbar()
    //         } else {
    //             console.log("Interactive Chapter Edited Successfully!");
    //             handleClickSnackbar()
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         handleClickErrorSnackbar()
    //     }
    //     setRefreshPageBar(true);
    //     handleEditDialogClose();
    //     handleClickEditSnackbar();
    // }

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
        chapterId,
        chapterTitle,
        chapterDescription
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
            <div id="sidenavbar2" className="sidebarPage">
                <div style={{ width: "100%", display: "flex" }}>
                    <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleClickOpen}
                        style={{ width: "10%", marginRight: "10px", marginLeft: '20px' }}
                    >
                        <TextFieldsIcon />
                    </Button>
                    <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleOpenUploadDialog}
                        style={{ width: "10%", marginRight: "10px" }}
                    >
                        <InsertPhotoIcon />
                    </Button>
                    <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleOpenCreateInteractiveQuizDialog}
                        style={{ width: "10%", marginRight: "10px" }}
                    >
                        <QuizIcon />
                    </Button>
                </div>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "85%" }}>
                        <h2>Page Toolbar</h2>
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
                        {/* {props.pageItems.map((pageItem) => (
                            <div>
                                <div className="pageLine">{pageItem.pageItemId}</div>
                                <Divider />
                            </div>
                        ))} */}
                    </div>
                }
                {deleteMode &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                        {/* {props.pageItems.map((pageItem) => (
                            <div>
                                <div style={{ width: "100%", display: "flex" }}>
                                    <div style={{ width: "10%", paddingLeft: "8px" }}>
                                        <IconButton
                                            aria-label="settings"
                                            onClick={(event) => handleClickDeleteDialogOpen(event, pageItem.pageItemId)}
                                        >
                                            <RemoveCircleIcon style={{ color: "red" }} />
                                        </IconButton>
                                    </div>
                                    <div className="deleteJiggle" style={{ width: "85%", paddingLeft: "8px" }} >
                                        <div className="pageLine">{pageItem.pageItemId}</div>
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        ))} */}
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
                    Page Item Created Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                    Page Item Deleted Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >
                    Page Item Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >
                    Error!
                </Alert>
            </Snackbar>
            <div>
                <Dialog open={openCreateInteractiveQuizDialog} onClose={handleCloseInteractiveQuizDialog}>
                    <DialogTitle>Add Quiz Question</DialogTitle>
                    <DialogContent>
                        {/* <CreateInteractiveQuizForm></CreateInteractiveQuizForm> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseInteractiveQuizDialog}>Cancel</Button>
                        <Button onClick={addPageDescription}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Page Description</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined-multiline-static" multiline rows={6}
                            label="Text"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newTextItemWords}
                            onChange={(e) => setNewTextItemWords(e.target.value)}
                        // error={pageItemYPositionError.value}
                        // helperText={pageItemYPositionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addPageDescription}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={openUploadDialog} onClose={handleCloseUploadDialog}>
                    <DialogTitle>Upload File</DialogTitle>
                    <DialogContent>
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
                        <Button onClick={createNewFileItem}>Add</Button>
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
        </div>
    );
}

export default TeachingInteractivePageBar;
