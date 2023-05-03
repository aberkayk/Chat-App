import React, { useEffect, useState } from "react";
import {
	addDoc,
	collection,
	onSnapshot,
	serverTimestamp,
	where,
	orderBy,
	query,
} from "firebase/firestore";
import { db, auth } from "../firebase/FirebaseConfig";

const Chat = ({ room }) => {
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const messagesRef = collection(db, "messages");

	const handleSubmit = async (e) => {
		e.preventDefault();

		await addDoc(messagesRef, {
			text: newMessage,
			createdAt: serverTimestamp(),
			user: auth.currentUser.displayName,
			room,
		});

	};

	useEffect(() => {
		const queryMessage = query(
			messagesRef,
			where("room", "==", room),
			orderBy("createdAt")
		);
		onSnapshot(queryMessage, (snapshot) => {
			let tempMessages = [];

			snapshot.forEach((doc) =>
				tempMessages.push({ ...doc.data(), id: doc.id })
			);
			setMessages(tempMessages);
		});
	}, []);

	return (
		<div className="chat">
			{/* Information */}
			<header>
				<h5 id="username">{auth.currentUser.displayName.toUpperCase()}</h5>
				<div>
					<h4 id="roomname">{room}</h4>
				</div>
				<h5 id="others">
					<a href="/">Other Rooms</a>
				</h5>
			</header>

			{/* Messages */}
			<div className="messages">
				{messages.map((message) => (
					<>
						{auth.currentUser.displayName === message.user ? (
							<p className="user-message">{message.text}</p>
						) : (
							<p className="reply-message">
								<span id="user-message-name">{message.user}</span>
								<span id="user-message-text">{message.text}</span>
							</p>
						)}
					</>
				))}
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit}>
				<input
					onChange={(e) => {
						setNewMessage(e.target.value);
					}}
					type="text"
					placeholder="Enter your message"
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default Chat;
