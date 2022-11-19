import TeacherCalendar from "./calendar/teacherCalendar";
import AddEventButton from "./addEvent/addEventButton";
import AddGroupButton from "./addGroup/addGroupButton";
import RemoveEventButton from "./removeEvent/removeEventButton";

export default function TeacherMain() {

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email != '' && email != null && role === 'teacher') {
        return (
            <div>
                <AddGroupButton />
                <AddEventButton />
                <RemoveEventButton />
                <TeacherCalendar />
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