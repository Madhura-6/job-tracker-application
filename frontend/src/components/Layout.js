// src/components/Layout.jsx
export default function Layout({ children }) {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      {children}
    </main>
  );
}
