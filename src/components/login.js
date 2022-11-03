import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function Login() {

    const loginCall = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: codeResponse => {
            console.log(codeResponse);
            const url = process.env.NODE_ENV === 'production' ? 
                `${process.env.REACT_APP_API_URL}/api/test` :
                '/api/test';
            axios.post(url, {}).then(response => {
                console.log(response.data);
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