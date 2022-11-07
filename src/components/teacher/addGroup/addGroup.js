import axios from 'axios';
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form'

export default function AddGroup() {
    
    const { register, handleSubmit, control, formState: { errors } } = useForm({});

    const { fields, append, remove } = useFieldArray({
        name: 'GroupMember',
        control,
    });

    const onSubmit = data => {
        const userId = localStorage.getItem('userId');
        const groupName = data.GroupName;
        const groupMember = [];
        data.GroupMember.map((value, index) => {
            groupMember.push(value.gmail);
        });
        axios.post('/api/add-group', { userId, groupName, groupMember }).then(response => {
            console.log(response.data);
        }).catch(error => console.log(error.message));
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } >
            <ul>
                <input {...register('GroupName', { required: true })} />
                {errors.GroupName && <div>Group name is required</div>}
                {fields.map((item, index) => (
                    <li key={ item.id }>
                        <input key={ item.id } {...register(`GroupMember.${index}.gmail`, { required: true })} />
                        <button type="button" onClick={ () => remove(index) }>Delete</button> 
                    </li>
                ))}
            </ul>
            <button type="button" onClick={ () => append({ gmail: '' }) }>Append</button>
            <input type="submit" />
        </form>
    )
}