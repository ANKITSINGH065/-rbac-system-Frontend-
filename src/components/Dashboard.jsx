import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default Dashboard;