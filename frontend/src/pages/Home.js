import { Link } from "react-router-dom";
import DesktopImage from "../images/Desktop.webp"; // Adjust the path if needed

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-purple-100 p-6 text-center">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Welcome to JobTracker</h1>

      <p className="text-lg text-gray-700 mb-6 max-w-2xl">
        Your one-stop solution to manage and track all your job applications. 
        Organize your career path, stay updated, and land your dream job.
      </p>

      <img
        src={DesktopImage}
        alt="Job Tracking"
        className="w-full max-w-2xl rounded-lg shadow-xl mb-6"
      />

      <Link to="/dashboard">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
}
