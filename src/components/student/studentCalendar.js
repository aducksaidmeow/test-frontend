import React from "react";
import Calendar from "@ericz1803/react-google-calendar";

const API_KEY = "AIzaSyA55OJb2HeEbZzDQhzeet4bVu_wIFFtsjE";

export default class StudentCalendar extends React.Component {
  render() {
    return (
      <div>
        <Calendar apiKey={API_KEY} calendars={[ { calendarId: localStorage.getItem('fullEmail') } ]} />
      </div>
    );
  }
}