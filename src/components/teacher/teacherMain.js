import TeacherCalendar from "./teacherCalendar";

export default function TeacherMain() {

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email != '' && email != null && role === 'teacher') {
        return (
            <div>
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