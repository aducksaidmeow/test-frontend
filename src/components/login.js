import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import loginPicture from "./login-picture.png";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [link, setLink] = useState("");

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
              if (role === "") setLink("/add-info");
              else if (role === "student") setLink("/student-calendar");
              else if (role === "teacher") setLink("teacher-calendar");
              else if (role === "admin") setLink("/admin-calendar");
              setRemove(true);
            }).catch((error) => console.log(error.message));
          }).catch((error) => console.log(error.message));
        }).catch((error) => console.log(error.message));
      }).catch((error) => console.log(error.message));
    },
  });

  return (
    <div className="h-screen grid grid-rows-6 grid-cols-6 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
      <AnimatePresence>
        {!remove && <motion.div 
          className="col-start-4 col-span-3 row-start-2 row-span-5 flex items-end"
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          exit={{ x: 1000 }}
        >
          <img src={loginPicture} />
        </motion.div> }
      </AnimatePresence>
      <div className="col-start-1 col-span-3 row-start-2 row-span-3 flex flex-col justify-center items-center">
        <AnimatePresence>
          {!remove && <motion.div 
            className="text-[45px] font-bold font-['consolas']"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            exit={{ x: -1000 }}
          >
              WEBSITE BÁO THỨC HỌC TẬP
          </motion.div> } 
        </AnimatePresence>
        <AnimatePresence onExitComplete={() => navigate(link)}>
          {!remove && <motion.div
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            exit={{ y: 500 }}
          >
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
              onClick={() => { setLink("/about-us"); setRemove(true); }}
            >
              Về chúng tôi
            </button>
          </motion.div> }
        </AnimatePresence>
      </div>
    </div>
  );
}
