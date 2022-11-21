import * as React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Grid, Button, Paper, Typography, CircularProgress } from "@mui/material";

import "../css/TeachingInteractiveBook.css";

//pictures
import starwhite from "../assets/starwhite.png";
import moonwhite from "../assets/moonwhite.png";
import cloudwhite from "../assets/cloudwhite.png";
import applewhite from "../assets/applewhite.png";
import tick from "../assets/accept.png";
import warning from "../assets/warning.png";
import correct from "../assets/correct.png";
import wrong from "../assets/wrong.png";
import sofarope from "../assets/sofaropefinal.gif";

import io from "socket.io-client";

const socket = io.connect("http://localhost:3001")

export default function TriviaHosting(props) {

    const [username, setUsername] = useState("hoster")
    const [room, setRoom] = useState("T12345");

    const [currentMessage, setCurrentMessage] = useState("")
    const players = [];
    const [playersArray, setPlayersArray] = useState([])
    const playersQuestionScores = [];
    const [playersQuestionScoresArray, setPlayersQuestionScoresArray] = useState([])

    const joinRoom = () => {
        socket.emit("join_room_admin", room)
    }

    React.useEffect(() => {
        joinRoom()
    }, [])

    React.useEffect(() => {
        socket.on("new_player_joined", (data) => {
            console.log(data)
            players.push(data)
            setPlayersArray(JSON.parse(JSON.stringify(players)))
        })
        socket.on("receive_response", (data) => {
            console.log(data)
            if (yellowCorrectAnswer && data.optionNumber == 1) {
                //calc score
            }
            const questionScoreData = {
                author: username,
                score: data,
                optionNumber: data.optionNumber
            }
            playersQuestionScores.push(data)
            setPlayersQuestionScoresArray(JSON.parse(JSON.stringify(playersQuestionScores)))
        })
    }, [socket])

    const handleScoreSorting = () => {

    };

    const sendMessage = async () => {
        if (currentMessage != "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
            }
        }
    }


    const sendStartGame = () => {
        const data = {
            room: room,
            numOfQuestions: questions.length
        }
        socket.emit("start_game", data)
    };

    //colors
    const yellowColor = "#e4990c"
    const greenColor = "#3CB043"
    const redColor = "#D21404"
    const blueColor = "#0b95e8"

    //paths
    const location = useLocation();
    const triviaId = location.pathname.split("/")[5];

    const [questionIndex, setQuestionIndex] = useState(0);

    const [showWaitingRoomCountdown, setShowWaitingRoomCountdown] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [numOfResponses, setNumOfResponses] = useState(3);

    const [timer, setTimer] = React.useState(3);
    const id = React.useRef(null);
    const clear = () => {
        window.clearInterval(id.current)
    }

    const startTimer = () => {
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1)
        }, 1000)
        return () => clear();
    }

    React.useEffect(() => {
        if (timer === 0 && showWaitingRoomCountdown == true) {
            console.log("TIMER 1")
            clear()
            setTimer(currentQuestion.questionTimeLimit)
            handleShowQuestion()
            startTimer()
        } else if (timer === 0 && showWaitingRoomCountdown == false && startGame == false) {
            console.log("TIMER 2")
            clear()
        } else if (timer === 0 && showWaitingRoomCountdown == false && startGame == true) {
            console.log("TIMER 3")
            handleShowCorrectAnswer()
            clear()
        }
    }, [timer])

    const handleGoBackToLobby = () => {
        console.log("LOBBY")
        setShowWaitingRoomCountdown(false)
        setStartGame(false)
        setShowScoreboard(false)
        setShowCorrectAnswer(false)
        setShowLeaderboard(false)
        setQuestionIndex(0)
        clear()
        setTimer(3)
    };

    const handleShowWaitingRoomCountdown = () => {
        console.log("WAITING ROOM COUNTDOWN")
        setShowScoreboard(false)
        setShowWaitingRoomCountdown(true)
        setTimer(3)
        startTimer()
    };

    const handleShowQuestion = () => {
        console.log("SHOW QUESTION")
        setShowWaitingRoomCountdown(false)
        setStartGame(true)
        sendStartGame()
    };

    const handleShowCorrectAnswer = () => {
        setTimer(0)
        console.log("SHOW CORRECT ANSWER")
        setShowCorrectAnswer(true)
        handleScoreSorting()
    };

    const handleShowScoreboard = () => {
        console.log("QUESTION INDEX: " + questionIndex)
        if (questionIndex != questions.length - 1) {
            console.log("SHOW SCOREBOARD")
            setStartGame(false)
            setShowCorrectAnswer(false)
            setShowScoreboard(true)
            setQuestionIndex(questionIndex + 1)
        } else {
            console.log("SHOW LEADERBOARD")
            setStartGame(false)
            setShowCorrectAnswer(false)
            setShowLeaderboard(true)
        }
    };

    //retrieve all trivia questions
    const [questions, setQuestions] = useState([]);

    React.useEffect(() => {
        console.log("FETCH VALID TRIVIA QUESTIONS")
        fetch("http://localhost:8080/triviaQuestion/triviaQuiz/" + triviaId + "/validTriviaQuestions")
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setQuestions(result);
                setCurrentQuestion(result[questionIndex]);
                setCurrentQuestionTitle(result[questionIndex].questionTitle)
                setCurrentQuestionHasTimeLimit(result[questionIndex].hasTimeLimit)
                setCurrentQuestionTimeLimit(result[questionIndex].questionTimeLimit)
                setCurrentQuestionType(result[questionIndex].triviaQuestionType)
                setTriviaOptions(result[questionIndex].triviaOptions)
                setIndividualTriviaOption(result[questionIndex].triviaOptions)
            });
    }, [questionIndex]);

    //browsing
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentQuestionTitle, setCurrentQuestionTitle] = useState("");
    const [currentQuestionHasTimeLimit, setCurrentQuestionHasTimeLimit] = useState(false);
    const [currentQuestionTimeLimit, setCurrentQuestionTimeLimit] = useState("");
    const [currentQuestionType, setCurrentQuestionType] = useState("");

    const [triviaOptions, setTriviaOptions] = useState("");

    const [originalYellowTriviaOption, setOriginalYellowTriviaOption] = useState([]);
    const [yellowTriviaOptionId, setYellowTriviaOptionId] = useState("");
    const [yellowOptionContent, setYellowOptionContent] = useState("");
    const [yellowCorrectAnswer, setYellowCorrectAnswer] = useState(false);
    const [yellowOptionNumber, setYellowOptionNumber] = useState(1);

    const [originalGreenTriviaOption, setOriginalGreenTriviaOption] = useState([]);
    const [greenTriviaOptionId, setGreenTriviaOptionId] = useState("");
    const [greenOptionContent, setGreenOptionContent] = useState("");
    const [greenCorrectAnswer, setGreenCorrectAnswer] = useState(false);
    const [greenOptionNumber, setGreenOptionNumber] = useState(2);

    const [originalRedTriviaOption, setOriginalRedTriviaOption] = useState([]);
    const [redTriviaOptionId, setRedTriviaOptionId] = useState("");
    const [redOptionContent, setRedOptionContent] = useState("");
    const [redCorrectAnswer, setRedCorrectAnswer] = useState(false);
    const [redOptionNumber, setRedOptionNumber] = useState(3);

    const [originalBlueTriviaOption, setOriginalBlueTriviaOption] = useState([]);
    const [blueTriviaOptionId, setBlueTriviaOptionId] = useState("");
    const [blueOptionContent, setBlueOptionContent] = useState("");
    const [blueCorrectAnswer, setBlueCorrectAnswer] = useState(false);
    const [blueOptionNumber, setBlueOptionNumber] = useState(4);

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

    // React.useEffect(() => {
    //     clearPreviousFields()
    //     console.log(questions)
    //     setCurrentQuestion(questions[questionCounter]);
    //     setCurrentQuestionTitle(questions[questionCounter].questionTitle)
    //     setCurrentQuestionHasTimeLimit(questions[questionCounter].hasTimeLimit)
    //     setCurrentQuestionTimeLimit(questions[questionCounter].questionTimeLimit)
    //     setCurrentQuestionType(questions[questionCounter].triviaQuestionType)
    //     setTriviaOptions(questions[questionCounter].triviaOptions)
    //     setIndividualTriviaOption(questions[questionCounter].triviaOptions)
    // }, [currentQuestion]);

    const goToNextQuestion = (e) => {
        clearPreviousFields()
        console.log(questions)
        setCurrentQuestion(questions[questionIndex]);
        setCurrentQuestionTitle(questions[questionIndex].questionTitle)
        setCurrentQuestionHasTimeLimit(questions[questionIndex].hasTimeLimit)
        setCurrentQuestionTimeLimit(questions[questionIndex].questionTimeLimit)
        setCurrentQuestionType(questions[questionIndex].triviaQuestionType)
        setTriviaOptions(questions[questionIndex].triviaOptions)
        setIndividualTriviaOption(questions[questionIndex].triviaOptions)
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
    }

    return (
        <div>
            {startGame == false && showWaitingRoomCountdown == false && showScoreboard == false && showLeaderboard == false && <div style={{ backgroundColor: "dodgerblue", height: "100vh", width: "100%", alignContent: 'center', display: 'flex', justifyContent: "center", textAlign: "center", flexDirection: "column" }}>
                <div style={{ backgroundColor: "#2266e3", height: "20%", width: "100%", padding: "1% 0" }}>
                    <Typography variant="h4">Game Pin</Typography>
                    <Typography variant="h1" style={{ fontWeight: "bold" }}>T12345</Typography>
                </div>
                <div style={{ backgroundColor: "dodgerblue", height: "80%", width: "100%", padding: "2%" }}>
                    <div style={{ alignContent: 'center', display: 'flex', justifyContent: "center", textAlign: "center", paddingBottom: "3%" }}>
                        <CircularProgress color="secondary" style={{ marginRight: "20px", marginTop: "5px" }}></CircularProgress>
                        <Typography variant="h3">
                            Waiting for players...
                        </Typography>
                        <Button className="btn-upload" color="secondary" variant="contained" component="span"
                            style={{ float: "right", marginLeft: "auto", right: "3%", marginTop: "0.5%", position: "absolute" }}
                            onClick={handleShowWaitingRoomCountdown}
                        >
                            Start
                        </Button>
                        <Button className="btn-upload" color="secondary" variant="contained" component="span"
                            style={{ float: "right", marginLeft: "auto", right: "15%", marginTop: "0.5%", position: "absolute" }}
                            onClick={sendStartGame}
                        >
                            Test Send Start Game
                        </Button>
                    </div>
                    <div>
                        {playersArray.map((player) => (
                            <Typography variant="h3">{player.author}</Typography>
                        ))}
                    </div>
                </div>
            </div >
            }
            {showWaitingRoomCountdown == true && <div className="timerFullScreenContainer">
                <div className="timerCircleStyleBig">
                    <Typography variant="h1">
                        {timer}
                    </Typography>
                </div>
                <Button className="btn-upload" color="primary" variant="contained" component="span"
                    style={{ float: "right", marginLeft: "auto", right: "3%", position: "absolute" }}
                    onClick={handleGoBackToLobby}
                >
                    Lobby
                </Button>
            </div >
            }
            {startGame == true &&
                <div className="overallLayoutContainerGame">
                    <div className="headerLayoutContainerGame">
                        <div style={{ float: "right", marginLeft: "auto", right: "3%", position: "absolute" }}>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                onClick={showCorrectAnswer ? handleShowScoreboard : handleShowCorrectAnswer}
                            >
                                {showCorrectAnswer ? "Continue" : "Skip"}
                            </Button>
                            <Button className="btn-upload" color="primary" variant="contained" component="span" onClick={handleGoBackToLobby}
                            >
                                Lobby
                            </Button>
                        </div>
                    </div>
                    <div className="mainLayoutContainerGame">
                        <div className="secondaryLayoutContainerGame">
                            <div className="timerLeftContainer">
                                <div className="timerCircleStyleSmall">
                                    <Typography variant="h2">{timer}</Typography>
                                </div>
                            </div>
                            <div className="slideLayoutContainerGame">
                                <Paper elevation={3} className="triviaLayoutContainerGame">
                                    <div className="questionTitleContainer" style={{ paddingBottom: "1%" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <Typography variant="h3">{currentQuestion.questionTitle}</Typography>
                                        </div>
                                    </div>

                                    <div className="mediaContainer">
                                        {!currentQuestion.attachment &&
                                            <img src={sofarope} style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                                        }
                                        {currentQuestion.attachment &&
                                            <div style={{ height: "100%", width: "100%", alignContent: "center", justifyContent: "center", display: "flex" }}>
                                                <div style={{ width: "7%" }}></div>
                                                <img src={currentQuestion.attachment.fileURL} style={{ padding: "5% 0", height: "100%", width: "84%", objectFit: "contain" }} />
                                                <div style={{ width: "7%", height: "100%" }}>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    {currentQuestionType == "Four Options" && <div className="triviaOptionsRowContainer">

                                        {/* yellow star */}
                                        <div className="triviaOptionContainerGame" style={{ backgroundColor: showCorrectAnswer ? (yellowCorrectAnswer ? yellowColor : "grey") : yellowColor }}>
                                            <div style={{ width: "10%", margin: "2%" }}>
                                                <img src={starwhite} className="triviaOptionImageStyleGame" />
                                            </div>
                                            <div className="triviaOptionTextStyleGame">{yellowOptionContent}</div>
                                            <div className="triviaOptionRightSideCompartment">
                                            </div>
                                        </div>

                                        <div className="triviaOptionColumnGap" />

                                        {/* green moon */}
                                        <div className="triviaOptionContainerGame" style={{ backgroundColor: showCorrectAnswer ? (greenCorrectAnswer ? greenColor : "grey") : greenColor }}>
                                            <div style={{ width: "10%", margin: "2%" }}>
                                                <img src={moonwhite} className="triviaOptionImageStyleGame" />
                                            </div>
                                            <div className="triviaOptionTextStyleGame">{greenOptionContent}</div>
                                            <div className="triviaOptionRightSideCompartment">
                                            </div>
                                        </div>

                                    </div>
                                    }

                                    {currentQuestionType == "Four Options" && <div className="triviaOptionsRowContainer">

                                        {/* red apple */}
                                        {originalRedTriviaOption.length != 0 &&
                                            <div className="triviaOptionContainerGame" style={{ backgroundColor: showCorrectAnswer ? (redCorrectAnswer ? redColor : "grey") : redColor }}>
                                                <div style={{ width: "10%", margin: "2%" }}>
                                                    <img src={applewhite} className="triviaOptionImageStyleGame" />
                                                </div>
                                                <div className="triviaOptionTextStyleGame">{redOptionContent}</div>
                                                <div className="triviaOptionRightSideCompartment">
                                                </div>
                                            </div>
                                        }

                                        {originalRedTriviaOption.length != 0 &&
                                            <div className="triviaOptionColumnGap" />
                                        }

                                        {/* blue cloud */}
                                        {originalBlueTriviaOption.length != 0 &&
                                            <div className="triviaOptionContainerGame" style={{ backgroundColor: showCorrectAnswer ? (blueCorrectAnswer ? blueColor : "grey") : blueColor }}>
                                                <div style={{ width: "10%", margin: "2%" }}>
                                                    <img src={cloudwhite} className="triviaOptionImageStyleGame" />
                                                </div>
                                                <div className="triviaOptionTextStyleGame">{blueOptionContent}</div>
                                                <div className="triviaOptionRightSideCompartment">
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    }

                                    {/* gets abit confusing here but basically translate yellow option to correct and set the color to green, and green option to wrong and set the color to red */}
                                    {currentQuestionType == "True or False" && <div className="triviaOptionsRowContainerTrueFalse">

                                        {/* red apple */}
                                        <div className="triviaOptionContainerGame" style={{ backgroundColor: showCorrectAnswer ? (yellowCorrectAnswer ? greenColor : "grey") : greenColor }}>
                                            <div style={{ width: "10%", margin: "2%" }}>
                                                <img src={correct} className="triviaOptionImageStyleGame" />
                                            </div>
                                            <div className="triviaOptionTextStyleGame">True</div>
                                            <div className="triviaOptionRightSideCompartment">
                                            </div>
                                        </div>

                                        <div className="triviaOptionColumnGap" />

                                        {/* blue cloud */}
                                        <div className="triviaOptionContainerGame" style={{ backgroundColor: showCorrectAnswer ? (greenCorrectAnswer ? redColor : "grey") : redColor }}>
                                            <div style={{ width: "10%", margin: "2%" }}>
                                                <img src={wrong} className="triviaOptionImageStyleGame" />
                                            </div>
                                            <div className="triviaOptionTextStyleGame">False</div>
                                            <div className="triviaOptionRightSideCompartment">
                                            </div>
                                        </div>

                                    </div>
                                    }
                                </Paper>
                            </div>
                            <div className="responsesNumberRightContainer">
                                <Typography variant="h4">Responses: </Typography>
                                <Typography variant="h2">{numOfResponses}</Typography>
                            </div>
                        </div>
                    </div >
                    <div className="footerLayoutContainerGame">
                        <div style={{ float: "left", left: "2%", position: "absolute" }}>
                            <Typography variant="h5">{questionIndex + 1} / {questions.length}</Typography>
                        </div>
                        <div style={{ float: "right", marginLeft: "auto", right: "3%", position: "absolute" }}>
                            {/* <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                onClick={handleGoBackToLobby}
                            >
                                Lobby
                            </Button> */}
                        </div>
                    </div>
                </div>
            }
            {showScoreboard == true && <div style={{ backgroundColor: "dodgerblue", height: "100vh", width: "100%", alignContent: 'center', display: 'flex', justifyContent: "center", textAlign: "center", flexDirection: "column" }}>
                <div style={{ backgroundColor: "#2266e3", height: "20%", width: "100%", padding: "1% 0" }}>
                    <Typography variant="h4">Scoreboard</Typography>
                    <Button className="btn-upload" color="secondary" variant="contained" component="span"
                        style={{ float: "right", marginLeft: "auto", right: "3%", marginTop: "0.5%", position: "absolute" }}
                        onClick={handleShowWaitingRoomCountdown}
                    >
                        Continue
                    </Button>
                </div>
                <div style={{ backgroundColor: "dodgerblue", height: "80%", width: "100%", padding: "2%" }}>
                    <div style={{ alignContent: 'center', display: 'flex', justifyContent: "center", textAlign: "center", paddingBottom: "3%" }}>
                        <Typography variant="h3">Waryl</Typography>
                    </div>
                </div>
            </div >
            }
            {showLeaderboard == true && <div style={{ backgroundColor: "dodgerblue", height: "100vh", width: "100%", alignContent: 'center', display: 'flex', justifyContent: "center", textAlign: "center", flexDirection: "column" }}>
                <div style={{ backgroundColor: "#2266e3", height: "20%", width: "100%", padding: "1% 0" }}>
                    <Typography variant="h2">Leaderboard</Typography>
                    <div style={{ float: "right", marginLeft: "auto", right: "3%", position: "absolute" }}>
                        <Button className="btn-upload" color="primary" variant="contained" component="span"
                            onClick={handleGoBackToLobby}
                        >
                            Lobby
                        </Button>
                    </div>
                </div>
                <div style={{ backgroundColor: "dodgerblue", height: "80%", width: "100%", padding: "2%" }}>
                    <div style={{ alignContent: 'center', display: 'flex', justifyContent: "center", textAlign: "center", paddingBottom: "3%" }}>
                        {players.map((player) => (
                            <Typography variant="h3">{player.author}</Typography>
                        ))}
                    </div>
                </div>
            </div >
            }
        </div>
    );
}
