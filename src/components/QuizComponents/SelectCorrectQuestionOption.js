import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export default function selectCorrectQuestionOption(props) {
  const [correctOption, setCorrectOption] = useState();
  function handleClick() {
    props.selectCorrectOptionProp(props.questionIdProp, correctOption);
  }
  return (
    <div>
      <div>Select Correct MCQ</div>

      <Select style={{ width: "70%", fontSize: 16 }}>
        {props.mcqOptionsProp.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
s