import React from "react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Settings
        </h2>

        <div className="space-y-4 text-gray-800">
          <p>This section will allow you to customize your app preferences in future.</p>
          <p className="text-sm text-gray-600">
            Example: Enable dark mode by default, notification preferences, etc.
          </p>
        </div>
      </div>
    </div>
  );
}
