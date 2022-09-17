import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingChildFileList from './TeachingChildFileList.js';

function TeachingChildFileCover() {
    var folderId = useParams();
    folderId = folderId.folderId;
    return (
        <TeachingChildFileList folderId = {folderId}></TeachingChildFileList>
    )
}

export default TeachingChildFileCover;