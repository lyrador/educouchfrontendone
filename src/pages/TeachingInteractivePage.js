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

    function createData(interactivePageId, interactivePageNumber, interactivePageDescription) {
        return { interactivePageId, interactivePageNumber, interactivePageDescription };
    }

    const pages = [
        createData(1, 1, 'Plant Systems'),
        createData(2, 2, 'Human Systems'),
    ]

    //create
    const [newPageNumber, setNewPageNumber] = useState("");
    const [newPageDescription, setNewPageDescription] = useState("");

    const [pageNumberError, setPageNumberError] = useState({ value: false, errorMessage: "" });
    const [pageDescriptionError, setPageDescriptionError] = useState({ value: false, errorMessage: "" });

    const [open, setOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);

    //delete
    const [pageIdToDelete, setPageIdToDelete] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    //edit
    const [editedPageNumber, setEditedPageNumber] = useState("");
    const [editedPageDescription, setEditedPageDescription] = useState("");
    const [pageIdToEdit, setPageIdToEdit] = useState("");
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDeleteDialogOpen = (event, pageId) => {
        setPageIdToDelete(pageId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = (event, pageId, pageTitle) => {
        setEditedPageNumber(pageTitle);
        setPageIdToEdit(pageId);
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

    const createNewPage = async (e) => {
        e.preventDefault();
        setPageNumberError({ value: false, errorMessage: "" });
        setPageDescriptionError({ value: false, errorMessage: "" });
        if (newPageNumber == "") {
            setPageNumberError({ value: true, errorMessage: "Interactive Page Number cannot be empty!" });
        }
        if (newPageDescription == "") {
            setPageDescriptionError({ value: true, errorMessage: "Interactive Page description cannot be empty!" });
        }
        if (newPageNumber && newPageDescription) {
            var pageNumber = newPageNumber
            var pageDescription = newPageDescription
            const newPage = { pageNumber, pageDescription }
            console.log(newPage);
            try {
                const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + bookId + "/interactiveChapters", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPage),
                })
                console.log(response);
                if (response.ok == false) {
                    console.log("Error");
                    handleClickErrorSnackbar()
                } else {
                    console.log("New Page Created Successfully!");
                    handleClickSnackbar()
                }
            } catch (err) {
                console.log(err);
                handleClickErrorSnackbar()
            }
            setRefreshPage(true)
            handleClose();
            handleClickSnackbar();
            setNewPageNumber("");
        };
    }

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
        setRefreshPage(true);
        handleDeleteDialogClose();
        handleClickDeleteSnackbar();
    };

    const editPage = async (e) => {
        e.preventDefault();
        setPageNumberError({ value: false, errorMessage: "" });
        setPageDescriptionError({ value: false, errorMessage: "" });
        if (newPageNumber == "") {
            setPageNumberError({ value: true, errorMessage: "Interactive Page title cannot be empty!" });
        }
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
            setRefreshPage(true);
            handleEditDialogClose();
            handleClickEditSnackbar();
        };
    }

    const renderEmptyRowMessage = () => {
        if (pages.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                        There are currently no interactive pages in this book!
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
            {/* <Breadcrumbs aria-label="breadcrumb">
                <Link to={`${booksPath}`}
                    style={{ textDecoration: 'none', color: 'grey' }}>
                    <LinkMaterial underline="hover" color="inherit">
                        Interactive Books
                    </LinkMaterial>
                </Link>
            </Breadcrumbs> */}
            <div style={{ justifyContent: "center" }}>
                <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                    Page {props.pageNumber}
                </h1>
            </div>
            <div style={{ width: "100%", height: "100%", justifyContent: "center", display: 'flex' }}>
                <Paper elevation={3} style={{ width: "90%", height: "90%" }}>
                    Hello
                    <MediaCard></MediaCard>
                </Paper>
            </div>
            {/* <div style={{ padding: "5%" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Interactive Chapter Name</TableCell>
                                        <TableCell>Interactive Chapter Max Score</TableCell>
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
                                                    state={{ bookTitle: book.interactiveBookTitle }}
                                                    style={{ textDecoration: "none" }}
                                                >
                                                    {book.interactiveBookTitle}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{book.interactiveBookMaxScore}</TableCell>
                                            <TableCell>{book.creationDate}</TableCell>
                                            <TableCell>
                                                <div>
                                                    {renderExtraActions(
                                                        book.bookId,
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
                    </div> */}
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
                            value={newPageNumber}
                            onChange={(e) => setNewPageNumber(e.target.value)}
                            error={pageNumberError.value}
                            helperText={pageNumberError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Interactive Book Max Score"
                            variant="outlined"
                            fullWidth
                            required
                            style={{ margin: "6px 0" }}
                            value={newPageDescription}
                            onChange={(e) => setNewPageDescription(e.target.value)}
                            error={pageDescriptionError.value}
                            helperText={pageDescriptionError.errorMessage}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={createNewPage}>Create</Button>
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
                            id="outlined-basic"
                            label="Interactive Book Title"
                            variant="outlined"
                            fullWidth
                            style={{ margin: "6px 0" }}
                            value={editedPageNumber}
                            required
                            onChange={(e) => setEditedPageNumber(e.target.value)}
                            error={pageDescriptionError.value}
                            helperText={pageDescriptionError.errorMessage}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Interactive Book Max Score"
                            variant="outlined"
                            fullWidth
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
