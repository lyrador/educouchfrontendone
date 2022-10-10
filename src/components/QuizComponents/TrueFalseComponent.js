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

export default function TrueFalseComponent(props) {
  React.useEffect(() => {
    props.addBooleanOptionsProp(["true", "false"]);
    setCorrectOption(props.correctOptionProp)
  }, []);

  const [trueFalseValue, setTrueFalseValue] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  function handleChange(e) {
    setTrueFalseValue(e.target.checked);
  }
  function handleCorrectOption(e) {
    setCorrectOption(e.target.checked)
    props.selectCorrectOptionProp(props.questionIdProp, e.target.checked);
  }

  return (
    <Grid>
      <div>
        <b>Learner Input</b>
      </div>
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
      <br></br>
      <br></br>
      <div>
        <b>Select Correct Option</b>
      </div>
      <Grid container direction={"row"} alignItems={"center"}>
        <p>False</p>
        <Switch
          checked={correctOption}
          onChange={handleCorrectOption}
          inputProps={{ "aria-label": "controlled" }}
        />
        <p>True</p>
      </Grid>{" "}
    </Grid>
  );
}
