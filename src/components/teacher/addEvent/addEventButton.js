import React from 'react';
import addEvent from "./add-event.png"

export default function AddEventButton({ render, setRender}) {

    const onClick = () => {
        setRender({
            loading: false,
            calendar: false,
            display: false,
            addEvent: true,
            addGroup: false,
            removeEvent: false,
        })
    }

    return (
        <>
            <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#B8E8FC] flex justify-center items-center hover:translate-x-[1.5vw]"
            onClick={() => onClick()}>
                <img src={addEvent} className="h-[9vh] w-[4vw]"/>
            </button>
        </> 
    );
}