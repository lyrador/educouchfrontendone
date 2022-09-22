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
import IconMenu from './IconMenu';
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
import Stack from '@mui/material/Stack';

export default function CommentCard(props) {

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
        window.location.reload();
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
        window.location.reload();
    })
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
          // <IconButton aria-label="settings" onClick={handleClickOpen}>
          //   <DeleteIcon/>
          // </IconButton>
            <div>
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
        }
        title={props.createdByUserName}
        subheader={props.timestamp}
      />
      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent style={{paddingTop: '0px'}}>
        <Typography variant="body2" color="text.primary" style={{textDecoration: 'underline'}}>
            {props.commentTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.content}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
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
