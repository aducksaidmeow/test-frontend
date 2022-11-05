import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default function Login() {

    const loginCall = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: codeResponse => {
            console.log(codeResponse);
            const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/get-token` : '/api/get-token';
            console.log(url);
            const code = codeResponse.code;
            axios.post(url, { code }).then(response => {
                console.log(response.data);
                const refreshToken = response.data.refresh_token;
                const decodedIdToken = jwt_decode(response.data.id_token);
                const email = decodedIdToken.email;
                const userId = email.split('@')[0];
                localStorage.setItem('email', email);
                localStorage.setItem('userId', userId);
                console.log({ refreshToken, email, userId });
                const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/init` : '/api/init';
                axios.post(url, { userId, refreshToken }).then(response => {
                    console.log(response.data);
                }).catch(error => console.log(error.message));
            }).catch(error => console.log(error.message));
        }
    });

    return (
        <div>
            <h1>Login to continue!</h1>
            <button onClick={() => loginCall()}>
                Sign in with Google
            </button>
        </div>
    );
}