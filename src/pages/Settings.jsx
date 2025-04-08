import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'

function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('settings'))
    if (saved) {
      setDarkMode(saved.darkMode)
      setNotifications(saved.notifications)
    }
  }, [])
  useEffect(() => {
   if (notifications) {
     console.log('🔔 Notifications are enabled.')
   } else {
     console.log('🚫 Notifications are disabled.')
   }
 }, [notifications])
 



  const handleSave = () => {
   const data = { darkMode, notifications }
   localStorage.setItem('settings', JSON.stringify(data))
 
   // Apply dark mode
   if (darkMode) {
     document.body.classList.add('dark')
   } else {
     document.body.classList.remove('dark')
   }
 
   alert('💾 Settings Saved!')
 }
 

  const handlePasswordChange = () => {
    alert('🔑 Redirecting to password reset page... (you can link this later)')
  }

  return (
    <>
      <Navbar />
      <div style={{
        padding: '40px',
        maxWidth: '600px',
        margin: 'auto',
        border: '1px solid #ccc',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2>⚙️ Platform Settings</h2>
        <hr style={{ margin: '20px 0' }} />

        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          <label>🌓 Dark Mode:</label><br />
          <select
            value={darkMode ? 'on' : 'off'}
            onChange={e => setDarkMode(e.target.value === 'on')}
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          >
            <option value="on">ON</option>
            <option value="off">OFF</option>
          </select>

          <label>🔔 Notifications:</label><br />
          <select
            value={notifications ? 'enable' : 'disable'}
            onChange={e => setNotifications(e.target.value === 'enable')}
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          >
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>

          <div
            style={{
              marginTop: '20px',
              cursor: 'pointer',
              color: '#007bff',
              textDecoration: 'underline'
            }}
            onClick={handlePasswordChange}
          >
            🔑 Change Password
          </div>
        </div>

        <button onClick={handleSave}>💾 Save Changes</button>
      </div>
    </>
  )
}

export default Settings
