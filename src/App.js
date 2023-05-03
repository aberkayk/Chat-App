import "./styles/style.css";
import Auth from "./components/Auth";
import { useEffect, useRef, useState } from "react";
import Chat from "./components/Chat";

function App() {
	const [token, setToken] = useState(null);
	const [room, setRoom] = useState(null);
	const inputRef = useRef(null);

	useEffect(() => {
		const permanentToken = localStorage.getItem("token");
		const temporaryToken = sessionStorage.getItem("token");
		permanentToken ? setToken(permanentToken) : setToken(temporaryToken);
	}, []);

	if (!token) {
		return <Auth setToken={setToken} />;
	}

	return (
		<div className="container">
			{room ? (
				<Chat room={room}/>
			) : (
				<div className="room-container">
					<h1>Chat Room</h1>
					<p>Enter Room Name</p>
					<input type="text" ref={inputRef} />
					<button onClick={() => setRoom(inputRef.current.value.toUpperCase())}>
						Enter Room
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
