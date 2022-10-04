import { Grid } from "@mui/material";
import { useState } from "react";

export default function QuizTitleComponent(props) {

  const [onEdit, setOnEdit] = useState(false);

    
  return (
    <Grid item key={props.questionNameProp} style={{ marginBottom: 30 }}>
      {onEdit ? (
        <input
          type="text"
          style={{ fontSize: 30 }}
          value={props.questionTitleProp}
          onChange={(e) =>
            props.editQuestionTitleProp(props.questionNameProp, e.target.value)
          }
          onBlur={() => setOnEdit(false)}
        />
      ) : (
        <label style={{ fontSize: 30 }} onClick={() => setOnEdit(true)}>
          {props.questionTitleProp}
        </label>
      )}
    </Grid>
  );
}
