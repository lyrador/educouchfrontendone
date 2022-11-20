
import React from 'react';

export default function ImaginaryItem({ link }) {


    if (link) {
        return (
            <img src={link} style={{ width: '5em', height: '5em' }} />
        )
    }

}