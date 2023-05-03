import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/FirebaseConfig";

const Auth = ({ setToken }) => {
	const [isChecked, setIsChecked] = useState(false);

	const signIn = () => {
		//USER SIGN IN
		signInWithPopup(auth, provider)
			.then((res) => {
				isChecked
					? localStorage.setItem("token", res.user.refreshToken)
					: sessionStorage.setItem("token", res.user.refreshToken);
				setToken(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="auth">
			<h1>Chat Room</h1>
			<p>Sign In to Continue</p>
			<div className="rememberDiv">
				<input
					type="checkbox"
					id="rememberMe"
					onChange={(e) => setIsChecked(e.target.checked)}
				/>
				<label htmlFor="rememberMe">Remember Me</label>
			</div>
			<button onClick={signIn}>
				<img src="https://img.freepik.com/free-icon/search_318-265146.jpg" />
				Log In with Google
			</button>
		</div>
	);
};

export default Auth;
