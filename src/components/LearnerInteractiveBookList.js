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
import BookCardItem from "./BookCardItem";
import Box from "@mui/material/Box";
import LearnerCoursesDrawer from "./LearnerCourseDrawer";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LearnerInteractiveBooksList(props) {

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

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <LearnerCoursesDrawer courseId = {courseId} learnerStatus = {true}/>
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
                    </div>
                    <div style={{ padding: "5%" }}>
                        {/* <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Interactive Book Name</TableCell>
                                        <TableCell>Interactive Book Max Score</TableCell>
                                        <TableCell>Created On</TableCell>
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
                                            <TableCell>{book.bookMaxScore}</TableCell>
                                            <TableCell>{book.creationDate.substring(0,10)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> */}
                        {books.length === 0 && (
                            <h3>There are no interactive books in this course!</h3>
                        )}
                        <div className="books">
                            <div className="books-container">
                                <Box sx={{ width: "100%" }}>
                                    <div className="books-wrapper">
                                        <ul className="books-items">
                                            {books.map((book) => (
                                                <BookCardItem
                                                    src={book.attachment.fileURL}
                                                    text={book.bookTitle}
                                                    label={book.bookTitle}
                                                    bookId={book.interactiveBookId}
                                                    path={`${booksPath}/${book.interactiveBookId}`}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LearnerInteractiveBooksList;
