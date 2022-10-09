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
  }, []);

  const [trueFalseValue, setTrueFalseValue] = useState("");
  function handleChange(e) {
    setTrueFalseValue(e.target.checked);
  }

  return (
    <Grid container direction={"row"} alignItems={ "center"}>
      <p>False</p>
      <Switch
        checked={trueFalseValue}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <p>True</p>

      <div></div>
    </Grid>
  );
}
