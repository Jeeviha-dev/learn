import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState({ line1: '', line2: '' })

  const handleLogin = () => {
    let valid = true

    if (!email.includes('@')) {
      setEmailError('Please enter a valid email with "@"')
      valid = false
    } else {
      setEmailError('')
    }

    const passwordRules = /^(?=.*[A-Z])(?=.*\d).{6,}$/
    if (!passwordRules.test(password)) {
      setPasswordError({
        line1: 'Password must be at least 6 characters.',
        line2: 'Include one uppercase letter and one number.'
      })
      valid = false
    } else {
      setPasswordError({ line1: '', line2: '' })
    }

    if (valid) {
      navigate('/dashboard')
    }
  }

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
        <h1 style={{ textAlign: 'center' }}>Login</h1>

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
        {emailError && (
          <p style={{ color: '#ff4d4d', marginTop: '5px' }}>{emailError}</p>
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

        <button
          onClick={handleLogin}
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
        >
          Login
        </button>

        <p style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#00e6e6' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
