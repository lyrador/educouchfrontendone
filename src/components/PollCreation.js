import * as React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { render } from "@testing-library/react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Grid, Button, Paper } from "@mui/material";

import "../css/TeachingInteractiveBook.css";
import PollQuestionBar from "./PollQuestionBar";
import PollQuestionLayout from "./PollQuestionLayout";

export default function PollCreation(props) {

    const [changesToQuestionWasMade, setChangesToQuestionWasMade] = useState(false);
    const [checkForChanges, setCheckForChanges] = useState(false);

    //auth
    const auth = useAuth();
    const user = auth.user;

    //paths
    const location = useLocation();
    const pollId = location.pathname.split("/")[5];

    const [refreshPageChild, setRefreshPageChild] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [questionsToBeReordered, setQuestionsToBeReordered] = useState([]);

    const setQuestionsToBeReorderedMethod = (questions) => {
        const retrievedQuestionsToBeReordered = new Array()
        for (const retrievedQuestion of questions) {
            var pollQuestionId = retrievedQuestion.pollQuestionId
            var pollQuestionNumber = retrievedQuestion.pollQuestionNumber.toString()
            var pollQuestionTitle = retrievedQuestion.pollQuestionTitle
            var hasTimeLimit = retrievedQuestion.hasTimeLimit
            var questionTimeLimit = retrievedQuestion.questionTimeLimit
            const tempQuestion = { pollQuestionId, pollQuestionNumber, pollQuestionTitle, hasTimeLimit, questionTimeLimit }
            retrievedQuestionsToBeReordered.push(tempQuestion)
            console.log(retrievedQuestion);
        }
        setQuestionsToBeReordered(retrievedQuestionsToBeReordered)
    };

    const loadUpStartingQuestionIdIfHave = (questions) => {
        if (questionIdToBrowse == "" && questionNumberToBrowse == "") {
            console.log("LOAD UP STARTING QN")
            console.log(questions)
            for (const retrievedQuestion of questions) {
                if (retrievedQuestion.pollQuestionNumber == 1) {
                    setQuestionIdToBrowse(retrievedQuestion.pollQuestionId)
                    setQuestionNumberToBrowse(1)
                }
            }
        }
    };

    React.useEffect(() => {
        console.log("FETCH POLL")
        fetch("http://localhost:8080/pollQuestion/poll/" + pollId + "/pollQuestions")
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
                    <PollQuestionBar
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
                    <PollQuestionLayout
                        pollQuestionId={questionIdToBrowse}
                        pollQuestionNumber={questionNumberToBrowse}
                        book={questions}
                        checkForChanges={checkForChanges}
                        setCheckForChanges={setCheckForChanges}
                        refreshPageChild={refreshPageChild}
                        setRefreshPageChild={setRefreshPageChild}
                    ></PollQuestionLayout>
                </Grid>
            </Grid>
        </div>
    );
}