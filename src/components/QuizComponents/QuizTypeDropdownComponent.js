import { Grid, MenuItem, NativeSelect, Select } from "@mui/material";

export default function QuizTypeDropdownComponent(props) {
  return (
    <Grid item>
      <Select
        style={{ fontSize: 16, padding: 5 }}
        value={props.questionTypeProp}
        onChange={(e) =>
          props.editQuestionTypeProp(props.questionIdProp, e.target.value)
        }
      >
        <MenuItem value="shortAnswer">Short Answer</MenuItem>
        <MenuItem value="mcq">Multiple Choice</MenuItem>
        <MenuItem value="trueFalse">True False</MenuItem>
      </Select>
    </Grid>
  );
}
