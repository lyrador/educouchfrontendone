import { Grid, MenuItem, NativeSelect, Select, TextField } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function QuizTypeDropdownComponent(props) {
  return (
    <Grid item>
      <Select
        style={{ fontSize: 16 }}
        value={props.questionTypeProp}
        onChange={(e) =>
          props.editQuestionTypeProp(props.questionIdProp, e.target.value)
        }
      >
        <MenuItem value="shortAnswer">
          <TextFieldsIcon style={{ marginRight: "10px" }} />
          Short Answer
        </MenuItem>
        <MenuItem value="mcq">
          <SortIcon style={{ marginRight: "10px" }} />
          Multiple Choice
        </MenuItem>
        <MenuItem value="trueFalse">
          <CheckCircleIcon style={{ marginRight: "10px" }} />
          True False
        </MenuItem>
      </Select>
    </Grid>
  );
}
