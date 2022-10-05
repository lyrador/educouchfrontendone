import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";

export default function McqBodyComponent(props) {
  return (
    <div>
      <div>Options</div>

      <Select style={{ width: "70%", fontSize: 16 }}>
        {props.mcqOptionsProp.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <Grid container flexDirection={"row"} justifyItems={ "center"}>
        <TextField
          type="text"
          onChange={(e) => props.setTextFieldProp(e.target.value)}
          value={props.textFieldProp}
          placeholder="Add Option"
          style={{
            width: "70%",
            fontSize: 14,
            marginTop: 10,
          }}
        />
        <Button
          onClick={() =>
            props.addQuestionOptionProp(
              props.questionIdProp,
              props.textFieldProp
            )
          }
        >
          Add
        </Button>
      </Grid>
    </div>
  );
}
