import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MyAlert from '../components/MyAlert';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertState, setAlertState] = useState({ show: false, type: 'info', text: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setAlertState({ show: true, type: 'success', text: 'Registration Successful! Please check your email for the Welcome OTP.' });
        login(data);
        navigate('/');
      } else {
        setAlertState({ show: true, type: 'error', text: data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error(error);
      setAlertState({ show: true, type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      {alertState.show && <MyAlert type={alertState.type} text={alertState.text} />}
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
