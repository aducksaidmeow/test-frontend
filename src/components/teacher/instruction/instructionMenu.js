import React from "react";

export default function InstructionMenu({ render, setRender }) {

    const onClick = () => {
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.calendar = true;
        setRender(newRender);
    }

    return (
        <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF]">
            <div className="h-[75vh] w-[75vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center pt-[1vh]">
                <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClick()}>X</button>
                <div className="flex flex-col items-center gap-[2vh] font-['consolas'] text-[25px]">
                    <div className="w-[70vw] bg-[#F3C5C5] rounded-md pl-[1vw] hover:scale-[1.025]">
                        Tạo lớp: nhấp vào biểu tưởng tạo nhóm (màu hồng). Thêm tên lớp và gmail các thành viên
                    </div>
                    <div className="w-[70vw] bg-[#B8E8FC] rounded-md pl-[1vw] hover:scale-[1.025]">
                        Thêm bài tập: nhấp vào biểu tưởng thêm bài tập (màu xanh). Đặt tên bài tập và điền các ô theo hướng dẫn trên từng thanh
                    </div>
                    <div className="w-[70vw] bg-[#A4BE7B] rounded-md pl-[1vw] hover:scale-[1.025]">
                        Xem thông tin bài tập: nhấp vào bài tập tương ứng ở trên lịch
                    </div>
                    <div className="w-[70vw] bg-[#E97777] rounded-md pl-[1vw] hover:scale-[1.025]">
                        Xóa bài tập: nhấp vào biểu tưởng xóa bài tập (màu đỏ). Nhập ID của bài tập cần xóa (ID có trên thông tin bài tập)
                    </div>
                    <div className="w-[70vw] bg-[#DEBACE] rounded-md pl-[1vw] hover:scale-[1.025]">
                        Xem danh sách thành viên lớp: nhấp vào biểu tưởng xem lớp (màu tím). Nhấp vào từng lớp để xem thành viên
                    </div>
                </div>
            </div>
        </div>
    );
}