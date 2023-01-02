import axios from "axios";
import React, { useState } from "react";

export default function AddEventMenu({ render, setRender }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.loading = true;
    setRender(newRender);
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-group` : "/api/get-group";
    const userId = localStorage.getItem("userId");
    axios.post(url, { userId, group }).then(async(response) => {
      const member = response.data.memberEmail.filter((value, index) => value.split("@")[0].toLowerCase() !== userId);
      member.push(userId + "@gmail.com");
      console.log(member);
      const addEventPromise = await member.map(async(gmail, index) => {
        const studentId = gmail.split("@")[0].toLowerCase();
        const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-event` : "/api/add-event";
        return axios.post(url, { studentId, title, description, group, startTime, endTime }).then(response => {}).catch(error => console.log(error));
      })
      Promise.all(addEventPromise).then(response => {
        console.log(response);
        const newRender = {...render};
        for(const value in newRender) newRender[value] = false;
        newRender.calendar = true;
        setRender(newRender);
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  };

  const onChange = (e, value, setValue) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const onClick = () => {
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.calendar = true;
    setRender(newRender);
  }

  return (
    <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF]">
      <div className="h-[75vh] w-[65vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center">
        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClick()}>X</button>
        <form className="flex justify-center items-center flex-col gap-[3vh]" onSubmit={(e) => onSubmit(e)}>
          <div className="flex flex-row justify-center items-center gap-[2.5vw]">
            <input
              className="h-[7vh] w-[25vw] rounded-md"
              type="text"
              placeholder=" Tiêu đề bài tập"
              onChange={(e) => onChange(e, title, setTitle)}
              required
            />
            <input
              className="h-[7vh] w-[25vw] rounded-md"  
              type="text"
              placeholder=" Tên lớp"
              onChange={(e) => onChange(e, group, setGroup)}
              required
            />
          </div>
          <div className="flex flex-row justify-center items-start gap-[2.5vw]">
            <input
              className="h-[16.5vh] w-[25vw] rounded-md"
              type="text"
              placeholder=" Mô tả"
              onChange={(e) => onChange(e, description, setDescription)}
              required
            />
            <div className="flex flex-col justify-center items-center gap-[2.5vh]"> 
              <input
                className="h-[7vh] w-[25vw] rounded-md"
                type="datetime-local"
                onChange={(e) => onChange(e, startTime, setStartTime)}
                required
              />
              <input
                className="h-[7vh] w-[25vw] rounded-md"
                type="datetime-local"
                onChange={(e) => onChange(e, endTime, setEndTime)}
                required
              />
            </div>
          </div>
          <input className="h-[7vh] w-[20vw] rounded-md bg-[#829460]" type="submit" value="Gửi" required />
        </form>
      </div>
    </div>
  );
}
