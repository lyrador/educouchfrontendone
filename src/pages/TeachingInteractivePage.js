import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link, useLocation, useParams } from "react-router-dom";
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import MediaCard from "./MediaCard";
import TeachingInteractivePageBar from "../components/TeachingInteractivePageBar";

import ReactPlayer from "react-player";
import Typography from '@mui/material/Typography';

import Pagination from '@mui/material/Pagination';

import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractivePage(props) {

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

    //retrieve all pages
    const [pages, setPages] = useState([]);
    React.useEffect(() => {
        setRefreshInteractivePage(false);
        fetch("http://localhost:8080/interactivePage/interactiveChapter/" + props.chapterId + "/interactivePages")
            .then((res) => res.json())
            .then((result) => {
                setPages(result);
                console.log(result);
            });
    }, [refreshInteractivePage || props.chapterId]);

    //retrieve current page and page navigation
    const [currentPage, setCurrentPage] = useState([]);
    const [pageNumberPointer, setPageNumberPointer] = useState(1);
    const handlePageChange = (event, value) => {
        setPageNumberPointer(value);
        setRefreshInteractivePage(true)
    };

    React.useEffect(() => {
        setRefreshInteractivePage(false);
        var queryString = props.chapterId + "&" + pageNumberPointer
        fetch("http://localhost:8080/interactivePage/getPageByChapterIdAndPageNumber/" + queryString)
            .then((res) => res.json())
            .then((result) => {
                setCurrentPage(result);
                console.log(result);
            });
    }, [refreshInteractivePage || props.chapterId]);

    //create
    const [newPageNumber, setNewPageNumber] = useState("");
    const [newPageDescription, setNewPageDescription] = useState("");


    console.log(currentPage.pageNumber)

    const createNewPage = async (e) => {
        e.preventDefault();
        setPageDescriptionError({ value: false, errorMessage: "" });
            var pageNumber = pages.length + 1; 
            const newPage = { pageNumber }
            console.log(newPage);
            try {
                const response = await fetch("http://localhost:8080/interactivePage/" + props.chapterId + "/interactivePages", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPage),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshInteractivePage(true)
    }

    //delete
    const [pageIdToDelete, setPageIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const handleClickDeleteDialogOpen = (event) => {
        setPageIdToDelete(currentPage.interactivePageId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    //when delete the pageId of the current page, the page numbers on the navigation bar adjusts however the page number in the db table doesnt, so somehow need to update the page number in DB
    const deletePage = async (e) => {
        e.preventDefault();
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
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshInteractivePage(true);
        handleDeleteDialogClose();
        handleClickDeleteSnackbar();
    };

    //edit
    const [editedPageNumber, setEditedPageNumber] = useState("");
    const [editedPageDescription, setEditedPageDescription] = useState("");
    const [pageIdToEdit, setPageIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleClickEditDialogOpen = (event, pageId, pageTitle) => {
        setEditedPageNumber(pageTitle);
        setPageIdToEdit(pageId);
        console.log(pageId); 
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const editPage = async (e) => {
        e.preventDefault();
        //setPageNumberError({ value: false, errorMessage: "" });
        setPageDescriptionError({ value: false, errorMessage: "" });
        // if (newPageNumber == "") {
        //     setPageNumberError({ value: true, errorMessage: "Interactive Page title cannot be empty!" });
        // }
        if (newPageDescription == "") {
            setPageDescriptionError({ value: true, errorMessage: "Interactive Page description cannot be empty!" });
        }
        if (newPageNumber && newPageDescription) {
            var interactivePageTitle = newPageNumber
            var interactivePageDescription = newPageDescription
            const editedPage = { interactivePageTitle, interactivePageDescription }
            console.log(editedPage);
            try {
                const response = await fetch("http://localhost:8080/interactivePage/interactivePages/" + pageIdToEdit, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedPage),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Interactive Page Edited Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshInteractivePage(true);
            handleEditDialogClose();
            handleClickEditSnackbar();
        };
    }

    //error handling
    const [pageDescriptionError, setPageDescriptionError] = useState({ value: false, errorMessage: "" });

    //debug
    const printStatement = () => {
        console.log("Hello")
    };

    const renderEmptyRowMessage = () => {
        if (pages.length === 0) {
            return (
                <div>
                    There are currently no interactive pages in this book! Add a Page to Continue.
                </div>
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
                    onClick={(event) => handleClickDeleteDialogOpen(event, pageIdToDelete)}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    aria-label="settings"
                    onClick={(event) =>
                        handleClickEditDialogOpen(event, pageIdToEdit, editedPageNumber, editedPageDescription)
                    }
                >
                    <EditIcon />
                </IconButton>
            </div>
        );
    };

    const renderVideoImageHolder = () => {
        if (currentPage.attachment) {
            if (currentPage.attachment.fileType.includes("image")) {
                return (
                    <div style={{ height: "50%" }}>
                        <img
                            src={currentPage.attachment.fileURL}
                            alt="Interactive Page Image"
                            width="100%"
                            height="100%"
                        />
                    </div>
                );
            }
            else if (currentPage.attachment.fileType.includes("video")) {
                return (
                    <div style={{ height: "50%" }}>
                        <ReactPlayer className='video'
                            width='100%'
                            height='100%'
                            controls
                            url={currentPage.attachment.fileURL}
                        />
                    </div>
                );
            }
        }
    };

    return (
        <div style={{ backgroundColor: "#F8F9FA", width: "100%", height: "75vh", paddding: 0 }}>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Page Created Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Page Deleted Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >
                    Interactive Page Updated Succesfully!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >
                    Error!
                </Alert>
            </Snackbar>
            <div style={{ width: "100%", height: "100%", justifyContent: "center", display: 'flex' }}>
                <div style={{ width: "80%", height: "100%", justifyContent: "center", display: 'flex' }}>
                    <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            Page {pageNumberPointer}
                        </h1>
                    </div>
                    <Paper elevation={3} style={{ width: "90%", height: "90%" }}>
                        {renderEmptyRowMessage()}
                        {pages.length > 0 && <div style={{ width: "100%", height: "100%" }}>
                            {renderVideoImageHolder()}
                            <div style={{ height: "50%", backgroundImage: "url('https://educouchbucket.s3.ap-southeast-1.amazonaws.com/img-noise-700x400+(1).png')" }}>
                                <div style={{ padding: "2%" }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Title
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {currentPage.pageDescription}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        }
                    </Paper>
                </div>
                <div style={{ width: "20%", height: "100%" }}>
                    <TeachingInteractivePageBar
                        pageId={currentPage.interactivePageId}
                        pageNumber={currentPage.pageNumber}
                        refreshInteractivePage={refreshInteractivePage}
                        setRefreshInteractivePage={setRefreshInteractivePage}>
                    </TeachingInteractivePageBar>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: "5px", justifyContent: 'center', marginRight: '30px' }}>
                <div>
                    <Pagination count={pages.length} page={pageNumberPointer} onChange={handlePageChange} showFirstButton showLastButton />
                </div>
                <div>
                    <Button
                        className="btn-upload"
                        color="primary"
                        component="span"
                        variant="contained"
                        onClick={createNewPage}
                        style={{ width: "40%", marginRight: "10px" }}
                        startIcon={<AddIcon />}
                    >
                        Add
                    </Button>
                </div>
                <div>
                    <Button
                        className="btn-upload"
                        color="secondary"
                        component="span"
                        variant="contained"
                        onClick={handleClickDeleteDialogOpen}
                        style={{ width: "80%", marginRight: "5px" }}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>
                </div>
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
                    open={editDialogOpen}
                    onClose={handleEditDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are editing this interactive book"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new interactive book details
                        </DialogContentText>
                        <TextField
                            id="outlined-basic" label="Interactive Book Title" variant="outlined" fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedPageNumber}
                            required
                            onChange={(e) => setEditedPageNumber(e.target.value)}
                            error={pageDescriptionError.value}
                            helperText={pageDescriptionError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic" label="Interactive Book Max Score" variant="outlined" fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedPageDescription}
                            required
                            onChange={(e) => setEditedPageDescription(e.target.value)}
                            error={pageDescriptionError.value}
                            helperText={pageDescriptionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editPage} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default TeachingInteractivePage;
