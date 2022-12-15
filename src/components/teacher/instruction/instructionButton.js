import React from 'react';
import Tippy from '@tippyjs/react';
import question from "./question-mark.png"
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';

/*export default function AddGroupButton({ render, setRender}) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.addGroup = true;
        setRender(newRender);
    }

    return (
        <>
            <Tippy content="Create a new class" placement="right" animation="scale-extreme">
                <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#F3C5C5] flex justify-center items-center hover:translate-x-[1.5vw]"
                onClick={() => onClick()}>
                    <img src={addGroup} className="h-[9vh] w-[4vw]"/>
                </button>
            </Tippy>
        </> 
    );
}*/

export default function InstructionButton({ render, setRender }) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.instruction = true;
        setRender(newRender);
    }

    return (
        <>
            <Tippy content="Instruction" placement="right" animation="scale-extreme">
                <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#8B7E74] flex justify-center items-center hover:translate-x-[1.5vw]" 
                onClick={() => onClick()}>
                    <img src={question} className="h-[7.5vh]"/>
                </button>
            </Tippy>
        </>
    )
}