import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import RefundOnTheWay from '../components/RefundOnTheWay';

export default function SuccessRefundRequestPage() {
    // const [currPage, setCurrPage] = useState("course");
    // function handleChange(newCurrPage) {
    //   setCurrPage(newCurrPage);
    // }
    const auth = useAuth();
    const user = auth.user;

    var courseId= useParams();
    courseId = courseId.courseId

    return (
        <>
            <div>
                <RefundOnTheWay courseId = {courseId}></RefundOnTheWay>
            </div>
        </>
    );
}