import { Button, Paper } from '@mui/material'
import React from 'react'

function MarkingFileSubSidebar(props) {

    const assessmentTotal = props.assessmentTotal;
    const learnerTotal = props.learnerScore



  return (
<>
<Paper style={{height: '100vh', textAlign:"center"}}>
  
<h2>Learner Scoring</h2>
<br></br>
<h2>Total Score</h2>
<h2>{learnerTotal}/{assessmentTotal}</h2>

<br></br>
<Button onClick={props.handleOnCompleteGrading}>Complete Grading</Button>
</Paper>
</>
  )
}

export default MarkingFileSubSidebar