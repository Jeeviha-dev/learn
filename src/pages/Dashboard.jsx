import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Dashboard() {
  const navigate = useNavigate()
  const username = 'Jeevi' // Optional: make dynamic later

  const [studyPlan, setStudyPlan] = useState([])
  const [completedCount, setCompletedCount] = useState(0)
  const [totalTopics, setTotalTopics] = useState(0)

  useEffect(() => {
    const savedPlan = JSON.parse(localStorage.getItem('studyPlan')) || []

    let allTopics = []
    savedPlan.forEach(course => {
      course.units.forEach(unit => {
        allTopics.push(...unit.topics)
      })
    })

    setStudyPlan(savedPlan)
    setTotalTopics(allTopics.length)

    let completed = 0
    allTopics.forEach(topic => {
      const isDone = localStorage.getItem(`completed-${topic}`)
      if (isDone === 'true') completed++
    })

    setCompletedCount(completed)
  }, [])

  const progressPercent = totalTopics === 0 ? 0 : Math.round((completedCount / totalTopics) * 100)

  return (
    <>
      <Navbar />
      <div style={{ padding: '30px' }}>
        <h1>🎓 Smart Syllabus Learning Platform</h1>
        <h2>👋 Welcome, {username}</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={cardStyle}>
            <h3>📘 Syllabus Planner</h3>
            <p>Create and organize your subjects.</p>
            <button onClick={() => navigate('/planner')}>Open Planner</button>
          </div>

          <div style={cardStyle}>
            <h3>🎯 Set Goals</h3>
            <p>Define short & long term goals.</p>
            <button onClick={() => navigate('/goals')}>Set Goals</button>
          </div>

          <div style={cardStyle}>
            <h3>📈 Progress Tracker</h3>
            <p>{completedCount}/{totalTopics} topics completed</p>
            <p>Progress: {progressPercent}%</p>
            <button onClick={() => navigate('/lessons')}>View Progress</button>
          </div>

          <div style={cardStyle}>
            <h3>⚙️ Settings</h3>
            <p>Update preferences and account.</p>
            <button onClick={() => navigate('/settings')}>Go to Settings</button>
          </div>

          <div style={cardStyle}>
            <h3>🚪 Logout</h3>
            <p>End session and return to login.</p>
            <button onClick={() => navigate('/login')}>Logout</button>
          </div>
        </div>
      </div>
    </>
  )
}

const cardStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '12px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  textAlign: 'center'
}

export default Dashboard
