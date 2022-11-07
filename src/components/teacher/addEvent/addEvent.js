import axios from "axios";
import React from "react";
import { useForm } from 'react-hook-form';

export default function AddEvent() {

    const { register, handleSubmit, formState: { errors } } = useForm({});

    const onSubmit = data => {
        console.log(data);
        const { title, description, group, startDatetime, endDatetime } = data;
        const userId = localStorage.getItem('userId');
        axios.post('/api/add-event', { userId, title, description, group, startDatetime, endDatetime }).then(response => {
            console.log(response.data);
        }).catch(error => console.log(error.message));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} />
            { errors.title && <div>title is required</div> }

            <input type="text" {...register("description", { required: true })} />
            { errors.description && <div>description is required</div> }

            <input type="text" {...register("group", { required: true })} />
            { errors.group && <div>group is required</div> }  

            <input type="datetime-local" {...register("startDatetime", { required: true })} />
            { errors.startDatetime && <div>Starting datetime is required</div>}

            <input type="datetime-local" {...register("endDatetime", { required: true })} />
            { errors.endDatetime && <div>Ending datetime is required</div> } 
            
            <input type="submit" />
        </form>
    );
}