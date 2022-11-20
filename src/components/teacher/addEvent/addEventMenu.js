import axios from "axios";
import React, { useState } from "react";
import './addEventMenu.css'

export default function AddEventMenu({ open, setOpen }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [group, setGroup] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/add-event` : '/api/add-event';
        const userId = localStorage.getItem('userId');
        axios.post(url, { userId, title, description, group, startTime, endTime }).then(response => {
            console.log(response);
        }).catch(error => console.log(error));
    }

    const onChange = (e, value, setValue) => {
        e.preventDefault();
        setValue(e.target.value);
        console.log(value);
    }

    return (
        <div className="add-event-form-container">
            <div className="add-event-close-button" onClick={() => setOpen(false)}>x</div>
            <form onSubmit={(e) => onSubmit(e)}>
                <input className="add-event-title" type="text" placeholder="Event title" onChange={(e) => onChange(e, title, setTitle)} required />
                <input className="add-event-description" type="text" placeholder="Event description" onChange={(e) => onChange(e, description, setDescription)} required />
                <input className="add-event-group" type="text" placeholder="Group name" onChange={(e) => onChange(e, group, setGroup)} required />
                <input className="add-event-start-time" type="datetime-local" onChange={(e) => onChange(e, startTime, setStartTime)} required />
                <input className="add-event-end-time" type="datetime-local" onChange={(e) => onChange(e, endTime, setEndTime)} required />
                <input className="add-event-submit" type="submit" required />
            </form>
        </div>
    );
}