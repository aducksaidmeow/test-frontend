import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addInfo.css";
import AddInfoLoadingScreen from "./loadingScreen/addInfoLoadingScreen";

export default function AddInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onClick = (role) => {
    console.log(role);
    localStorage.setItem("role", role);
    setLoading(true);
    const userId = localStorage.getItem("userId");
    const url =
      process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_URL}/api/add-role`
        : "/api/add-role";
    axios
      .post(url, { userId, role })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        if (role === "student") navigate("/student-calendar");
        else if (role === "teacher") navigate("/teacher-calendar");
      })
      .catch((error) => console.log(error.message));
  };

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  if (loading) {
    return <AddInfoLoadingScreen />;
  } else if (email !== "" && email != null && role === "") {
    return (
      <div className="add-info-background">
        {!loading && (
          <div className="add-info-container">
            <h1 className="role-title">Choose a role to continue</h1>
            <button className="student" onClick={() => onClick("student")}>
              Student
            </button>
            <button className="teacher" onClick={() => onClick("teacher")}>
              Teacher
            </button>
          </div>
        )}
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
