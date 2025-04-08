import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function Progress() {
  const subject = 'React Basics'

  // Simulated total units based on lessons
  const totalUnits = 2 // Update if you add more lessons later
  const [completedUnits, setCompletedUnits] = useState(0)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedLessons')) || []
    setCompletedUnits(saved.length)
  }, [])

  const percentage = totalUnits === 0 ? 0 : Math.round((completedUnits / totalUnits) * 100)
  const progressBar = '█'.repeat(percentage / 10) + '░'.repeat(10 - percentage / 10)

  return (
    <>
      <Navbar />
      <div style={{
        padding: '40px',
        maxWidth: '600px',
        margin: 'auto',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.05)'
      }}>
        <h2>📊 My Learning Progress</h2>
        <hr style={{ margin: '20px 0' }} />

        <h3>Subject: {subject}</h3>
        <p style={{
          fontSize: '22px',
          margin: '20px 0',
          fontFamily: 'monospace',
          letterSpacing: '2px'
        }}>
          Progress: {progressBar} {percentage}%
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <button>📈 View Details</button>
          <button>📄 Download Report</button>
        </div>
      </div>
    </>
  )
}

export default Progress
