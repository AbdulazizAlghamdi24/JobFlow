// src/components/AddJobPage.js
import React, { useState } from "react";
import "../styles.css"; // Importing App.css for styles

function AddJobPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          salary: parseFloat(salary), // Convert salary to a float
          imageUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job added:", data);
        // Reset form fields
        setTitle("");
        setDescription("");
        setSalary("");
        setImageUrl("");
      } else {
        // Handle server-side errors
        const errorData = await response.json();
        console.error("Failed to add job:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add job. Please try again later.");
    }
  };

  return (
    <div className="add-job-form-container">
      <h2>Add a New Job</h2>
      <form onSubmit={handleSubmit} className="add-job-form">
        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          id="jobDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="jobSalary">Salary</label>
        <input
          type="number"
          id="jobSalary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <label htmlFor="jobImageUrl">Image URL</label>
        <input
          type="text"
          id="jobImageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          Add Job
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AddJobPage;
