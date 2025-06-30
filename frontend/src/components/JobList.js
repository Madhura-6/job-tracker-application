import React, { useEffect, useState } from "react";
import { getAllJobs } from "../api/jobApi";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.companyName}</strong> - {job.jobTitle} ({job.status})<br />
              Applied on: {job.appliedDate} <br />
              Notes: {job.notes} <br />
              Resume: <a href={`http://localhost:8080/resumes/${job.resumeUrl}`} target="_blank" rel="noopener noreferrer">View</a>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
