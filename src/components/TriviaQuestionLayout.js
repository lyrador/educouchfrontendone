//essentials
import * as React from "react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";

import { Grid, Paper, Button, Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';

//breadcrumb
import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";

//form
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

//icons
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

//snackbar
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

//components and plugins
import ReactPlayer from "react-player";

//pictures
import starwhite from "../assets/starwhite.png";
import moonwhite from "../assets/moonwhite.png";
import cloudwhite from "../assets/cloudwhite.png";
import applewhite from "../assets/applewhite.png";
import tick from "../assets/accept.png";
import warning from "../assets/warning.png";
import correct from "../assets/correct.png";
import wrong from "../assets/wrong.png";

//css
import "../css/TriviaQuestionLayout.css";

import {
    LinearProgress,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import UploadService from "../services/UploadFilesService";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TriviaQuestionLayout(props) {


    const questionTypeEnums = [{ value: "Four Options" }, { value: "True or False" }];

    //upload
    const theme = createTheme({
        components: {
            MuiLinearProgress: {
                styleOverrides: {
                    root: { height: 15, borderRadius: 5 },
                    colorPrimary: { backgroundColor: "#EEEEEE" },
                    bar: { borderRadius: 5, backgroundColor: "#1a90ff", },
                },
            },
        },
    });

    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState("https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/file.jpg");
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadedAttachmentId, setUploadedAttachmentId] = useState("");
    const [openUploadDialog, setOpenUploadDialog] = React.useState(false);

    const handleOpenUploadDialog = () => {
        setOpenUploadDialog(true);
    };

    const handleCloseUploadDialog = () => {
        setOpenUploadDialog(false);
    };

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

    const renderVideoImageHolder = () => {
        if (currentQuestion.attachment) {
            if (currentQuestion.attachment.fileType.includes("image")) {
                return (
                    <div>
                        <img
                            src={currentQuestion.attachment.fileURL}
                            alt="Interactive Page Image"
                            width="100%"
                            height="100%"
                            objectFit="contain"
                        />
                    </div>
                );
            }
            else if (currentQuestion.attachment.fileType.includes("video")) {
                return (
                    <div style={{ height: '200px' }}>
                        <ReactPlayer className='video'
                            width='100%'
                            height='100%'
                            controls
                            url={currentQuestion.attachment.fileURL}
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
        if (currentQuestion.attachment) {
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

    const removeFileItem = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/triviaQuestion/" + props.questionId + "/removeFileItem", {
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
                refreshQuestionMethod()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        handleCloseUploadDialog();
    }

    const createNewFileItem = async (e) => {
        e.preventDefault();
        var attachmentId = uploadedAttachmentId
        const fileItemRequest = { attachmentId }
        console.log(fileItemRequest);
        try {
            const response = await fetch("http://localhost:8080/triviaQuestion/" + props.questionId + "/addFileItem", {
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
                refreshQuestionMethod()
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
        handleCloseUploadDialog();
    }

    //colors
    const yellowColor = "#e4990c"
    const greenColor = "#3CB043"
    const redColor = "#D21404"
    const blueColor = "#0b95e8"

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
    const [refreshQuestion, setRefreshQuestion] = useState("");

    //get
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [editedCurrentQuestionTitle, setEditedCurrentQuestionTitle] = useState("");
    const [editedCurrentQuestionHasTimeLimit, setEditedCurrentQuestionHasTimeLimit] = useState(false);
    const [editedCurrentQuestionTimeLimit, setEditedCurrentQuestionTimeLimit] = useState("");
    const [editedCurrentQuestionType, setEditedCurrentQuestionType] = useState("");

    const [tempYellowOptionContent, setTempYellowOptionContent] = useState("");
    const [tempGreenOptionContent, setTempGreenOptionContent] = useState("");
    const [tempRedOptionContent, setTempRedOptionContent] = useState("");
    const [tempBlueOptionContent, setTempBlueOptionContent] = useState("");

    const handleChangeEditedCurrentQuestionType = (event) => {
        setEditedCurrentQuestionType(event.target.value);
        if (event.target.value == "True or False") {
            setTempGreenOptionContent(greenOptionContent)
            setTempYellowOptionContent(yellowOptionContent)
            setTempRedOptionContent(redOptionContent)
            setTempBlueOptionContent(blueOptionContent)
            setYellowOptionContent("True")
            setGreenOptionContent("False")
            setRedOptionContent("")
            setBlueOptionContent("")
            setRedCorrectAnswer(false)
            setBlueCorrectAnswer(false)
        } else if (event.target.value == "Four Options") {
            setGreenOptionContent(tempGreenOptionContent)
            setYellowOptionContent(tempYellowOptionContent)
            setRedOptionContent(tempRedOptionContent)
            setBlueOptionContent(tempBlueOptionContent)
        }
    };

    const [questionTitleError, setQuestionTitleError] = useState({ value: false, errorMessage: "" });
    const [questionTimeLimitError, setQuestionTimeLimitError] = useState({ value: false, errorMessage: "" });

    const [triviaOptions, setTriviaOptions] = useState("");

    const [originalYellowTriviaOption, setOriginalYellowTriviaOption] = useState([]);
    const [yellowTriviaOptionId, setYellowTriviaOptionId] = useState("");
    const [yellowOptionContent, setYellowOptionContent] = useState("");
    const [yellowCorrectAnswer, setYellowCorrectAnswer] = useState(false);
    const [yellowOptionNumber, setYellowOptionNumber] = useState(1);
    const handleYellowCheckbox = (event) => {
        setYellowCorrectAnswer(event.target.checked)
        setGreenCorrectAnswer(false);
        setRedCorrectAnswer(false);
        setBlueCorrectAnswer(false)
    };
    // const [yellowHasChanged, setYellowHasChanged] = useState(false);

    const [originalGreenTriviaOption, setOriginalGreenTriviaOption] = useState([]);
    const [greenTriviaOptionId, setGreenTriviaOptionId] = useState("");
    const [greenOptionContent, setGreenOptionContent] = useState("");
    const [greenCorrectAnswer, setGreenCorrectAnswer] = useState(false);
    const [greenOptionNumber, setGreenOptionNumber] = useState(2);
    const handleGreenCheckbox = (event) => {
        setGreenCorrectAnswer(event.target.checked)
        setYellowCorrectAnswer(false);
        setRedCorrectAnswer(false);
        setBlueCorrectAnswer(false)
    };
    // const [greenHasChanged, setGreenHasChanged] = useState(false);

    const [originalRedTriviaOption, setOriginalRedTriviaOption] = useState([]);
    const [redTriviaOptionId, setRedTriviaOptionId] = useState("");
    const [redOptionContent, setRedOptionContent] = useState("");
    const [redCorrectAnswer, setRedCorrectAnswer] = useState(false);
    const [redOptionNumber, setRedOptionNumber] = useState(3);
    const handleRedCheckbox = (event) => {
        setRedCorrectAnswer(event.target.checked)
        setGreenCorrectAnswer(false);
        setYellowCorrectAnswer(false);
        setBlueCorrectAnswer(false)
    };
    // const [redHasChanged, setRedHasChanged] = useState(false);

    const [originalBlueTriviaOption, setOriginalBlueTriviaOption] = useState([]);
    const [blueTriviaOptionId, setBlueTriviaOptionId] = useState("");
    const [blueOptionContent, setBlueOptionContent] = useState("");
    const [blueCorrectAnswer, setBlueCorrectAnswer] = useState(false);
    const [blueOptionNumber, setBlueOptionNumber] = useState(4);
    const handleBlueCheckbox = (event) => {
        setBlueCorrectAnswer(event.target.checked)
        setGreenCorrectAnswer(false);
        setRedCorrectAnswer(false);
        setYellowCorrectAnswer(false)
    };
    // const [blueHasChanged, setBlueHasChanged] = useState(false);

    const setIndividualTriviaOption = (triviaOptions) => {
        for (var i = 0; i < triviaOptions.length; i++) {
            if (triviaOptions[i].optionNumber == 1) {
                setOriginalYellowTriviaOption(triviaOptions[i])
                setYellowTriviaOptionId(triviaOptions[i].triviaOptionId)
                setYellowOptionContent(triviaOptions[i].optionContent)
                setYellowCorrectAnswer(triviaOptions[i].correctAnswer)
            } else if (triviaOptions[i].optionNumber == 2) {
                setOriginalGreenTriviaOption(triviaOptions[i])
                setGreenTriviaOptionId(triviaOptions[i].triviaOptionId)
                setGreenOptionContent(triviaOptions[i].optionContent)
                setGreenCorrectAnswer(triviaOptions[i].correctAnswer)
            } else if (triviaOptions[i].optionNumber == 3) {
                setOriginalRedTriviaOption(triviaOptions[i])
                setRedTriviaOptionId(triviaOptions[i].triviaOptionId)
                setRedOptionContent(triviaOptions[i].optionContent)
                setRedCorrectAnswer(triviaOptions[i].correctAnswer)
            } else if (triviaOptions[i].optionNumber == 4) {
                setOriginalBlueTriviaOption(triviaOptions[i])
                setBlueTriviaOptionId(triviaOptions[i].triviaOptionId)
                setBlueOptionContent(triviaOptions[i].optionContent)
                setBlueCorrectAnswer(triviaOptions[i].correctAnswer)
            }
        }
    };

    React.useEffect(() => {
        fetch("http://localhost:8080/triviaQuestion/" + props.questionId + "/triviaQuestionsUnmarshalledQuestionFromOptions")
            .then((res) => res.json())
            .then((result) => {
                clearPreviousFields()
                console.log(result)
                setCurrentQuestion(result);
                setEditedCurrentQuestionTitle(result.questionTitle)
                setEditedCurrentQuestionHasTimeLimit(result.hasTimeLimit)
                setEditedCurrentQuestionTimeLimit(result.questionTimeLimit)
                setEditedCurrentQuestionType(result.triviaQuestionType)
                setTriviaOptions(result.triviaOptions)
                setIndividualTriviaOption(result.triviaOptions)
            });
    }, [props.questionId]);

    // React.useEffect(() => {
    //     fetch("http://localhost:8080/triviaQuestion/" + props.questionId + "/triviaQuestionsUnmarshalledQuestionFromOptions")
    //         .then((res) => res.json())
    //         .then((result) => {
    //             clearPreviousFields()
    //             console.log(result)
    //             setCurrentQuestion(result);
    //             setEditedCurrentQuestionTitle(result.questionTitle)
    //             setEditedCurrentQuestionHasTimeLimit(result.hasTimeLimit)
    //             setEditedCurrentQuestionTimeLimit(result.questionTimeLimit)
    //             setTriviaOptions(result.triviaOptions)
    //             setIndividualTriviaOption(result.triviaOptions)
    //         });
    // }, [refreshQuestion]);

    const refreshQuestionMethod = (e) => {
        fetch("http://localhost:8080/triviaQuestion/" + props.questionId + "/triviaQuestionsUnmarshalledQuestionFromOptions")
            .then((res) => res.json())
            .then((result) => {
                clearPreviousFields()
                // console.log(result)
                setCurrentQuestion(result);
                setEditedCurrentQuestionTitle(result.questionTitle)
                setEditedCurrentQuestionHasTimeLimit(result.hasTimeLimit)
                setEditedCurrentQuestionTimeLimit(result.questionTimeLimit)
                setEditedCurrentQuestionType(result.triviaQuestionType)
                setTriviaOptions(result.triviaOptions)
                setIndividualTriviaOption(result.triviaOptions)
            });
    }

    const clearPreviousFields = (e) => {
        setYellowTriviaOptionId("");
        setYellowOptionContent("")
        setYellowCorrectAnswer(false);
        setGreenTriviaOptionId("");
        setGreenOptionContent("")
        setGreenCorrectAnswer(false);
        setRedTriviaOptionId("");
        setRedOptionContent("")
        setRedCorrectAnswer(false);
        setBlueTriviaOptionId("");
        setBlueOptionContent("")
        setBlueCorrectAnswer(false);
        setOriginalYellowTriviaOption([])
        setOriginalGreenTriviaOption([])
        setOriginalRedTriviaOption([])
        setOriginalBlueTriviaOption([])
        setTempYellowOptionContent("")
        setTempGreenOptionContent("")
        setTempRedOptionContent("")
        setTempBlueOptionContent("")
    }

    // React.useEffect(() => {
    //     console.log("CHECKING FOR CHANGES")
    //     //--------yellow---------------
    //     //check if new option is created
    //     if (originalYellowTriviaOption.length == 0 && (yellowOptionContent != "" || yellowCorrectAnswer == true)) {
    //         props.setChangesToQuestionWasMade(true)
    //     }
    //     //check uf there was an original option and changes was made
    //     if (originalYellowTriviaOption.length != 0) {
    //         if (yellowOptionContent != originalYellowTriviaOption.optionContent
    //             || yellowCorrectAnswer != originalYellowTriviaOption.correctAnswer) {
    //             props.setChangesToQuestionWasMade(true)
    //         }
    //     }
    //     //--------green---------------
    //     //check if new option is created
    //     if (originalGreenTriviaOption.length == 0 && (greenOptionContent != "" || greenCorrectAnswer == true)) {
    //         props.setChangesToQuestionWasMade(true)
    //     }
    //     //check uf there was an original option and changes was made
    //     if (originalGreenTriviaOption.length != 0) {
    //         if (greenOptionContent != originalGreenTriviaOption.optionContent
    //             || greenCorrectAnswer != originalGreenTriviaOption.correctAnswer) {
    //             props.setChangesToQuestionWasMade(true)
    //         }
    //     }
    //     //--------red---------------
    //     //check if new option is created
    //     if (originalRedTriviaOption.length == 0 && (redOptionContent != "" || redCorrectAnswer == true)) {
    //         props.setChangesToQuestionWasMade(true)
    //     }
    //     //check uf there was an original option and changes was made
    //     if (originalRedTriviaOption.length != 0) {
    //         if (redOptionContent != originalRedTriviaOption.optionContent
    //             || redCorrectAnswer != originalRedTriviaOption.correctAnswer) {
    //             props.setChangesToQuestionWasMade(true)
    //         }
    //     }
    //     //--------blue---------------
    //     //check if new option is created
    //     if (originalBlueTriviaOption.length == 0 && (blueOptionContent != "" || blueCorrectAnswer == true)) {
    //         props.setChangesToQuestionWasMade(true)
    //     }
    //     //check uf there was an original option and changes was made
    //     if (originalBlueTriviaOption.length != 0) {
    //         if (blueOptionContent != originalBlueTriviaOption.optionContent
    //             || blueCorrectAnswer != originalBlueTriviaOption.correctAnswer) {
    //             props.setChangesToQuestionWasMade(true)
    //         }
    //     }
    // }, [props.checkForChanges]);


    // const checkForChanges = () => {

    // }

    const updateTriviaOption = async (triviaOptionId, body) => {
        try {
            const response = await fetch("http://localhost:8080/triviaOption/triviaOptions/" + triviaOptionId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            // console.log(response);
            if (response.ok == false) {
                handleClickErrorSnackbar()
            } else {
                console.log("SET REFRESH PAGE CHILD TRUE")
                handleClickSnackbar()
                updateQuestionFromOption()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshQuestion(true)
        handleClickSnackbar()
    }

    const createTriviaOption = async (body) => {
        try {
            const response = await fetch("http://localhost:8080/triviaOption/" + props.questionId + "/triviaOptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            console.log(response);
            if (response.ok == false) {
                handleClickErrorSnackbar()
            } else {
                console.log("SET REFRESH PAGE CHILD TRUE")
                handleClickSnackbar()
                updateQuestionFromOption()
                refreshQuestionMethod()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshQuestion(true)
        handleClickSnackbar()
    }

    const deleteTriviaOption = async (triviaOptionIdToDelete) => {
        try {
            const response = await fetch("http://localhost:8080/triviaOption/triviaOptions/" + triviaOptionIdToDelete, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                handleClickErrorSnackbar()
            } else {
                console.log("SET REFRESH PAGE CHILD TRUE")
                handleClickSnackbar()
                updateQuestionFromOption()
                refreshQuestionMethod()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshQuestion(true)
        handleClickSnackbar()
    }

    const updateQuestionTitle = async () => {
        var questionTitle = editedCurrentQuestionTitle
        var hasTimeLimit = editedCurrentQuestionHasTimeLimit
        var questionTimeLimit = editedCurrentQuestionTimeLimit
        var triviaQuestionType = editedCurrentQuestionType
        const updatedQuestion = { questionTitle, hasTimeLimit, questionTimeLimit, triviaQuestionType }
        updateQuestion(updatedQuestion)
    }

    const updateQuestionFromOption = async () => {
        var questionTitle = editedCurrentQuestionTitle
        var hasTimeLimit = editedCurrentQuestionHasTimeLimit
        var questionTimeLimit = editedCurrentQuestionTimeLimit
        var triviaQuestionType = editedCurrentQuestionType
        const updatedQuestion = { questionTitle, hasTimeLimit, questionTimeLimit, triviaQuestionType }
        updateQuestion(updatedQuestion)
    }

    const updateQuestion = async (body) => {
        try {
            console.log(body)
            const response = await fetch("http://localhost:8080/triviaQuestion/triviaQuestions/" + props.questionId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            // console.log(response);
            if (response.ok == false) {
                handleClickErrorSnackbar()
            } else {
                console.log("SET REFRESH PAGE CHILD TRUE")
                handleClickSnackbar()
                refreshQuestionMethod()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        setRefreshQuestion(true)
        handleClickSnackbar()
    }

    const save = () => {
        updateQuestionTitle()
        var previouslyHadYellow = false
        var previouslyHadGreen = false
        var previouslyHadRed = false
        var previouslyHadBlue = false
        for (var i = 0; i < triviaOptions.length; i++) {
            console.log("TRIVIA OPTIONS")
            console.log(triviaOptions)
            if (triviaOptions[i].optionNumber == 1) {
                previouslyHadYellow = true
            } else if (triviaOptions[i].optionNumber == 2) {
                previouslyHadGreen = true
            } else if (triviaOptions[i].optionNumber == 3) {
                previouslyHadRed = true
            } else if (triviaOptions[i].optionNumber == 4) {
                previouslyHadBlue = true
            }
        }
        console.log(yellowOptionContent);
        //yellow
        if (yellowOptionContent != "") {
            console.log("INNER 1 YELLOW");
            var optionContent = yellowOptionContent
            var correctAnswer = yellowCorrectAnswer
            var optionNumber = 1
            const yellowOption = { optionContent, correctAnswer }
            //edit flow
            if (previouslyHadYellow) {
                console.log("INNER YELLOW 1A");
                updateTriviaOption(yellowTriviaOptionId, yellowOption)
            }
            //create flow
            else {
                console.log("INNER YELLOW 1B");
                const yellowOption = { optionContent, correctAnswer, optionNumber }
                createTriviaOption(yellowOption)
            }
        } else if (originalYellowTriviaOption.length != 0) {
            console.log("REMOVE YELLOW");
            deleteTriviaOption(yellowTriviaOptionId)
        }
        //green
        if (greenOptionContent != "") {
            console.log("INNER 1 GREEN");
            var optionContent = greenOptionContent
            var correctAnswer = greenCorrectAnswer
            var optionNumber = 2
            const greenOption = { optionContent, correctAnswer }
            //edit flow
            if (previouslyHadGreen) {
                console.log("INNER GREEN 1A");
                updateTriviaOption(greenTriviaOptionId, greenOption)
            }
            //create flow
            else {
                console.log("INNER GREEN 1B");
                const greenOption = { optionContent, correctAnswer, optionNumber }
                createTriviaOption(greenOption)
            }
        } else if (originalGreenTriviaOption.length != 0) {
            console.log("REMOVE Green");
            deleteTriviaOption(greenTriviaOptionId)
        }
        //red
        if (redOptionContent != "") {
            console.log("INNER 1 RED");
            var optionContent = redOptionContent
            var correctAnswer = redCorrectAnswer
            var optionNumber = 3
            const redOption = { optionContent, correctAnswer }
            //edit flow
            if (previouslyHadRed) {
                console.log("INNER RED 1A");
                updateTriviaOption(redTriviaOptionId, redOption)
            }
            //create flow
            else {
                console.log("INNER RED 1B");
                const redOption = { optionContent, correctAnswer, optionNumber }
                createTriviaOption(redOption)
            }
        } else if (originalRedTriviaOption.length != 0) {
            console.log("REMOVE Red");
            deleteTriviaOption(redTriviaOptionId)
        }
        //blue
        if (blueOptionContent != "") {
            console.log("INNER 1 BLUE");
            var optionContent = blueOptionContent
            var correctAnswer = blueCorrectAnswer
            var optionNumber = 4
            const blueOption = { optionContent, correctAnswer }
            //edit flow
            if (previouslyHadBlue) {
                console.log("INNER BLUE 1A");
                updateTriviaOption(blueTriviaOptionId, blueOption)
            }
            //create flow
            else {
                console.log("INNER BLUE 1B");
                const blueOption = { optionContent, correctAnswer, optionNumber }
                createTriviaOption(blueOption)
            }
        } else if (originalBlueTriviaOption.length != 0) {
            console.log("REMOVE Blue");
            deleteTriviaOption(blueTriviaOptionId)
        }
        props.setRefreshPageChild(true)
    };

    return (

        <div className="mainLayoutContainer">
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
            <div className="breadcrumbContainer">
                {/* <Breadcrumbs aria-label="breadcrumb">
                    <Link to={`${booksPath}`} style={{ textDecoration: 'none', color: 'grey' }}>
                        <LinkMaterial underline="hover" color="grey">Trivia</LinkMaterial>
                    </Link>
                    {props.questionNumber && <p>
                        Question {props.questionNumber}
                    </p>
                    }
                </Breadcrumbs> */}
            </div>
            <div className="secondaryLayoutContainer">
                <div className="slideLayoutContainer">
                    {/* <div style={{ justifyContent: "center" }}>
                        <h1 style={{ justifySelf: "center", marginLeft: "auto" }}>
                            Page {pageNumberPointer}
                        </h1>
                    </div> */}
                    <Paper elevation={3} className="triviaLayoutContainer">
                        <div className="questionTitleContainer">
                            <TextField
                                id="outlined-basic"
                                label="Question Title"
                                variant="outlined"
                                fullWidth
                                style={{ margin: "6px 0", marginTop: "20px", backgroundColor: "white" }}
                                sx={{ width: "95%" }}
                                InputProps={{ sx: { height: 80, fontSize: "20px" } }}
                                InputLabelProps={{ sx: { fontSize: "22px", paddingTop: "5px" } }}
                                value={editedCurrentQuestionTitle}
                                required
                                onChange={(e) => setEditedCurrentQuestionTitle(e.target.value)}
                                error={questionTitleError.value}
                                helperText={questionTitleError.errorMessage}
                            />
                        </div>

                        <div className="mediaContainer">
                            {!currentQuestion.attachment &&
                                <IconButton color="primary" aria-label="upload picture" component="label" style={{ height: "25%", top: "37%" }} onClick={handleOpenUploadDialog}>
                                    <AddPhotoAlternateIcon style={{ fontSize: "60px" }} />
                                </IconButton>
                            }
                            {currentQuestion.attachment &&
                                <div style={{ height: "100%", width: "100%", alignContent: "center", justifyContent: "center", display: "flex" }}>
                                    <div style={{ width: "7%" }}></div>
                                    <img src={currentQuestion.attachment.fileURL} style={{ padding: "5% 0", height: "100%", width: "84%", objectFit: "contain" }} />
                                    <div style={{ width: "7%", height: "100%" }}>
                                        <IconButton color="primary" aria-label="delete" style={{ top: "85%", right: "2%", objectFit: "contain" }} onClick={handleOpenUploadDialog}>
                                            <DeleteIcon style={{ fontSize: "30px" }} />
                                        </IconButton>
                                    </div>
                                </div>
                            }
                        </div>

                        {editedCurrentQuestionType == "Four Options" && <div className="triviaOptionsRowContainer">
                            {/* yellow star */}
                            <div className="triviaOptionContainer" style={{ backgroundColor: yellowOptionContent == "" ? "white" : yellowColor }}>
                                <div style={{ width: "10%", margin: "2%", backgroundColor: yellowColor }}>
                                    <img src={starwhite} className="triviaOptionImageStyle" />
                                </div>
                                <TextField id="outlined-basic" variant="standard" fullWidth required
                                    sx={{ input: { color: 'white' } }}
                                    label={yellowOptionContent == "" ? "Add answer 1" : null}
                                    style={{ margin: "6px 0", marginTop: "20px", width: "80%" }}
                                    InputProps={{ sx: { height: 80, fontSize: "18px" }, disableUnderline: true }}
                                    InputLabelProps={{ sx: { fontSize: "20px", paddingTop: "5px" } }}
                                    value={yellowOptionContent}
                                    onChange={(e) => setYellowOptionContent(e.target.value)}
                                />
                                <div className="triviaOptionRightSideCompartment">
                                    {yellowOptionContent != "" &&
                                        <div>
                                            <Checkbox color="default" inputProps={{ 'aria-label': 'controlled' }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                checked={yellowCorrectAnswer}
                                                onChange={handleYellowCheckbox}
                                                style={{ height: "80%", paddingTop: "45%" }}
                                            />
                                            <div style={{ textAlign: "right" }}>
                                                {100 - yellowOptionContent.length}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="triviaOptionColumnGap" />
                            {/* green moon */}
                            <div className="triviaOptionContainer" style={{ backgroundColor: greenOptionContent == "" ? "white" : greenColor }}>
                                <div style={{ width: "10%", margin: "2%", backgroundColor: greenColor }}>
                                    <img src={moonwhite} className="triviaOptionImageStyle" />
                                </div>
                                <TextField id="outlined-basic" variant="standard" fullWidth required
                                    sx={{ input: { color: 'white' } }}
                                    style={{ margin: "6px 0", marginTop: "20px", width: "80%" }}
                                    label={greenOptionContent == "" ? "Add answer 2" : null}
                                    InputProps={{ sx: { height: 80, fontSize: "18px" }, disableUnderline: true }}
                                    InputLabelProps={{ sx: { fontSize: "20px", paddingTop: "5px" } }}
                                    value={greenOptionContent}
                                    onChange={(e) => setGreenOptionContent(e.target.value)}
                                />
                                <div className="triviaOptionRightSideCompartment">
                                    {greenOptionContent != "" &&
                                        <div>
                                            <Checkbox color="default" inputProps={{ 'aria-label': 'controlled' }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                checked={greenCorrectAnswer}
                                                onChange={handleGreenCheckbox}
                                                style={{ height: "80%", paddingTop: "45%" }}
                                            />
                                            <div style={{ textAlign: "right" }}>
                                                {100 - greenOptionContent.length}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        }

                        {editedCurrentQuestionType == "Four Options" && <div className="triviaOptionsRowContainer">
                            {/* red apple */}
                            <div className="triviaOptionContainer" style={{ backgroundColor: redOptionContent == "" ? "white" : redColor }}>
                                <div style={{ width: "10%", margin: "2%", backgroundColor: redColor }}>
                                    <img src={applewhite} className="triviaOptionImageStyle" />
                                </div>
                                <TextField id="outlined-basic" variant="standard" fullWidth required
                                    sx={{ input: { color: 'white' } }}
                                    label={redOptionContent == "" ? "Add answer 3 (optional)" : null}
                                    style={{ margin: "6px 0", marginTop: "20px", width: "80%" }}
                                    InputProps={{ sx: { height: 80, fontSize: "18px" }, disableUnderline: true }}
                                    InputLabelProps={{ sx: { fontSize: "20px", paddingTop: "5px" } }}
                                    value={redOptionContent}
                                    onChange={(e) => setRedOptionContent(e.target.value)}
                                />
                                <div className="triviaOptionRightSideCompartment">
                                    {redOptionContent != "" &&
                                        <div>
                                            <Checkbox color="default" inputProps={{ 'aria-label': 'controlled' }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                checked={redCorrectAnswer}
                                                onChange={handleRedCheckbox}
                                                style={{ height: "80%", paddingTop: "45%" }}
                                            />
                                            <div style={{ textAlign: "right" }}>
                                                {100 - redOptionContent.length}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="triviaOptionColumnGap" />
                            {/* blue cloud */}
                            <div className="triviaOptionContainer" style={{ backgroundColor: blueOptionContent == "" ? "white" : blueColor }}>
                                <div style={{ width: "10%", margin: "2%", backgroundColor: blueColor }}>
                                    <img src={cloudwhite} className="triviaOptionImageStyle" />
                                </div>
                                <TextField id="outlined-basic" variant="standard" fullWidth required
                                    sx={{ input: { color: 'white' } }}
                                    style={{ margin: "6px 0", marginTop: "20px", width: "80%" }}
                                    label={blueOptionContent == "" ? "Add answer 4 (optional)" : null}
                                    InputProps={{ sx: { height: 80, fontSize: "18px" }, disableUnderline: true }}
                                    InputLabelProps={{ sx: { fontSize: "20px", paddingTop: "5px" } }}
                                    value={blueOptionContent}
                                    onChange={(e) => setBlueOptionContent(e.target.value)}
                                />
                                <div className="triviaOptionRightSideCompartment">
                                    {blueOptionContent != "" &&
                                        <div>
                                            <Checkbox color="default" inputProps={{ 'aria-label': 'controlled' }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                                checked={blueCorrectAnswer}
                                                onChange={handleBlueCheckbox}
                                                style={{ height: "80%", paddingTop: "45%" }}
                                            />
                                            <div style={{ textAlign: "right" }}>
                                                {100 - blueOptionContent.length}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        }

                        {/* gets abit confusing here but basically translate yellow option to correct and set the color to green, and green option to wrong and set the color to red */}
                        {editedCurrentQuestionType == "True or False" && <div className="triviaOptionsRowContainerTrueFalse">
                            {/* red apple */}
                            <div className="triviaOptionContainer" style={{ backgroundColor: greenColor }}>
                                <div style={{ width: "10%", margin: "2%", backgroundColor: greenColor }}>
                                    <img src={correct} className="triviaOptionImageStyleTrueFalse" />
                                </div>
                                <div className="triviaOptionTextStyleTrueFalse">True</div>
                                <div className="triviaOptionRightSideCompartment">
                                    <Checkbox color="default" inputProps={{ 'aria-label': 'controlled' }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                        checked={yellowCorrectAnswer}
                                        onChange={handleYellowCheckbox}
                                        style={{ height: "100%", paddingTop: "20%" }}
                                    />
                                </div>
                            </div>
                            <div className="triviaOptionColumnGap" />
                            {/* blue cloud */}
                            <div className="triviaOptionContainer" style={{ backgroundColor: redColor }}>
                                <div style={{ width: "10%", margin: "2%", backgroundColor: redColor }}>
                                    <img src={wrong} className="triviaOptionImageStyleTrueFalse" />
                                </div>
                                <div className="triviaOptionTextStyleTrueFalse">False</div>
                                <div className="triviaOptionRightSideCompartment">
                                    <Checkbox color="default" inputProps={{ 'aria-label': 'controlled' }} sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
                                        checked={greenCorrectAnswer}
                                        onChange={handleGreenCheckbox}
                                        style={{ height: "100%", paddingTop: "20%" }}
                                    />
                                </div>
                            </div>
                        </div>
                        }
                    </Paper>
                </div>
                <div style={{ width: "20%", height: "100%" }}>
                    <div id="sidenavbar2" className="sidebarPage">
                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "85%" }}>
                                <h2>Question Settings</h2>
                                <Divider />
                            </div>
                        </div>
                        <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            <TextField id="outlined-select-age" select label="Question Type" fullWidth required
                                style={{ margin: "20px 5px 0 0", width: "77%", textAlign: 'left' }}
                                value={editedCurrentQuestionType}
                                onChange={handleChangeEditedCurrentQuestionType}
                            >
                                {questionTypeEnums.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField id="outlined-basic" label="Time Limit (seconds)" fullWidth defaultValue="" required
                                style={{ margin: "20px 5px 0 0", width: "77%" }}
                                value={editedCurrentQuestionTimeLimit}
                                onChange={(e) => setEditedCurrentQuestionTimeLimit(e.target.value)}
                                error={questionTimeLimitError.value}
                                helperText={questionTimeLimitError.errorMessage}
                            />
                        </div>
                        <br />
                        <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            {props.questionId &&
                                <Button className="btn-upload" color="primary" component="span" variant="contained"
                                    onClick={save}
                                    style={{ width: "80%", marginTop: "10px" }}
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            }
                        </div>
                        <br />

                        <div style={{ width: "100%", display: "flex" }}>
                            <div style={{ width: "85%" }}>
                                <h2>Validity</h2>
                                <Divider />
                            </div>
                        </div>
                        <div style={{ width: "100%", justifyContent: 'center', textAlign: 'center' }}>
                            {editedCurrentQuestionTitle != "" && yellowOptionContent != "" && greenOptionContent != "" && (yellowCorrectAnswer || greenCorrectAnswer || redCorrectAnswer || blueCorrectAnswer) &&
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ height: "20px", width: "20px" }}><img src={tick} style={{ height: "100%", width: "100%", objectFit: "contain" }} /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Question is valid" style={{ marginLeft: "-24px" }} />
                                </ListItem>
                            }
                            {editedCurrentQuestionTitle == "" &&
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ height: "20px", width: "20px" }}><img src={warning} style={{ height: "100%", width: "100%", objectFit: "contain" }} /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Title is empty" style={{ marginLeft: "-24px" }} />
                                </ListItem>
                            }
                            {yellowOptionContent == "" &&
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ height: "20px", width: "20px" }}><img src={warning} style={{ height: "100%", width: "100%", objectFit: "contain" }} /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Mandatory yellow option is empty" style={{ marginLeft: "-24px" }} />
                                </ListItem>
                            }
                            {greenOptionContent == "" &&
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ height: "20px", width: "20px" }}><img src={warning} style={{ height: "100%", width: "100%", objectFit: "contain" }} /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Mandatory green option is empty" style={{ marginLeft: "-24px" }} />
                                </ListItem>
                            }
                            {!(yellowCorrectAnswer || greenCorrectAnswer || redCorrectAnswer || blueCorrectAnswer) &&
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar style={{ height: "20px", width: "20px" }}><img src={warning} style={{ height: "100%", width: "100%", objectFit: "contain" }} /></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="No correct answer" style={{ marginLeft: "-24px" }} />
                                </ListItem>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* <div>
                <Dialog
                    open={changesWasMadeDialogOpen}
                    onClose={closeChangesWasMadeDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Prompt: Unsaved Changes"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            There are unsaved changes. Would you like to save the changes?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeChangesWasMadeDialog}>Cancel</Button>
                        <Button onClick={closeChangesWasMadeDialog} autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div> */}

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
        </div >
    );
}