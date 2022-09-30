import * as React from 'react';
import CourseEnrollment from '../components/CourseEnrollment';
import {loadStripe} from '@stripe/stripe-js';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';



export default function CourseEnrollmentPage() {
    var courseId = useParams();
    courseId = courseId.courseId;

    
    return (
        <>
            <CourseEnrollment courseId = {courseId} ></CourseEnrollment>
        </>

    );
}