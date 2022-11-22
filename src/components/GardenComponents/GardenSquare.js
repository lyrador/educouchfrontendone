import React from 'react'
import Square from './Square';
import { ItemTypes } from './Constants';

export default function GardenSquare({ x, y, children }) {


    return (
        <Square>{children}</Square>
    );
}