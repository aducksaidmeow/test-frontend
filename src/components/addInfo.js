import { useForm } from 'react-hook-form'

export default function AddInfo() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');

    if (email != '' && role === '') {
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