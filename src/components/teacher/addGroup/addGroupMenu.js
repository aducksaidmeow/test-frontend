import React from "react";
import { useState } from "react";
import axios from "axios";
import cross from "./cross.png"
import plus from "./plus.png"

export default function AddGroupMenu({ render, setRender}) {
  const [groupMemberEmail, setGroupMemberEmail] = useState([""]);
  const [groupMemberName, setGroupMemberName] = useState([""]);
  const [groupName, setGroupName] = useState("");
  const [key, setKey] = useState([0]);
  const [counter, setCounter] = useState(0);
  //const [teacher, setTeacher] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-group` : "/api/add-group";
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.loading = true;
    setRender(newRender);
    const teacher = localStorage.getItem("userId");
    axios.post(url, { teacher, groupName, groupMemberEmail, groupMemberName }).then((response) => {
      const newRender = {...render};
      for(const value in newRender) newRender[value] = false;
      newRender.calendar = true;
      setRender(newRender);
    }).catch((error) => console.log(error));
  };

  const onChangeName = (e) => {
    e.preventDefault();
    setGroupName(e.target.value);
  };

  /*const onChangeTeacher = (e) => {
    e.preventDefault();
    setTeacher(e.target.value);
  }*/

  const onChangeMemberEmail = (e, index) => {
    e.preventDefault();
    const newGroupMemberEmail = [...groupMemberEmail];
    newGroupMemberEmail[index] = e.target.value;
    setGroupMemberEmail(newGroupMemberEmail);
  };

  const onChangeMemberName = (e, index) => {
    e.preventDefault();
    const newGroupMemberName = [...groupMemberName];
    newGroupMemberName[index] = e.target.value;
    setGroupMemberName(newGroupMemberName);
  };

  const addMember = (index) => {
    if (index < 50) {
      setCounter((counter) => counter + 1);
      setGroupMemberEmail([...groupMemberEmail, ""]);
      setGroupMemberName([...groupMemberName, ""]);
      setKey([...key, counter])
    }
  };

  const removeMember = (index) => {
    if (index > 0) {
      const newGroupMemberEmail = [...groupMemberEmail];
      newGroupMemberEmail.splice(index, 1);
      const newGroupMemberName = [...groupMemberName];
      newGroupMemberName.splice(index, 1);
      const newKey = [...key];
      newKey.splice(index, 1);
      setKey(newKey);
      setGroupMemberEmail(newGroupMemberEmail);
      setGroupMemberName(newGroupMemberName);
    }
  };

  const onClick = () => {
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.calendar = true;
    setRender(newRender);
  }

  return (
    <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF]">
      <div className="h-[75vh] w-[70vw] bg-[#CCD1E4] rounded-lg relative flex justify-center overflow-y-auto scrollbar-hide">
        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClick()}>X</button>
        <form className="h-[70vh] w-[70vw] grid grid-cols-3 mt-[5vh]" onSubmit={(e) => onSubmit(e)}>
          <div className="col-start-1 col-span-1 flex flex-col justify-start items-center gap-[2.5vh]">
            <input
                className="h-[7vh] w-[19vw] rounded-md"
                type="text"
                value={groupName}
                placeholder=" Tên lớp"
                required
                onChange={(e) => onChangeName(e)}
            />
            {/*<input
                className="h-[7vh] w-[19vw] rounded-md"
                type="text"
                value={teacher}
                placeholder=" Tên giáo viên"
                required
                onChange={(e) => onChangeTeacher(e)}
            />*/}
          </div>
          <div className="col-start-2 col-span-2 flex flex-col justify-start gap-[2.5vh]">
            {groupMemberEmail.map((value, index) => {
              return (
                <div key={key[index]} className="flex flex-row gap-x-[1vw]">
                  <input 
                    className="h-[7vh] w-[17.5vw] rounded-md" 
                    type="text"
                    placeholder=" Email thành viên"
                    required
                    onChange={(e) => onChangeMemberEmail(e, index)}
                  />
                  <input 
                    className="h-[7vh] w-[17.5vw] rounded-md" 
                    type="text"
                    placeholder=" Tên thành viên"
                    required
                    onChange={(e) => onChangeMemberName(e, index)}
                  />
                  {index > 0 && 
                    <button type="button"
                      className="h-[7vh] w-[3.5vw] bg-[#FCFFE7] flex justify-center items-center rounded-md" 
                      onClick={() => removeMember(index)}
                    >
                      <img src={cross} className="h-[5vh]" />
                    </button>
                  }
                  {index < 50 && index === groupMemberEmail.length - 1 &&
                    <button type="button"
                      className="h-[7vh] w-[3.5vw] bg-[#FCFFE7] flex justify-center items-center rounded-md" 
                      onClick={() => addMember(index)}
                    >
                      <img src={plus} className="h-[5vh]" />
                    </button>
                  }
                </div>
              );
            })}
            <input className="h-[7vh] w-[20vw] rounded-md bg-[#829460] ml-[8vw]" type="submit" value="Gửi"/>
          </div>
        </form>
      </div>
    </div>
  );

}