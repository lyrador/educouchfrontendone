import { Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { set } from 'grapejs/lib/core/grape';
import React, { useState } from 'react'

function QuestionBankSidebar(props) {
    const[bankName, setBankName] = useState([])
    const [selectedBankId,setSelectedBankId] = useState();
    const [questionBankQuestions, setQuestionBankQuestions] = useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8080/questionBank/getQuestionBankNameList/"+props.courseId)
            .then((res) => res.json())
            .then((result) => {
                setBankName(result);
            });
    }, []);
const handleChange = (event) =>{
    console.log(event.target.value)
    setSelectedBankId(event.target.value)
    fetch("http://localhost:8080/questionBank/getQuestionBankByQuestionBankId/" + event.target.value)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setQuestionBankQuestions(result.questions);
    });
}

const handleDelete = (question) => {
    console.log(question)
    fetch("http://localhost:8080/questionBank/removeQuestionFromQuestionBank/" + selectedBankId + "/" + question.questionId)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });

}


  return (
<>
<Paper style={{height: '100vh', textAlign:"center"}}>
  
<h2>Question Bank</h2>
<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select Question Bank to View</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedBankId}
    label="Age"
    onChange={handleChange}
  >
    {bankName.length > 0 && bankName.map((x)=>(
    <MenuItem key={x.questionBankId} value={x.questionBankId}>{x.questionBankName}</MenuItem>

))}
  </Select>
</FormControl>
{questionBankQuestions.length > 0 && questionBankQuestions.map((question)=>(
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Question Content
      </Typography>
      <Typography variant="h8" component="div">
        {question.questionContent}
      </Typography>
      <Typography sx={{ mt: 1.5 }} color="text.secondary">
        Question Hint
      </Typography>
      <Typography variant="body2">
        {question.questionHint}
        </Typography>

      <Typography sx={{ mt: 1.5 }} color="text.secondary">
        Question Type
      </Typography>
      <Typography variant="body2">
        {question.questionType}
        <br />
      </Typography>
    </CardContent>
    <CardActions>
      <Button onClick={()=>props.handleAddToQuiz(question)}size="small">Add To Quiz</Button>
      <Button onClick={handleDelete(question)} size="small">Delete</Button>

    </CardActions>
  </Card>
))}
</Paper>
</>
  )
}

export default QuestionBankSidebar