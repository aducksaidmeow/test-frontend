import React from "react";
import { formatDate } from "@fullcalendar/react";

export default function DisplayEvent({ open, setOpen, content, setContent }) {
    return (
        <div className="h-[75vh] w-[50vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center flex-col gap-[2.5vh]">
            <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => setOpen(false)}>X</button>
            <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{content.title}</div>
            <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{content.description}</div>
            <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{content.group}</div>
            <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{formatDate(content.startTime, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            })}</div>
            <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{content.endTime === null ? formatDate(content.startTime, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }) : formatDate(content.endTime, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            })}</div>
            <div className="h-[7.5vh] w-[35vw] bg-[#F9F9F9] rounded-md flex justify-center items-center">{content.id}</div>
        </div>
    );
}