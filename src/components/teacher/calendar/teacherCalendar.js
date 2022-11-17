import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import './teacherCalendar.css'

export default class TeacherCalendar extends React.Component {
  render() {
    return (
      <div className="teacher-calendar-container">
        <FullCalendar 
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView='dayGridMonth'
          googleCalendarApiKey={process.env.REACT_APP_API_KEY}
          events={{
            googleCalendarId: localStorage.getItem('email'),
          }}
          contentHeight="auto"
          eventDisplay="block"
          eventColor="#87CEEB"
        />
      </div>
    );
  }
}