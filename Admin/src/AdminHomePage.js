import React, { useState, useEffect } from 'react';
import "./App.css"
function AdminHomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:8081/jobs') 
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const handleDelete = (jobId) => {
    
    fetch(`http://localhost:8081/jobs/${jobId}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        
        setJobs(jobs.filter(job => job.id !== jobId));
      } else {
        res.json().then(data => console.error(data.message));
      }
    })
    .catch(err => console.error("Error deleting job:", err));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {jobs.map(job => (
        <div key={job.id} className="job-post">
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>Salary: {job.salary}</p>
          <button onClick={() => handleDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminHomePage;
