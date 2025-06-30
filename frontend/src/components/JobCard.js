import React, { useState } from "react";
import axios from "axios";

export default function JobCard({ job, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(job.status);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      axios
        .delete(`http://localhost:8080/api/jobs/${job.id}`)
        .then(() => onDelete(job.id))
        .catch((err) => console.error("Delete failed", err));
    }
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/api/jobs/${job.id}`, {
        ...job,
        status,
      })
      .then((res) => {
        setIsEditing(false);
        if (onUpdate) onUpdate(res.data);
      })
      .catch((err) => {
        console.error("Update failed", err);
      });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition-all duration-300 text-gray-800 dark:text-gray-200">
      <h2 className="text-xl font-bold">{job.jobTitle}</h2>
      <p className="text-gray-600 dark:text-gray-300">{job.companyName}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Applied on: {job.appliedDate}
      </p>

      {/* Status Section */}
      <div className="mt-2 text-sm">
        <span className="font-semibold">Status:</span>{" "}
        {isEditing ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="ml-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>
        ) : (
          <span className="ml-2">{job.status}</span>
        )}
      </div>

      {/* Notes Section */}
      {job.notes && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Notes:</span> {job.notes}
        </p>
      )}

      {/* Resume & Buttons */}
      <div className="mt-4 flex items-center gap-4 flex-wrap">
        {job.resumeUrl && (
          <a
            href={`http://localhost:8080${job.resumeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Resume
          </a>
        )}

        <button
          onClick={handleDelete}
          className="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Delete
        </button>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleUpdate}
              className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setStatus(job.status);
                setIsEditing(false);
              }}
              className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
