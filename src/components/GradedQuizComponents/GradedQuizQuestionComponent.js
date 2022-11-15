import {
  Checkbox,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
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
import { Content, List } from "rsuite";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

export default function GradedQuizQuestionComponent(props) {
  const [question, setQuestion] = React.useState();
  const [questionType, setQuestionType] = React.useState();
  const [questionTitle, setQuestionTitle] = React.useState();
  const [questionContent, setQuestionContent] = React.useState();
  const [questionOptions, setQuestionOptions] = React.useState([]);
  const [correctOption, setCorrectOption] = React.useState();
  const [questionHint, setQuestionHint] = React.useState();
  const [questionMaxScore, setQuestionMaxScore] = React.useState();

  const [questionAttempt, setQuestionAttempt] = React.useState();
  const [shortAnswerResponse, setShortAnswerResponse] = useState("");
  const [optionSelected, setOptionSelected] = useState();
  const [questionAttemptScore, setQuestionAttemptScore] = React.useState();
  const [questionFeedback, setQuestionFeedback] = React.useState();
  const [index, setIndex] = useState(props.indexProp);
  var trueFalseOptions = ["true", "false"];

  React.useEffect(() => {
    console.log("gradedQuizQuestionComponent useEffect called");
    // console.log("questionAttemptProp: ", props.questionAttemptProp)
    // console.log("question: ", props.questionAttemptProp.questionAttempted)
    setQuestion(props.questionAttemptProp.questionAttempted);
    setQuestionType(props.questionAttemptProp.questionAttempted.questionType);
    setQuestionTitle(props.questionAttemptProp.questionAttempted.questionTitle);
    setQuestionOptions(props.questionAttemptProp.questionAttempted.options);
    setCorrectOption(props.questionAttemptProp.questionAttempted.correctOption);
    setQuestionContent(
      props.questionAttemptProp.questionAttempted.questionContent
    );
    setQuestionHint(props.questionAttemptProp.questionAttempted.questionHint);
    setQuestionMaxScore(
      props.questionAttemptProp.questionAttempted.questionMaxPoints
    );

    setQuestionAttempt(props.questionAttemptProp);
    setShortAnswerResponse(props.questionAttemptProp.shortAnswerResponse);
    setOptionSelected(props.questionAttemptProp.optionSelected);
    setQuestionFeedback(props.questionAttemptProp.feedback);
    setQuestionAttemptScore(props.questionAttemptProp.questionAttemptScore);
  }, []);

  return (
    <Grid
      container
      style={{ margin: 10 }}
      direction="row"
      justifyContent={"space-between"}
    >
      <p style={{ fontSize: 30 }}> {questionTitle}</p>
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
          <p style={{ fontSize: 20, width: "70%", marginTop: "10px" }}>
            {questionContent}
          </p>
        </Grid>
        <Grid item>
          {questionType == "shortAnswer" && (
            <div>
              <Paper
                style={{ paddingTop: 10, paddingBottom: 30, paddingLeft: 10 }}
              >
                <p>
                  <b>Your Answer: </b>
                </p>
                {shortAnswerResponse}
              </Paper>
              <Paper
                style={{
                  paddingTop: 10,
                  paddingBottom: 30,
                  paddingLeft: 10,
                  marginTop: 10,
                  backgroundColor: "#CCCCFF",
                }}
              >
                <p>
                  <b>Instructor Feedback:</b>
                </p>
                <br />
                {questionFeedback}
              </Paper>
            </div>
          )}
          {questionType == "mcq" && (
            <div>
              <Paper
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  marginBottom: 10,
                }}
              >
                {optionSelected == correctOption ? (
                  <div>
                    <p>
                      <b>You Selected</b>
                    </p>
                    <p style={{ color: "#228B22" }}>{optionSelected}</p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <b>You Selected</b>
                    </p>
                    <p style={{ color: "#DC143C" }}>{optionSelected}</p>
                  </div>
                )}
                <br />
                <p>
                  <b>MCQ Answer</b>
                </p>
                {questionOptions.map((option) => {
                  return (
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={option === correctOption}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </ListItem>
                  );
                })}
              </Paper>

              {questionHint && (
                <Paper
                  style={{
                    backgroundColor: "#CCCCFF",
                    paddingTop: 10,
                    paddingBottom: 30,
                    paddingLeft: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <p>
                    <b>Question Guide:</b>
                  </p>
                  <br />
                  {questionHint}
                </Paper>
              )}
            </div>
          )}
          {questionType == "trueFalse" && (
            <div>
              <Paper
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  marginBottom: 10,
                }}
              >
                {optionSelected == correctOption ? (
                  <div>
                    <p>
                      <b>You Selected</b>
                    </p>
                    <p style={{ color: "#228B22" }}>{optionSelected}</p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <b>You Selected</b>
                    </p>
                    <p style={{ color: "#DC143C" }}>{optionSelected}</p>
                  </div>
                )}
                <br />
                <p>
                  <b>Correct Answer</b>
                </p>
                {trueFalseOptions.map((option) => {
                  return (
                    <ListItem>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={option === correctOption}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </ListItem>
                  );
                })}
              </Paper>
              {questionHint && (
                <Paper
                  style={{
                    backgroundColor: "#CCCCFF",
                    paddingTop: 10,
                    paddingBottom: 30,
                    paddingLeft: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                >
                  <p>
                    <b>Question Guide:</b>
                  </p>
                  <br />
                  {questionHint}
                </Paper>
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
              width: 230,
            }}
          >
            <p
              style={{
                color: "white",
                fontFamily: "sans-serif",
              }}
            >
              Obtained marks: {questionAttemptScore}/{questionMaxScore}
            </p>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}
