import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email != '' && email != null && role === '') {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <select { ...register("role") } >
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                </select>
                <input type="submit" />
            </form>
        )
    } else {
        return (
            <div>
                <div>Something is wrong!</div>
            </div>
        )
    }

}