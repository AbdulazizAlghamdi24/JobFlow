import React from "react";
import JobCard from "../JobCard";
import "../styles.css";

function MyJobsPage({ likedJobs, likeJob }) {
  return (
    <div className="job-list-container">
      {likedJobs.length > 0 ? (
        likedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onLike={() => likeJob(job)}
            isLikedInitially={true}
          />
        ))
      ) : (
        <p>No favorite jobs.</p>
      )}
    </div>
  );
}

export default MyJobsPage;
