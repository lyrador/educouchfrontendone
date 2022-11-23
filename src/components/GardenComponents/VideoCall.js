import React, { useEffect, useRef, useState } from "react";
import SimplePeer, { Instance, SignalData } from "simple-peer";
import { Button, Typography, CircularProgress, Stack } from '@mui/material';
import groupStudy from '../../assets/groupStudy.jpg';
import { useNavigate } from "react-router-dom";

// enum ConnectionStatus {
//   OFFERING,
//   RECEIVING,
//   CONNECTED,
// }

const webSocketConnection = new WebSocket("ws://localhost:8080/videochat");

export default function VideoCall({ user, sendOtherUser }) {
  const navigate = useNavigate();

  const videoSelf = useRef(null);
  const videoCaller = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [offerSignal, setOfferSignal] = useState();
  const [simplePeer, setSimplePeer] = useState();
  const [processDone, setProcessDone] = useState(false);

  var localStream;

  useEffect(() => {
    webSocketConnection.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      if (payload?.type === "offer") {
        setOfferSignal(payload);
        setConnectionStatus("RECEIVING");
      } else if (payload?.type === "answer") {
        simplePeer?.signal(payload);
      } else if (simplePeer && processDone) {
        if (payload.userId && payload.username) {
          handleUserReceiver(payload);
          console.log('Payload is ' + JSON.stringify(payload));

          const otherIdentity = {}
          otherIdentity.userId = user.userId;
          otherIdentity.username = user.username;
          otherIdentity.profilePictureURL = user.profilePictureURL;


          webSocketConnection.send(JSON.stringify(otherIdentity));
          setProcessDone(false);
        }

      }
    }
  }, [simplePeer, processDone]);

  const handleUserReceiver = (user) => {
    if (user.userId) {
      var urlLink = "http://localhost:8080/learner/retrieveById?learnerId=" + user.userId;
      fetch(urlLink)
        .then((resp) => resp.json())
        .then((result) => {
          console.log('Sending result...');
          sendOtherUser(result);
        })
        .catch((err) => {
          console.log('An error has happened.');
        });

    }

  }

  // useEffect(() => {
  //   webSocketConnection.onmessage = (message) => {
  //     const payload = JSON.parse(message.data);
  //     if(payload.userId && payload.username) {
  //       handleUserReceiver(payload.userId);
  //     }
  //     console.log('Payload is ' + JSON.stringify(payload));
  //   };
  // },)

  const sendOrAcceptInvitation = (isInitiator, offer) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((mediaStream) => {

      const video = videoSelf.current;
      video.srcObject = mediaStream;
      video.play();


      const sp = new SimplePeer({
        trickle: false,
        initiator: isInitiator,
        stream: mediaStream,
      });

      localStream = mediaStream;


      if (isInitiator) setConnectionStatus("OFFERING");
      else offer && sp.signal(offer);

      sp.on("signal", (data) => webSocketConnection.send(JSON.stringify(data)));
      sp.on("connect", () => setConnectionStatus("CONNECTED"));
      sp.on("stream", (stream) => {
        const video = videoCaller.current;
        video.srcObject = stream;
        video.play();
      });
      setSimplePeer(sp);
    }
    );

    const otherIdentity = {}
    otherIdentity.userId = user.userId;
    otherIdentity.username = user.username;
    otherIdentity.profilePictureURL = user.profilePictureURL;


    webSocketConnection.send(JSON.stringify(otherIdentity));

    setProcessDone(true);


  };

  const closeConnection = () => {
    webSocketConnection.close();
    var video = videoCaller.current;
    video.srcObject = undefined;
    video.pause();

    video = videoSelf.current;
    video.srcObject = undefined;
    video.pause();
    if(localStream) {
      console.log('Local stream is not undefined.');
      localStream.getTracks().forEach(function (track) {
        if (track.readyState == 'live') {
          track.stop();
        }
      });

    } else {
      console.log('Local stream is undefined.');
    }
    

    setConnectionStatus(null);
  }


  return (
    <div className="web-rtc-page">
      <center>
        <img src={groupStudy} style={{ width: '50%' }} />
        <div>
          <Typography variant="h6">Study with Strangers</Typography>
          <br/>
          <Typography style = {{textAlign: "justify", width: "60%"}}>Connect with the other kids within our community through productive studying session. To visit another user's garden, simply click the button below. Once they accept your invitation, they are also allowing you to study in their garden.</Typography>
        </div>
        <br />
        {connectionStatus === null && <Button variant="contained" onClick={() => sendOrAcceptInvitation(true)}>Find a stranger to study with!</Button>}
        {connectionStatus === "OFFERING" && <CircularProgress />}
        {connectionStatus === "RECEIVING" && (
          <div>
            <Button onClick={() => sendOrAcceptInvitation(false, offerSignal)}>Receive Invitation</Button>

            <Typography>Someone is looking for a studymate📖. Click the button below to receive the invitation. </Typography>
          </div>

        )}


      </center>
      <center>
        <Stack direction="row" spacing={1}>
          <video ref={videoSelf} className="video-block" style={{ width: "50%" }} />

          <video ref={videoCaller} className="video-block" style={{ width: "50%" }} />
        </Stack>
        {connectionStatus === "CONNECTED" && (
          <div>
            <br />
            <Button onClick={() => closeConnection()}> Disconnect</Button>
          </div>


        )}
      </center>
    </div>
  );
};