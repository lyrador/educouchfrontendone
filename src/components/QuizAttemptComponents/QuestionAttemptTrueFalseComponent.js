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
    if (props.optionSelectedProp !== "") {
      //if there is an existing correct option then use that
      setTrueFalseValue(props.optionSelectedProp === "true");
      console.log("questionId num: ", props.questionIdProp);
      console.log("optionSelected not empty: ", props.optionSelectedProp);
    } else {
      //if not set as false
      props.selectOptionProp(props.questionIdProp, false);
    }
  }, []);

  const [trueFalseValue, setTrueFalseValue] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  function handleChange(e) {
    setTrueFalseValue(e.target.checked);
    props.selectOptionProp(props.questionIdProp, e.target.checked);
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
