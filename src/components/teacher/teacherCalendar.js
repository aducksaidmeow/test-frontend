import React from "react";
import Calendar from "@ericz1803/react-google-calendar";

export default class StudentCalendar extends React.Component {
  render() {
    return (
      <div>
        <Calendar apiKey={process.env.REACT_APP_API_KEY} calendars={[ { calendarId: localStorage.getItem('email') } ]} />
      </div>
    );
  }
}