import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './components/login'
import AddInfo from './components/addInfo'
import StudentMain from './components/student/studentMain'
import TeacherMain from './components/teacher/teacherMain'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/add-info" element={ <AddInfo /> } />
        <Route path="/student-calendar" element={ <StudentMain /> } />
        <Route path="/teacher-calendar" element={ <TeacherMain /> } />
      </Routes>
    </GoogleOAuthProvider>
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
