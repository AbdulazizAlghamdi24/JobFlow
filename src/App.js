// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NAV/NavigationBar";
import HomePage from "./components/NAV/HomePage";
import AddJobPage from "./components/NAV/AddJobPage";
import MyJobsPage from "./components/NAV/MyJobsPage";
import "./App.css";
import "./components/styles.css";

function App() {
  const [likedJobs, setLikedJobs] = useState([]);

  const likeJob = (job) => {
    setLikedJobs((prevLikedJobs) => {
      const isAlreadyLiked = prevLikedJobs.some((j) => j.id === job.id);
      if (isAlreadyLiked) {
        // Remove the job from liked jobs
        return prevLikedJobs.filter((j) => j.id !== job.id);
      } else {
        // Add the job to liked jobs
        return [...prevLikedJobs, job];
      }
    });
  };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage likeJob={likeJob} />} />
        <Route path="/add-job" element={<AddJobPage />} />
        <Route
          path="/my-jobs"
          element={<MyJobsPage likedJobs={likedJobs} likeJob={likeJob} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
