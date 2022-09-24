import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { useAuth } from '../context/AuthProvider';

export default function CommentCard(props) {

  const auth = useAuth()
  const user = auth.user

  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === 'Escape') {
      setOpenMenu(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpenMenu = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpenMenu.current === true && openMenu === false) {
      anchorRef.current.focus();
    }

    prevOpenMenu.current = openMenu;
  }, [openMenu]);

  //---------------------------------------

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleClickDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const handleClickEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  // const [newComment, setNewComment]=useState([])
  const [commentTitle,setCommentTitle]=useState(props.commentTitle)
  const [content,setContent]=useState(props.content)

  const deleteComment=(e)=>{
    e.preventDefault()
    fetch("http://localhost:8080/comment/comments/" + props.commentId, {
        method:"DELETE", 
        headers:{"Content-Type":"application/json"}, 
        // body:JSON.stringify(newComment)
    }).then(()=>{
        console.log("Comment Deleted Successfully!")
        props.setRefreshPage(true)
        handleDeleteDialogClose();
    })
  }

  const editComment=(e)=>{
    e.preventDefault()
    const newComment={commentTitle, content}
    fetch("http://localhost:8080/comment/comments/" + props.commentId, {
        method:"PUT", 
        headers:{"Content-Type":"application/json"}, 
        body:JSON.stringify(newComment)
    }).then(()=>{
        console.log("Comment Edited Successfully!")
        props.setRefreshPage(true)
        handleEditDialogClose();
    })
  }

  const renderExtraActions = () => {
    // console.log(props.createdByUserType)
    // console.log(user.userType)
    if (props.createdByUserId === user.userId && props.createdByUserType === user.userType) {
      return <div>
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={openMenu ? 'composition-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <MoreVertIcon/>
          </IconButton>
          <Popper
            open={openMenu}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <MenuList
                      autoFocusItem={openMenu}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClickDeleteDialogOpen}>
                        <DeleteIcon style={{color: 'grey'}}/>
                        &nbsp;
                        Delete
                      </MenuItem>
                      <MenuItem onClick={handleClickEditDialogOpen}>
                        <EditIcon style={{color: 'grey'}}/>
                        &nbsp;
                        Edit
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        ;
    }
  }

  return (
    <>
    <Card sx={{ marginBottom: '10px'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img src={props.profilePictureURL}></img>
          </Avatar>
        }
        action={
          <div>
            {renderExtraActions()}
          </div>
        }
        title={props.createdByUserName}
        subheader={props.timestamp}
      />
      <CardContent style={{paddingTop: '0px'}}>
        <Typography variant="body2" color="text.primary" style={{textDecoration: 'underline'}}>
            {props.commentTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.content}
        </Typography>
      </CardContent>
    </Card>
    <div>
      <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this comment?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will not be able to undo this action. Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>Cancel</Button>
            <Button onClick={deleteComment} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    <div>
      <Dialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You are editing this comment"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Enter the new comment details
            </DialogContentText>
            <TextField id="outlined-basic" label="Comment" variant="outlined" fullWidth 
              style={{margin: '6px 0'}}
              value={commentTitle}
              onChange={(e)=>setCommentTitle(e.target.value)}
            />
            <TextField
              id="filled-multiline-static" label="Comment Content" multiline rows={4} defaultValue="Default Value" variant="filled" fullWidth
              style={{margin: '5px 0'}}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button onClick={editComment} autoFocus>
              Edit
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    </>
  );
}
