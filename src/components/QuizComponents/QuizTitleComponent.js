import { Grid } from "@mui/material";
import React, { useState } from "react";

export default function QuizTitleComponent(props) {

  const [onEdit, setOnEdit] = useState(false);

  React.useEffect(() => { 
    console.log("received questiontitle: ", props.questionTitleProp)
  }, [])
    
  return (
    <Grid item key={props.questionIdProp} style={{ marginBottom: 30 }}>
      {onEdit ? (
        <input
          type="text"
          style={{ fontSize: 30 }}
          // value={props.questionTitleProp}
          onChange={(e) =>
            props.editQuestionTitleProp(props.questionIdProp, e.target.value)
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
