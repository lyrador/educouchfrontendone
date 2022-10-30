import React from 'react'
import '../App.css';
import '../css/BookCardItem.css'
import { Link } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function BookCardItem(props) {

    return (
        <>
            <div className='book-flex-item'>
                {/* <Link to={`/myTeachingCourse/${props.moduleCode}`} 
                state={{ course: props }} 
                className='books-item-link'> */}
                <Link to={props.path} className='books-item-link'>
                    <figure className='books-item-pic-wrap' data-category={props.label}>
                        <img src={props.src} alt='picture' className='books-item-img' />
                    </figure>
                    <div className='books-item-info'>
                        <h5 className='books-item-text'>{props.text}</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default BookCardItem;