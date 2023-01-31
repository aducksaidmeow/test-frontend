import React, { useState, useEffect } from "react";

export default function LoadingScreen() {

    const [index, setIndex] = useState(0);
    const loadingDisplay = ["Loading.", "Loading..", "Loading..."];

    useEffect(() => {
        const currentInterval = setInterval(() => setIndex((index) => (index + 1) % 3), 1000);
        return () => clearInterval(currentInterval);
    }, []);


    return (
        <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] text-[40px] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF] rounded-lg">
            {loadingDisplay[index]}
        </div>
    );
}