import React, { useState } from 'react';
import addEvent from "./add-event.png"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';

export default function AddEventButton({ render, setRender}) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.addEvent = true;
        setRender(newRender);
    }

    return (
        <>
            <Tippy content="Add new homeworks" placement="right" animation="scale-extreme">
                <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#B8E8FC] flex justify-center items-center hover:translate-x-[1.5vw]"
                    onClick={() => onClick()}
                >
                    <img src={addEvent} className="h-[9vh] w-[4vw]"/>
                </button>
            </Tippy>
        </> 
    );
}