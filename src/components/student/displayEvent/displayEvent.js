import React from "react";
import { formatDate } from "@fullcalendar/react";

export default function DisplayEvent({ render, setRender, display, setDisplay}) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.calendar = true;
        setRender(newRender);
    }

    return (
        <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#EEEEEE]">
            <div className="h-[75vh] w-[50vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center flex-col gap-[2.5vh]">
                <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClick()}>X</button>
                <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{display.title}</div>
                <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{display.description}</div>
                <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{display.group}</div>
                <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{formatDate(display.startTime, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                })}</div>
                <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{display.endTime === null ? formatDate(display.startTime, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }) : formatDate(display.endTime, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    weekday: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                })}</div>
                <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{display.id}</div>
            </div>
        </div>
    );
}