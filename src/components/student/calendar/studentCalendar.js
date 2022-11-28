import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import DisplayEvent from "./displayEvent";
import axios from "axios";
import spinner from "./spinner.gif"

export default function StudentCalendar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({});

  const eventClick = (eventInfo) => {
    eventInfo.jsEvent.preventDefault();
    setLoading(true);
    const eid = eventInfo.event.url.split("=")[1];
    const userId = localStorage.getItem("userId");
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-event` : "/api/get-event";
    axios.post(url, { userId, eid }).then((response) => {
      const eventContent = {
        title: eventInfo.event.title,
        description: response.data.data.description,
        group: response.data.data.extendedProperties.shared.groupName,
        startTime: eventInfo.event.start,
        endTime: eventInfo.event.end,
        id: response.data.data.id,
      };
      setContent(eventContent);
      setLoading(false);
      setOpen(true);
    }).catch((error) => console.log(error));
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#F0EBE3]">
      {!loading && !open &&
        <div className="h-[90vh] w-[90vw] font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#EEEEEE]">
          <FullCalendar
            plugins={[dayGridPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={process.env.REACT_APP_API_KEY}
            events={{
              googleCalendarId: localStorage.getItem("email"),
            }}
            contentHeight="auto"
            eventDisplay="block"
            eventColor="#066163"
            eventClick={(eventInfo) => eventClick(eventInfo)}
          />
        </div>
      }
      {loading && 
        <div className="flex justify-center items-center h-[90vh] w-[90vw] font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#EEEEEE]">
          <img src={spinner}/>
        </div>
      }
      {open && 
        <div className="flex justify-center items-center h-[90vh] w-[90vw] font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#EEEEEE]">
          <DisplayEvent open={open} setOpen={setOpen} content={content} setContent={setContent} />
        </div>
      }
    </div>
  );
}
