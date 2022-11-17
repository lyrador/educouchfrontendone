import { filledInputClasses } from '@mui/material';
import React from 'react';

export default function Item({link}) {
    if(link) {
        return(
        
            <img src = {link} style = {{width: '5em', height: '5em'}}/>
        )
    } else {
        return(
            <div style = {{width: '5em', height: '5em'}}></div>
        )
    }
    
}