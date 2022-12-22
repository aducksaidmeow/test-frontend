import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginPicture from "./login-picture.png";

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
    <div className="h-screen grid grid-rows-6 grid-cols-6 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100">
      <div className="col-start-4 col-span-3 row-start-2 row-span-5 flex items-end">
        <img src={loginPicture} />
      </div>
      <div className="col-start-1 col-span-3 row-start-2 row-span-3 flex flex-col justify-center items-center">
        <div className="text-[45px] font-bold font-['consolas']">WEBSITE BÁO THỨC HỌC TẬP</div>
        {/*<div className="text-[30px] font-nerko-one">A small website to manage your homeworks</div>*/}
        <button className="
          h-[10vh] w-[24vw] bg-[#FFFBE9] border-[#FB2576] border-2 shadow-xl flex justify-center items-center mt-[5vh]
          font-['consolas'] text-[20px] text-[#FB2576]
          hover:bg-[#EA047E] hover:text-[#FFFBE9] hover:scale-[1.05] hover:text-[20px]
          transition ease-in-out duration-150"
          onClick={() => loginCall()}
        >
          Đăng nhập bằng Google 🔎  
        </button>
        <button className="
          h-[10vh] w-[24vw] bg-[#FFFBE9] border-[#FFBF00] border-2 shadow-xl flex justify-center items-center mt-[5vh]
          font-['consolas'] text-[20px] text-[#FFBF00]
          hover:bg-[#FFB200] hover:text-[#FFFBE9] hover:scale-[1.05] hover:text-[20px]
          transition ease-in-out duration-150"
          onClick={() => navigate("/about-us")}
        >
          Về chúng tôi
        </button>
      </div>
    </div>
  );
}
