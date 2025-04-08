import Navbar from '../components/Navbar'
import { useState } from 'react'

function Goals() {
  const [exam, setExam] = useState('')
  const [dailyHours, setDailyHours] = useState('')
  const [weeklyGoal, setWeeklyGoal] = useState('')
  const [reminderTime, setReminderTime] = useState('19:00')

  const saveGoal = () => {
    const goal = {
      exam,
      dailyHours,
      weeklyGoal,
      reminderTime,
    }
    localStorage.setItem('learningGoals', JSON.stringify(goal))
    alert('✅ Goals Saved Successfully!')
  }

  const setReminder = () => {
    alert(`🔔 Reminder set for ${reminderTime}`)
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
        <h2>🎯 Set Your Learning Goals</h2>
        <hr style={{ margin: '20px 0' }} />

        <div style={{ textAlign: 'left' }}>
          <label>Target Exam:</label><br />
          <input
            type="text"
            value={exam}
            onChange={e => setExam(e.target.value)}
            placeholder="e.g. Semester Finals"
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          />

          <label>Daily Study Hours:</label><br />
          <input
            type="number"
            value={dailyHours}
            onChange={e => setDailyHours(e.target.value)}
            placeholder="e.g. 2"
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          />

          <label>Weekly Goal (Units):</label><br />
          <input
            type="number"
            value={weeklyGoal}
            onChange={e => setWeeklyGoal(e.target.value)}
            placeholder="e.g. 5"
            style={{ width: '100%', padding: '10px', marginBottom: '15px' }}
          />

          <label>Reminder Time:</label><br />
          <input
            type="time"
            value={reminderTime}
            onChange={e => setReminderTime(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '25px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={saveGoal}>✅ Save Goal</button>
          <button onClick={setReminder}>🔔 Set Reminder</button>
        </div>
      </div>
    </>
  )
}

export default Goals
