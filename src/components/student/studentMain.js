import { useState } from "react";
import StudentCalendar from "./calendar/studentCalendar";
import DisplayEvent from "./displayEvent/displayEvent";
import LoadingScreen from "./loadingScreen/loadingScreen";

export default function TeacherMain() {

    const [render, setRender] = useState({
        loading: false,
        calendar: true,
        display: false,
    })

    const [display, setDisplay] = useState({});

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email !== '' && email != null && role === 'student') {
        return (
            <div className="h-screen bg-[#F0EBE3] flex justify-center items-center">
                {render.calendar && 
                    <StudentCalendar render={render} setRender={setRender} display={display} setDisplay={setDisplay}/>
                }
                {render.display && 
                    <DisplayEvent render={render} setRender={setRender} display={display} setDisplay={setDisplay} />
                }
                {render.loading && 
                    <LoadingScreen />
                }
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