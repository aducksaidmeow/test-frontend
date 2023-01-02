import { useState } from "react";
import RemoveEventButton from "./removeEvent/removeEventButton";
import RemoveEventMenu from "./removeEvent/removeEventMenu";
import InstructionButton from "./instruction/instructionButton";
import InstructionMenu from "./instruction/instructionMenu";
import AdminCalendar from "./calendar/adminCalendar";
import DisplayEvent from "./displayEvent/displayEvent";
import LoadingScreen from "./loadingScreen/loadingScreen";
import AddGroupButton from "./addGroup/addGroupButton";
import AddGroupMenu from "./addGroup/addGroupMenu";

export default function AdminMain() {

    const [render, setRender] = useState({
        loading: false,
        calendar: true,
        display: false,
        removeEvent: false,
        instruction: false,
        addGroup: false,
    })

    const [display, setDisplay] = useState({});

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email !== '' && email != null && role === 'admin') {
        return (
            <div className="h-screen grid grid-cols-16 bg-gradient-to-l from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto overflow-x-auto scrollbar-hide">
                <div className="flex flex-col items-center pt-[10vh] gap-[1vh]">
                    {/*<RemoveEventButton render={render} setRender={setRender} />*/}
                    <AddGroupButton render={render} setRender={setRender} />
                    {/*<InstructionButton render={render} setRender={setRender} />*/}
                </div>
                <div className="col-start-2 col-span-15 flex justify-center items-center">
                    {render.calendar && 
                        <AdminCalendar render={render} setRender={setRender} display={display} setDisplay={setDisplay}/>
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
                    {render.addGroup && 
                        <AddGroupMenu render={render} setRender={setRender} />
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