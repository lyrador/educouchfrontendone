import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import McqBodyComponent from "./McqBodyComponent";
import QuizContentComponent from "./QuizContentComponent";
import QuizTitleComponent from "./QuizTitleComponent";
import QuizTypeDropdownComponent from "./QuizTypeDropdownComponent";
import ShortAnswerComponent from "./ShortAnswerComponent";
import TrueFalseComponent from "./TrueFalseComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import QuestionMaxPoints from "./QuestionMaxPoints";
import QuestionHintComponent from "./QuestionGuideComponent";
import QuestionGuideComponent from "./QuestionGuideComponent";
import InteractiveQuizTypeDropdownComponent from "./InteractiveQuizTypeDropdownComponent";
export default function InteractiveQuizQuestionComponent(props) {
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
        editQuestionTitleProp={props.editQuestionTitleProp}
      />

      <InteractiveQuizTypeDropdownComponent
        questionTypeProp={props.questionProp.questionType}
        editQuestionTypeProp={props.editQuestionTypeProp}
        questionIdProp={props.questionProp.localid}
      />

      <Grid container direction="column">
        <Grid>
          <QuizContentComponent
            questionIdProp={props.questionProp.localid}
            questionContentProp={props.questionProp.questionContent}
            editQuestionContentProp={props.editQuestionContentProp}
          />
        </Grid>

        <Grid item>
          {/* {props.questionProp.questionType == "shortAnswer" && (
            <ShortAnswerComponent />
          )} */}
          {props.questionProp.questionType == "mcq" && (
            <div>
              <McqBodyComponent
                mcqOptionsProp={question.options}
                textFieldProp={props.textFieldProp}
                setTextFieldProp={props.setTextFieldProp}
                addQuestionOptionProp={props.addQuestionOptionProp}
                removeQuestionOptionProp={props.removeQuestionOptionProp}
                questionIdProp={props.questionProp.localid}
                correctOptionProp={question.correctOption}
                selectCorrectOptionProp={props.selectCorrectOptionProp}
              />
              {/* <QuestionGuideComponent
                questionIdProp={props.questionProp.localid}
                questionHintProp={props.questionProp.questionHint}
                editQuestionHintProp={props.editQuestionHintProp}
              /> */}
            </div>
          )}
          {props.questionProp.questionType == "trueFalse" && (
            <div>
              <TrueFalseComponent
                questionIdProp={props.questionProp.localid}
                booleanOptionsProp={question.options}
                addBooleanOptionsProp={props.addQuestionOptionProp}
                correctOptionProp={question.correctOption}
                selectCorrectOptionProp={props.selectCorrectOptionProp}
              />
              {/* <QuestionGuideComponent
                questionIdProp={props.questionProp.localid}
                questionHintProp={props.questionProp.questionHint}
                editQuestionHintProp={props.editQuestionHintProp}
              /> */}
            </div>
          )}
        </Grid>
        <Grid item style={{ marginTop: 20 }}>
          <QuestionMaxPoints
            questionIdProp={props.questionProp.localid}
            questionMaxPointsProp={props.questionProp.questionMaxPoints}
            editQuestionMaxPointsProp={props.editQuestionMaxPointsProp}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}