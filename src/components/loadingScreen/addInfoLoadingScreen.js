import React, { useEffect, useState } from "react";
import "./addInfoLoadingScreen.css";

export default function AddInfoLoadingScreen() {
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
    <div className="add-info-loading-screen-container">
      {displayList[index]}
    </div>
  );
}
