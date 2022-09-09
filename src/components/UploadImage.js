import * as React from 'react';
import { Component } from 'react';
import UploadService from "../services/upload-files.service";
import { LinearProgress } from '@mui/material';
import { Box, Typography, Button, ListItem } from '@mui/material';

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: undefined,
      previewImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      progress: 0,
      message: "",
      isError: false,
      imageInfos: [],
    };
  }
  render() {

    const {
        currentFile,
        previewImage,
        progress,
        message,
        imageInfos,
        isError
      } = this.state;
      
      return (
        <div className="mg20">
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              name="btn-upload"
              style={{ display: 'none' }}
              type="file"
              accept="image/*"
              onChange={this.selectFile} />
            <Button
              className="btn-choose"
              variant="outlined"
            component="span" >
             Choose Image
          </Button>
        </label>
        <div className="file-name">
        {currentFile ? currentFile.name : null}
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!currentFile}
          onClick={this.upload}>
          Upload
        </Button>
        {currentFile && (
          <Box className="my20" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }
        {previewImage && (
          <div>
            <img className="preview my20" src={previewImage} alt="" />
          </div>
        )}
        {message && (
          <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
            {message}
          </Typography>
        )}
        <Typography variant="h6" className="list-header">
          List of Images
          </Typography>
        <ul className="list-group">
          {imageInfos &&
            imageInfos.map((image, index) => (
              <ListItem
                divider
                key={index}>
                <img src={image.url} alt={image.name} height="80px" className="mr20" />
                <a href={image.url}>{image.name}</a>
              </ListItem>
            ))}
        </ul>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          onClick={this.printMessage}>
          Print Message
        </Button>
      </div >
    );
  }

  // printMessage = () => {
  //   console.log(this.state.message);
  //   console.log("Hello");
  // }
  
  selectFile = (event) => {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ""
    });
  }

  upload = () => {
    this.setState({
      progress: 0
    });
    UploadService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.fileId,
          isError: false
        });
        console.log(response);
      })
      .catch((err) => {
        this.setState({
          progress: 0,
          message: "Could not upload the image!",
          currentFile: undefined,
          isError: true
        });
      });
  }

  // componentDidMount() {
  //   UploadService.getFiles().then((response) => {
  //     this.setState({
  //       imageInfos: response.data,
  //     });
  //   });
  //   console.log("Hello World");
  // }


}