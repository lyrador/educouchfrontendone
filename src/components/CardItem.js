import React from 'react'
import '../App.css';
import '../css/CardItem.css'
import { Link } from 'react-router-dom'
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CardItem(props) {

  return (
      <>
          <div className='card-flex-item'>
          {/* <Link to={`/myTeachingCourse/${props.moduleCode}`} 
                state={{ course: props }} 
                className='cards-item-link'> */}
          <Link to={`/myTeachingCourse/${props.courseId}/courseSettings`} className='cards-item-link'>
                <figure className='cards-item-pic-wrap' data-category={props.label}>
                    <img src={props.src} alt='Voices' className='cards-item-img'/>
                </figure>
                <div className='cards-item-info'>
                    <h5 className='cards-item-text'>{props.text}</h5>
                </div>
          </Link>
          </div>
      </>
  )
}

export default CardItem;