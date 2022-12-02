import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayGroupMenu({ render, setRender }) {

    const [displayGroup, setDisplayGroup] = useState({});
    const [displayMember, setDisplayMember] = useState([]);

    useEffect(() => {
        const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-group` : "/api/get-group";
        const userId = localStorage.getItem("userId");
        axios.post(url, { userId }).then(response => {
            setDisplayGroup(response.data);
        }).catch(error => console.log(error.message));
    }, [])

    const exitGroup = () => {
        setDisplayMember([]);
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.calendar = true;
        setRender(newRender);
    }

    const exitMember = () => { 
        setDisplayMember([]);
    }

    const onClickMember = (member) => {
        setDisplayMember(member);
    }

    return (
        <div className="h-[90vh] w-[90vw] grid grid-cols-2 font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#EEEEEE]">
            <div className="flex justify-center items-center">
                <div className="h-[75vh] w-[40vw] bg-[#CCD1E4] rounded-lg flex justify-center items-center flex-col gap-[2.5vh] relative overflow-y-auto scrollbar-hide">
                    <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => exitGroup()}>X</button>
                    {Object.entries(displayGroup).map((member, index) => {
                        return (
                            <button 
                                className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md text-[20px]" 
                                key={index}
                                onClick={() => onClickMember(member[1])}
                            >
                                {member[0]}
                            </button>
                        )
                    })}
                </div>
            </div>
            {displayMember.length > 0 &&
                <div className="flex justify-start items-center">
                    <div className="h-[75vh] w-[42.5vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center flex-col gap-[2.5vh] overflow-y-auto scrollbar-hide">
                        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => exitMember()}>X</button>
                        {displayMember.map((value, index) => {
                            return (
                                <div 
                                    className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md text-[20px] flex justify-center items-center" 
                                    key={index}
                                >
                                    {value}
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}