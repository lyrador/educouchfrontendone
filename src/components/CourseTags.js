import * as React from 'react';
import { useState } from 'react';
import { Container, Divider, Grid, TextField, Autocomplete, Paper, Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link, useLocation, useParams } from 'react-router-dom';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useAuth } from "../context/AuthProvider";

const paperStyle = {
    padding: '50px 20px',
    width: 1000,
    margin: "20px auto",
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1'
};

export default function CourseTags({ courseId }) {
    const auth = useAuth();
    const user = auth.user;
    // current course tags
    const [listOfCourseTags, setListOfCourseTags] = useState([]);
    var url = "http://localhost:8080/categoryTag/getCourseCategoryTag/" + courseId;
    fetch(url)
        .then(res => res.json()).then((result) => {
            setListOfCourseTags(result);
        });
    const [listOfAllTags, setListOfAllTags] = useState([]);

    // add tag
    const [addTagDialogBox, setAddTagDialogBox] = useState(false);

   
    const openAddTagDialogBox = () => {
        var url = "http://localhost:8080/categoryTag/getCategoryTagNotInCourse?courseId=" + courseId;
        fetch(url)
            .then(res => res.json()).then((result) => {
                setListOfAllTags(result);
            });
        setValue(listOfAllTags[0]);
        setAddTagDialogBox(true);
    };

    const closeAddTagDialogBox = () => {
        setAddTagDialogBox(false);
    };

    const [value, setValue] = React.useState("");

    const refresh = () => {
        var url = "http://localhost:8080/categoryTag/getCourseCategoryTag/" + courseId;
        fetch(url)
            .then(res => res.json()).then((result) => {
                setListOfCourseTags(result);
            });
    };


    const processTagAddition = () => {
        fetch("http://localhost:8080/categoryTag/addTagToCourse?courseId=" + courseId + "&tagId=" + value).then(() => {
            refresh();
        }).catch((err) => {
            alert(err.message);
        });

        closeAddTagDialogBox();

    };
   

    // remove tag
    const [removeTagDialogBox, setRemoveTagDialogBox] = useState(false);

    const openRemoveTagDialogBox = () => {

        setTagToRemove(listOfCourseTags[0].categoryTagId);
        setRemoveTagDialogBox(true);
    };

    const closeRemoveTagDialogBox = () => {
        setRemoveTagDialogBox(false);
    };


    const [tagToRemove, setTagToRemove] = useState(0);
    const processTagDeletion = (tagName) => {
        fetch("http://localhost:8080/categoryTag/removeTagFromCourse?courseId=" + courseId + "&tagId=" + tagToRemove).then(() => {
            refresh();
        }).catch((err) => {
            alert(err.message);
        });

        closeRemoveTagDialogBox();


    };


    return (

        <div>
            {user.userEnum == "HEAD_INSTRUCTOR" &&(
            <Button variant="outlined" startIcon={<AddIcon />} onClick={openAddTagDialogBox}>Add tag</Button>
            )}
            {user.userEnum == "HEAD_INSTRUCTOR" &&(
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={openRemoveTagDialogBox} >Remove tag</Button>
            )}
            <br />
            <br />
            <Stack spacing={1} direction="row">
                {listOfCourseTags && listOfCourseTags.map((tag) => (<Chip label={tag.tagName} />))}
            </Stack>

            <Dialog open={addTagDialogBox} onClose={closeAddTagDialogBox} fullWidth="lg">
                <DialogContent>
                    <Typography variant="h6">Add tags</Typography>
                    <Divider></Divider>
                    <br />
                    <DialogContentText>
                        Please choose a tag to add.
                    </DialogContentText>
                    <br />
                    <Autocomplete
                        getOptionLabel={(option) => option.tagName ? option.tagName : ""}
                        value={value}
                        onChange={(event, newValue) => {
                            console.log(newValue.categoryTagId);
                            setValue(newValue.categoryTagId);
                        }}
                        id="controllable-states-demo"
                        options={listOfAllTags}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Tags" />}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={processTagAddition}>Add</Button>
                    <Button>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={removeTagDialogBox} onClose={closeRemoveTagDialogBox} fullWidth="lg">
                <DialogContent>
                    <Typography variant="h6">Remove tags</Typography>
                    <Divider></Divider>
                    <br />
                    <DialogContentText>
                        Please choose a tag to remove.
                    </DialogContentText>
                    <br />
                    <RadioGroup name="use-radio-group" value = {tagToRemove} onChange = {(e, val) => {setTagToRemove(val); console.log(tagToRemove)}}>
                        {listOfCourseTags && listOfCourseTags.map((tag) => (  <FormControlLabel value={tag.categoryTagId} control={<Radio />} label={tag.tagName} />))}
                    </RadioGroup>


                </DialogContent>

                <DialogActions>
                    <Button onClick={processTagDeletion}>Remove</Button>
                    <Button>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}