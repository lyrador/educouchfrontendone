import { TextField } from "@mui/material";

export default function ShortAnswerComponent(props) {
  return (
    <TextField
      multiline
      type="text"
      placeholder="Input box for students"
      style={{ width: "70%", fontSize: 20}}
    />
  );
}
