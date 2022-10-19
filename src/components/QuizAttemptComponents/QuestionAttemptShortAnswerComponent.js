import { TextField } from "@mui/material";

export default function QuestionAttemptShortAnswerComponent(props) {
  return (
    <TextField
      multiline
      type="text"
      placeholder="Input your answer here"
      style={{ width: "70%", fontSize: 20}}
    />
  );
}
