import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import React, { useState } from "react";

export default function QuestionAttemptTrueFalseComponent(props) {
  React.useEffect(() => {
    if (props.correctOptionProp !== "") {
      //if there is an existing correct option then use that
      setCorrectOption(props.correctOptionProp === "true");
      console.log("question no: ", props.questionIdProp);
      console.log("correctOption not empty: ", props.correctOptionProp);
    } else {
      //if not set as false
      props.selectCorrectOptionProp(props.questionIdProp, false);
    }
  }, []);

  const [trueFalseValue, setTrueFalseValue] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  function handleChange(e) {
    setTrueFalseValue(e.target.checked);
  }
  function handleCorrectOption(e) {
    setCorrectOption(e.target.checked);
    props.selectCorrectOptionProp(props.questionIdProp, e.target.checked);
  }

  return (
    <Grid>
      <Grid container direction={"row"} alignItems={"center"}>
        <p>False</p>
        <Switch
          checked={trueFalseValue}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p>True</p>

        <div></div>
      </Grid>
    </Grid>
  );
}
