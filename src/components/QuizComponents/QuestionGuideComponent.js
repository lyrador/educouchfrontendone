import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function QuestionGuideComponent(props) {
  const [onEdit, setOnEdit] = useState(false);

  return (
    <Grid
      item
      key={props.questionIdProp}
      style={{width: "Auto" }}
    >
      <div>Question Guide (Displayed when Learner views Quiz after grading)</div>
      <TextField
        multiline
        type="text"
        placeholder={props.questionHintProp}
        style={{ fontSize: 20, width: "42%" }}
        onChange={(e) =>
          props.editQuestionHintProp(props.questionIdProp, e.target.value)
        }
        onBlur={() => setOnEdit(false)}
      />
    </Grid>
  );
}
