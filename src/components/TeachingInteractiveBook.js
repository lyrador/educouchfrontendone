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
import TeachingInteractiveChaptersBar from "./TeachingInteractiveChaptersBar";
import TeachingInteractivePage from "../pages/TeachingInteractivePage";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractiveBook(props) {

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
    console.log(booksPath)
    const courseId = location.pathname.split("/")[2];
    const bookId = location.pathname.split("/")[4];

    const [refreshPage, setRefreshPage] = useState("");

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

    const books = [
        createData(1, 1, 'Plant Systems', "15/10/2022"),
        createData(2, 2, 'Human Systems', "15/10/2022"),
    ]

    //create
    const [newChapterTitle, setNewChapterTitle] = useState("");
    const [newChapterDescription, setNewChapterDescription] = useState("");

    const [chapterTitleError, setChapterTitleError] = useState({ value: false, errorMessage: "" });
    const [chapterDescriptionError, setChapterDescriptionError] = useState({ value: false, errorMessage: "" });

    const [open, setOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);

    //delete
    const [chapterIdToDelete, setChapterIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //edit
    const [editedChapterTitle, setEditedChapterTitle] = useState("");
    const [editedChapterDescription, setEditedChapterDescription] = useState("");
    const [chapterIdToEdit, setChapterIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    //browsing
    const [chapterIdToBrowse, setChapterIdToBrowse] = useState("");
    const [pageIdToBrowse, setPageIdToBrowse] = useState("");

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

    const handleOpenSettings = () => {
        setOpenSettings(true);
    };

    const handleCloseSettings = () => {
        setOpenSettings(false);
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
        if (books.length === 0) {
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
            <Grid container spacing={0}>
                {/* <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={bookId}></TeachingCoursesDrawer>
                </Grid> */}
                <Grid item xs={2}>
                    <TeachingInteractiveChaptersBar />
                </Grid>
                <Grid item xs={10}>
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
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to={`${booksPath}`}
                            style={{ textDecoration: 'none', color: 'grey' }}>
                            <LinkMaterial underline="hover" color="grey">
                                Interactive Books
                            </LinkMaterial>
                        </Link>
                    </Breadcrumbs>
                    {/* <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            Pages
                        </h1>
                    </div> */}
                    <TeachingInteractivePage chapterId={chapterIdToBrowse} pageId={pageIdToBrowse}></TeachingInteractivePage>
                </Grid>
            </Grid>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Interactive Book</DialogTitle>
                    <DialogContent>
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
                        {"Delete this interactive book?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            These will delete all the chapters and pages inside the
                            interactive book. You will not be able to undo this action. Are you sure you
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
                        {"You are editing this interactive book"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new interactive book details
                        </DialogContentText>
                        <TextField
                            id="outlined-basic"
                            label="Interactive Book Title"
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
                            label="Interactive Book Max Score"
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
        </div>
    );
}

export default TeachingInteractiveBook;
