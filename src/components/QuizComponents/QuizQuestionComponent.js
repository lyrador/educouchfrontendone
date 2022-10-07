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
export default function QuizQuestionComponent(props) {
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
        questionIdProp={props.questionProp.id}
        questionTitleProp={props.questionProp.questionTitle}
        editQuestionTitleProp={props.editQuestionTitleProp}
      />

      <QuizTypeDropdownComponent
        questionTypeProp={props.questionProp.questionType}
        editQuestionTypeProp={props.editQuestionTypeProp}
        questionIdProp={props.questionProp.id}
      />

      <Grid container direction="column">
        <Grid>
          <QuizContentComponent
            questionIdProp={props.questionProp.id}
            questionContentProp={props.questionProp.questionContent}
            editQuestionContentProp={props.editQuestionContentProp}
          />
        </Grid>

        <Grid item>
          {props.questionProp.questionType == "shortAnswer" && (
            <ShortAnswerComponent />
          )}
          {props.questionProp.questionType == "mcq" && (
            <div>
              <McqBodyComponent
                mcqOptionsProp={question.options}
                textFieldProp={props.textFieldProp}
                setTextFieldProp={props.setTextFieldProp}
                addQuestionOptionProp={props.addQuestionOptionProp}
                questionIdProp={props.questionProp.id}
              />
            </div>
          )}
          {props.questionProp.questionType == "trueFalse" && (
            <div>
              <TrueFalseComponent
                questionIdProp={props.questionProp.id}
                booleanOptionsProp={question.options}
                addBooleanOptionsProp={props.addQuestionOptionProp}
              />
            </div>
          )}
        </Grid>
        <Grid item style={{ marginTop: 50,}}>
          <QuestionMaxPoints
            questionIdProp={props.questionProp.id}
            questionMaxPointsProp={props.questionProp.questionMaxPoints}
            editQuestionContentProp={props.editQuestionContentProp}
          />
          <Button
            onClick={() => props.removeQuestionProp(props.questionProp.id)}
            color="secondary"
            variant="contained"
          >
            <DeleteIcon style={{ marginRight: "10px" }} />
            Remove Question
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
