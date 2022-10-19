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
          marginBottom={"10px"}
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
                </Grid>
              ))}
            </Select>

          </FormControl>
        </Grid>
      </div>
    );
  }
  