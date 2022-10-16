import { Grid } from "@mui/material";
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
  const [index, setIndex] = useState(props.indexProp);
  const [onEdit, setOnEdit] = useState(false);

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

      {/* <QuizTypeDropdownComponent
        questionTypeProp={props.questionProp.questionType}
        editQuestionTypeProp={props.editQuestionTypeProp}
        questionIdProp={props.questionProp.localid}
      /> */}

      <Grid container direction="column">
        <Grid>
          <QuestionAttemptContentComponent
            isQuestionAttemptProp={"true"}
            questionIdProp={props.questionProp.localid}
            questionContentProp={props.questionProp.questionContent}
          />
        </Grid>

        <Grid item>
          {props.questionProp.questionType == "shortAnswer" && (
            <QuestionAttemptShortAnswerComponent isQuestionAttemptProp={"true"} />
          )}
          {props.questionProp.questionType == "mcq" && (
            <div>
              <QuizAttemptMCQComponent
                isQuestionAttemptProp={"true"}
                mcqOptionsProp={question.options}
                questionIdProp={props.questionProp.localid}
                correctOptionProp={question.correctOption}
                selectCorrectOptionProp={props.selectCorrectOptionProp}
              />
              <QuestionGuideComponent
                isQuestionAttemptProp={"true"}
                questionIdProp={props.questionProp.localid}
                questionHintProp={props.questionProp.questionHint}
              />
            </div>
          )}
          {props.questionProp.questionType == "trueFalse" && (
            <div>
              <QuestionAttemptTrueFalseComponent
                isQuestionAttemptProp={"true"}
                questionIdProp={props.questionProp.localid}
                booleanOptionsProp={question.options}
                correctOptionProp={question.correctOption}
                selectCorrectOptionProp={props.selectCorrectOptionProp}
              />
              <QuestionGuideComponent
                isQuestionAttemptProp={"true"}
                questionIdProp={props.questionProp.localid}
                questionHintProp={props.questionProp.questionHint}
              />
            </div>
          )}
        </Grid>
        <Grid item style={{ marginTop: 50 }}>
          <QuestionMaxPoints
            isQuestionAttemptProp={"true"}
            questionIdProp={props.questionProp.localid}
            questionMaxPointsProp={props.questionProp.questionMaxPoints}
          />
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
