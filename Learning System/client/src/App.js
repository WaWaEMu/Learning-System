import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./components/home-component";
import NavComponent from "./components/nav-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/login" element={<LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser}  />} />
        <Route path="/profile" element={<ProfileComponent currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/course" element={<CourseComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/postcourse" element={<PostCourseComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/enroll" element={<EnrollComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
      </Routes>
    </div>
  );
}

export default App;