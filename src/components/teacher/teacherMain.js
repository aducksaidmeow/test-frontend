import React, { useState } from "react";
import TeacherCalendar from "./calendar/teacherCalendar";
import AddEventButton from "./addEvent/addEventButton";
import AddGroupButton from "./addGroup/addGroupButton";
import RemoveEventButton from "./removeEvent/removeEventButton";
import DisplayEvent from "./displayEvent/displayEvent"
import AddEventMenu from "./addEvent/addEventMenu";
import AddGroupMenu from "./addGroup/addGroupMenu"
import RemoveEventMenu from "./removeEvent/removeEventMenu";
import LoadingScreen from "./loadingScreen/loadingScreen";
import DisplayGroupButton from "./displayGroup/displayGroupButton";
import DisplayGroupMenu from "./displayGroup/displayGroupMenu";

export default function TeacherMain() {

    const [render, setRender] = useState({
        loading: false,
        calendar: true,
        display: false,
        addEvent: false,
        addGroup: false,
        removeEvent: false,
        displayGroup: false,
    })

    const [display, setDisplay] = useState({});

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email !== '' && email != null && role === 'teacher') {
        return (
            <div className="h-screen grid grid-cols-16 bg-[#F0EBE3]">
                <div className="flex flex-col items-center pt-[10vh] gap-[1vh]">
                    <AddGroupButton render={render} setRender={setRender} />
                    <AddEventButton render={render} setRender={setRender} />
                    <RemoveEventButton render={render} setRender={setRender}/>
                    <DisplayGroupButton render={render} setRender={setRender} />
                </div>
                <div className="col-start-2 col-span-15 flex justify-center items-center">
                    {render.calendar && 
                        <TeacherCalendar render={render} setRender={setRender} display={display} setDisplay={setDisplay}/>
                    }
                    {render.display && 
                        <DisplayEvent render={render} setRender={setRender} display={display} setDisplay={setDisplay}/>
                    }
                    {render.addEvent &&
                        <AddEventMenu render={render} setRender={setRender} />
                    }
                    {render.addGroup && 
                        <AddGroupMenu render={render} setRender={setRender} />
                    }
                    {render.removeEvent &&
                        <RemoveEventMenu render={render} setRender={setRender} />
                    }
                    {render.loading && 
                        <LoadingScreen />
                    }
                    {render.displayGroup && 
                        <DisplayGroupMenu render={render} setRender={setRender} />
                    }
                </div>
            </div>
        );
    }

}