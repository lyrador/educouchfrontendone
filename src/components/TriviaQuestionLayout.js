import * as React from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

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

import { useState, useRef } from "react";

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
import "../css/Resizable.css"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import TeachingInteractivePageBar from "../components/TeachingInteractivePageBar";

import ReactPlayer from "react-player";
import Typography from '@mui/material/Typography';

import Pagination from '@mui/material/Pagination';

import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";

import PostAddIcon from '@mui/icons-material/PostAdd';
import EditTriviaQuestion from "./EditTriviaQuestion";
import parse from 'html-react-parser';
import TriviaToolbar from "./TriviaToolbar";
import QuizTitleComponent from "./QuizComponents/QuizTitleComponent";
import TriviaOptionCard from "./TriviaOptionCard";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TriviaQuestionLayout(props) {

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
    console.log(location);
    const booksPath = location.pathname.split("/").slice(0, 4).join("/");
    const courseId = location.pathname.split("/")[2];
    const bookId = location.pathname.split("/")[4];

    //refresh view
    const [refreshInteractivePage, setRefreshInteractivePage] = useState("");
    const [refreshQuestion, setRefreshQuestion] = useState("");

    //retrieve current page and page navigation
    const [currentPage, setCurrentPage] = useState([]);
    const [pageNumberPointer, setPageNumberPointer] = useState(1);
    const handlePageChange = (event, value) => {
        setPageNumberPointer(value);
        setRefreshInteractivePage(true)
    };

    //get
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [editedCurrentQuestionTitle, setEditedCurrentQuestionTitle] = useState("");
    const [editedCurrentQuestionHasTimeLimit, setEditedCurrentQuestionHasTimeLimit] = useState(false);
    const [editedCurrentQuestionTimeLimit, setEditedCurrentQuestionTimeLimit] = useState("");

    const [questionTitleError, setQuestionTitleError] = useState({ value: false, errorMessage: "" });
    const [questionTimeLimitError, setQuestionTimeLimitError] = useState({ value: false, errorMessage: "" });

    const [triviaOptions, setTriviaOptions] = useState("");

    const [yellowTriviaOptionId, setYellowTriviaOptionId] = useState("");
    const [yellowOptionContent, setYellowOptionContent] = useState("");
    const [yellowCorrectAnswer, setYellowCorrectAnswer] = useState("");
    const [yellowOptionNumber, setYellowOptionNumber] = useState(1);

    const [greenTriviaOptionId, setGreenTriviaOptionId] = useState("");
    const [greenOptionContent, setGreenOptionContent] = useState("");
    const [greenCorrectAnswer, setGreenCorrectAnswer] = useState("");
    const [greenOptionNumber, setGreenOptionNumber] = useState(2);

    const [redTriviaOptionId, setRedTriviaOptionId] = useState("");
    const [redOptionContent, setRedOptionContent] = useState("");
    const [redCorrectAnswer, setRedCorrectAnswer] = useState("");
    const [redOptionNumber, setRedOptionNumber] = useState(3);

    const [blueTriviaOptionId, setBlueTriviaOptionId] = useState("");
    const [blueOptionContent, setBlueOptionContent] = useState("");
    const [blueCorrectAnswer, setBlueCorrectAnswer] = useState("");
    const [blueOptionNumber, setBlueOptionNumber] = useState(4);

    const setIndividualTriviaOption = (triviaOptions) => {
        for (var i = 0; i < triviaOptions.length; i++) {
            if (triviaOptions[i].optionNumber == 1) {
                setYellowTriviaOptionId(triviaOptions[i].optionNumber)
                setYellowOptionContent(triviaOptions[i].optionContent)
                setYellowCorrectAnswer(triviaOptions[i].correctAnswer)
            } else if (triviaOptions[i].optionNumber == 2) {
                setGreenTriviaOptionId(triviaOptions[i].optionNumber)
                setGreenOptionContent(triviaOptions[i].optionContent)
                setGreenCorrectAnswer(triviaOptions[i].correctAnswer)
            } else if (triviaOptions[i].optionNumber == 3) {
                setRedTriviaOptionId(triviaOptions[i].optionNumber)
                setRedOptionContent(triviaOptions[i].optionContent)
                setRedCorrectAnswer(triviaOptions[i].correctAnswer)
            } else if (triviaOptions[i].optionNumber == 4) {
                setBlueTriviaOptionId(triviaOptions[i].optionNumber)
                setBlueOptionContent(triviaOptions[i].optionContent)
                setBlueCorrectAnswer(triviaOptions[i].correctAnswer)
            }
        }
    };

    React.useEffect(() => {
        fetch("http://localhost:8080/triviaQuestion/" + props.questionId + "/triviaQuestionsUnmarshalledQuestionFromOptions")
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setCurrentQuestion(result);
                setEditedCurrentQuestionTitle(result.questionTitle)
                setEditedCurrentQuestionHasTimeLimit(result.hasTimeLimit)
                setEditedCurrentQuestionTimeLimit(result.questionTimeLimit)
                setTriviaOptions(result.triviaOptions)
                setIndividualTriviaOption(result.triviaOptions)
            });
    }, [props.questionId || refreshQuestion]);

    //create
    const [newPageNumber, setNewPageNumber] = useState("");
    const [newPageDescription, setNewPageDescription] = useState("");
    const [pageDescriptionError, setPageDescriptionError] = useState({ value: false, errorMessage: "" });

    const createNewPage = async (e) => {
        e.preventDefault();
        setPageDescriptionError({ value: false, errorMessage: "" });
        // var pageNumber = pages.length + 1;
        const newPage = 1
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

    const renderEmptyRowMessage = () => {
        console.log(props.chapterId)
        if (props.book.interactiveChapters) {
            if (props.book.interactiveChapters.length == 0) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: '#eae6e4', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            There are currently no interactive chapters in this book! Add a Chapter to Continue.
                        </div>
                    </div>
                );
            } else if (!props.chapterId) {
                return (
                    <div style={{ height: '100%', width: '100%', backgroundColor: '#eae6e4', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ fontSize: 24, lineHeight: '200px' }}>
                            Please select an interactive chapter to continue.
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
        if (currentPage.attachment || currentPage.pageQuiz) {
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
                            {parse(currentPage.pageDescription)}
                        </Typography>
                    </div>
                </div>
            );
        }
    }

    return (

        <div style={{ backgroundColor: "#F8F9FA", width: "100%", height: "80vh", paddding: 0 }}>
            <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }} >Interactive Page Created Succesfully!</Alert>
            </Snackbar>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >Interactive Page Deleted Succesfully!</Alert>
            </Snackbar>
            <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar} >
                <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: "100%" }} >Interactive Page Updated Succesfully!</Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={5000} onClose={handleCloseErrorSnackbar} >
                <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: "100%" }} >Error!</Alert>
            </Snackbar>
            <div style={{ paddingBottom: '10px', paddingLeft: '4%', paddingTop: '10px' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to={`${booksPath}`} style={{ textDecoration: 'none', color: 'grey' }}>
                        <LinkMaterial underline="hover" color="grey">Trivia</LinkMaterial>
                    </Link>
                    {props.questionNumber && <p>
                        Question {props.questionNumber}
                    </p>
                    }
                </Breadcrumbs>
            </div>
            <div style={{ width: "100%", height: "100%", justifyContent: "center", display: 'flex' }}>
                <div style={{ width: "80%", height: "100%", justifyContent: "center", display: 'flex' }}>
                    {/* <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            Page {pageNumberPointer}
                        </h1>
                    </div> */}
                    <Paper elevation={3} style={{ width: "90%", height: "90%", justifyContent: 'center', alignContent: 'center' }}>
                        <div style={{ justifyContent: 'center', alignContent: 'center', display: 'flex', paddingTop: "1%" }}>

                        </div>
                        <div style={{ borderStyle: "solid", borderColor: "black", borderWidth: "2px", height: "40%", width: "50%", margin: "auto", justifyContent: 'center', alignContent: 'center', display: 'flex' }}>
                            Hello
                        </div>
                        <div style={{ height: "20%", width: "100%", display: 'flex', padding: "2% 2% 0 2%" }}>
                            <div style={{ borderStyle: "solid", borderColor: "black", borderWidth: "2px", width: "49%" }}>

                            </div>
                            <div style={{ height: "40%", width: "2%" }}></div>
                            <div style={{ borderStyle: "solid", borderColor: "black", borderWidth: "2px", width: "49%" }}>

                            </div>
                            <div style={{ height: "20%", width: "100%", display: 'flex', padding: "2% 2% 0 2%" }}>
                                <div style={{ borderStyle: "solid", borderColor: "black", borderWidth: "2px", width: "49%" }}>
                                    Hello
                                </div>
                                <div style={{ height: "40%", width: "2%" }}></div>
                                <div style={{ borderStyle: "solid", borderColor: "black", borderWidth: "2px", width: "49%" }}>
                                    Hello
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
                <div style={{ width: "20%", height: "100%" }}>
                    {/* <TriviaToolbar
                        pageId={currentPage.interactivePageId}
                        pageNumber={currentPage.pageNumber}
                        refreshInteractivePage={refreshInteractivePage}
                        setRefreshInteractivePage={setRefreshInteractivePage}
                        currentPage={currentPage}
                        chapterId={props.chapterId}
                        setPageNumberPointer={setPageNumberPointer}
                        refreshPage={props.refreshPage}
                        setRefreshPage={props.setRefreshPage}
                        chapterEditRefreshPage={props.chapterEditRefreshPage}
                        setChapterEditRefreshPage={props.setChapterEditRefreshPage}
                        textBoxHeight={newTextBoxHeight}
                        textBoxWidth={newTextBoxWidth}
                    >
                    </TriviaToolbar> */}
                </div>
            </div>

            {/* <div>
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
            </div> */}
        </div >
    );
}