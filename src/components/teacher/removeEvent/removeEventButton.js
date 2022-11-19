import React, { useState } from "react";
import RemoveEventMenu from "./removeEventMenu";
import './removeEventButton.css'

export default function RemoveEventButton() {

    const [open, setOpen] = useState(false);

    return (
        <div className="remove-event-container">
            <div className="remove-event-menu-button" onClick={() => setOpen(true)}/>
            { open && <RemoveEventMenu open={open} setOpen={setOpen}/> }
        </div>
    );
}