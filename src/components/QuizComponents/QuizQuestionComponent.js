import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default function QuizQuestionComponent(props) {
  const [field, setField] = useState(props.fieldProp);
  const [index, setIndex] = useState(props.indexProp);

  const [onEdit, setOnEdit] = useState(false);

  return (
    <Grid
      container
      style={{ margin: 20 }}
      direction="row"
      justifyContent={"space-between"}
    >
      <Grid item key={props.fieldProp.name} style={{ marginBottom: 30 }}>
        {onEdit ? (
          <input
            type="text"
            style={{ fontSize: 30 }}
            value={props.fieldProp.questionTitle}
            onChange={(e) =>
              props.editFieldTitleProp(props.fieldProp.name, e.target.value)
            }
            onBlur={() => setOnEdit(false)}
          />
        ) : (
          <label style={{ fontSize: 30 }} onClick={() => setOnEdit(true)}>
            {props.fieldProp.questionTitle}
          </label>
        )}
      </Grid>
      <Grid item>
        <select
          style={{ fontSize: 20 }}
          value={props.fieldProp.questionType}
          onChange={(e) => props.editFieldTypeProp(props.fieldProp.name, e.target.value)}
        >
          <option value="shortAnswer">Short Answer</option>
          <option value="mcq">Multiple Choice</option>
        </select>
      </Grid>

      <Grid container direction="column">
        <Grid item>
          {props.fieldProp.questionType == "shortAnswer" && (
            <input
              type="text"
              placeholder={props.fieldProp.questionType}
              style={{ width: 600, fontSize: 20, padding: 6 }}
            />
          )}
          {props.fieldProp.questionType == "mcq" && (
            <div>
              <select style={{ width: 600, fontSize: 20, padding: 6 }}>
                {field.list.map((item) => (
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
                    props.addFieldOptionProp(props.fieldProp.name, props.textFieldProp)
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
