import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';

function TeachingFileList() {
    
    const dummy_folder_array = [
        {
            "folderId": 1,
            "folderName": "Parent Folder 1",
            "childFolders": [
                {
                    "folderId": 4,
                    "folderName": "Child Folder 1",
                    "childFolders": [],
                    "parentFolder": 1,
                    "attachments": [],
                    "course": "CS1010"
                },
                {
                    "folderId": 5,
                    "folderName": "Child Folder 2",
                    "childFolders": [],
                    "parentFolder": 1,
                    "attachments": [],
                    "course": "CS1010"
                },
                {
                    "folderId": 6,
                    "folderName": "Child Folder 3",
                    "childFolders": [],
                    "parentFolder": 1,
                    "attachments": [],
                    "course": "CS1010"
                }
            ],
            "parentFolder": null,
            "attachments": [],
            "course": "CS1010"
        },
        {
            "folderId": 2,
            "folderName": "Parent Folder 2",
            "childFolders": [],
            "parentFolder": null,
            "attachments": [],
            "course": "CS1010"
        },
        {
            "folderId": 3,
            "folderName": "Parent Folder 3",
            "childFolders": [],
            "parentFolder": null,
            "attachments": [],
            "course": "CS1010"
        },
        {
            "folderId": 4,
            "folderName": "Child Folder 1",
            "childFolders": [],
            "parentFolder": 1,
            "attachments": [],
            "course": "CS1010"
        },
        {
            "folderId": 5,
            "folderName": "Child Folder 2",
            "childFolders": [],
            "parentFolder": 1,
            "attachments": [],
            "course": "CS1010"
        },
        {
            "folderId": 6,
            "folderName": "Child Folder 3",
            "childFolders": [],
            "parentFolder": 1,
            "attachments": [],
            "course": "CS1010"
        }
    ];
    const location = useLocation();
    const moduleCode = useParams();

    function filterList(folderList, parent) {
        return folderList.filter(function(folder) {return folder.parentFolder === parent})
    }

    // const [parentFolder, setParentFolder] = useState(null);
    const[folderList, setFolderList] = useState(filterList(dummy_folder_array, null));

    const handleClick = num => {
        setFolderList(filterList(dummy_folder_array, num));
    }
    

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <TeachingCoursesDrawer moduleCode={moduleCode}></TeachingCoursesDrawer>
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="h5">
                        Content Files Uploading
                    </Typography>
                    <divider></divider>
                    <br />
                    {
                        folderList
                            .map((folder) => (<TeachingFileComponent folder={folder} handleClick={handleClick}></TeachingFileComponent>))
                    }

                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingFileList;