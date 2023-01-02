import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DisplayGroupMenu({ render, setRender }) {

    const [displayGroup, setDisplayGroup] = useState({});
    const [displayMemberName, setDisplayMemberName] = useState([]);

    useEffect(() => {
        const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-all-group` : "/api/get-all-group";
        const userId = localStorage.getItem("userId");
        axios.post(url, { userId }).then(response => {
            setDisplayGroup(response.data);
        }).catch(error => console.log(error.message));
    }, [])

    const exitGroup = () => {
        setDisplayMemberName([]);
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.calendar = true;
        setRender(newRender);
    }

    const exitMember = () => { 
        setDisplayMemberName([]);
    }

    const onClickMember = (member) => {
        setDisplayMemberName(member);
    }

    return (
        <div className="h-[90vh] w-[90vw] grid grid-cols-2 font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF]">
            <div className="flex justify-center items-center">
                <div className="h-[75vh] w-[40vw] bg-[#CCD1E4] rounded-lg flex justify-center items-start relative overflow-y-auto scrollbar-hide">
                    <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => exitGroup()}>X</button>
                    <div className="flex flex-col gap-[2.5vh] mt-[5vh]">
                        {Object.entries(displayGroup).map((member, index) => {
                            return (
                                <button 
                                    className="h-[7.5vh] w-[30vw] bg-[#F9F9F9] rounded-md text-[20px]" 
                                    key={index}
                                    onClick={() => onClickMember(member[1].memberName)}
                                >
                                    {member[0]}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
            {displayMemberName.length > 0 &&
                <div className="flex justify-start items-center">
                    <div className="h-[75vh] w-[42.5vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-start overflow-y-auto scrollbar-hide">
                        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => exitMember()}>X</button>
                        <div className="flex flex-col gap-[2.5vh] mt-[5vh]">
                            {displayMemberName.map((value, index) => {
                                return (
                                    <div 
                                        className="h-[7.5vh] w-[30vw] bg-[#F9F9F9] rounded-md text-[20px] flex justify-center items-center" 
                                        key={index}
                                    >
                                        {value}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}