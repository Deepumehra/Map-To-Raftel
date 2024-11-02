/* eslint-disable no-unused-vars */
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleAuth } from '../Helper/googleApi';
const GoogleLogin = (props) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				const result = await googleAuth(authResult.code);
				const {email, name, picture} = result.data.obj;
				console.log(email)
				const obj = {email,name, picture};
				console.log("User :",obj);
				localStorage.setItem('user-info',JSON.stringify(obj));
				navigate('/profile');
			} else {
				console.log("Auth Result :",authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});

	return (
		<div className="App">
			<button onClick={googleLogin}>
				Sign in with Google
			</button>
		</div>
	);
};

export default GoogleLogin;