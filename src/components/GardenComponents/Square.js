import { filledInputClasses } from '@mui/material';
import React from 'react';

export default function Square({children}) {
    return(
        <div style = {{backgroundColor: "fill", width: '100%', height: '100%'}}>
            {children}
        </div>
    )
}