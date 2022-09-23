import * as React from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstantErrorMessage from './InstantErrorMessage';
import InstantSuccessMessage from './InstantSuccessMessage';

export default function ControlledAccordions({ course, refresh }) {
    const [expanded, setExpanded] = React.useState(false);

    const toggleAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // notification
    const [message, setMessage] = useState('');
    const [isError, setError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    // submit for approval
    const submitForApproval = () => {
        var url = "http://localhost:8080/course/courses/submitCourseForApproval/" + course.courseId;
        console.log('URL is ' + url);
        fetch(url)
            .then((result) => {
                setMessage("Course is successfully submitted for approval. ");
                setError(false);
                setSuccess(true);
                refresh();
            }
            ).catch((err) => {
                setMessage("Could not submit course for approval.");
                setError(true);
                setSuccess(false);
                console.log(err.message);
            });
    };

    return (
        <div>
            {message && isError && (
                <InstantErrorMessage message={message}></InstantErrorMessage>
            )}
            {message && isSuccess && (
                <InstantSuccessMessage message={message}></InstantSuccessMessage>
            )}
            <Accordion expanded={expanded === 'panel1'} onChange={toggleAccordion('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Course status
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{course.courseApprovalStatus}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {course.courseApprovalStatus === 'Under Construction' &&
                            <div>
                                <p>This course is currently under construction. Please fill in the details in course settings and upload all teaching files before submitting for approval.</p>
                                <br />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    component="span"
                                    onClick={submitForApproval}
                                >
                                    Submit course for approval
                                </Button>
                            </div>}

                        {course.courseApprovalStatus === 'Pending Approval' &&
                            <div>
                                <p>Please wait while our admin check the content of your course.</p>
                            </div>}

                        {course.courseApprovalStatus === 'Accepted' &&
                            <div>
                                <Typography>Congratulations!🎉 Your course has been reviewed and approved my our LMS Admin. It is now ready to go live!</Typography>
                                <br />
                                <Button variant="contained" color="success">
                                    Go live
                                </Button>
                            </div>}
                        {course.courseApprovalStatus === 'Rejected' &&
                            <div>
                                <Typography>Our LMS Admin has reviewed and rejected your course. </Typography>
                                <br />
                                <div>
                                    <Typography>Rejection reason: </Typography>
                                    <br/>
                                    <TextField
                                        disabled
                                        id="outlined-disabled"
                                        label="Disabled"
                                        defaultValue={course.rejectionReason}
                                        style = {{minWidth: "100%"}}
                                    />
                                </div>
                                <br />
                                <Typography>Before you re-submit your course for approval, please make the necessary changes. </Typography>
                                <br/>
                                <Button
                                    color="error"
                                    variant="contained"
                                    component="span"
                                    onClick={submitForApproval}
                                >
                                    Re-submit course for approval
                                </Button>
                            </div>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}