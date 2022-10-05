import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import McqBodyComponent from "./McqBodyComponent";
import QuizTitleComponent from "./QuizTitleComponent";
import QuizTypeDropdownComponent from "./QuizTypeDropdownComponent";
import TrueFalseComponent from "./TrueFalseComponent";

export default function QuizQuestionComponent(props) {
  const [question, setQuestion] = useState(props.questionProp);
  const [index, setIndex] = useState(props.indexProp);
  const [onEdit, setOnEdit] = useState(false);
  

  return (
    <Grid
      container
      style={{ margin: 20 }}
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
        <Grid item>
          {props.questionProp.questionType == "shortAnswer" && (
            <input
              type="text"
              placeholder={props.questionProp.questionType}
              style={{ width: "70%", fontSize: 20, padding: 6 }}
            />
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
        <Grid style={{marginTop: 15}}>
          <Button>
            Remove Question
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
