import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Analytics() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      toast.error("User not found. Please login again.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/api/jobs/user/${user.id}`)
      .then((res) => setJobs(res.data))
      .catch((err) => {
        console.error("Error loading jobs:", err);
        toast.error("Failed to load job analytics.");
      });
  }, [navigate]);

  const total = jobs.length;
  const statusCount = {
    Applied: jobs.filter((job) => job.status === "Applied").length,
    Interview: jobs.filter(
      (job) => job.status === "Interview" || job.status === "Interviewing"
    ).length,
    Offer: jobs.filter((job) => job.status === "Offer" || job.status === "Hired").length,
    Rejected: jobs.filter((job) => job.status === "Rejected").length,
  };

  return (
    <>
      

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8">
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-8">
          Job Application Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              Total Applications
            </h2>
            <p className="text-3xl text-blue-700 dark:text-blue-400 font-bold">{total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Applied</h2>
            <p className="text-3xl text-yellow-600 font-bold">{statusCount.Applied}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Interview</h2>
            <p className="text-3xl text-green-600 font-bold">{statusCount.Interview}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Offer</h2>
            <p className="text-3xl text-purple-600 font-bold">{statusCount.Offer}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Rejected</h2>
            <p className="text-3xl text-red-600 font-bold">{statusCount.Rejected}</p>
          </div>
        </div>
      </div>
    </>
  );
}
