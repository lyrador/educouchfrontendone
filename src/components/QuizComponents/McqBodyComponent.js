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

export default function McqBodyComponent(props) {
  const [addOptionText, setAddOptionText] = useState("");
  const [mcqOptions, setMcqOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [mcqOptionError, setMcqOptionError] = useState({
    value: false,
    errorMessage: "",
  });

  React.useEffect(() => {
    setMcqOptions(props.mcqOptionsProp);
    console.log(mcqOptions);
  }, []);

  function validateOption(addOptionText) {
    const booleanFlag = "";
    setMcqOptionError({ value: false, errorMessage: "" });

    for (var i = 0; i < mcqOptions.length; i++) {
      if (mcqOptions[i] == addOptionText) {
        setMcqOptionError({
          value: true,
          errorMessage: "Option already exists!",
        });
        return false;
      }
    }

    if (addOptionText === "") {
      setMcqOptionError({
        value: true,
        errorMessage: "Add Option field cannot be empty!",
      });
      return false;
    }
    return true;
  }

  function handleClick() {
    console.log(addOptionText);
    if (validateOption(addOptionText)) {
      props.addQuestionOptionProp(props.questionIdProp, addOptionText);
      setAddOptionText("");
    }
  }

  function handleRemoveOption(optionToRemove) {
    const oldOptions = mcqOptions;
    console.log("option to remove: ", optionToRemove)
    setMcqOptions(
      oldOptions.filter((o) => {
        return o !== optionToRemove;
      })
    );
    console.log("mcqbody, updatedOptions: ", mcqOptions);
    props.removeQuestionOptionProp(props.questionIdProp, mcqOptions);
  }

  const handleChange = (e) => {
    setCorrectOption(e.target.value);
    props.selectCorrectOptionProp(props.questionIdProp, e.target.value);
    console.log("selected correct option: ", e.target.value);
  };

  return (
    <div>
      <div>MCQ Options</div>

      <Grid
        container
        direction="column"
        justifyContent={"space-between"}
        width="60%"
      >
        <FormControl>
          <Select
            style={{ width: "100%", fontSize: 16 }}
            renderValue={(selected) => selected}
          >
            {mcqOptions.map((item) => (
              <Grid container direction={"row"}>
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
                <Button onClick={() => handleRemoveOption(item)}>
                  {" "}
                  remove option{" "}
                </Button>
              </Grid>
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
              error={mcqOptionError.value}
              helperText={mcqOptionError.errorMessage}
            />
            <Button onClick={() => handleClick()}>Add</Button>
          </Grid>
        </FormControl>

        <FormControl>
          <br></br>
          <div>Select Correct MCQ Option</div>
          <Select
            style={{ width: "70%", fontSize: 16 }}
            onChange={handleChange}
            value={correctOption}
            label="Correct MCQ Option"
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
