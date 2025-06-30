import React, { useState } from "react";
import { uploadJobWithResume } from "../api/jobApi";

const JobForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    appliedDate: "",
    status: "",
    notes: "",
  });
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please upload a resume file");
      return;
    }

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }
    form.append("resume", resume);

    try {
      await uploadJobWithResume(form);
      setMessage("Job added successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      setMessage("Failed to add job.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Job Application</h2>
      <form onSubmit={handleSubmit}>
        <input name="companyName" placeholder="Company Name" onChange={handleChange} required /><br /><br />
        <input name="jobTitle" placeholder="Job Title" onChange={handleChange} required /><br /><br />
        <input name="appliedDate" type="date" onChange={handleChange} required /><br /><br />
        <input name="status" placeholder="Status" onChange={handleChange} required /><br /><br />
        <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea><br /><br />
        <input type="file" onChange={handleFileChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default JobForm;
