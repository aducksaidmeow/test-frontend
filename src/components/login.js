import { useGoogleLogin } from '@react-oauth/google'

export default function Login() {

    const loginCall = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: codeResponse => {
            console.log(codeResponse);
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