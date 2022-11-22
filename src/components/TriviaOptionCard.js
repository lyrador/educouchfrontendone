import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

export default function TriviaOptionCard(props) {
    const optionNumber = 0;
    if (props.yellowOptionNumber) { optionNumber = 1 };
    if (props.greenOptionNumber) { optionNumber = 1 };
    if (props.redOptionNumber) { optionNumber = 1 };
    if (props.yellowOptionNumber) { optionNumber = 1 };


    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "#EFCC00" }}>
            <div>

            </div>
            <div>
                {/* <TextField
                    id="outlined-basic"
                    label="Question Title"
                    variant="standard"
                    fullWidth
                    style={{ margin: "6px 0", marginTop: "20px" }}
                    sx={{ width: "95%" }}
                    InputProps={{ sx: { height: 80, fontSize: "20px" }, disableUnderline: true }}
                    InputLabelProps={{ sx: { fontSize: "22px", paddingTop: "5px" } }}
                    value={editedCurrentQuestionTitle}
                    required
                    onChange={(e) => setEditedCurrentQuestionTitle(e.target.value)}
                    error={questionTitleError.value}
                    helperText={questionTitleError.errorMessage}
                /> */}
            </div>
            <div>

            </div>
        </div>
    );
}