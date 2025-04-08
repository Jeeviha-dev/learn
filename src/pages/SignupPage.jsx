import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (name.trim() === '') {
      setNameError('Name is not mentioned');
      isValid = false;
    }

    if (!email.endsWith('@gmail.com') || email.length <= 10) {
      setEmailError('Please enter a valid email with "@gmail.com"');
      isValid = false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (password.length < 6 || !hasUpperCase || !hasNumber) {
      setPasswordError(
        'Password must be at least 6 characters.\nInclude one uppercase letter and one number.'
      );
      isValid = false;
    }

    if (!isValid) return;

    navigate('/dashboard');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/background1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '15px',
          padding: '30px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          color: 'white'
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Sign Up</h1>


<input
  style={{
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none'
  }}
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
{ nameError && (
  <p style={{ color: 'red', marginTop: '4px', marginBottom: '10px' }}>
    {nameError}
  </p>
)}

        <input
         style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        {emailError && (
          <p style={{ color: 'red', marginTop: '4px', marginBottom: '10px' }}>
            {emailError}
          </p>
        )}

        <input 
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          outline: 'none'
        }}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError.line1 && (
          <div style={{ marginTop: '5px' }}>
            <p style={{ color: '#ff4d4d', margin: 0 }}>{passwordError.line1}</p>
            <p style={{ color: '#ff4d4d', margin: 0 }}>{passwordError.line2}</p>
          </div>
        )}

        

        <label style={{ display: 'block', marginTop: '10px' }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />{' '}
          Show Password
        </label>
        
        

        {passwordError && (
          <p
            style={{
              color: 'red',
              whiteSpace: 'pre-line',
              marginTop: '4px',
              marginBottom: '10px',
            }}
          >
            {passwordError}
          </p>
        )}

        <button 
        
        onClick={handleSignup}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '15px',
          backgroundColor: '#ffffff',
          color: '#333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >Create Account</button>
   
   <p style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
  Already have an account? <Link to="/" style={{ color: '#00e6e6' }}>Login</Link>
</p>


        
      </div>
    </div>
  );
}

export default SignupPage;
