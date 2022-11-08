import TeacherCalendar from "./teacherCalendar";
import AddEventPopup from "./addEvent/addEventPopup";
import AddGroupPopup from "./addGroup/addGroupPopup";

export default function TeacherMain() {

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email != '' && email != null && role === 'teacher') {
        return (
            <div>
                {/*<AddGroupPopup />*/}
                {/*<AddEventPopup />*/}
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