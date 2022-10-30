// router
import { useLocation, useNavigate, useParams, BrowserRouter } from 'react-router-dom';
// react
import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import Canvas from '../components/WhiteboardComponents/Canvas';
// sockets
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
import { getRoom } from '../services/getRoom';


import BASE_URL from '../services/baseUrl';
// username
import { useAuth } from '../context/AuthProvider';

const SOCKET_URL = BASE_URL + '/ws-message';

export default function Room() {
	const navigate = useNavigate();
	var roomId = useParams();
	roomId = roomId.roomId;

	// finding the username
	const auth = useAuth();
	const user = auth.user;
	var username = user.username;

	const [rid, setRid] = useState(null);
	const [incomingDrawings, setIncomingDrawings] = useState(null);
	const [usersList, setUsersList] = useState([]);
	// const [userNotInCallList, setUserNotInCallList] = useState([]);
	const [loading, setLoading] = useState(true);

	// chat message
	// const [newMessage, setNewMessage] = useState("");
	const newMessage = useRef(null);

	const CONNECT_USER = 'CONNECT_USER';
	const DISCONNECT_USER = 'DISCONNECT_USER';

	let messagesSubscription = null;
	let canvasSubscription = null;
	let groupChatSubscription = null;

	const ws = useRef(null);
	const stomp = useRef(null);

	useEffect(() => {
		// check if room exists by id
		getRoom(roomId)
			.then((resp) => {
				setLoading(false)
			})
			.catch((err) => {
				navigate.push('/');
			})
	}, []);

	useEffect(() => {
		if (!rid || !username) {
			setRid(roomId);
			localStorage.setItem('rid', roomId);
			localStorage.setItem('username', username);
		}
		if (loading) {
			ws.current = new SockJS(SOCKET_URL);
			ws.current.onopen = () => alert("ws opened");
			ws.current.onclose = (() => {
				ws.alert(1000);
				disconnect();
			})

			stomp.current = Stomp.over(ws.current);
			stomp.current.reconnect_delay = 5000;
			stomp.current.connect({}, frame => {
				const userJoinedRoom = {
					username: username,
					payload: CONNECT_USER,
					roomId: rid
				};
				stomp.current.send(`/app/send/${rid}/user`, {}, JSON.stringify(userJoinedRoom));

				messagesSubscription = stomp.current.subscribe(`/topic/${rid}/user`, roomActions => {
					const response = JSON.parse(roomActions.body);
					// setSnackbarMsg(response.message);
					setUsersList(response.users);
					// setSnackbarOpen(true);
					toast.info(response.message, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					});

				});

				canvasSubscription = stomp.current.subscribe(`/topic/${rid}`, coordinates => {
					setIncomingDrawings(JSON.parse(coordinates.body))
				});

				groupChatSubscription = stomp.current.subscribe(`/topic/${rid}/chat`, textMessage => {
					showMessage(JSON.parse(textMessage.body));

				})

				// stomp.current.send(`/app/send/${rid}/get-learner-not-participants`);

				// participantsSubscription = stomp.current.subscribe(`/topic/${rid}/get-learner-not-participants`, usernameList => {
				// 	const response = JSON.parse(usernameList.body);

				// 	setUserNotInCallList(response);
				// });

			});


			return () => {
				ws.current.close();
				console.log('Initialization done.');
			};

		};
	}, [rid, username]);

	const sendMessage = (message) => {
		stomp.current.send(`/app/send/${rid}`, {}, JSON.stringify(message));
	}
	// chat message
	function showMessage(textMessage) {
		toast('🦄 ' + textMessage.author + ": " + textMessage.message, {
			position: "top-right",
			autoClose: 10000,
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
		if (newMessage.current.value === "") {
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
			sendChatMessage(newMessage.current.value);
			newMessage.current.value = "";
			// setNewMessage("");
		}

	};
	const sendChatMessage = (message) => {
		const textMessage = {
			message: message,
			author: username
		}
		stomp.current.send(`/app/send/${rid}/chat`, {}, JSON.stringify(textMessage));
	}

	const setRoomId = (newId) => {
		disconnect();
		navigate(`/room/${newId}?username=${username}`);
		localStorage.removeItem('rid');
		localStorage.setItem('rid', newId);
		setRid(newId)
	}


	const disconnect = () => {
		const rid = localStorage.getItem('rid');
		const username = localStorage.getItem('username');
		// check if they are connected
		if (rid && username && canvasSubscription) {
			const userLeftRoom = {
				username: username,
				payload: DISCONNECT_USER,
				roomId: rid
			};
			stomp.current.send(`/app/send/${rid}/user`, {}, JSON.stringify(userLeftRoom));
			stomp.current.disconnect(frame => {
				if (messagesSubscription) messagesSubscription.unsubscribe();
				if (canvasSubscription) canvasSubscription.unsubscribe();
				if (groupChatSubscription) groupChatSubscription.unsubscribe();
			}, {})

			localStorage.removeItem('rid');
			localStorage.removeItem('username');
		};
	}

	useEffect(() => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			disconnect();
		});

	})



	// Run this code when client refreshes the page or closes the tab (disconnect the socket and send message in room)

	return (
		<div>
			{/* <ThemeProvider> */}
			<Canvas
				sendMessage={sendMessage}
				setRoomId={setRoomId}
				incomingDrawings={incomingDrawings}
				roomId={rid}
				usersList={usersList}
				username={username}
				loading={loading}
			// usersNotInCall = {userNotInCallList}
			/>
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
					{/* <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <ToastContainer /> */}
				</div>
				<div className="chat-input">
					<Stack direction="row" spacing={2}>
						<TextField id="outlined-basic" label="Type your message here" variant="outlined" inputRef={newMessage} onKeyDown={(e) => {
							if (e.key === "Enter") {
								sendNewChat(e);
							}
						}}
							fullWidth style={{ marginLeft: '2em' }} />
						<Button variant="contained" endIcon={<SendIcon />} onClick={sendNewChat} style={{ marginRight: '2em' }}>
							Send
						</Button>
					</Stack>

				</div>

			</div>
			{/* </ThemeProvider> */}
		</div>
	)
}

export async function getServerSideProps(context) {
	return {
		props: {}, // will be passed to the page component as props
	};
}