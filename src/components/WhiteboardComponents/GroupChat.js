import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function GroupChat({ sendChatMessage, incomingChatMessage }) {
    const [newMessage, setNewMessage] = useState("");
    useEffect(() => {
        if (!incomingChatMessage) return;
        else showMessage(incomingChatMessage);
    });
    function showMessage(textMessage) {
        toast('🦄 ' + textMessage.author + ": " + textMessage.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const sendNewChat = (e) => {
        e.preventDefault();
        if(newMessage === "") {
            toast.error('Unable to send empty message', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            sendChatMessage(newMessage);
            setNewMessage("");
        }
        
      };
    return (
        <div>
            <div className="messages">
                <ToastContainer
                    position="top-right"
                    autoClose={10000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer />
            </div>
            <div className="chat-input">
                <Stack direction="row" spacing={2}>
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => setNewMessage(e.target.value)}/>
                    <Button variant="contained" endIcon={<SendIcon />} onClick = {sendNewChat}>
                        Send
                    </Button>
                </Stack>

            </div>

        </div>
    )
}

export default GroupChat;