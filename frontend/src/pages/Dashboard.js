import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.email?.split("@")[0] || "User";

  // ✅ Fetch job applications
  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/api/jobs/user/${user.id}`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
        );
        setJobs(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job applications.");
        setLoading(false);
      });
  }, [navigate]);

  // ✅ Handle delete
  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  // ✅ Handle update
  const handleUpdate = (updatedJob) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-1 text-blue-700 dark:text-blue-300">
        Hi, {username} 👋
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Here's your job application dashboard.
      </p>

      {/* 🔍 Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search job or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-full sm:w-1/3"
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
        {(search || statusFilter) && (
          <button
            onClick={handleClearFilters}
            className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 px-4 py-2 rounded text-gray-800 dark:text-white"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* 🧾 Job List */}
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No job applications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
