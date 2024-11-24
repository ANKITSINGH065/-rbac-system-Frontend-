import React, { useState } from 'react';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'User',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
        <option value="Moderator">Moderator</option>
      </select>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;