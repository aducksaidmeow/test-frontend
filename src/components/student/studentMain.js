import { useState } from "react";
import StudentCalendar from "./calendar/studentCalendar";
import DisplayEvent from "./displayEvent/displayEvent";
import LoadingScreen from "./loadingScreen/loadingScreen";

export default function TeacherMain() {

    const [render, setRender] = useState({
        loading: false,
        calendar: true,
        display: false,
        removeEvent: false,
        instruction: false,
    })

    const [display, setDisplay] = useState({});

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email !== '' && email != null && role === 'student') {
        return (
            <div className="h-screen grid grid-cols-16 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
                {/*<div className="flex flex-col items-center pt-[10vh] gap-[1vh]">
                    <RemoveEventButton render={render} setRender={setRender} />
                    <InstructionButton render={render} setRender={setRender} />
                </div>*/}
                <div className="col-start-1 col-span-16 flex justify-start items-center flex-col gap-[1vh] m-[1vh], pt-[5vh]">
                    {/*<button 
                        className="font-Philosopher-Regular text-[25px]" 
                        onClick={() => {
                            const newRender = {...render};
                            for(const value in newRender) newRender[value] = false;
                            newRender.calendar = true;
                            setRender(newRender);
                        }}
                    >Lịch bài tập</button>*/}
                    {render.calendar && 
                        <StudentCalendar render={render} setRender={setRender} display={display} setDisplay={setDisplay}/>
                    }
                    {render.display && 
                        <DisplayEvent render={render} setRender={setRender} display={display} setDisplay={setDisplay} />
                    }
                    {render.loading && 
                        <LoadingScreen />
                    }
                    {/*{render.removeEvent && 
                        <RemoveEventMenu render={render} setRender={setRender} />
                    }*/}
                    {/*{render.instruction && 
                        <InstructionMenu render={render} setRender={setRender} />
                    }*/}
                </div> 
            </div>
        )
    } else {
        return (
            <div>
                <div>Something is wrong!</div>
            </div>
        );
    }
}