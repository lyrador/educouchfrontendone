import React from 'react'
import '../App.css';
import '../css/CardItem.css';
import { Link } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Typography, Stack } from '@mui/material';

//days of week
var weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

function ClassRunCardItem({ courseId, src, courseCode, courseTitle, classRunDaysOfWeek, startDate, endDate, classRunStartTime, classRunEndTime }) {

    return (
        <>
            <div className='card-flex-item'>

                <Link to={"/learnerCourseDetails/" + courseId} className='cards-item-link'>
                    <figure className='cards-item-pic-wrap' data-category={courseCode.concat(" : ", courseTitle)}>
                        <img src={src} alt='picture' className='cards-item-img' />
                    </figure>
                    <div className='cards-item-info'>
                        <Typography variant="h6" component="div" color="text.secondary">
                            <Stack spacing={1}>{classRunDaysOfWeek.map(x => { return (<Typography variant="h6">{weekday[x]} </Typography>) })}
                            </Stack>
                        </Typography>
                        <Divider></Divider>
                        <br />
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {classRunStartTime} - {classRunEndTime}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Start Date: {startDate}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            End Date: {endDate}
                        </Typography>
                    </div>


                </Link>
            </div>
        </>
    )
}

export default ClassRunCardItem;