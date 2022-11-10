/*import React from "react";
import Calendar from "@ericz1803/react-google-calendar";

export default class StudentCalendar extends React.Component {
  render() {
    return (
      <div>
        <Calendar 
          apiKey={process.env.REACT_APP_API_KEY} 
          calendars={[ { calendarId: localStorage.getItem('email') } ]} 
          styles={{
            calendar: {
              borderWidth: "3px"

            }
          }}
        />
      </div>
    );
  }
}*/

import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import googleCalendarPlugin from '@fullcalendar/google-calendar'
import './studentCalendar.css'

export default class StudentCalendar extends React.Component {
  render() {
    return (
      <div className="student-calendar-container">
        <FullCalendar 
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView='dayGridMonth'
          googleCalendarApiKey={process.env.REACT_APP_API_KEY}
          events={{
            googleCalendarId: localStorage.getItem('email')
          }}
          contentHeight="auto"
        />
      </div>
    );
  }
}