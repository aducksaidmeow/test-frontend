import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import arrow from "./arrow.png"
import student from "./student.png"
import teacher from "./teacher.png"

export default function AddInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [link, setLink] = useState("");

  const onClick = (role) => {
    localStorage.setItem("role", role);
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-role` : "/api/add-role";
    axios.post(url, { userId, role }).then((response) => {
      setLoading(false);
      if (role === "student") setLink("/student-calendar");
      else if (role === "teacher") setLink("/teacher-calendar");
      else if (role === "admin") setLink("/admin-calendar");
      setRemove(true);
    }).catch((error) => console.log(error.message));
  };

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

    return (
      <div className="h-screen grid grid-rows-6 grid-cols-9 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
        <AnimatePresence onExitComplete={() => navigate(link)} >
        {!remove && <motion.div 
          className="col-start-1 col-span-9 row-start-2 row-span-4 flex justify-center items-center gap-[5vw]"
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          exit={{ x: 1000 }}
          transition={{ duration: 1 }}
        >
          {/*Student*/}
          <button 
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("student")}
          >
            <img src={student} className="h-[30vh]"/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Học sinh
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px]"> 
              Xem bài tập
            </div>
          </button>
          {/*Student*/}
          <button 
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("teacher")}
          >
            <img src={teacher} className="h-[30vh]"/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Giáo viên
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px] pl-[1vw] pr-[1vw]"> 
              Xem, gửi bài tập
            </div>
          </button>
          {/*Admin*/}
          <button 
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("admin")}
          >
            <img src={teacher} className="h-[30vh]"/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Admin
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px] pl-[1vw] pr-[1vw]"> 
              Tạo lớp cho giáo viên sử dụng (thường là lớp trưởng)
            </div>
          </button>
        </motion.div> }
        </AnimatePresence>
        {/*<AnimatePresence onExitComplete={() => navigate(link)}>
        {!remove && <motion.div 
          key="student"
          className="col-start-2 col-span-4 row-start-2 row-span-4 flex justify-center items-center"
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          exit={{ y: 700 }}
        >
          <button 
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("student")}
          >
            <img src={student} className="h-[30vh]"/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Học sinh
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px]"> 
              Học sinh có thể xem bài tập            
            </div>
          </button>
        </motion.div> }
        {!remove && <motion.div 
          key="teacher"
          className="col-start-5 col-span-4 row-start-2 row-span-4 flex justify-center items-center"
          initial={{ y: 700 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          exit={{ y: -700 }}
        >
          <button 
            className="h-[65vh] w-[25vw] flex flex-col justify-center items-center bg-white rounded-[20px] shadow-xl hover:scale-[1.05]"
            onClick={() => onClick("teacher")}
          >
            <img src={teacher} className="h-[30vh]"/>
            <div className="flex justify-start items-center mt-[2.5vh] font-['consolas'] font-bold text-[25px]">
              Giáo viên
            </div>
            <div className="mt-[1vh] font-['consolas'] text-[20px] pl-[1vw] pr-[1vw]"> 
              Giáo viên có thể xem, thay đổi bài tập và tạo lớp học
            </div>
          </button>
        </motion.div> }
        </AnimatePresence>*/}
      </div>
    );
    /*return (
      <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100">
        <div className="font-['consolas'] font-bold text-[50px]">
          Something is wrong!
        </div>
        <button className="
          h-[10vh] w-[30vw] mt-[10vh] bg-[#FFFBE9] border-[#975C8D] border-2 shadow-xl flex justify-center items-center mt-[5vh]
          font-['consolas'] text-[20px] text-[#975C8D]
          hover:bg-[#863A6F] hover:text-[#FFFBE9] hover:scale-[1.05] hover:text-[20px]
          transition ease-in-out duration-150"
          onClick={() => navigate("/")}
        >
          Return to login page
        </button>
      </div>
    );
  }*/
}
