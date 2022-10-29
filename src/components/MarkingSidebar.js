import { Button, Paper } from '@mui/material'
import React from 'react'

function MarkingSidebar(props) {
    const isGraded = props.isGraded;
    const isQuiz = props.isQuiz;
    const assessmentTotal = props.assessmentTotal;
    const openEndedTotalScore = props.openEndedTotalScore;
    const mcqTotalScore = assessmentTotal-openEndedTotalScore;


    const mcqLearnerScore = props.mcqScore;
    const openEndedLearnerScore = props.openEndedLearnerScore;
    const learnerTotal = mcqLearnerScore + openEndedLearnerScore;



  return (
<>
<Paper style={{height: '100vh', textAlign:"center"}}>
  
<h2>Learner Scoring</h2>
<br></br>
{isQuiz &&
<div>
<h2>MCQ Score</h2>
<h2>{mcqLearnerScore}/{mcqTotalScore}</h2>
<br></br>
<h2>Open Ended Score</h2>
<h2>{openEndedLearnerScore}/{openEndedTotalScore}</h2>
<br></br>
</div>
}
<h2>Total Score</h2>
<h2>{learnerTotal}/{assessmentTotal}</h2>

<br></br>
<Button onClick={props.handleOnCompleteGrading}>Complete Grading</Button>
</Paper>
</>
  )
}

export default MarkingSidebar