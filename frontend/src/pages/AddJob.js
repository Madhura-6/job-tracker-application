import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddJob() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    status: "",
    appliedDate: "",
    notes: "",
    resume: null,
  });

  const navigate = useNavigate();
  const statusOptions = ["Applied", "Interviewing", "Rejected", "Hired"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { companyName, jobTitle, status } = formData;
    if (!companyName || !jobTitle || !status) {
      toast.error("Please fill all required fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      toast.error("User session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const data = new FormData();
    data.append("companyName", formData.companyName);
    data.append("jobTitle", formData.jobTitle);
    data.append("status", formData.status);
    data.append("appliedDate", formData.appliedDate || new Date().toISOString().split("T")[0]);
    if (formData.notes) data.append("notes", formData.notes);
    if (formData.resume) data.append("resume", formData.resume);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/jobs/upload/${user.id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Job added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding job:", err.response?.data || err.message);
      toast.error("Failed to add job. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 shadow rounded text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
        Add New Job
      </h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Company Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Job Title *</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Status *</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Select Status</option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Applied Date */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Applied Date</label>
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            rows={3}
            value={formData.notes}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>

        {/* Resume */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full text-gray-900 dark:text-gray-200"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
