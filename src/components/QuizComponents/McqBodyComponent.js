import { Button } from "@mui/material";

export default function McqBodyComponent(props) {


    return (

    <div>
      <div>Options</div>

      <select style={{ width: "70%", fontSize: 20, padding: 6 }}>
        {props.mcqOptionsProp.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div>
        <input
          type="text"
          onChange={(e) => props.setTextFieldProp(e.target.value)}
          value={props.textFieldProp}
          placeholder="Add Option"
          style={{
            width: "70%",
            fontSize: 16,
            padding: 6,
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
      </div>
    </div>
  );
}
