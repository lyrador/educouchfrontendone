import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import LearnerChildFileList from './LearnerChildFileList';

function LearnerChildFileCover() {
    var folderId = useParams();
    folderId = folderId.folderId;
    return (
        <LearnerChildFileList folderId = {folderId}></LearnerChildFileList>
    )
}

export default LearnerChildFileCover;