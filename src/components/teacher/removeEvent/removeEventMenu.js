import React, { useState } from "react";
import axios from "axios";
import './removeEventMenu.css'

export default function RemoveEventMenu({ open, setOpen }) {

    const [eventId, setEventId] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/remove-event` : '/api/remove-event';
        const userId = localStorage.getItem('userId');
        axios.post(url, { userId, eventId}).then(response => {
            console.log(response.data);
        }).catch(error => console.log(error.message));
    }

    const onChange = (e) => {
        setEventId(e.target.value);
    }

    return (
        <div className="remove-event-form-container">
            <div className="remove-event-close-button" onClick={() => setOpen(false)}>x</div>
            <form onSubmit={(e) => onSubmit(e)}>
                <input className="event-id" type="text" placeholder="Enter event ID" required onChange={(e) => onChange(e)}/>
                <input className="remove-event-submit-button" type="submit" />
            </form>
        </div>
    );
}