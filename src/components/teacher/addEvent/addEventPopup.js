import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddEvent from './addEvent';

export default function AddEventPopup() {
    return (
        <Popup trigger={<button>Add an event</button>} position="bottom center">
            <AddEvent />
        </Popup>
    );
}