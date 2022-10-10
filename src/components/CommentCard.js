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
import ReplyIcon from '@mui/icons-material/Reply';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import { useAuth } from '../context/AuthProvider';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ChildCommentCard from './ChildCommentCard';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function CommentCard(props) {

  const [openEditSnackbar, setOpenEditSnackbar] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClickEditSnackbar = (feedback) => {
    setMessage(feedback);
    setOpenEditSnackbar(true);
  };

  const handleCloseEditSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEditSnackbar(false);
  };

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

  const [replyDialogOpen, setReplyDialogOpen] = React.useState(false);

  const handleClickReplyDialogOpen = () => {
    setCommentTitle("")
    setContent("")
    setReplyDialogOpen(true);
  };

  const handleReplyDialogClose = () => {
    setReplyDialogOpen(false);
  };

  // const [newComment, setNewComment]=useState([])
  const [commentTitle, setCommentTitle] = useState(props.commentTitle)
  const [content, setContent] = useState(props.content)
  const [childComments, setChildComments] = useState(props.childComments)

  const [commentTitleError, setCommentTitleError] = useState({ value: false, errorMessage: '' })
  const [contentError, setContentError] = useState({ value: false, errorMessage: '' })

  const deleteComment = (e) => {
    e.preventDefault()
    fetch("http://localhost:8080/comment/comments/" + props.commentId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body:JSON.stringify(newComment)
    }).then(() => {
      console.log("Comment Deleted Successfully!")
      props.setRefreshPage(true)
      handleDeleteDialogClose();
      handleClickEditSnackbar("Comment Deleted Successfully!")
    })
  }

  const editComment = (e) => {
    e.preventDefault()
    setCommentTitleError({ value: false, errorMessage: '' })
    setContentError({ value: false, errorMessage: '' })
    if (commentTitle == '') {
      setCommentTitleError({ value: true, errorMessage: 'Comment title cannot be empty!' })
    }
    if (content == '') {
      setContentError({ value: true, errorMessage: 'Event title cannot be empty!' })
    }
    if (commentTitle && content) {
      const newComment = { commentTitle, content }
      fetch("http://localhost:8080/comment/comments/" + props.commentId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
      }).then(() => {
        console.log("Comment Edited Successfully!")
        props.setRefreshPage(true)
        handleEditDialogClose();
        handleClickEditSnackbar("Comment Edited Successfully!")
      })
    }
  }

  const replyComment = (e) => {
    e.preventDefault()
    setCommentTitleError({ value: false, errorMessage: '' })
    setContentError({ value: false, errorMessage: '' })
    if (commentTitle == '') {
      setCommentTitleError({ value: true, errorMessage: 'Comment title cannot be empty!' })
    }
    if (content == '') {
      setContentError({ value: true, errorMessage: 'Event title cannot be empty!' })
    }
    if (commentTitle && content) {
      var commentId = props.commentId
      var createdByUserId = user.userId
      var createdByUserName = user.username
      var createdByUserType = user.userType
      const newComment = { commentTitle, content, commentId, createdByUserId, createdByUserName, createdByUserType }
      fetch("http://localhost:8080/comment/reply/" + props.discussionId, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment)
      }).then(() => {
        console.log("Comment Replied Successfully!")
        props.setRefreshPage(true)
        handleReplyDialogClose();
        handleClickEditSnackbar("Comment Replied Successfully!")
      })
    }
  }

  const printStatement = () => {
    console.log("HELLO")
    console.log(props.childComments)
    return <></>
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
          <MoreVertIcon />
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
                      <DeleteIcon style={{ color: 'grey' }} />
                      &nbsp;
                      Delete
                    </MenuItem>
                    <MenuItem onClick={handleClickEditDialogOpen}>
                      <EditIcon style={{ color: 'grey' }} />
                      &nbsp;
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleClickReplyDialogOpen}>
                      <ReplyIcon style={{ color: 'grey' }} />
                      &nbsp;
                      Reply
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

  const renderReplyActions = () => {
    // console.log(props.createdByUserType)
    // console.log(user.userType)
    if (props.createdByUserId != user.userId || props.createdByUserType != user.userType) {
      return <div>
        <IconButton
        // ref={anchorRef}
        // id="composition-button"
        // aria-controls={openMenu ? 'composition-menu' : undefined}
        // aria-expanded={openMenu ? 'true' : undefined}
        // aria-haspopup="true"
        // onClick={handleToggle}
        >
          <MenuItem onClick={handleClickReplyDialogOpen}>
            <ReplyIcon style={{ color: 'grey' }} />
            &nbsp;
            Reply
          </MenuItem>
        </IconButton>
        {/* <Popper
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
                    <MenuItem onClick={handleClickReplyDialogOpen}>
                      <ReplyIcon style={{ color: 'grey' }} />
                      &nbsp;
                      Reply
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper> */}
      </div>
        ;
    }
  }

  const renderChildComments = () => {
    if (props.childComments) {
      return <div>
        {(props.childComments).map(comment => (
          <div style={{ paddingLeft: "50px", justifyContent: 'center', display: 'flex' }}>
            <div style={{ width: "3%" }}>
              <SubdirectoryArrowRightIcon />
            </div>
            <div style={{ width: "97%" }}>
              <ChildCommentCard
                commentId={comment.commentId}
                commentTitle={comment.commentTitle}
                timestamp={comment.createdDateTime}
                content={comment.content}
                createdByUserName={comment.createdByUserName}
                createdByUserType={comment.createdByUserType}
                createdByUserId={comment.createdByUserId}
                profilePictureURL={comment.createdByUserProfilePictureURL}
                discussionId={props.discussionId}
                refreshPage={props.refreshPage}
                setRefreshPage={props.setRefreshPage}
              />
            </div>
          </div>
        ))
        }
      </div>
        ;
    }
  }

  return (
    <>
      <Snackbar open={openEditSnackbar} autoHideDuration={5000} onClose={handleCloseEditSnackbar}>
        <Alert onClose={handleCloseEditSnackbar} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Card sx={{ marginBottom: '10px' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              <img src={props.profilePictureURL}></img>
            </Avatar>
          }
          action={
            <div>
              {renderExtraActions()}
              {renderReplyActions()}
            </div>
          }
          title={props.createdByUserName}
          subheader={props.timestamp}
        />
        <CardContent style={{ paddingTop: '0px' }}>
          <Typography variant="body2" color="text.primary" style={{ textDecoration: 'underline' }}>
            {props.commentTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.content}
          </Typography>
        </CardContent>
      </Card>
      <div>
        {printStatement()}
      </div>
      <div>
        {renderChildComments()}
      </div>
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
              style={{ margin: '6px 0' }}
              value={commentTitle}
              onChange={(e) => setCommentTitle(e.target.value)}
              error={commentTitleError.value}
              helperText={commentTitleError.errorMessage}
              required
            />
            <TextField
              id="filled-multiline-static" label="Comment Content" multiline rows={4} defaultValue="Default Value" variant="filled" fullWidth
              style={{ margin: '5px 0' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={contentError.value}
              helperText={contentError.errorMessage}
              required
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
      <div>
        <Dialog
          open={replyDialogOpen}
          onClose={handleReplyDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"You are replying to a comment"}
          </DialogTitle>
          <DialogContent>
            <Card sx={{ marginBottom: '10px' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    <img src={props.profilePictureURL}></img>
                  </Avatar>
                }
                action={
                  <div>
                    {/* {renderExtraActions()} */}
                  </div>
                }
                title={props.createdByUserName}
                subheader={props.timestamp}
              />
              <CardContent style={{ paddingTop: '0px' }}>
                <Typography variant="body2" color="text.primary" style={{ textDecoration: 'underline' }}>
                  {props.commentTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.content}
                </Typography>
              </CardContent>
            </Card>
            <DialogContentText id="alert-dialog-description">
              Enter your reply comment
            </DialogContentText>
            <TextField id="outlined-basic" label="Comment" variant="outlined" fullWidth
              style={{ margin: '6px 0' }}
              value={commentTitle}
              onChange={(e) => setCommentTitle(e.target.value)}
              error={commentTitleError.value}
              helperText={commentTitleError.errorMessage}
              required
            />
            <TextField
              id="filled-multiline-static" label="Comment Content" multiline rows={4} defaultValue="Default Value" variant="filled" fullWidth
              style={{ margin: '5px 0' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={contentError.value}
              helperText={contentError.errorMessage}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReplyDialogClose}>Cancel</Button>
            <Button onClick={replyComment} autoFocus>
              Reply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
