import React, { useState, useEffect } from 'react';
import JobCard from '../JobCard';
import '../styles.css';

function HomePage({ likeJob }) {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/jobs')
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="homepage-container">
      <input
        type="text"
        placeholder="Search for jobs..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-bar"
      />
      <div className="job-list-container">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onLike={() => likeJob(job)}
            isLikedInitially={false}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
