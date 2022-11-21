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
    //if there is an existing correct option then use that
    if (props.correctOptionProp!== "") {
      setCorrectOption(props.correctOptionProp === "true")
      console.log("question no: ", props.questionIdProp)
      console.log("correctOption not empty: ", props.correctOptionProp)
    } else {
      //if not set as false
      props.selectCorrectOptionProp(props.questionIdProp, false);
    }
  }, []);

  const [trueFalseValue, setTrueFalseValue] = useState("");
  const [correctOption, setCorrectOption] = useState(props.correctOptionProp);

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
        <b>Select Correct Option</b>
      </div>
      <Grid container direction={"row"} alignItems={"center"} marginBottom={"35px"}>
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
