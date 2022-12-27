import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "./arrow.png";

export default function AboutUs() {

    const [remove, setRemove] = useState(false);
    const [link, setLink] = useState("");

    const navigate = useNavigate();

    return (
        <div className="h-screen grid grid-rows-6 grid-cols-6 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
            <AnimatePresence onExitComplete={() => navigate(link)}>
                {!remove && 
                <motion.div 
                    className="row-start-1 row-span-1 col-start-1 col-span-1 flex justify-center items-center"
                    initial={{ x: -500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                    exit={{ x: -500 }}
                >
                    <button className="
                        flex justify-center items-center
                        h-[11vh] w-[5.5vw] border-[#E5BA73] border-2 bg-[#FFFBE9]
                        hover:bg-[#C58940] hover:scale-[1.1] 
                        transition ease-in-out duration-150"
                        onClick={() => { setLink("/"); setRemove(true); }}
                        
                    >
                        <img src={arrow} className="scale-[0.35]"/>
                    </button>
                </motion.div> }
            </AnimatePresence>
            <AnimatePresence>
                {!remove && <motion.div 
                    className="row-start-2 row-span-4 col-start-2 col-span-4 flex justify-center items-center font-['consolas'] text-[22.5px] text-justify"
                    initial={{ x: 1500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                    exit={{ x: 1500 }}
                >
                Web của chúng tôi có nét tương đồng với phần mềm Google Classroom. Nhưng Classroom chỉ hiển thị bài tập dưới dạng liệt kê, nên học sinh khó nắm bắt được bài tập môn nào, nộp ở thời điểm nào khi số lượng bài tập lớn, và tệ nhất là luôn quên hoàn thành bài tập. Web của chúng tôi ở đây sẽ sử dụng Google Calendar API để hiển thị bài tập dưới dạng lịch để bàn, 
                cho học sinh một cái nhìn tổng quát hơn về những bài tập trong ngày, trong tuần.
                Web cũng sẽ có đồng hồ báo thức để nhắc học sinh làm bài. Đồng hồ sẽ được đặt bởi giáo viên và trước khi trễ hạn nộp thì đồng hồ sẽ thông báo đến máy học sinh.
                </motion.div> }
            </AnimatePresence>
        </div>
    );
}