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
import QuestionAttemptContentComponent from "./QuestionAttemptContentComponent";
import QuestionAttemptShortAnswerComponent from "./QuestionAttemptShortAnswerComponent";
import QuestionAttemptTrueFalseComponent from "./QuestionAttemptTrueFalseComponent";
import QuizAttemptMCQComponent from "./QuizAttemptMCQComponent";
export default function QuizQuestionAttemptComponent(props) {
  const [question, setQuestion] = useState(props.questionProp);
  const [questionAttempt, setQuestionAttempt] = React.useState();
  const [shortAnswerResponse, setShortAnswerResponse] = useState("");
  const [optionSelected, setOptionSelected] = useState("");
  const [index, setIndex] = useState(props.indexProp);
  const [onEdit, setOnEdit] = useState(false);

  React.useEffect(() => {
    // var questionId = props.questionIdProp;
    // for (var i = 0; i < props.questionAttemptsProp.length; i++) {
    //   if (props.questionAttemptsProp[i].questionAttemptId == questionId) {
    //     setQuestionAttempt(props.questionAttemptsProp[i]);
    //     console.log("questionAttempt: ", props.questionAttemptsProp[i])
    //     setShortAnswerResponse(questionAttempt.shortAnswerResponse);
    //     setOptionSelected(questionAttempt.optionSelected);
    //   }
    // }
    console.log("quizQuestionAttempt useEffect called")
    console.log("questionAttempt: ", props.questionAttemptProp);
    console.log("questionAttempts: ", props.questionAttemptsProp)
    setShortAnswerResponse(props.questionAttemptProp.shortAnswerResponse)
    setOptionSelected(props.questionAttemptProp.optionSelected)
  }, []);

  return (
    <Grid
      container
      style={{ margin: 10 }}
      direction="row"
      justifyContent={"space-between"}
    >
      <QuizTitleComponent
        questionIdProp={props.questionProp.localid}
        questionTitleProp={props.questionProp.questionTitle}
      />
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
          <QuestionAttemptContentComponent
            isQuestionAttemptProp={"true"}
            questionContentProp={props.questionProp.questionContent}
          />
        </Grid>
        <Grid item>
          {props.questionProp.questionType == "shortAnswer" && (
            <QuestionAttemptShortAnswerComponent
              questionIdProp={props.questionProp.questionId}
              inputShortAnswerResponseProp={props.inputShortAnswerResponseProp}
              questionAttemptsProp={props.questionAttemptsProp}
              shortAnswerResponseProp={shortAnswerResponse}
            />
          )}
          {props.questionProp.questionType == "mcq" && (
            <div>
              <QuizAttemptMCQComponent
                mcqOptionsProp={question.options}
                questionIdProp={props.questionProp.localid}
                correctOptionProp={question.correctOption}
                selectCorrectOptionProp={props.selectCorrectOptionProp}
                questionAttemptsProp={props.questionAttemptsProp}
                optionSelectedProp={optionSelected}
              />
              {props.quizStatusEnumProp == "GRADED" && (
                <QuestionGuideComponent
                  isQuestionAttemptProp={"true"}
                  questionIdProp={props.questionProp.localid}
                  questionHintProp={props.questionProp.questionHint}
                />
              )}
            </div>
          )}
          {props.questionProp.questionType == "trueFalse" && (
            <div>
              <QuestionAttemptTrueFalseComponent
                questionIdProp={props.questionProp.localid}
                booleanOptionsProp={question.options}
                correctOptionProp={question.correctOption}
                selectCorrectOptionProp={props.selectCorrectOptionProp}
                questionAttemptsProp={props.questionAttemptsProp}
              />
              {props.quizStatusEnumProp == "GRADED" && (
                <QuestionGuideComponent
                  isQuestionAttemptProp={"true"}
                  questionIdProp={props.questionProp.localid}
                  questionHintProp={props.questionProp.questionHint}
                />
              )}
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
              {props.questionProp.questionMaxPoints} Marks
            </p>
          </Paper>

          {/* <Button
            onClick={() => props.removeQuestionProp(props.questionProp.localid)}
            color="secondary"
            variant="contained"
          >
            <DeleteIcon style={{ marginRight: "10px" }} />
            Remove Question
          </Button> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
