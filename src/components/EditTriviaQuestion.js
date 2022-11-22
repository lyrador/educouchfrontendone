import * as React from "react";
import dayjs from "dayjs";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import LinkMaterial from "@mui/material/Link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    Breadcrumbs,
    Grid,
    Modal,
    Paper,
    Button,
    TextField,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    Snackbar,
    Alert,
} from "@mui/material";
import { useState } from "react";
import TeachingCoursesDrawer from "../components/TeachingCoursesDrawer";
import QuizQuestionComponent from "../components/QuizComponents/QuizQuestionComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import QuizSettingsComponents from "../components/QuizComponents/QuizSettingsComponent";
import EditSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import EditQuizSettingsComponent from "../components/QuizComponents/EditQuizSettingsComponent";
import { CatchingPokemonSharp } from "@mui/icons-material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import MuiAlert from "@mui/material/Alert";

// Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function EditTriviaQuestion(props) {

    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);
    const handleClickErrorSnackbar = () => { setOpenErrorSnackbar(true) };
    const handleCloseErrorSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenErrorSnackbar(false) };

    const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
    const handleClickDeleteSnackbar = () => { setOpenDeleteSnackbar(true) };
    const handleCloseDeleteSnackbar = (event, reason) => { if (reason === "clickaway") { return } setOpenDeleteSnackbar(false) };

    const location = useLocation();
    const navigate = useNavigate();
    const courseId = location.pathname.split("/").slice(2, 3).join("/");
    const assessmentsPath = location.state.assessmentPathProp;
    const editQuizPath = location.pathname;
    const assessmentId = location.state.assessmentIdProp;
    const [currentQuiz, setCurrentQuiz] = useState();
    const [question, setQuestion] = useState({});
    const [questions, setQuestions] = useState([]);
    const [textField, setTextField] = useState("");
    const [editSettings, setEditSettings] = useState("");
    const [questionCounter, setQuestionCounter] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [maxScore, setMaxScore] = useState();
    const [trigger, setTrigger] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [hasTimeLimit, setHasTimeLimit] = useState("true");
    const [timeLimit, setTimeLimit] = useState();
    const [isAutoRelease, setIsAutoRelease] = useState("false");
    const [open, setOpen] = React.useState(false);
    const [hasMaxAttempts, setHasMaxAttempts] = useState("");
    const [maxAttempts, setMaxAttempts] = useState(0);
    const paperStyle = { padding: "50px 20px", width: 1200, margin: "20px auto" };
    var startDateString = "";
    var endDateString = "";

    React.useEffect(() => {
        fetch("http://localhost:8080/quiz/getQuizByInteractivePageId/" + props.pageId)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                console.log("page id is " + props.pageId);
                setCurrentQuiz(result);
                setQuestions(result.questions);
                setQuestion(result.questions[0]);
                setQuestionCounter(result.questionCounter + 1);
                setTitle(result.assessmentTitle);
                setDescription(result.assessmentDescription);
                setMaxScore(result.assessmentMaxScore);
                setStartDate(result.assessmentStartDate);
                setEndDate(result.assessmentEndDate);
                setHasTimeLimit(result.hasTimeLimit);
                setTimeLimit(result.timeLimit);
                setHasMaxAttempts(result.hasMaxAttempts);
                setMaxAttempts(result.maxAttempts);
                setIsAutoRelease(result.isAutoRelease);
            });
    }, [props.pageId]);

    React.useEffect(() => {
        //currentQuiz.questions = questions
        setTrigger(false);
    }, [trigger]);

    const [openReleaseSnackbar, setOpenReleaseSnackbar] = React.useState(false);

    const handleClickReleaseSnackbar = () => {
        setOpenReleaseSnackbar(true);
    };

    const handleCloseReleaseSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenReleaseSnackbar(false);
    };

    const [titleError, setTitleError] = useState({
        value: false,
        errorMessage: "",
    });
    const [descriptionError, setDescriptionError] = useState({
        value: false,
        errorMessage: "",
    });
    const [maxScoreError, setMaxScoreError] = useState({
        value: false,
        errorMessage: "",
    });
    //   const [startDateError, setStartDateError] = useState({
    //     value: false,
    //     errorMessage: "",
    //   });
    //   const [endDateError, setEndDateError] = useState({
    //     value: false,
    //     errorMessage: "",
    //   });
    //   const [timeLimitError, setTimeLimitError] = useState({
    //     value: false,
    //     errorMessage: "",
    //   });
    //   const [maxAttemptsError, setMaxAttemptsError] = useState({
    //     value: false,
    //     errorMessage: "",
    //   });

    function validateQuizSettings() {
        //     const tempStartDate = startDate;
        //     const tempEndDate = endDate;
        //     const dateComparisonBoolean = tempEndDate >= tempStartDate;
        //     if (hasTimeLimit == "true" || hasMaxAttempts == "true") {
        //       if (hasTimeLimit == "true" && hasMaxAttempts == "true") {
        //         console.log("fail dis");
        //         return (
        //           title &&
        //           description &&
        //           maxScore &&
        //           dateComparisonBoolean &&
        //           timeLimit > 4 &&
        //           maxAttempts > 0
        //         );
        //       } else if (hasTimeLimit == "true") {
        //         console.log("fail dat");
        //         return (
        //           title &&
        //           description &&
        //           maxScore &&
        //           dateComparisonBoolean &&
        //           timeLimit > 4
        //         );
        //       } else {
        //         console.log("fail dat other one");

        return (
            title && description
            //           maxScore &&
            //           dateComparisonBoolean &&
            //           maxAttempts > 0
        );
    }
    //     } else {
    //       return title && description && maxScore && dateComparisonBoolean;
    //     }
    //   }

    const handleClick = (e) => {
        //     e.preventDefault();
        //     const tempStartDate = startDate;
        //     const tempEndDate = endDate;
        setTitleError({ value: false, errorMessage: "" });
        setDescriptionError({ value: false, errorMessage: "" });
        setMaxScoreError({ value: false, errorMessage: "" });
        //     setStartDateError({ value: false, errorMessage: "" });
        //     setEndDateError({ value: false, errorMessage: "" });
        //     setTimeLimitError({ value: false, errorMessage: "" });
        //     setMaxAttemptsError({ value: false, errorMessage: "" });

        if (title == "") {
            setTitleError({
                value: true,
                errorMessage: "Title field cannot be left empty!",
            });
        }
        if (description == "") {
            setDescriptionError({
                value: true,
                errorMessage: "Description Field cannot be left empty!",
            });
        }
        if (maxScore == "") {
            setMaxScoreError({
                value: true,
                errorMessage: "Max Score Field cannot be left empty!",
            });
        }
        //     if (maxAttempts < 1) {
        //       setMaxAttemptsError({
        //         value: true,
        //         errorMessage: "Maximum Quiz Attempts Allowed must be more than 0!",
        //       });
        //     }

        //     const dateComparisonBoolean = tempEndDate < tempStartDate;
        //     if (dateComparisonBoolean) {
        //       setStartDateError({
        //         value: true,
        //         errorMessage: "Quiz End Date cannot be earlier than Start Date!",
        //       });
        //       setEndDateError({
        //         value: true,
        //         errorMessage: "Quiz End Date cannot be earlier than Start Date!",
        //       });
        //     }
        //     if (timeLimit < 5) {
        //       setTimeLimitError({
        //         value: true,
        //         errorMessage: "Quiz Time Limit cannot be less than 5 minutes!",
        //       });
        //     }
        if (validateQuizSettings()) {
            editQuizSettings(
                title,
                description
                //         maxScore,
                //         startDate,
                //         endDate,
                //         hasTimeLimit,
                //         timeLimit,
                //         hasMaxAttempts,
                //         maxAttempts,
                //         isAutoRelease
            );
            console.log("passedValidations");
            handleClickReleaseSnackbar();
        } else {
            console.log("did not pass the vibe check");
        }
    };

    //   const handleStartDateChange = (newDate) => {
    //     setStartDate(newDate);
    //     console.log("new start date: ", startDate);
    //   };

    //   const handleEndDateChange = (newDate) => {
    //     setEndDate(newDate);
    //   };

    function handleProceedQuestions() {
        setQuestions(currentQuiz.questions);
        //     const tempStartDate = startDate;
        //     const tempEndDate = endDate;
        setTitleError({ value: false, errorMessage: "" });
        setDescriptionError({ value: false, errorMessage: "" });
        setMaxScoreError({ value: false, errorMessage: "" });
        //     setStartDateError({ value: false, errorMessage: "" });
        //     setEndDateError({ value: false, errorMessage: "" });
        //     setTimeLimitError({ value: false, errorMessage: "" });
        //     setMaxAttemptsError({ value: false, errorMessage: "" });
        if (title == "") {
            setTitleError({
                value: true,
                errorMessage: "Title field cannot be left empty!",
            });
        }
        if (description == "") {
            setDescriptionError({
                value: true,
                errorMessage: "Description Field cannot be left empty!",
            });
        }
        if (maxScore == "") {
            setMaxScoreError({
                value: true,
                errorMessage: "Max Score Field cannot be left empty!",
            });
        }
        //     const dateComparisonBoolean = tempEndDate < tempStartDate;
        //     if (dateComparisonBoolean) {
        //       setStartDateError({
        //         value: true,
        //         errorMessage: "Quiz End Date cannot be earlier than Start Date!",
        //       });
        //       setEndDateError({
        //         value: true,
        //         errorMessage: "Quiz End Date cannot be earlier than Start Date!",
        //       });
        //     }
        //     if (timeLimit < 5) {
        //       setTimeLimitError({
        //         value: true,
        //         errorMessage: "Quiz Time Limit cannot be less than 5 minutes!",
        //       });
        //     }
        //     if (maxAttempts < 1) {
        //       setMaxAttemptsError({
        //         value: true,
        //         errorMessage: "Maximum Quiz Attempts Allowed must be more than 0!",
        //       });
        //     }
        if (validateQuizSettings()) {
            console.log("passedValidations");
            editQuizSettings(
                title,
                description
                //         maxScore,
                //         startDate,
                //         endDate,
                //         hasTimeLimit,
                //         timeLimit,
                //         hasMaxAttempts,
                //         maxAttempts,
                //         isAutoRelease
            );
            setEditSettings("false");
        } else {
            console.log("did not pass the vibe check");
        }
    }
    function handleBackToSettings() {
        //     calculateMaxQuizScore();
        setEditSettings("true");
    }

    //   function validateQuizSettings() {
    //     const tempStartDate = startDate;
    //     const tempEndDate = endDate;
    //     const dateComparisonBoolean = tempEndDate >= tempStartDate;
    //     if (hasTimeLimit == "true" || hasMaxAttempts == "true") {
    //       if (hasTimeLimit == "true" && hasMaxAttempts == "true") {
    //         // console.log("fail dis")
    //         return (
    //           title &&
    //           description &&
    //           maxScore &&
    //           dateComparisonBoolean &&
    //           timeLimit > 4 &&
    //           maxAttempts > 0
    //         );
    //       } else if (hasTimeLimit == "true") {
    //         // console.log("fail dat")
    //         return (
    //           title &&
    //           description &&
    //           maxScore &&
    //           dateComparisonBoolean &&
    //           timeLimit > 4
    //         );
    //       } else {
    //         // console.log("fail dat other one")
    //         return (
    //           title &&
    //           description &&
    //           maxScore &&
    //           dateComparisonBoolean &&
    //           maxAttempts > 0
    //         );
    //       }
    //     } else {
    //       return title && description && maxScore && dateComparisonBoolean;
    //     }
    //   }

    function validateQuiz() {
        setMaxScoreError({ value: false, errorMessage: "" });
        if (question.questionMaxPoints == "") {
            setMaxScoreError({
                value: true,
                errorMessage:
                    "Max Points of question: " +
                    question.questionTitle +
                    " cannot be empty!",
            });
            return false;
        }
        return true;
    }

    function linkQuizQuestions() {
        currentQuiz.questions[0] = question;
        console.log(currentQuiz);
    }

    function editQuizSettings(
        title1,
        description1,
        maxScore1,
        startDate1,
        endDate1,
        hasTimeLimit1,
        timeLimit1,
        hasMaxAttempts1,
        maxAttempts1,
        isAutoRelease1
    ) {
        setTitle(title1);
        setDescription(description1);
        setMaxScore(maxScore1);
        setStartDate(startDate1);
        setEndDate(endDate1);
        setHasTimeLimit(hasTimeLimit1);
        setTimeLimit(timeLimit1);
        setHasMaxAttempts(hasMaxAttempts1);
        setMaxAttempts(maxAttempts1);
        setIsAutoRelease(isAutoRelease1);
    }

    function editQuestionTitle(localId, questionTitle) {
        console.log("passing in: ", questionTitle)
        if (question.questionTitle != questionTitle) {
            question.questionTitle = questionTitle;
            setQuestion(question)
            setTrigger(true);
            console.log(question);
            console.log("question title now: ", question.questionTitle)
        }
    }

    function editQuestionType(localId, questionType) {
        if (question.questionType != questionType) {
            question.questionType = questionType;
            setQuestion(question);
            setTrigger(true);
            console.log(question)
            console.log("question type now: ", question.questionType)
        }
    }

    function editQuestionContent(localId, questionContent) {
        question.questionContent = questionContent;
        setQuestion(question);
        console.log("question content now: ", question.questionContent);
    }

    function editQuestionHint(localId, questionHint) {
        question.questionHint = questionHint;
        setQuestion(question);
        console.log("question hint is now: ", question.questionHint);
    }

    function editQuestionMaxPoints(localId, questionMaxPoints) {
        question.questionMaxPoints = questionMaxPoints;
        setQuestion(question);
        console.log("question max points is now", question.questionMaxPoints);
    }

    function addQuestionOption(localId, option) {
        if (option && option != "") {
            question.options.push(option);
            setQuestion(question);
            setTextField("");
        }
    }

    function removeQuestionOption(localId, updatedOptions) {
        console.log("remove option called");
        if (updatedOptions && updatedOptions != "") {
            question.options = updatedOptions;
        }
        console.log("options after removal: ", question.options);
        console.log("supposed to assign this: ", updatedOptions);
    }

    function selectCorrectQuestionOption(localId, option) {
        if (option && option != "") {
            question.correctOption = option;
            setQuestion(question);
            console.log("correct option selected: ", option);
        }
    }

    //   const addQuestion = () => {
    //     console.log("editQuiz questioncounter: ", questionCounter);
    //     setQuestionCounter(questionCounter + 1);
    //     currentQuiz.questionCounter = questionCounter;
    //     const question = {
    //       localid: "question" + questionCounter,
    //       questionTitle: "Untitled Question",
    //       questionType: "shortAnswer",
    //       questionContent: "Type Question Body here...",
    //       questionMaxPoints: "0.0 points",
    //       options: [],
    //       correctOption: "",
    //     };
    //     setFormQuestions([...formQuestions, question]);
    //   };

    //   const removeQuestion = (questionId) => {
    //     const questionIndex = formQuestions.findIndex(
    //       (f) => f.localid == questionId
    //     );
    //     const tempFormQuestions = [...formQuestions];
    //     if (questionIndex > -1) {
    //       setFormQuestions(
    //         tempFormQuestions.filter((question) => {
    //           return question.localid !== questionId;
    //         })
    //       );
    //     }
    //     console.log("removed question: " + questionId);
    //   };

    //   const handleQuizDateConversions = (quizObject) => {
    //     const formattedStart = dayjs(quizObject.assessmentStartDate.d).format(
    //       "YYYY-MM-DD"
    //     );
    //     const formattedEnd = dayjs(quizObject.assessmentEndDate.d).format(
    //       "YYYY-MM-DD"
    //     );
    //     quizObject.assessmentStartDate = formattedStart;
    //     quizObject.assessmentEndDate = formattedEnd;
    //     return quizObject;
    //   };

    //   function calculateMaxQuizScore() {
    //     var tempMaxScore = 0;
    //     for (const question of formQuestions) {
    //       tempMaxScore = parseFloat(tempMaxScore) + parseFloat(question.questionMaxPoints);
    //     }
    //     setMaxScore(tempMaxScore);
    //     console.log("quiz max score: ", tempMaxScore);
    //   }

    const handleSave = (e) => {
        e.preventDefault();
        //edit validatequiz to just make sure the mcq/ truefalse questions have a non-null questionGuide or somehting
        if (validateQuiz()) {
            //const updatedQuiz = handleQuizDateConversions(currentQuiz);
            linkQuizQuestions();
            console.log(currentQuiz);

            //   fetch("http://localhost:8080/quiz/createQuizForInteractivePage/" + 1, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },

            //     body: JSON.stringify(currentQuiz),
            //   }).then((res) => res.json());
            //   handleCancel();
            // }

            fetch(
                "http://localhost:8080/quiz/updateQuizById/" + currentQuiz.assessmentId,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(currentQuiz),
                }
            )
                .then((res) => res.json())
                .then(console.log("saved: ", currentQuiz));
            //handleCancel();
        }
    };

    const handleRemoveQuiz = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/interactivePage/" + props.pageId + "/removeQuiz", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            })
            console.log(response);
            if (response.ok == false) {
                console.log("Error");
                handleClickErrorSnackbar()
            } else {
                console.log("Quiz Removed Successfully!");
                handleClickDeleteSnackbar()
            }
        } catch (err) {
            console.log(err);
            handleClickErrorSnackbar()
        }
        props.setRefreshInteractivePage(true);
        handleClickDeleteSnackbar();

    }

    const handleCancel = (e) => {
        // navigate(`${assessmentsPath}`);
    };

    return (
        <Grid container spacing={0}>
            <Snackbar open={openDeleteSnackbar} autoHideDuration={5000} onClose={handleCloseDeleteSnackbar} >
                <Alert onClose={handleCloseDeleteSnackbar} severity="success" sx={{ width: "100%" }} >
                    Quiz Removed Succesfully!
                </Alert>
            </Snackbar>
            <Grid item xs={10}>
                {editSettings == "false" ? (
                    <Grid item width={"80%"}>
                        <Grid
                            container
                            direction={"row"}
                            justifyContent={"space-between"}
                            style={{
                                marginTop: 30,
                                // backgroundColor: "#1975D2",
                                paddingLeft: 10,
                            }}
                        >
                            {/* <h1 style={{ color: "whitesmoke" }}>Interactive Question</h1> */}
                            <Button
                                aria-label="settings"
                                variant="contained"
                                style={{ backgroundColor: "#fffacd", color: "black", top: "-28px", left: "-8px" }}
                                onClick={() => handleBackToSettings()}
                            >
                                <ArrowDropUpIcon />
                                Minimise Quiz
                            </Button>
                            <Button variant="contained" style={{ top: "20px", left: "80px" }} onClick={handleSave}>
                                <SaveIcon style={{ marginRight: "10" }} />
                                Save Quiz
                            </Button>
                            <Button variant="contained" style={{ top: "20px" }} onClick={handleRemoveQuiz}>
                                <DeleteIcon style={{ marginRight: "10" }} />
                                Remove Quiz
                            </Button>
                        </Grid>

                        <Paper elevation={3} style={{ padding: 20, marginTop: -27, marginRight: -335, backgroundColor: "#fffacd" }}>
                            <QuizQuestionComponent
                                textFieldProp={textField}
                                setTextFieldProp={setTextField}
                                questionProp={question}
                                editQuestionTitleProp={editQuestionTitle}
                                editQuestionTypeProp={editQuestionType}
                                addQuestionOptionProp={addQuestionOption}
                                removeQuestionOptionProp={removeQuestionOption}
                                selectCorrectOptionProp={selectCorrectQuestionOption}
                                editQuestionContentProp={editQuestionContent}
                                editQuestionHintProp={editQuestionHint}
                                editQuestionMaxPointsProp={editQuestionMaxPoints}
                            />
                        </Paper>

                        <Grid
                            container
                            direction="row"
                            justifyContent={"center"}
                            style={{ marginTop: "80px" }}
                        >
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item width={"80%"}>
                        <Grid
                            container
                            direction={"row"}
                            justifyContent={"space-between"}
                            style={{
                                marginTop: 30,
                                // backgroundColor: "#1975D2",
                                paddingLeft: 10,
                            }}
                        >
                            <Button
                                aria-label="settings"
                                variant="contained"
                                style={{ backgroundColor: "#fffacd", color: "black", top: "-28px", left: "-8px" }}
                                onClick={() => handleProceedQuestions()}
                            >
                                <ArrowDropDownIcon />
                                Expand Quiz
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
}
