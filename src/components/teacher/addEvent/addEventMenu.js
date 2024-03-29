import axios from "axios";
import React, { useState, useEffect } from "react";
import { storage } from "../../../firebaseConfig";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default function AddEventMenu({ render, setRender }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [displayGroup, setDisplayGroup] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-all-group` : "/api/get-all-group";
    const userId = localStorage.getItem("userId");
    axios.post(url, { userId }).then(response => {
      setDisplayGroup(response.data);
    }).catch(error => console.log(error.message));
  }, [])

  const onSubmit = async(e) => {
    e.preventDefault();
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.loading = true;
    setRender(newRender);
    //
    const userId = localStorage.getItem("userId");
    var downloadURL = "";
    //
    if (file !== null) {
      await uploadBytes(ref(storage, userId + '/' + fileName), file);
      downloadURL = await getDownloadURL(ref(storage, userId + '/' + fileName));
    }    
    //
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-group` : "/api/get-group";
    axios.post(url, { userId, group }).then(async(response) => {
      const member = response.data.memberEmail.filter((value, index) => value.split("@")[0].toLowerCase() !== userId);
      member.push(userId + "@gmail.com");
      console.log(member);
      const addEventPromise = await member.map(async(gmail, index) => {
        const studentId = gmail.split("@")[0].toLowerCase();
        const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/add-event` : "/api/add-event";
        return axios.post(url, { studentId, title, description, group, startTime, endTime, downloadURL, fileName }).then(response => {}).catch(error => console.log(error));
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

  const onChangeFile = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onClickChoose = (value) => {
    setGroup(value);
    setDropdown(false);
  };

  const onClickClose = () => {
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.calendar = true;
    setRender(newRender);
  }

  return (
    <div className="h-[90vh] w-[90vw] flex justify-center items-center font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF] rounded-lg">
      <div className="h-[75vh] w-[65vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center">
        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClickClose()}>X</button>
        <form className="flex justify-center items-center flex-col gap-[3vh]" onSubmit={(e) => onSubmit(e)}>
          <div className="flex flex-row justify-center items-center gap-[2.5vw]">
            <input
              className="h-[7vh] w-[25vw] rounded-md"
              type="text"
              placeholder=" Tiêu đề bài tập"
              onChange={(e) => onChange(e, title, setTitle)}
              required
            />
            <div className="h-[7vh] w-[25vw] rounded-md z-10">
              {!dropdown && <button
                className="h-[7vh] w-[25vw] rounded-md bg-[#ffffff]"
                onClick={() => setDropdown(true)}
              >
                {group}
              </button>}
              {dropdown && <div className="w-[25vw] h-[26.5vh] rounded-md bg-[#ffffff] overflow-y-auto scrollbar-hide">
                {Object.entries(displayGroup).map((member, index) => {
                  return (
                    <button 
                      key={index} 
                      className="h-[7vh] w-[25vw] flex justify-center items-center rounded-md outline outline-[0.5px] outline-[#EEEEEE]" 
                      onClick={() => onClickChoose(member[0])}
                    >
                      {member[0]}
                    </button>
                  )
                })}
              </div>}
            </div>
            
          </div>
          <div className="flex flex-row justify-center items-start gap-[2.5vw]">
            <input
              className="h-[24vh] w-[25vw] rounded-md"
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
              <input
                className="h-[7vh] w-[25vw]"
                type="file"
                onChange={(e) => onChangeFile(e)}
              />
            </div>
          </div>
          <input className="h-[7vh] w-[20vw] rounded-md bg-[#829460]" type="submit" value="Gửi" required />
        </form>
      </div>
    </div>
  );
}
