import React from 'react';
import removeEvent from "./remove-event.png"

export default function RemoveEventButton({ render, setRender}) {

    const onClick = () => {
        setRender({
            loading: false,
            calendar: false,
            display: false,
            addEvent: false,
            addGroup: false,
            removeEvent: true,
        })
    }

    return (
        <>
            <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#E97777] flex justify-center items-center hover:translate-x-[1.5vw]"
            onClick={() => onClick()}>
                <img src={removeEvent} className="h-[9vh] w-[4vw]"/>
            </button>
        </> 
    );
}