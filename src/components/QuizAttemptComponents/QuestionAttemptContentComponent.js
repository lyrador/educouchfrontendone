import { Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function QuestionAttemptContentComponent(props) {

  return (
    <Grid
      item
      key={props.questionIdProp}
      style={{ marginBottom: 30, width: "Auto" }}
    >
      <p style={{fontSize:"20px"}}>{props.questionContentProp}</p>
    </Grid>
  );
}
