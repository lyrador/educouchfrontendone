import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";

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
      <Grid item key={props.questionProp.name} style={{ marginBottom: 30 }}>
        {onEdit ? (
          <input
            type="text"
            style={{ fontSize: 30 }}
            value={props.questionProp.questionTitle}
            onChange={(e) =>
              props.editQuestionTitleProp(
                props.questionProp.name,
                e.target.value
              )
            }
            onBlur={() => setOnEdit(false)}
          />
        ) : (
          <label style={{ fontSize: 30 }} onClick={() => setOnEdit(true)}>
            {props.questionProp.questionTitle}
          </label>
        )}
      </Grid>
      <Grid item>
        <select
          style={{ fontSize: 20 }}
          value={props.questionProp.questionType}
          onChange={(e) =>
            props.editQuestionTypeProp(
              props.questionProp.name,
              e.target.value
            )
          }
        >
          <option value="shortAnswer">Short Answer</option>
          <option value="mcq">Multiple Choice</option>
        </select>
      </Grid>

      <Grid container direction="column">
        <Grid item>
          {props.questionProp.questionType == "shortAnswer" && (
            <input
              type="text"
              placeholder={props.questionProp.questionType}
              style={{ width: 600, fontSize: 20, padding: 6 }}
            />
          )}
          {props.questionProp.questionType == "mcq" && (
            <div>
              <select style={{ width: 600, fontSize: 20, padding: 6 }}>
                {question.list.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <div>
                <input
                  type="text"
                  onChange={(e) => props.setTextFieldProp(e.target.value)}
                  value={props.textFieldProp}
                  placeholder="Add Option"
                  style={{
                    width: 600,
                    fontSize: 20,
                    padding: 6,
                    marginTop: 10,
                  }}
                />
                <Button
                  onClick={() =>
                    props.addQuestionOptionProp(
                      props.questionProp.name,
                      props.textFieldProp
                    )
                  }
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
