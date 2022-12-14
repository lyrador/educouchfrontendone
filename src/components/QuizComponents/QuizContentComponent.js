import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function QuizContentComponent(props) {
  const [onEdit, setOnEdit] = useState(false);

  return (
    <Grid
      item
      key={props.questionIdProp}
      style={{ marginBottom: 30, width: "Auto" }}
    >
      <div><b>Question Content</b></div>
      <TextField
        multiline
        type="text"
        placeholder={props.questionContentProp}
        style={{ fontSize: 20, width: "70%" }}
        onChange={(e) =>
          props.editQuestionContentProp(props.questionIdProp, e.target.value)
        }
        onBlur={() => setOnEdit(false)}
      />
    </Grid>
  );
}
