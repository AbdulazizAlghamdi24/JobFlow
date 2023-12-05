
import React, { useState, useEffect } from "react";
import "./styles.css"; 

function JobCard({ job, onLike, isLikedInitially }) {
  const [isLiked, setIsLiked] = useState(isLikedInitially);

  useEffect(() => {
    setIsLiked(isLikedInitially);
  }, [isLikedInitially]);

  const handleLike = () => {
    onLike(job);
    setIsLiked(!isLiked);
  };
  return (
    <div className="job-card">
      <div className="job-card-image-container">
        <img src={job.imageUrl} alt={job.title} className="job-card-image" />
      </div>
      <div className="job-card-content">
        <h3 className="job-card-title">{job.title}</h3>
        <p className="job-card-detail">{job.description}</p>
        <div className="job-card-salary">{job.salary} SR</div>
        <div className="job-card-buttons">
          <button
            className={`job-card-btn like ${isLiked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? "Liked" : "Like"}
          </button>
          <button className="job-card-btn contact">Contact</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
