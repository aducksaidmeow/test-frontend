import { useState } from "react";
import RemoveEventButton from "./removeEvent/removeEventButton";
import RemoveEventMenu from "./removeEvent/removeEventMenu";
import InstructionButton from "./instruction/instructionButton";
import InstructionMenu from "./instruction/instructionMenu";
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
            <div className="h-screen grid grid-cols-16 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100">
                <div className="flex flex-col items-center pt-[10vh] gap-[1vh]">
                    <RemoveEventButton render={render} setRender={setRender} />
                    <InstructionButton render={render} setRender={setRender} />
                </div>
                <div className="col-start-2 col-span-15 flex justify-center items-center">
                    {render.calendar && 
                        <StudentCalendar render={render} setRender={setRender} display={display} setDisplay={setDisplay}/>
                    }
                    {render.display && 
                        <DisplayEvent render={render} setRender={setRender} display={display} setDisplay={setDisplay} />
                    }
                    {render.loading && 
                        <LoadingScreen />
                    }
                    {render.removeEvent && 
                        <RemoveEventMenu render={render} setRender={setRender} />
                    }
                    {render.instruction && 
                        <InstructionMenu render={render} setRender={setRender} />
                    }
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