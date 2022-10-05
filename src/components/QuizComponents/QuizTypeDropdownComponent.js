import { Grid } from "@mui/material";

export default function QuizTypeDropdownComponent(props) {
    
    return (
        <Grid item>
        <select
          style={{ fontSize: 16, padding: 5 }}
          value={props.questionTypeProp}
          onChange={(e) =>
            props.editQuestionTypeProp(
              props.questionIdProp,
              e.target.value
            )
          }
        >
          <option value="shortAnswer">Short Answer</option>
          <option value="mcq">Multiple Choice</option>
          <option value="trueFalse">True False</option>
        </select>
      </Grid>
    )
}