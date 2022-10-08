import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function QuestionMaxPoints(props) {
  const [onEdit, setOnEdit] = useState(false);

  return (
    <Grid
      item
      key={props.questionIdProp}
      style={{ marginBottom: 30, width: "Auto" }}
    >
      <div>Question Max Points</div>
      <TextField
        type="text"
        placeholder="Maximum Points"
        style={{ fontSize: 20, width: "15%" }}
        onChange={(e) =>
          props.editQuestionContentProp(props.questionIdProp, e.target.value)
        }
        onBlur={() => setOnEdit(false)}
      />
    </Grid>
  );
}