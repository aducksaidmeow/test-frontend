import React, { useState } from 'react';
import AddEventMenu from './addEventMenu';
import './addEventButton.css'

export default function AddEventButton() {

    const [open, setOpen] = useState(false);

    return (
        <div className="add-event-container">
            <button className="event-menu-button" onClick={() => setOpen(true)} />
            { open && <AddEventMenu open={open} setOpen={setOpen} /> }
        </div>
    );
}