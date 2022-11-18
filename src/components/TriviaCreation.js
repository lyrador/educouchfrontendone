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

import { Button } from "@mui/material";

import { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "../css/TeachingInteractiveBook.css";
import TeachingInteractiveChaptersBar from "./TeachingInteractiveChaptersBar";
import TeachingInteractivePage from "../pages/TeachingInteractivePage";
import TriviaQuestionBar from "./TriviaQuestionsBar";
import TriviaQuestionLayout from "./TriviaQuestionLayout";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TriviaCreation(props) {

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
    const triviaId = location.pathname.split("/")[5];

    const [refreshPage, setRefreshPage] = useState("");
    const [refreshPageChild, setRefreshPageChild] = useState("");

    //retrieve all chapters of the book
    const [questions, setQuestions] = useState([]);
    const [questionsToBeReordered, setQuestionsToBeReordered] = useState([]);

    const setQuestionsToBeReorderedMethod = (questions) => {
        const retrievedQuestionsToBeReordered = new Array()
        for (const retrievedQuestion of questions) {
            var triviaQuestionId = retrievedQuestion.triviaQuestionId
            var questionNumber = retrievedQuestion.questionNumber.toString()
            var questionTitle = retrievedQuestion.questionTitle
            var hasTimeLimit = retrievedQuestion.hasTimeLimit
            var questionTimeLimit = retrievedQuestion.questionTimeLimit
            const tempQuestion = { triviaQuestionId, questionNumber, questionTitle, hasTimeLimit, questionTimeLimit }
            retrievedQuestionsToBeReordered.push(tempQuestion)
            console.log(retrievedQuestion);
        }
        setQuestionsToBeReordered(retrievedQuestionsToBeReordered)
    };

    const [chapterEditRefreshPage, setChapterEditRefreshPage] = React.useState(false);

    React.useEffect(() => {
        setRefreshPage(false);
        setRefreshPageChild(false);
        fetch("http://localhost:8080/triviaQuestion/triviaQuiz/" + triviaId + "/triviaQuestions")
            .then((res) => res.json())
            .then((result) => {
                setQuestions(result);
                setQuestionsToBeReorderedMethod(result)
                setRefreshPage(true)
            });
        setChapterEditRefreshPage(false)
    }, [refreshPageChild || chapterEditRefreshPage]);

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
    const [questionIdToBrowse, setQuestionIdToBrowse] = useState("");
    const [questionNumberToBrowse, setQuestionNumberToBrowse] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickDeleteDialogOpen = (event, questionId) => {
        setChapterIdToDelete(questionId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleClickEditDialogOpen = (event, questionId, questionTitle) => {
        setEditedChapterTitle(questionTitle);
        setChapterIdToEdit(questionId);
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
                const response = await fetch("http://localhost:8080/interactiveChapter/interactiveChapters/" + triviaId + "/interactiveChapters", {
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

    return (
        <div>
            <Grid container spacing={0}>
                {/* <Grid item xs={2}>
                    <TeachingCoursesDrawer courseId={bookId}></TeachingCoursesDrawer>
                </Grid> */}
                <Grid item xs={2}>
                    <TriviaQuestionBar
                        questionIdToBrowse={questionIdToBrowse}
                        setQuestionIdToBrowse={setQuestionIdToBrowse}
                        questionNumberToBrowse={questionNumberToBrowse}
                        setQuestionNumberToBrowse={setQuestionNumberToBrowse}
                        refreshPage={refreshPage}
                        setRefreshPage={setRefreshPage}
                        chapterEditRefreshPage={chapterEditRefreshPage}
                        setChapterEditRefreshPage={setChapterEditRefreshPage}
                        questions={questions}
                        setQuestions={setQuestions}
                        questionsToBeReordered={questionsToBeReordered}
                        setQuestionsToBeReordered={setQuestionsToBeReordered}
                        refreshPageChild={refreshPageChild}
                        setRefreshPageChild={setRefreshPageChild}
                    />
                </Grid>
                <Grid item xs={10}>
                    {/* {chapterIdToBrowse} */}
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
                    {/* <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            Pages
                        </h1>
                    </div> */}
                    <TriviaQuestionLayout
                        questionId={questionIdToBrowse}
                        questionNumber={questionNumberToBrowse}
                        book={questions}
                        refreshPage={refreshPage}
                        setRefreshPage={setRefreshPage}
                        chapterEditRefreshPage={chapterEditRefreshPage}
                        setChapterEditRefreshPage={setChapterEditRefreshPage}
                    ></TriviaQuestionLayout>
                </Grid>
            </Grid>
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
