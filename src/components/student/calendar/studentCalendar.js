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
    setRender({
      loading: true,
      calendar: false,
      display: false,
    })
    axios.post(url, { userId, eid }).then((response) => {
      setDisplay({
        title: eventInfo.event.title,
        description: response.data.data.description,
        group: response.data.data.extendedProperties.shared.groupName,
        startTime: eventInfo.event.start,
        endTime: eventInfo.event.end,
        id: response.data.data.id,
      });
      setRender({
        loading: false,
        calendar: false,
        display: true,
      })
    }).catch((error) => console.log(error));
  };

  return (
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
  );
}
