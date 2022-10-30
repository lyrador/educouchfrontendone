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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeachingInteractiveBooksList(props) {

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

    const [refreshPage, setRefreshPage] = useState("");

     // //retrieve all books by course id
     const [books, setBooks] = useState([]);

     React.useEffect(() => {
         setRefreshPage(false);
         fetch("http://localhost:8080/interactiveBook/course/" + courseId + "/interactiveBooks")
             .then((res) => res.json())
             .then((result) => {
                 setBooks(result);
                 console.log(result);
             });
     }, [refreshPage]);


    //create
    const [newBookTitle, setNewBookTitle] = useState("");
    const [newBookMaxScore, setNewBookMaxScore] = useState("");

    const [bookTitleError, setBookTitleError] = useState({ value: false, errorMessage: "" });
    const [bookMaxScoreError, setBookMaxScoreError] = useState({ value: false, errorMessage: "" });

    const [open, setOpen] = React.useState(false);

    //delete
    const [bookIdToDelete, setBookIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //edit
    const [editedBookTitle, setEditedBookTitle] = useState("");
    const [editedBookMaxScore, setEditedBookMaxScore] = useState("");
    const [bookIdToEdit, setBookIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDeleteDialogOpen = (event, interactiveBookId) => {
        setBookIdToDelete(interactiveBookId);
        console.log(interactiveBookId); 
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = (event, bookId, bookTitle) => {
        setEditedBookTitle(bookTitle);
        setBookIdToEdit(bookId);
        setEditDialogOpen(true);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    console.log(courseId); 

    const createNewBook = async (e) => {
        e.preventDefault();
        console.log(courseId); 
        setBookTitleError({ value: false, errorMessage: "" });
        // setBookMaxScoreError({ value: false, errorMessage: "" });
        if (newBookTitle == "") {
            setBookTitleError({ value: true, errorMessage: "Interactive Book title cannot be empty!" });
        }
        // if (newBookMaxScore == "") {
        //     setBookMaxScoreError({ value: true, errorMessage: "Interactive Book max score cannot be empty!" });
        // }
        if (newBookTitle && newBookMaxScore) {
            var bookTitle = newBookTitle
            var bookMaxScore = 100
            const newBook = { bookTitle, bookMaxScore }
            console.log(newBook);
            try {
                const response = await fetch("http://localhost:8080/interactiveBook/" + courseId + "/interactiveBooks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBook),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("New Interactive Book Created Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleClose();
            handleClickSnackbar();
            setNewBookTitle("");
        };
    }

    const deleteBook = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/interactiveBook/interactiveBooks/" + bookIdToDelete, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Interactive Book Deleted Successfully!");
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

    const editBook = async (e) => {
        e.preventDefault();
        setBookTitleError({ value: false, errorMessage: "" });
        // setBookMaxScoreError({ value: false, errorMessage: "" });
        if (editedBookTitle == "") {
            setBookTitleError({ value: true, errorMessage: "Interactive Book title cannot be empty!" });
        }
        // if (editedBookMaxScore == "") {
        //     setBookMaxScoreError({ value: true, errorMessage: "Interactive Book max score cannot be empty!" });
        // }
        if (editedBookTitle && editedBookMaxScore) {
            var bookTitle = editedBookTitle
            var bookMaxScore = 100
            const editedBook = { bookTitle, bookMaxScore }
            console.log(editedBook);
            try {
                const response = await fetch("http://localhost:8080/interactiveBook/interactiveBooks/" + bookIdToEdit, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedBook),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("Interactive Book Edited Successfully!");
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
                        There are currently no interactive books in this course!
                    </TableCell>
                </TableRow>
            );
        }
    };

    const renderExtraActions = (
        interactiveBookId,
        bookTitle,
        //bookMaxScore
    ) => {
        return (
            <div>
                <IconButton
                    aria-label="settings"
                    onClick={(event) => handleClickDeleteDialogOpen(event, interactiveBookId)}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    aria-label="settings"
                    onClick={(event) =>
                        handleClickEditDialogOpen(event, interactiveBookId, bookTitle, 
                            //bookMaxScore
                            )
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
                <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={courseId}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >
                            Interactive Book Created Succesfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                        <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                            Interactive Book Deleted Succesfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                        <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >
                            Interactive Book Updated Succesfully!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                        <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >
                            Error!
                        </Alert>
                    </Snackbar>
                    <Breadcrumbs aria-label="breadcrumb">
                        <LinkMaterial
                            underline="hover"
                            color="inherit"
                            href={`${booksPath}`}
                        >
                            Interactive Books
                        </LinkMaterial>
                    </Breadcrumbs>
                    <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            List of Interactive Books
                        </h1>
                        <Button
                            className="btn-upload"
                            color="primary"
                            variant="contained"
                            component="span"
                            onClick={handleClickOpen}
                            style={{ float: "right", marginLeft: "auto" }}
                        >
                            Create New Interactive Book
                        </Button>
                    </div>
                    <div style={{ padding: "5%" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Interactive Book Name</TableCell>
                                        {/* <TableCell>Interactive Book Max Score</TableCell> */}
                                        <TableCell>Created On</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderEmptyRowMessage()}
                                    {books.map((book) => (
                                        <TableRow
                                            key={book.interactiveBookId}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link
                                                    to={`${booksPath}/${book.interactiveBookId}`}
                                                    state={{ bookTitle: book.bookTitle }}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {book.bookTitle}
                                                </Link>
                                            </TableCell>
                                            {/* <TableCell>{book.bookMaxScore}</TableCell> */}
                                            <TableCell>{book.creationDate.substring(0,10)}</TableCell>
                                            <TableCell>
                                                <div>
                                                    {renderExtraActions(
                                                        book.interactiveBookId,
                                                        book.bookTitle,
                                                        book.createdByUserId,
                                                        book.createdByUserType
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
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
                            value={newBookTitle}
                            onChange={(e) => setNewBookTitle(e.target.value)}
                            error={bookTitleError.value}
                            helperText={bookTitleError.errorMessage}
                        />
                        {/* <TextField
                            id="outlined-basic"
                            label="Interactive Book Max Score"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newBookMaxScore}
                            onChange={(e) => setNewBookMaxScore(e.target.value)}
                            error={bookMaxScoreError.value}
                            helperText={bookMaxScoreError.errorMessage}
                        /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewBook}>Create</Button>
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
                        <Button onClick={deleteBook} autoFocus>
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
                            value={editedBookTitle}
                            required
                            onChange={(e) => setEditedBookTitle(e.target.value)}
                            error={bookMaxScoreError.value}
                            helperText={bookMaxScoreError.errorMessage}
                        />
                        {/* <TextField
                            id="outlined-basic"
                            label="Interactive Book Max Score"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedBookMaxScore}
                            required
                            onChange={(e) => setEditedBookMaxScore(e.target.value)}
                            error={bookMaxScoreError.value}
                            helperText={bookMaxScoreError.errorMessage}
                        /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditDialogClose}>Cancel</Button>
                        <Button onClick={editBook} autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default TeachingInteractiveBooksList;
