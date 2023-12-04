import React, { useState, useEffect } from 'react';
import JobCard from '../JobCard';
import '../styles.css';

function HomePage({ likeJob }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8081/jobs');
        if (response.ok) {
          const fetchedJobs = await response.json();
          setJobs(fetchedJobs);
        } else {
          // If the response is not ok, handle errors here
          console.error('Failed to fetch jobs:', response.statusText);
        }
      } catch (error) {
        // Handle network errors here
        console.error('Network error when fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this effect will only run once, after initial render

  const handleLike = (job) => {
    likeJob(job);
  };

  return (
    <div className="job-list-container">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onLike={() => handleLike(job)}
          isLikedInitially={false} // Assuming you have logic to determine if a job is initially liked
        />
      ))}
    </div>
  );
}

export default HomePage;
