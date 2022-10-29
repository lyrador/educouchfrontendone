import { TextField } from "@mui/material";
import React from "react";

export default function QuestionAttemptShortAnswerComponent(props) {

  return (
    <TextField
      multiline
      type="text"
      placeholder="Input your answer here"
      value={props.shortAnswerResponseProp}
      style={{ width: "70%", fontSize: 20 }}
      onChange={(e) =>
        props.inputShortAnswerResponseProp(props.questionIdProp, e.target.value)
      }
    />
  );
}
