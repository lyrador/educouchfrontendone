import * as React from 'react';
import '../App.css';
import '../css/TeachingFileList.css';
import { Link, useLocation, useParams } from 'react-router-dom';
import TeachingCoursesDrawer from './TeachingCoursesDrawer';
import { Grid, Typography, Button } from '@mui/material';
import TeachingFileComponent from './TeachingFileComponent';
import { useState } from 'react';

function TeachingChildFileList({ folderId }) {
    var moduleCode = useParams();
    moduleCode = moduleCode.moduleCode;

    const [folderList, setFolderList] = useState([]);

    React.useEffect(() => {
        fetch("http://localhost:8080/folder/getFolderByFolderId/" + folderId)
            .then(res => res.json())
            .then((result) => {
                var fol = result;
                setFolderList(fol.childFolders)
            }
            ).catch((err) => {
                console.log(err.message);
            });
    }, []);



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
                    <Button
                        color="primary"
                        variant="contained"
                        component="span"
                    //onClick={uploadImage}
                    >
                        Create New Folder
                    </Button>
                    <br/>
                    {
                        folderList
                            .map((folder) => (<TeachingFileComponent folder={folder} moduleCode={moduleCode}></TeachingFileComponent>))
                    }

                </Grid>
            </Grid>




        </div>
    )
}

export default TeachingChildFileList;