import React from "react";
import { useState } from "react";
import axios from "axios";

export default function AddGroupMenu({ render, setRender}) {
  const [groupMember, setGroupMember] = useState([""]);
  const [groupName, setGroupName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-group` : "/api/add-group";
    const userId = localStorage.getItem("userId");
    axios.post(url, { userId, groupName, groupMember }).then((response) => {
      
    }).catch((error) => console.log(error));
  };

  const onChangeName = (e) => {
    //e.preventDefault();
    setGroupName(e.target.value);
  };

  const onChangeMember = (e, index) => {
    //e.preventDefault();
    const newGroupMember = [...groupMember];
    newGroupMember[index] = e.target.value;
    setGroupMember(newGroupMember);
  };

  const addMember = (index) => {
    if (index <= 50) {
      setGroupMember([...groupMember, ""]);
    }
  };

  const removeMember = (index) => {
    if (index > 0) {
      const newGroupMember = [...groupMember];
      newGroupMember.splice(index, 1);
      setGroupMember(newGroupMember);
    }
  };

  /*return (
    <div className="add-group-form-container">
      {!loading && (
        <div className="add-group-close-button" onClick={() => setOpen(false)}>
          x
        </div>
      )}
      {!loading && (
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            className="group-name"
            type="text"
            value={groupName}
            placeholder="Enter group name"
            required
            onChange={(e) => onChangeName(e)}
          />
          {groupMember.map((value, index) => {
            return (
              <div key={index} className="member-container">
                <input
                  key={index}
                  className="group-member-name"
                  type="text"
                  value={value}
                  placeholder="Enter member email"
                  required
                  onChange={(e) => onChangeMember(e, index)}
                />
                {index > 0 && (
                  <div
                    className="remove-member"
                    onClick={() => removeMember(index)}
                  >
                    remove member
                  </div>
                )}
                {index === groupMember.length - 1 && (
                  <div className="add-member" onClick={() => addMember()}>
                    add new member
                  </div>
                )}
              </div>
            );
          })}
          <input type="submit" className="add-group-submit" />
        </form>
      )}
      {loading && <LoadingScreen />}
    </div>
  );*/

  const onClick = () => {
    setRender({
      loading: false,
      calendar: true,
      display: false,
      addEvent: false,
      addGroup: false,
      removeEvent: false,
    })
  }

  return (
    <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#EEEEEE]">
      <div className="h-[75vh] w-[50vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-start pt-[5vh]">
        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClick()}>X</button>
        <form className="flex justify-center items-center flex-col gap-[3vh]" onSubmit={(e) => onSubmit(e)}>
          <input
              className="h-[7vh] w-[20vw] rounded-md"
              type="text"
              value={groupName}
              placeholder="Enter group name"
              required
              onChange={(e) => onChangeName(e)}
          />
          {groupMember.map((value, index) => {
            return (
              <>
                <input
                  key={index} 
                  className="h-[7vh] w-[20vw] rounded-md"
                  type="text"
                  placeholder="Enter member email"
                  required
                  onChange={(e) => onChangeMember(e, index)}
                />
                {index === groupMember.length - 1 && 
                  <div key={index} className="h-[7vh] w-[30vw] grid grid-cols-2 gap-x-[1vw]">
                    <button className="rounded-lg bg-[#182747]" onClick={() => addMember(index)}>Add new member</button>
                    <button className="rounded-lg bg-[#6D8B74]" onClick={() => removeMember(index)}>Remove latest member</button>
                  </div>
                }
              </>
            );
          })}
          <input className="h-[7vh] w-[15vw] rounded-md bg-[#829460]" type="submit"/>
        </form>
      </div>
    </div>
  );

}