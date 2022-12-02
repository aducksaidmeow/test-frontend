import React from 'react';
import addEvent from "./add-event.png"

export default function AddEventButton({ render, setRender}) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.addEvent = true;
        setRender(newRender);
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