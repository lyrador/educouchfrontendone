import React from 'react'
import '../../App.css'
import { Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function HomepageGarden() {



    return (
        <Box style = {{marginLeft: "2%"}}>
            <Typography>Welcoem to your garden!</Typography>
        </Box>
    )
}

export default HomepageGarden;