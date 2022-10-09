import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

export default function McqBodyComponent(props) {
  const [addOptionText, setAddOptionText] = useState("");

  function handleClick() {
    props.addQuestionOptionProp(props.questionIdProp, addOptionText);
    setAddOptionText("");
  }

  function handleRemoveOption(optionToRemove) {
    props.removeQuestionOptionProp(props.questionIdProp, optionToRemove)
  }

  return (
    <div>
      <div>MCQ Options</div>

      <Select
        style={{ width: "70%", fontSize: 16 }}
        renderValue={(selected) => selected}
      >
        {props.mcqOptionsProp.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
            <Button onClick={() =>handleRemoveOption(item)}> remove option </Button>
          </MenuItem>
        ))}
      </Select>
      <Grid container flexDirection={"row"} justifyItems={"center"}>
        <TextField
          type="text"
          onChange={(e) => setAddOptionText(e.target.value)}
          value={addOptionText}
          placeholder="Add Option"
          style={{
            width: "70%",
            fontSize: 14,
            marginTop: 10,
          }}
        />
        <Button onClick={() => handleClick()}>Add</Button>
      </Grid>
    </div>
  );
}
