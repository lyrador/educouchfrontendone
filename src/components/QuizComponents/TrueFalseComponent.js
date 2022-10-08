import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export default function TrueFalseComponent(props) {

    React.useEffect(() => {
        props.addBooleanOptionsProp(["true", "false"])
     }, [])

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-label-trueFalse">Select True/False</InputLabel>
        <Select
          id="select-trueFalse"
        >
          <MenuItem value={true}>True</MenuItem>
          <MenuItem value={false}>False</MenuItem>
        </Select>
      </FormControl>
      <div></div>
    </div>
  );
}
