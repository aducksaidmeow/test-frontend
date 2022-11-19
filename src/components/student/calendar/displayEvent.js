import React from "react";
import { formatDate } from "@fullcalendar/react";
import './displayEvent.css'

export default function DisplayEvent({ open, setOpen, content, setContent }) {

    return(
        <div className="student-display-event-container">
            <div className="student-display-event-close-button" onClick={() => setOpen(false)}>x</div>
            <div className="student-display-event-title">{content.title}</div>
            <div className="student-display-event-description">{content.description}</div>
            <div className="student-display-event-group">{content.group}</div>
            <div className="student-display-event-start-time">{formatDate(content.startTime, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            })}</div>
            <div className="student-display-event-end-time">{content.endTime === null ? formatDate(content.startTime, {
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
            <div className="student-display-event-id">{content.id}</div>
        </div>
    );
}