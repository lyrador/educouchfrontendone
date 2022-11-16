import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { isValid } from "date-fns";
import React, { useState } from "react";

export default function QuizAttemptMCQComponent(props) {
  const [mcqOptions, setMcqOptions] = useState([]);
  const [optionSelected, setOptionSelected] = useState("");

  React.useEffect(() => {
    setMcqOptions(props.mcqOptionsProp);
    setOptionSelected(props.optionSelectedProp);
    console.log("optionSelectedProp: ", props.optionSelectedProp)
  }, []);

  const handleChange = (e) => {
    setOptionSelected(e.target.value);
    props.selectOptionProp(props.questionIdProp, e.target.value);
    console.log("selecting: ", e.target.value);
  };

  return (
    <div>
      <div>MCQ Options</div>

      <Grid
        container
        direction="column"
        justifyContent={"space-between"}
        width="60%"
        marginBottom={"10px"}
      >
        <FormControl>
          <Select
            style={{ width: "100%", fontSize: 16 }}
            onChange={handleChange}
            value={optionSelected}
          >
            {mcqOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </div>
  );
}
