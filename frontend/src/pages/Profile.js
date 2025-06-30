import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-200">
        No user information available.
      </div>
    );
  }

  // 👇 Get name or fallback to email username
  const displayName = user.name || user.email?.split("@")[0] || "User";

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-white mb-4 text-center">
        User Profile
      </h2>

      <div className="space-y-4 text-gray-700 dark:text-gray-200 text-sm sm:text-base">
        <p>
          <strong>Name:</strong> {displayName}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        {user.id && (
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
        )}
      </div>
    </div>
  );
}
