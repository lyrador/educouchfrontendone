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
import CreateQuizForm from "../pages/CreateQuizForm";
import CreateAssessment from "../pages/CreateAssessment";
import ReactPlayer from "react-player";
import InfoIcon from '@mui/icons-material/Info';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditInteractiveQuizPage from "../pages/EditInteractiveQuizPage";
import EditQuizPage from "../pages/EditQuizPage";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractivePageBar(props) {

    //snackbar    
    const [openChapterSnackbar, setOpenChapterSnackbar] = React.useState(false);
    const handleClickChapterSnackbar = () => { setOpenChapterSnackbar(true) };
    const handleCloseChapterSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenChapterSnackbar(false) };

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
    const [refreshToolbar, setRefreshToolbar] = React.useState("");

    //retrieve chapter
    const [chapter, setChapter] = useState([]);

    React.useEffect(() => {
        setRefreshToolbar(false)
        console.log("CAPSTONE")
        console.log(props.chapterId)
        fetch("http://localhost:8080/interactiveChapter/" + props.chapterId + "/interactiveChapters")
            .then((res) => res.json())
            .then((result) => {
                setChapter(result);
                setPagesToBeReorderedMethod(result.interactivePages)
                console.log(result);
            });
    }, [refreshToolbar || props.refreshInteractivePage]);

    React.useEffect(() => {
        setRefreshToolbar(false)
        console.log("CAPSTONE")
        console.log(props.chapterId)
        fetch("http://localhost:8080/interactiveChapter/" + props.chapterId + "/interactiveChapters")
            .then((res) => res.json())
            .then((result) => {
                setChapter(result);
                setPagesToBeReorderedMethod(result.interactivePages)
                console.log(result);
            });
    }, [props.chapterId]);

    //retrieve all chapters of the book
    const [pagesToBeReordered, setPagesToBeReordered] = useState([]);

    const setPagesToBeReorderedMethod = (pages) => {
        const retrievedPagesToBeReordered = new Array()
        for (const retrievedPage of pages) {
            var pageId = retrievedPage.interactivePageId
            var pageNumber = retrievedPage.pageNumber.toString()
            var pageTitle = retrievedPage.pageTitle
            const tempPage = { pageId, pageNumber, pageTitle }
            retrievedPagesToBeReordered.push(tempPage)
            console.log(retrievedPage);
        }
        setPagesToBeReordered(retrievedPagesToBeReordered)
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
        const pageItems = Array.from(pagesToBeReordered)
        const [reorderedPageItem] = pageItems.splice(result.source.index, 1)
        pageItems.splice(result.destination.index, 0, reorderedPageItem)
        setPagesToBeReordered(pageItems)
        console.log(pagesToBeReordered)
    }

    const reorderPages = async (e) => {
        e.preventDefault();
        for (var i = 0; i < pagesToBeReordered.length; i++) {
            pagesToBeReordered[i].pageNumber = i + 1
        }
        try {
            const response = await fetch("http://localhost:8080/interactivePage/" + props.chapterId + "/interactivePages/reorderInteractivePages", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pagesToBeReordered),
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Interactive Pages Reordered Successfully!");
                props.setRefreshInteractivePage(true);
                handleClickSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshToolbar(true);
        handleReorderDialogClose();
        handleClickEditSnackbar();
    }

    //create
    const [newTextItemWords, setNewTextItemWords] = useState("");
    const [title, setTitle] = useState("");

    const [chapterTitleError, setChapterTitleError] = useState({ value: false, errorMessage: "" });
    const [chapterDescriptionError, setChapterDescriptionError] = useState({ value: false, errorMessage: "" });

    const [open, setOpen] = React.useState(false);
    const [openUploadDialog, setOpenUploadDialog] = React.useState(false);

    //edit
    const [editedChapterTitle, setEditedChapterTitle] = useState("");
    const [editedChapterDescription, setEditedChapterDescription] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [openCreateInteractiveQuizDialog, setOpenCreateInteractiveQuizDialog] = React.useState(false);

    //text
    const handleClickOpen = () => {
        setTitle(props.currentPage.pageTitle)
        setNewTextItemWords(props.currentPage.pageDescription)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //quiz
    const handleOpenCreateInteractiveQuizDialog = () => {
        setOpenCreateInteractiveQuizDialog(true);
    };

    const handleCloseInteractiveQuizDialog = () => {
        setOpenCreateInteractiveQuizDialog(false);
    };

    //file
    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    };

    //delete page
    const [pageIdToDelete, setPageIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleClickDeleteDialogOpen = (event) => {
        setPageIdToDelete(props.pageId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    //when delete the pageId of the current page, the page numbers on the navigation bar adjusts however the page number in the db table doesnt, so somehow need to update the page number in DB
    const deletePage = async (e) => {
        e.preventDefault();
        var currentPageNum = props.pageNumber
        if (currentPageNum - 1 != 0) {
            currentPageNum = currentPageNum - 1
        }
        try {
            const response = await fetch("http://localhost:8080/interactivePage/interactivePages/" + pageIdToDelete, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Interactive Page Deleted Successfully!");
                handleClickDeleteSnackbar()
                props.setPageNumberPointer(currentPageNum)
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        props.setRefreshInteractivePage(true);
        setRefreshToolbar(true)
        handleDeleteDialogClose();
        handleClickDeleteSnackbar();
    };

    //edit chapter
    const handleClickEditDialogOpen = (event, chapterId, chapterTitle) => {
        setEditedChapterTitle(chapter.chapterTitle)
        setEditedChapterDescription(chapter.chapterDescription)
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const editChapter = async (e) => {
        e.preventDefault();
        setChapterTitleError({ value: false, errorMessage: "" });
        setChapterDescriptionError({ value: false, errorMessage: "" });
        if (editedChapterTitle == "") {
            setChapterTitleError({ value: true, errorMessage: "Interactive Chapter title cannot be empty!" });
        }
        if (editedChapterDescription == "") {
            setChapterDescriptionError({ value: true, errorMessage: "Interactive Chapter description cannot be empty!" });
        }
        if (editedChapterTitle && editedChapterDescription) {
            var chapterTitle = editedChapterTitle
            var chapterDescription = editedChapterDescription
            const editedChapter = { chapterTitle, chapterDescription }
            console.log(editedChapter);
            try {
                const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + props.chapterId, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedChapter),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Chapter Edited Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshToolbar(true)
            props.setChapterEditRefreshPage(true)
            handleEditDialogClose();
            handleClickSnackbar();
        };
    }

    const addPageDescription = async (e) => {
        e.preventDefault();
        var pageDescription = newTextItemWords
        var pageNumber = props.pageNumber
        var pageTitle = title
        const editedPage = { pageDescription, pageNumber, pageTitle }
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
        //setRefreshToolbar(true)
        props.setRefreshInteractivePage(true)
        handleClose();
    }

    const addQuizToPage = (e) => {
        //e.preventDefault(); 
        props.setRefreshInteractivePage(true); 
        handleCloseInteractiveQuizDialog();
        // return (
        //     <div>
        //         <EditInteractiveQuizPage></EditInteractiveQuizPage>
        //     </div>
     
        // ); 
        
       
        // e.preventDefault(); 
        // var pageId = props.pageId; 
        // try {
        //     const response = await fetch("http://localhost:8080/quiz/getQuizByInteractivePageId/" + pageId, {
        //     method: "GET", 
        //     headers: { "Content-Type": "application/json" },
        //     })
        //     console.log(response); 
        //     if (response.ok == false) {
        //         console.log("Error");
        //         handleClickErrorSnackbar()
        //     } else {
        //         console.log("Quiz Added Successfully!");
        //     }
        // } catch (err) {
        //     console.log(err);
        //     handleClickErrorSnackbar()
        // }


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
        //refreshToolbar(true)
        props.setRefreshInteractivePage(true)
        handleCloseUploadDialog();
    }

    const removeFileItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/interactivePage/" + props.pageId + "/removeFileItem", {
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
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        //setRefreshToolbar(true)
        props.setRefreshInteractivePage(true)
        handleCloseUploadDialog();
    }

    const renderVideoImageHolder = () => {
        if (props.currentPage.attachment) {
            if (props.currentPage.attachment.fileType.includes("image")) {
                return (
                    <div>
                        <img
                            src={props.currentPage.attachment.fileURL}
                            alt="Interactive Page Image"
                            width="100%"
                            height="100%"
                            objectFit="contain"
                        />
                    </div>
                );
            }
            else if (props.currentPage.attachment.fileType.includes("video")) {
                return (
                    <div style={{ height: '200px' }}>
                        <ReactPlayer className='video'
                            width='100%'
                            height='100%'
                            controls
                            url={props.currentPage.attachment.fileURL}
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
        if (props.currentPage.attachment) {
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

    return (
        <div>
            <div id="sidenavbar2" className="sidebarPage">
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "85%" }}>
                        <h2>Chapter Tools</h2>
                        <Divider />
                    </div>
                </div>
                <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                    {props.chapterId && <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleClickEditDialogOpen}
                        style={{ width: "80%", marginTop: "10px" }}
                        startIcon={<InfoIcon />}
                    >
                        Chapter Settings
                    </Button>
                    }
                </div>
                <br />
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "85%" }}>
                        <h2>Page Tools</h2>
                        <Divider />
                    </div>
                </div>
                <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                    {props.pageId && <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleClickOpen}
                        style={{ width: "80%", marginTop: "10px" }}
                        startIcon={<TextFieldsIcon />}
                    >
                        Text
                    </Button>
                    }
                    {props.pageId && <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleOpenUploadDialog}
                        style={{ width: "80%", marginTop: "10px" }}
                        startIcon={<InsertPhotoIcon />}
                    >
                        Visuals
                    </Button>
                    }
                    {props.pageId && <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={handleOpenCreateInteractiveQuizDialog}
                        style={{ width: "80%", marginTop: "10px" }}
                        startIcon={<QuizIcon />}
                    >
                        Quiz
                    </Button>
                    }
                    {props.pageId && <Button
                        className="btn-upload"
                        color="secondary"
                        component="span"
                        variant="contained"
                        onClick={handleClickDeleteDialogOpen}
                        style={{ width: "80%", marginTop: "30px" }}
                        startIcon={<DeleteIcon />}
                    >
                        Delete Page
                    </Button>
                    }
                    {props.pageId && <Button
                        className="btn-upload"
                        color="secondary"
                        component="span"
                        variant="contained"
                        onClick={handleClickReorderDialogOpen}
                        style={{ width: "80%", marginTop: "10px" }}
                        startIcon={<LowPriorityIcon />}
                    >
                        Reorder Pages
                    </Button>
                    }
                </div>
                {/* {deleteMode == false &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                    </div>
                }
                {deleteMode &&
                    <div style={{ height: "75%", maxHeight: "75%", overflow: "auto" }}>
                    </div>
                } */}
            </div>
            <Snackbar open={openChapterSnackbar} autoHideDuration={5000} onClose={handleCloseChapterSnackbar} >
                <Alert onClose={handleCloseChapterSnackbar} severity="success" sx={{ width: "100%" }} >
                    Chapter Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >
                    Page Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                    Page Deleted Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >
                    Page Updated Succesfully!
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
                        <CreateInteractiveQuizForm 
                            pageId={props.pageId}
                        >
                        </CreateInteractiveQuizForm>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseInteractiveQuizDialog}>Cancel</Button>
                        <Button onClick={addQuizToPage}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth={true}>
                    <DialogTitle>Update Page Description</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="outlined"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField
                            id="outlined-multiline-static" multiline rows={6}
                            label="Text"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={newTextItemWords}
                            onChange={(e) => setNewTextItemWords(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={addPageDescription}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
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
                <Dialog
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth={'md'} fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Edit this interactive chapter?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContent>
                            <TextField
                                id="outlined"
                                label="Chapter Title"
                                variant="outlined"
                                fullWidth
                                style={{ margin: "6px 0" }}
                                value={editedChapterTitle}
                                onChange={(e) => setEditedChapterTitle(e.target.value)}
                                required
                                error={chapterTitleError.value}
                                helperText={chapterTitleError.errorMessage}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                id="outlined-multiline-static" multiline rows={6}
                                label="Chapter Description"
                                variant="outlined"
                                fullWidth
                                style={{ margin: "6px 0" }}
                                value={editedChapterDescription}
                                onChange={(e) => setEditedChapterDescription(e.target.value)}
                                required
                                error={chapterDescriptionError.value}
                                helperText={chapterDescriptionError.errorMessage}
                            />
                        </DialogContent>
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
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleDeleteDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete this interactive page?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This will delete this entire page in this chapter. You will not be able to undo this action. Are you sure you
                            want to delete?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose}>Cancel</Button>
                        <Button onClick={deletePage} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div>
                <Dialog
                    open={reorderDialogOpen} onClose={handleReorderDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth={'sm'} fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Pages Re-Ordering"}
                    </DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText id="alert-dialog-description">
                            Enter the new interactive chapter details
                        </DialogContentText> */}
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
                                    {pagesToBeReordered.map(({ chapterIndex, chapterTitle }, index) => {
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
                                    <Droppable droppableId="pagesReordering">
                                        {(provided) =>
                                            <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyleType: 'none' }}>
                                                {pagesToBeReordered.map(({ pageNumber }, index) => {
                                                    return (
                                                        <Draggable key={pageNumber} draggableId={pageNumber} index={index}>
                                                            {(provided) => (
                                                                <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                    <div style={{ display: 'flex', width: '100%' }}>
                                                                        {((index + 1).toString() == pageNumber) &&
                                                                            <div style={{ borderStyle: 'solid', borderWidth: '1px', marginBottom: '2px', width: '100%', borderRadius: '10px' }}>
                                                                                <h3 style={{ marginLeft: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pageNumber}</h3>
                                                                            </div>
                                                                        }
                                                                        {((index + 1).toString() != pageNumber) &&
                                                                            <div style={{ borderStyle: 'solid', borderWidth: '1px', marginBottom: '2px', width: '100%', borderRadius: '10px', backgroundColor: 'yellow' }}>
                                                                                <h3 style={{ marginLeft: '5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pageNumber}</h3>
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
                        <Button onClick={reorderPages} autoFocus>
                            Reorder
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default TeachingInteractivePageBar;
