import React from 'react';
import addGroup from "./add-group.png"
import Tippy from '@tippyjs/react';
import { motion, AnimatePresence } from "framer-motion";
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-extreme.css';

export default function AddGroupButton({ render, setRender}) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.addGroup = true;
        setRender(newRender);
    }

    return (
        <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
        >
            <Tippy content="Tạo lớp" placement="right" animation="scale-extreme">
                <button className="h-[11.5vh] w-[5.5vw] rounded-md bg-[#F3C5C5] flex justify-center items-center hover:translate-x-[1.5vw]"
                onClick={() => onClick()}>
                    <img src={addGroup} className="h-[9vh] w-[4vw]"/>
                </button>
            </Tippy>
        </motion.div> 
    );
}