import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function QuestionAttemptContentComponent(props) {

  return (
    <Grid
      item
      key={props.questionIdProp}
      style={{ marginBottom: 30, width: "Auto" }}
    >
      <div>Question: </div>
      <p>{props.questionContentProp}</p>
    </Grid>
  );
}
