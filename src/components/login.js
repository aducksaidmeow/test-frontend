import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginloadingScreen from "./loadingScreen/loginLoadingScreen";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginCall = useGoogleLogin({
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setLoading(true);
      const url =
        process.env.NODE_ENV === "production"
          ? `${process.env.REACT_APP_API_URL}/api/get-token`
          : "/api/get-token";
      console.log(url);
      const code = codeResponse.code;
      axios
        .post(url, { code })
        .then((response) => {
          console.log(response.data);
          const refreshToken = response.data.refresh_token;
          const decodedIdToken = jwt_decode(response.data.id_token);
          const email = decodedIdToken.email;
          const userId = email.split("@")[0];
          localStorage.setItem("email", email);
          localStorage.setItem("userId", userId);
          console.log({ refreshToken, email, userId });
          const url =
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_API_URL}/api/init`
              : "/api/init";
          axios
            .post(url, { userId, refreshToken })
            .then((response) => {
              console.log(response.data);
              const url =
                process.env.NODE_ENV === "production"
                  ? `${process.env.REACT_APP_API_URL}/api/get-role`
                  : "/api/get-role";
              axios
                .post(url, { userId })
                .then((response) => {
                  const role = response.data;
                  localStorage.setItem("role", role);
                  console.log(role);
                  const url =
                    process.env.NODE_ENV === "production"
                      ? `${process.env.REACT_APP_API_URL}/api/add-acl`
                      : "/api/add-acl";
                  axios
                    .post(url, { userId })
                    .then((response) => {
                      console.log(response);
                      setLoading(false);
                      if (role === "") navigate("/add-info");
                      else if (role === "student")
                        navigate("/student-calendar");
                      else if (role === "teacher")
                        navigate("/teacher-calendar");
                    })
                    .catch((error) => console.log(error.message));
                })
                .catch((error) => console.log(error.message));
            })
            .catch((error) => console.log(error.message));
        })
        .catch((error) => console.log(error.message));
    },
  });

  return (
    <div>
      {!loading && (
        <div className="login-background">
          <h1 className="login-title">
            Login to continue!
            <button className="login-button" onClick={() => loginCall()}>
              Sign in with Google 🔎
            </button>
          </h1>
        </div>
      )}
      {loading && <LoginloadingScreen />}
    </div>
  );
}
