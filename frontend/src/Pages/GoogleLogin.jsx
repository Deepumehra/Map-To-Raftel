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
				const {image,jwt,userDetails} = result.data;
				const obj = {userDetails,jwt,image};
				localStorage.setItem('user-info',JSON.stringify(userDetails));
				localStorage.setItem('image',JSON.stringify(image))
				localStorage.setItem('JWT',jwt);
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
		<div>
			<button onClick={googleLogin}>
				Login with Google
			</button>
		</div>
	);
};

export default GoogleLogin;