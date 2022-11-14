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

import "../css/TeachingInteractiveBook.css";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TeachingInteractivePageBar from "../components/TeachingInteractivePageBar";

import ReactPlayer from "react-player";
import Typography from '@mui/material/Typography';

import Pagination from '@mui/material/Pagination';

import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";
import AddIcon from '@mui/icons-material/Add';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LearnerInteractivePage(props) {

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
        if (props.chapterId) {
            setRefreshInteractivePage(false);
            console.log(props.chapterId)
            fetch("http://localhost:8080/interactivePage/interactiveChapter/" + props.chapterId + "/interactivePages")
                .then((res) => res.json())
                .then((result) => {
                    setPages(result);
                    console.log(result);
                });
        };
    }, [refreshInteractivePage || props.chapterId]);

    //retrieve current page and page navigation
    const [currentPage, setCurrentPage] = useState([]);
    const [pageNumberPointer, setPageNumberPointer] = useState(1);
    const handlePageChange = (event, value) => {
        setPageNumberPointer(value);
        setRefreshInteractivePage(true)
    };

    React.useEffect(() => {
        if (props.chapterId && pageNumberPointer) {
            setRefreshInteractivePage(false);
            var queryString = props.chapterId + "&" + pageNumberPointer
            fetch("http://localhost:8080/interactivePage/getPageByChapterIdAndPageNumber/" + queryString)
                .then((res) => res.json())
                .then((result) => {
                    setCurrentPage(result);
                    console.log(result);
                });
        };
    }, [refreshInteractivePage || props.chapterId]);

    console.log(currentPage.pageNumber)

    //edit
    const [infoDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleInfoDialogClose = () => {
        setEditDialogOpen(false);
    };

    //debug
    const printStatement = () => {
        console.log("Hello")
    };

    const renderEmptyRowMessage = () => {
        console.log(props.chapterId)
        if (props.book.interactiveChapters) {
            if (props.book.interactiveChapters.length == 0) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: 'lightgray', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            There are currently no interactive chapters in this book! Add a Chapter to Continue.
                        </div>
                    </div>
                );
            } else if (!props.chapterId) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: 'lightgray', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            Please select an interactive chapter to continue.
                        </div>
                    </div>
                );
            }
            else if (props.chapterId && pages.length === 0) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: 'lightgray', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            There are currently no interactive pages in this chapter! Add a Page to Continue.
                        </div>
                    </div>
                );
            }
        }
    };

    const renderVideoImageHolder = () => {
        var height = "100%"
        if (currentPage.pageDescription || currentPage.pageTitle) {
            height = "50%"
        }
        if (currentPage.attachment) {
            if (currentPage.attachment.fileType.includes("image")) {
                return (
                    <div style={{ height: height }}>
                        <img
                            src={currentPage.attachment.fileURL}
                            alt="Interactive Page Image"
                            width="100%"
                            height="100%"
                            objectFit="contain"
                        />
                    </div>
                );
            }
            else if (currentPage.attachment.fileType.includes("video")) {
                return (
                    <div style={{ height: height }}>
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

    const renderText = () => {
        var height = "100%"
        if (currentPage.attachment && !currentPage.question) {
            height = "50%"
        }
        if (currentPage.pageDescription || currentPage.pageTitle) {
            console.log(currentPage)
            return (
                <div style={{ height: height, backgroundImage: "url('https://educouchbucket.s3.ap-southeast-1.amazonaws.com/img-noise-700x400+(1).png')" }}>
                    <div style={{ padding: "2%" }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {currentPage.pageTitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {currentPage.pageDescription}
                        </Typography>
                    </div>
                </div>
            );
        }

    }

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
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to={`${booksPath}`}
                        style={{ textDecoration: 'none', color: 'grey' }}>
                        <LinkMaterial underline="hover" color="grey">
                            Interactive Books
                        </LinkMaterial>
                    </Link>
                    {props.chapterIndex && <p>
                        Chapter {props.chapterIndex}
                    </p>
                    }
                    {currentPage.pageNumber && <p>
                        Page {currentPage.pageNumber}
                    </p>
                    }
                </Breadcrumbs>
            </div>
            <div style={{ width: "100%", height: "100%", justifyContent: "center", display: 'flex' }}>
                <div style={{ width: "80%", height: "100%", justifyContent: "center", display: 'flex' }}>
                    <Paper elevation={3} style={{ width: "90%", height: "90%" }}>
                        {renderEmptyRowMessage()}
                        {pages.length > 0 && <div style={{ width: "100%", height: "100%" }}>
                            {renderVideoImageHolder()}
                            {renderText()}
                        </div>
                        }
                    </Paper>
                </div>
            </div>
            <div style={{ display: 'flex', marginTop: "5px", justifyContent: 'center', marginRight: '30px' }}>
                <div>
                    <Pagination count={pages.length} page={pageNumberPointer} onChange={handlePageChange} showFirstButton showLastButton />
                </div>
            </div>
            <div>
                <Dialog
                    open={infoDialogOpen}
                    onClose={handleInfoDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You are viewing chapter information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Enter the new interactive book details
                        </DialogContentText>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleInfoDialogClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default LearnerInteractivePage;
