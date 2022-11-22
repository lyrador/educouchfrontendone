import * as React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Grid, Button, Paper } from "@mui/material";

import "../css/TeachingInteractiveBook.css";
import TriviaQuestionBar from "./TriviaQuestionsBar";
import TriviaQuestionLayout from "./TriviaQuestionLayout";

export default function TriviaCreation(props) {

    const [changesToQuestionWasMade, setChangesToQuestionWasMade] = useState(false);
    const [checkForChanges, setCheckForChanges] = useState(false);

    //auth
    const auth = useAuth();
    const user = auth.user;

    //paths
    const location = useLocation();
    const triviaId = location.pathname.split("/")[5];

    const [refreshPageChild, setRefreshPageChild] = useState(false);

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

    const loadUpStartingQuestionIdIfHave = (questions) => {
        if (questionIdToBrowse == "" && questionNumberToBrowse == "") {
            console.log("LOAD UP STARTING QN")
            for (const retrievedQuestion of questions) {
                if (retrievedQuestion.questionNumber == 1) {
                    setQuestionIdToBrowse(retrievedQuestion.triviaQuestionId)
                    setQuestionNumberToBrowse(1)
                }
            }
        }
    };

    React.useEffect(() => {
        console.log("FETCH TRIVIA")
        fetch("http://localhost:8080/triviaQuestion/triviaQuiz/" + triviaId + "/triviaQuestions")
            .then((res) => res.json())
            .then((result) => {
                setRefreshPageChild(false)
                setQuestions(result);
                setQuestionsToBeReorderedMethod(result)
                loadUpStartingQuestionIdIfHave(result)
            });
    }, [refreshPageChild]);

    //create

    //delete

    //edit

    //browsing
    const [questionIdToBrowse, setQuestionIdToBrowse] = useState("");
    const [questionNumberToBrowse, setQuestionNumberToBrowse] = useState("");

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TriviaQuestionBar
                        questionIdToBrowse={questionIdToBrowse}
                        setQuestionIdToBrowse={setQuestionIdToBrowse}
                        questionNumberToBrowse={questionNumberToBrowse}
                        setQuestionNumberToBrowse={setQuestionNumberToBrowse}
                        questions={questions}
                        setQuestions={setQuestions}
                        questionsToBeReordered={questionsToBeReordered}
                        setQuestionsToBeReordered={setQuestionsToBeReordered}
                        refreshPageChild={refreshPageChild}
                        setRefreshPageChild={setRefreshPageChild}
                        changesToQuestionWasMade={changesToQuestionWasMade}
                        setChangesToQuestionWasMade={setChangesToQuestionWasMade}
                        checkForChanges={checkForChanges}
                        setCheckForChanges={setCheckForChanges}
                    />
                </Grid>
                <Grid item xs={10}>
                    <TriviaQuestionLayout
                        questionId={questionIdToBrowse}
                        questionNumber={questionNumberToBrowse}
                        questions={questions}
                        checkForChanges={checkForChanges}
                        setCheckForChanges={setCheckForChanges}
                        refreshPageChild={refreshPageChild}
                        setRefreshPageChild={setRefreshPageChild}
                    ></TriviaQuestionLayout>
                </Grid>
            </Grid>
        </div>
    );
}
