import React from 'react';
import Tippy from '@tippyjs/react';
import question from "./question-mark.png"
import { motion, AnimatePresence } from "framer-motion";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';

export default function InstructionButton({ render, setRender }) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.instruction = true;
        setRender(newRender);
    }

    return (
        <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5 }}
        >
            <Tippy content="Hướng dẫn sử dụng" placement="right" animation="scale-extreme">
                <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#8B7E74] flex justify-center items-center hover:translate-x-[1.5vw]" 
                onClick={() => onClick()}>
                    <img src={question} className="h-[7.5vh]"/>
                </button>
            </Tippy>
        </motion.div>
    )
}