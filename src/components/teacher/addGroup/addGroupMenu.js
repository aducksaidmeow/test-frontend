import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './addGroupMenu.css'

export default function AddGroupMenu({ open, setOpen }) {

    const [groupMember, setGroupMember] = useState([""]);
    const [groupName, setGroupName] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(groupMember);
        console.log(groupName);
        const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/add-group` : '/api/add-group';
        const userId = localStorage.getItem('userId');
        axios.post(url, { userId, groupName, groupMember }).then(response => {
            console.log(response);
        }).catch(error => console.log(error));
    }

    const onChangeName = (e) => {
        //e.preventDefault();
        setGroupName(e.target.value);
    }

    const onChangeMember = (e, index) => {
        //e.preventDefault();
        console.log(e);
        const newGroupMember = [...groupMember];
        newGroupMember[index] = e.target.value;
        setGroupMember(newGroupMember);
    }

    const addMember = () => {
        setGroupMember([...groupMember, ""]);
        console.log(groupMember);
    }

    const removeMember = (index) => {
        const newGroupMember = [...groupMember];
        newGroupMember.splice(index, 1);
        setGroupMember(newGroupMember);
        console.log(groupMember);
    }

    return (
        <div className="add-group-form-container">
            <form onSubmit={(e) => onSubmit(e)}>
                <input className="group-name" type="text" value={groupName} required onChange={(e) => onChangeName(e)} />
                { groupMember.map((value, index) => {
                    return (
                        <div key={index} className="member-container">
                            <input key={index} className="group-member-name" type="text" value={value} required onChange={(e) => onChangeMember(e, index)} />
                            { index > 0 && <div className="remove-member" onClick={() => removeMember(index)}>remove member</div> }
                            { index === groupMember.length - 1 && <div className="add-member" onClick={() => addMember()}>add new member</div> }
                        </div>
                    )
                })}
                <input type="submit" className="add-group-submit" />
            </form>
            <div className="add-group-close-button" onClick={() => setOpen(false)}>x</div>
        </div>
    );
}