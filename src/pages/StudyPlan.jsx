import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function StudyPlan() {
  const [studyPlan, setStudyPlan] = useState([])

  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('studyPlan')) || []
    setStudyPlan(savedPlan)
  }, [])

  return (
    <>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h2>📘 Smart Syllabus Study Plan</h2>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={cellStyle}>📅 Date</th>
              <th style={cellStyle}>📚 Topic</th>
              <th style={cellStyle}>✅ Status</th>
            </tr>
          </thead>
          <tbody>
            {studyPlan.map((course, courseIndex) =>
              course.units.map((unit, unitIndex) =>
                unit.topics.map((topic, topicIndex) => {
                  const date = new Date()
                  date.setDate(date.getDate() + topicIndex + unitIndex)
                  const displayDate = date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short'
                  })

                  return (
                    <tr key={`${unit.name}-${topic}`}>
                      <td style={cellStyle}>{displayDate}</td>
                      <td style={cellStyle}>Unit {unitIndex + 1}: {topic}</td>
                      <td style={cellStyle}>
                        <button>Start</button>
                      </td>
                    </tr>
                  )
                })
              )
            )}
          </tbody>
        </table>

        <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
          <button style={buttonStyle}>📤 Export Plan</button>
          <button style={buttonStyle} onClick={() => window.location.href = '/planner'}>
            🔁 Edit Preferences
          </button>
        </div>
      </div>
    </>
  )
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  textAlign: 'left'
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer'
}

export default StudyPlan
