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
  const [error, setError] = useState("");

  const loginCall = useGoogleLogin({
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
    onSuccess: async(codeResponse) => {
      console.log(codeResponse);

      if (!codeResponse.scope.includes("https://www.googleapis.com/auth/calendar")) {
        setError("Web cần quyền chỉnh sửa và xóa lịch");
        return;
      } else {
        setError("");
      }

      setLoading(true);
      

      const getTokenUrl = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-token` : "/api/get-token";
      const code = codeResponse.code;
      const response1 = await axios.post(getTokenUrl, { code }).catch((error) => { console.log(error); return; });

      const refreshToken = response1.data.refresh_token;
      const decodedIdToken = jwt_decode(response1.data.id_token);
      const email = decodedIdToken.email;
      const userId = email.split("@")[0];
      localStorage.setItem("email", email);
      localStorage.setItem("userId", userId);
      const initUrl = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/init` : "/api/init";
      const response2 = await axios.post(initUrl, { userId, refreshToken }).catch((error) => { console.log(error); return; });

      const getRoleUrl = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-role` : "/api/get-role";
      const response3 = await axios.post(getRoleUrl, { userId }).catch((error) => { console.log(error); return; });
      const role = response3.data;
      localStorage.setItem("role", role);

      const addAclUrl = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-acl` : "/api/add-acl";
      const response4 = await axios.post(addAclUrl, { userId }).catch((error) => { console.log(error); return; });

      setLoading(false);
      if (role === "") setLink("/add-info");
      else if (role === "student") setLink("/student-calendar");
      else if (role === "teacher") setLink("/teacher-calendar");
      setRemove(true);
    },
  });

  return (
    <div className="h-screen grid relative grid-rows-6 grid-cols-6 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
      <AnimatePresence>
        {error !== "" && 
          <motion.div 
            className="absolute h-[5vh] w-screen flex justify-center items-center mt-[1vh]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#EB455F] h-[100%] w-[35%] flex justify-center items-center rounded-lg font-Philosopher-Regular text-[20px]">
              {error}
            </div>
          </motion.div>          
        }
        {loading && 
          <motion.div
            className="absolute h-[5vh] w-screen flex justify-center items-center mt-[1vh]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#B3FFAE] h-[100%] w-[30%] flex justify-center items-center rounded-lg font-Philosopher-Regular text-[20px]">
              Đang xử lí
            </div>
          </motion.div>

        }
      </AnimatePresence>
      <AnimatePresence>
        {!remove && <motion.div 
          className="col-start-4 col-span-3 row-start-2 row-span-5 flex items-end"
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
          exit={{ x: 1000 }}
        >
          <img src={loginPicture} alt=""/>
        </motion.div> }
      </AnimatePresence>
      <div className="col-start-1 col-span-3 row-start-2 row-span-3 flex flex-col justify-center items-center">
        <AnimatePresence>
          {!remove && <motion.div 
            className="text-[4vw] font-bold font-Philosopher-Regular"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            exit={{ x: -1000 }}
          >
              Homework Reminder 
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
              font-['consolas'] text-[1.5vw] text-[#FB2576]
              hover:bg-[#EA047E] hover:text-[#FFFBE9] hover:scale-[1.05] hover:text-[20px]
              transition ease-in-out duration-150"
              onClick={() => loginCall()}
            >
              Đăng nhập bằng Google 🔎  
            </button>
            <button className="
              h-[10vh] w-[24vw] bg-[#FFFBE9] border-[#FFBF00] border-2 shadow-xl flex justify-center items-center mt-[5vh]
              font-['consolas'] text-[1.5vw] text-[#FFBF00]
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
