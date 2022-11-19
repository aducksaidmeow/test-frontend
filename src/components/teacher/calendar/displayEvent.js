import React from "react";
import { formatDate } from "@fullcalendar/react";
import './displayEvent.css'

export default function DisplayEvent({ open, setOpen, content, setContent }) {

    return(
        <div className="teacher-display-event-container">
            <div className="teacher-display-event-close-button" onClick={() => setOpen(false)}>x</div>
            <div className="teacher-display-event-title">{content.title}</div>
            <div className="teacher-display-event-description">{content.description}</div>
            <div className="teacher-display-event-group">{content.group}</div>
            <div className="teacher-display-event-start-time">{formatDate(content.startTime, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            })}</div>
            <div className="teacher-display-event-end-time">{content.endTime === null ? formatDate(content.startTime, {
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
            <div className="teacher-display-event-id">{content.id}</div>
        </div>
    );
}