import React, { useState } from "react";
import axios from "axios";

export default function RemoveEventMenu({ render, setRender }) {
  const [eventId, setEventId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/remove-event` : "/api/remove-event";
    const userId = localStorage.getItem("userId");
    axios.post(url, { userId, eventId }).then((response) => {

    }).catch((error) => console.log(error.message));
  };

  const onChange = (e) => {
    setEventId(e.target.value);
  };

  /*return (
    <div className="remove-event-form-container">
      {!loading && (
        <div
          className="remove-event-close-button"
          onClick={() => setOpen(false)}
        >
          x
        </div>
      )}
      {!loading && (
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            className="event-id"
            type="text"
            placeholder="Enter event ID"
            required
            onChange={(e) => onChange(e)}
          />
          <input className="remove-event-submit-button" type="submit" />
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
      <div className="h-[40vh] w-[50vw] bg-[#CCD1E4] rounded-lg relative flex justify-center items-center">
        <button className="absolute top-0 right-0 bg-[#DC3535] h-[5vh] w-[2.5vw] rounded-lg" onClick={() => onClick()}>X</button>
        <form className="flex justify-center items-center flex-col gap-[3vh]" onSubmit={(e) => onSubmit(e)}>
          <input
            className="h-[7vh] w-[30vw] rounded-md"
            type="text"
            placeholder="Enter event ID"
            required
            onChange={(e) => onChange(e)}
          />
          <input className="h-[7vh] w-[20vw] rounded-md bg-[#829460]" type="submit" />
        </form>
      </div>
    </div>
  );
}
