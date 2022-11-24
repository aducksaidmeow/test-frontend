import React, { useEffect, useState } from "react";
import "./loginLoadingScreen.css";

export default function LoginloadingScreen() {
  const [index, setIndex] = useState(0);
  const displayList = ["Loading.", "Loading..", "Loading..."];

  useEffect(() => {
    const currentInterval = setInterval(() => {
      setIndex((index) => (index + 1) % 3);
    }, 1000);
    return () => {
      clearInterval(currentInterval);
    };
  }, []);

  return (
    <div className="login-loading-screen-container">{displayList[index]}</div>
  );
}
