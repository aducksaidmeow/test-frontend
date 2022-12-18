import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import axios from "axios";

export default function StudentCalendar({ render, setRender, display, setDisplay}) {

  const eventClick = (eventInfo) => {
    eventInfo.jsEvent.preventDefault();
    const eid = eventInfo.event.url.split("=")[1];
    const userId = localStorage.getItem("userId");
    const url = process.env.NODE_ENV === "production" ? `${process.env.REACT_APP_API_URL}/api/get-event` : "/api/get-event";
    const newRender = {...render};
    for(const value in newRender) newRender[value] = false;
    newRender.loading = true;
    setRender(newRender);
    axios.post(url, { userId, eid }).then((response) => {
      setDisplay({
        title: eventInfo.event.title,
        description: response.data.data.description,
        group: response.data.data.extendedProperties.shared.groupName,
        startTime: eventInfo.event.start,
        endTime: eventInfo.event.end,
        id: response.data.data.id,
      });
      const newRender = {...render};
      for(const value in newRender) newRender[value] = false;
      newRender.display = true;
      setRender(newRender);
    }).catch((error) => console.log(error));
  };

  return (
    <div className="h-[90vh] w-[90vw] font-['consolas'] shadow-2xl overflow-y-auto scrollbar-hide bg-[#FFFFFF]">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={process.env.REACT_APP_API_KEY}
        events={{
          googleCalendarId: localStorage.getItem("email"),
        }}
        contentHeight="auto"
        eventDisplay="block"
        eventColor="#4B56D2"
        eventClick={(eventInfo) => eventClick(eventInfo)}
      />
    </div>
  );
}
