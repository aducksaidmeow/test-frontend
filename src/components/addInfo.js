import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import student from "./student.jpg";
import teacher from "./teacher.jpg";

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

  if (loading) {
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
  }
}
