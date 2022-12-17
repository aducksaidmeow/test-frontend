import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "./arrow.png"
import student from "./student.png"
import teacher from "./teacher.png"

export default function AddInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onClick = (role) => {
    localStorage.setItem("role", role);
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-role` : "/api/add-role";
    axios.post(url, { userId, role }).then((response) => {
      setLoading(false);
      if (role === "student") navigate("/student-calendar");
      else if (role === "teacher") navigate("/teacher-calendar");
    }).catch((error) => console.log(error.message));
  };

  const [index, setIndex] = useState(0);
  const loadingDisplay = ["Loading.", "Loading..", "Loading..."];

  useEffect(() => {
    const currentInterval = setInterval(() => setIndex((index) => (index + 1) % 3), 1000);
    return () => clearInterval(currentInterval);
  }, []);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  /*if (loading) {
    return  (
      <div className="h-screen flex justify-center items-center bg-[#F0EBE3]">
        <div className="h-[80vh] w-[60vw] bg-[#E4DCCF] shadow-2xl grid grid-rows-1 grid-cols-2">
          <div className="flex justify-center items-center row-span-2 col-span-3 font-['consolas'] text-[40px]">
            {loadingDisplay[index]}
          </div>
        </div>  
      </div>
    );
  } else if (email !== "" && email != null && role === "") {
    return (
      <div className="h-screen flex justify-center items-center bg-[#F0EBE3]">
        <div className="h-[80vh] w-[60vw] bg-[#E4DCCF] shadow-2xl grid grid-rows-1 grid-cols-2">
          {!loading && (
          <>
            <div className="flex justify-center items-center">
              <button className="bg-[#7D9D9C] h-[10vh] w-[20vw] font-['consolas'] text-[30px] rounded-md hover:scale-[1.05]" onClick={() => onClick("student")}>
                Student
              </button>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-[#7D9D9C] h-[10vh] w-[20vw] font-['consolas'] text-[30px] rounded-md hover:scale-[1.05]" onClick={() => onClick("teacher")}>
                Teacher
              </button>
            </div>
          </> )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Something is wrong!</div>
      </div>
    );
  }*/
  if (email !== "" && email != null && role === "") {
    return (
      <div className="h-screen grid grid-rows-6 grid-cols-9 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100">
        <div className="col-start-2 col-span-4 row-start-2 row-span-4 flex justify-center items-center">
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
        </div>
        <div className="col-start-5 col-span-4 row-start-2 row-span-4 flex justify-center items-center">
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
        </div>
      </div>
    );
  } else {
    return (
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
  }
}
