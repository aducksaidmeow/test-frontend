import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginCall = useGoogleLogin({
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: (codeResponse) => {
      setLoading(true);
      const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-token` : "/api/get-token";
      const code = codeResponse.code;
      axios.post(url, { code }).then((response) => {
        const refreshToken = response.data.refresh_token;
        const decodedIdToken = jwt_decode(response.data.id_token);
        const email = decodedIdToken.email;
        const userId = email.split("@")[0];
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
        const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/init` : "/api/init";
        axios.post(url, { userId, refreshToken }).then((response) => {
          const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-role` : "/api/get-role";
          axios.post(url, { userId }).then((response) => {
            const role = response.data;
            localStorage.setItem("role", role);
            const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-acl` : "/api/add-acl";
            axios.post(url, { userId }).then((response) => {
              setLoading(false);
              if (role === "") navigate("/add-info");
              else if (role === "student") navigate("/student-calendar");
              else if (role === "teacher") navigate("/teacher-calendar");
            }).catch((error) => console.log(error.message));
          }).catch((error) => console.log(error.message));
        }).catch((error) => console.log(error.message));
      }).catch((error) => console.log(error.message));
    },
  });

  const [index, setIndex] = useState(0);
  const loadingDisplay = ["Loading.", "Loading..", "Loading..."];

  useEffect(() => {
    const currentInterval = setInterval(() => setIndex((index) => (index + 1) % 3), 1000);
    return () => clearInterval(currentInterval);
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-[#F0EBE3]">
      <div className="h-[80vh] w-[80vw] bg-[#E4DCCF] shadow-2xl grid grid-rows-2 grid-cols-3">
        {!loading && (
          <>
            <div className="flex justify-center items-center row-span-2 col-span-2">
              Put some picture here
            </div>
            <div className="flex justify-center items-center row-start-1 col-start-3 font-['consolas'] text-[30px]">
              Login to continue
            </div>
            <div className="flex justify-center items-start row-start-2 col-start-3">
              <button
                className="bg-[#7D9D9C] h-[10vh] w-[24vw] rounded-md font-['consolas'] text-[25px] hover:scale-[1.05]"
                onClick={() => loginCall()}
              >
                Sign in with Google 🔎
              </button>
            </div>
          </>
        )}
        {loading && ( 
          <>
            <div className="flex justify-center items-center row-span-2 col-span-3 font-['consolas'] text-[40px]">
              {loadingDisplay[index]}
            </div>
          </> 
        )}
      </div>
    </div>
  );
}
