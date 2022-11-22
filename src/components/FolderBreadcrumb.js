import * as React from 'react';
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import LinkMaterial from "@mui/material/Link";
import {
    Typography
} from "@mui/material";

function multipleRenderer(index, courseId, childFolders) {
    const squares = []
    for(let i = 0; i < childFolders.length; i++) {
        squares.push(renderChildLink(index + i + 1, courseId, childFolders[i].folderId, childFolders[i].folderName));
    }
    return squares;
    
}

function renderChildLink(index, courseId, folderId, folderName) {
    return (
        <Link to={index} style={{ textDecoration: "none", color: "grey" }}>
            <LinkMaterial  underline="hover" color="inherit">{folderName}</LinkMaterial>
        </Link>
    )
}

function renderFinalPage(folderName) {
    return (
        <Typography>{folderName}</Typography>
    )
}

function renderRootLink(index, courseId) {
    return (
        <Link to={index} style={{ textDecoration: "none", color: "grey" }}>
            <LinkMaterial underline="hover" color="inherit">Course ID: {courseId}</LinkMaterial>
        </Link>
    );
}
export default function FolderBreadcrumb({ folderId, courseId, moduleCode }) {


    const [parentTree, setParentTree] = useState(undefined);
    const [rootFolder, setRootFolder] = useState(undefined);
    const [childFolder, setChildFolder] = useState([]);
    const [index, setIndex] = useState(0);

    React.useEffect(() => {
        var url = "http://localhost:8080/folder/getParentFolders?folderId=" + folderId;
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setChildFolder(result);
                setIndex(result.length * -1);
            });
        
    }, [folderId]);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                {renderRootLink(index, courseId)}
                {childFolder && multipleRenderer(index, courseId, childFolder)}
            </Breadcrumbs>
        </>
    );
}