import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addInfo.css'

export default function AddInfo() {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        const role = data.role;
        localStorage.setItem('role', role);
        const userId = localStorage.getItem('userId');
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/add-role` : '/api/add-role';
        axios.post(url, { userId, role }).then(response => {
            console.log(response.data);
            if (role === 'student') navigate('/student-calendar');
            else if (role === 'teacher') navigate('/teacher-calendar');
        }).catch(error => console.log(error.message));
    };

    const onClick = (role) => {
        console.log(role);
        localStorage.setItem('role', role);
        const userId = localStorage.getItem('userId');
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/add-role` : '/api/add-role';
        axios.post(url, { userId, role }).then(response => {
            console.log(response.data);
            if (role === 'student') navigate('/student-calendar');
            else if (role === 'teacher') navigate('/teacher-calendar');
        }).catch(error => console.log(error.message));
    }

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email != '' && email != null && role === '') {
        return (
            <div className="add-info-container">
                <h1 className="role-title">Choose a role to continue</h1>
                <button className="student" onClick={() => onClick("student")}>Student</button>
                <button className="teacher" onClick={() => onClick("teacher")}>Teacher</button> 
            </div>
        )
    } else {
        return (
            <div>
                <div>Something is wrong!</div>
            </div>
        )
    }

}