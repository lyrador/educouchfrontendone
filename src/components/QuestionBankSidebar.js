import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Grid } from "rsuite";

function QuestionBankSidebar(props) {
  const [bankName, setBankName] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState();
  const [openCreateBankDialog, setOpenCreateBankDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [newBankName, setNewBankName] = useState();
  const [bankToDelete, setBankToDelete] = useState();

  React.useEffect(() => {
    fetch(
      "http://localhost:8080/questionBank/getQuestionBankNameList/" +
        props.courseId
    )
      .then((res) => res.json())
      .then((result) => {
        setBankName(result);
      });
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedBankId(event.target.value);
    props.setCurrChosenBankId(event.target.value);
    fetch(
      "http://localhost:8080/questionBank/getQuestionBankByQuestionBankId/" +
        event.target.value
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        props.setQuestionBankQuestions(result.questions);
      });
  };

  const handleCreateNewBank = () => {
    fetch(
      "http://localhost:8080/questionBank/createQuestionBank/" +
        props.courseId +
        "/" +
        newBankName,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setBankName([...bankName, result]);
        setOpenCreateBankDialog(false);
      });
  };

  const handleOpenDialog = () => {
    setOpenCreateBankDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenCreateBankDialog(false);
    console.log("printing bank name", newBankName);
  };

  const handleOpenDeleteDialog = (bankToDelete)=> {
    setBankToDelete(bankToDelete)
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog= ()=> {
    setOpenDeleteDialog(false)
  }

  const handleDeleteQuestionBank = () => {
    // const oldBankName = [...bankName]
    // const result = oldBankName.filter((o)=> {
    //   return o !== bankToDelete
    // })
    // setBankName(result)
    fetch(
      "http://localhost:8080/questionBank/deleteQuestionBank/" +
        bankToDelete.questionBankId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setOpenDeleteDialog(false)
        const oldBankName = [...bankName]
        const res = oldBankName.filter((o)=> {
          return o !== bankToDelete
        })
        setBankName(res)

      });


  }

  const handleDelete = (question) => {
    console.log(question);
    fetch(
      "http://localhost:8080/questionBank/removeQuestionFromQuestionBank/" +
        selectedBankId +
        "/" +
        question.questionId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        props.setQuestionBankQuestions(result.questions);
      });
  };

  return (
    <>
      <Paper style={{ height: "100vh", textAlign: "center" }}>
        <h2>Question Bank</h2>
        <Button onClick={handleOpenDialog}>Create New Bank</Button>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Select Question Bank to View
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedBankId}
            label="Age"
            onChange={handleChange}
          >
            {bankName.length > 0 &&
              bankName.map((x) => (
                  <MenuItem key={x.questionBankId} value={x.questionBankId}>
                    <>
                    {x.questionBankName}
                    <Button onClick={()=>handleOpenDeleteDialog(x)}>Delete</Button>
                    </>
                  </MenuItem>
              ))}
          </Select>
        </FormControl>
        {props.questionBankQuestions.length > 0 &&
          props.questionBankQuestions.map((question) => (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Question Content
                </Typography>
                <Typography variant="h8" component="div">
                  {question.questionContent}
                </Typography>
                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                  Question Hint
                </Typography>
                <Typography variant="body2">{question.questionHint}</Typography>

                <Typography sx={{ mt: 1.5 }} color="text.secondary">
                  Question Type
                </Typography>
                <Typography variant="body2">
                  {question.questionType}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => props.handleAddToQuiz(question)}
                  size="small"
                >
                  Add To Quiz
                </Button>
                <Button onClick={() => handleDelete(question)} size="small">
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Paper>
      <div>
        <Dialog open={openCreateBankDialog} onClose={handleCloseDialog}>
          <DialogTitle>Question Bank Creation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What would you like to name this question bank?
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Question Bank Name"
              fullWidth
              variant="standard"
              onChange={(e) => setNewBankName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleCreateNewBank}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>

{bankToDelete &&   <div>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Question Bank Creation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete question bank: {bankToDelete.questionBankName}? All questions inside the bank will be deleted as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteQuestionBank}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>}
    </>
  );
}

export default QuestionBankSidebar;
