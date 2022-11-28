import StudentCalendar from "./calendar/studentCalendar";

export default function TeacherMain() {

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email !== '' && email != null && role === 'student') {
        return (
            <StudentCalendar />
        )
    } else {
        return (
            <div>
                <div>Something is wrong!</div>
            </div>
        );
    }
}