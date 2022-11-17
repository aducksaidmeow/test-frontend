import React, { useState } from 'react';
import AddGroupMenu from './addGroupMenu'
import './addGroupButton.css'

export default function AddGroupButton() {

    const [open, setOpen] = useState(false);

    return (
        <div className="add-group-container">
            <button className="group-menu-button" onClick={() => setOpen(true)} />
            { open && <AddGroupMenu open={open} setOpen={setOpen} /> }
        </div>  
    );
}