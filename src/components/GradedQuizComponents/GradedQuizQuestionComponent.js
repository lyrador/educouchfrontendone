import { Grid, Paper } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import McqBodyComponent from "../QuizComponents/McqBodyComponent";
import QuestionGuideComponent from "../QuizComponents/QuestionGuideComponent";
import QuestionMaxPoints from "../QuizComponents/QuestionMaxPoints";
import QuizContentComponent from "../QuizComponents/QuizContentComponent";
import QuizTitleComponent from "../QuizComponents/QuizTitleComponent";
import ShortAnswerComponent from "../QuizComponents/ShortAnswerComponent";
import TrueFalseComponent from "../QuizComponents/TrueFalseComponent";
import QuestionAttemptContentComponent from "../QuizAttemptComponents/QuestionAttemptContentComponent";
import QuestionAttemptShortAnswerComponent from "../QuizAttemptComponents/QuestionAttemptShortAnswerComponent";
import QuestionAttemptTrueFalseComponent from "../QuizAttemptComponents/QuestionAttemptTrueFalseComponent";
import QuizAttemptMCQComponent from "../QuizAttemptComponents/QuizAttemptMCQComponent";
import { Content } from "rsuite";
export default function GradedQuizQuestionComponent(props) {
  const [questionAttempt, setQuestionAttempt] = React.useState();
  const [question, setQuestion] = React.useState();
  const [questionContent, setQuestionContent] = React.useState();
  const [shortAnswerResponse, setShortAnswerResponse] = useState("");
  const [optionSelected, setOptionSelected] = useState(
    // props.questionAttemptProp.optionSelected
  );
  const [index, setIndex] = useState(props.indexProp);

  React.useEffect(() => {
    console.log("gradedQuizQuestionComponent useEffect called");
    console.log("questionAttemptProp: ", props.questionAttemptProp)
    console.log("optionSelectedProp: ", props.questionAttemptProp.optionSelected)
    console.log("question: ", props.questionAttemptProp.questionAttempted)
    console.log("questionContent: ", props.questionAttemptProp.questionAttempted.questionContent)

    setQuestionAttempt(props.questionAttemptProp)
    setOptionSelected(props.questionAttemptProp.optionSelected)
    setQuestion(props.questionAttemptProp.questionAttempted)
    setQuestionContent(props.questionAttemptProp.questionAttempted.questionContent)
  }, []);

  return (
    <Grid
      container
      style={{ margin: 10 }}
      direction="row"
      justifyContent={"space-between"}
    >

      {questionContent}
      <Paper
        elevation={1}
        style={{
          width: 40,
          height: 40,
          backgroundColor: "#9D26B0",
          paddingLeft: "13px",
          paddingTop: "4px",
        }}
      >
        <p
          style={{ color: "white", fontFamily: "sans-serif", fontSize: "20px" }}
        >
          {props.indexProp}
        </p>
      </Paper>
      <Grid container direction="column">
        <Grid>
          <p>question content</p>
        </Grid>
        <Grid item>
          {/* {props.questionProp.questionType == "shortAnswer" && (
            <div>
              <p>short answer response</p>
              <p>feedback for short answer</p>
            </div>
          )}
          {props.questionProp.questionType == "mcq" && (
            <div>
              <p>mcq options</p>
              <p>mcq answer response</p>

              {props.quizStatusEnumProp == "GRADED" && <p>mcq guide</p>}
            </div>
          )}
          {props.questionProp.questionType == "trueFalse" && (
            <div>
              <p>truefalse answer response</p>

              {props.quizStatusEnumProp == "GRADED" && <p>trueFalse guide</p>}
            </div>
          )}
        </Grid>
        <Grid item style={{ marginTop: 50 }}>
          <Paper
            elevation={1}
            style={{
              backgroundColor: "#808080",
              paddingLeft: "13px",
              paddingRight: "13px",
              paddingTop: "4px",
              paddingBottom: "4px",
              width: 110,
            }}
          >
            <p
              style={{
                color: "white",
                fontFamily: "sans-serif",
              }}
            >
              obtained marks
            </p>
          </Paper> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
