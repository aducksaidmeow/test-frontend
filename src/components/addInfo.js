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
            <div>
                It worked!
            </div>
        )
    } else {
        return (
            <div>
                It didn't worked!
            </div>
        )
    }

}