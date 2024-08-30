// src/components/Register.js
import { useState } from 'react';
import axios from 'axios';
import "./Register.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [isRegister, setIsRegister] = useState(true); // State to toggle between Register and Login forms
  const [loginData, setLoginData] = useState({ username: '', password: '' });

  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/userRegister', formData);
      alert('Registration successful!');
      const userId = res.data.user._id;
      // Check the response for role and navigate accordingly
      if (res.data.user.role === 'user') {
        navigate(`/user-home/${userId}`); // Replace with the actual route for the user home
      } else if (res.data.user.role === 'admin') {
        navigate(`/admin-home/${userId}`); // Replace with the actual route for the admin home
      } else if (res.data.user.role === 'manager') {
        navigate(`/manager-home/${userId}`); // Replace with the actual route for the manager home
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert('Registration failed: Network error or server is down.');
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/userlogin', loginData);

      const userId = res.data.user._id;

      // Store the userId in local storage
      localStorage.setItem('userId', userId); 
      
      // Check the response for role and navigate accordingly


      if (res.data.user.role === 'user') {

        navigate(`/user-home/${userId}`); // Replace with the actual route for the user home
      } else if (res.data.user.role === 'admin') {
        navigate(`/admin-home/${userId}`); // Replace with the actual route for the admin home
      } else if (res.data.user.role === 'manager') {
        navigate(`/manager-home/${userId}`); // Replace with the actual route for the manager home
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Login failed: ${error.response.data.message}`);
      } else {
        alert('Login failed: Network error or server is down.');
      }
    }
  };

  return (
    <div className="register-container">
      {isRegister ? (
        <form onSubmit={handleRegisterSubmit}>
          <div className="register">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={handleRegisterChange} 
              value={formData.username} 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleRegisterChange} 
              value={formData.email} 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleRegisterChange} 
              value={formData.password} 
              required 
            />
            <select name="role" onChange={handleRegisterChange} value={formData.role}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <div className="login">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={handleLoginChange} 
              value={loginData.username} 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleLoginChange} 
              value={loginData.password} 
              required 
            />
            <button type="submit">Login</button>
          </div>
        </form>
      )}
      <div className="toggle-form">
        {isRegister ? (
          <>
            <p>Already registered?</p>
            <button onClick={() => setIsRegister(false)}>Login</button>
          </>
        ) : (
          <>
            <p>New here?</p>
            <button onClick={() => setIsRegister(true)}>Back to Register</button>
          </>
        )}
      </div>
    </div>
  );
};

export { Register };
