import React, { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import DisplayEvent from "./displayEvent";
import LoadingScreen from "./loadingScreen/loadingScreen";
import axios from 'axios'
import './studentCalendar.css'

export default function StudentCalendar() {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({});

  const eventClick = (eventInfo) => {
    eventInfo.jsEvent.preventDefault();
    console.log(eventInfo);
    setLoading(true);
    const eid = eventInfo.event.url.split('=')[1];
    const userId = localStorage.getItem('userId');
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api/get-event` : '/api/get-event';
    axios.post(url, { userId, eid }).then(response => {
      console.log(response.data);
      const eventContent = {
        title: eventInfo.event.title,
        description: response.data.data.description,
        group: response.data.data.extendedProperties.shared.groupName,
        startTime: eventInfo.event.start,
        endTime: eventInfo.event.end,
        id: response.data.data.id
      }
      setContent(eventContent);
      setLoading(false);
      setOpen(true);
      console.log(content);
    }).catch(error => console.log(error));  
  }

  return (
    <div>
      <div className="student-calendar-container">
        { !loading && <FullCalendar 
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          googleCalendarApiKey={process.env.REACT_APP_API_KEY}
          events={{
            googleCalendarId: localStorage.getItem('email')
          }}
          contentHeight="auto"
          eventDisplay="block"
          eventColor="#87CEEB"
          eventClick={(eventInfo) => eventClick(eventInfo)}
        /> }
      </div>
      { open && <DisplayEvent open={open} setOpen={setOpen} content={content} setContent={setContent} /> }
      { loading && <LoadingScreen /> }
    </div>
  );
}