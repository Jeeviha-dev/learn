import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function Lessons() {
  const [index, setIndex] = useState(0)
  const [completed, setCompleted] = useState([])
  const [lessons, setLessons] = useState([])

  // Load notes.json
  useEffect(() => {
    fetch('/notes.json')
      .then(res => res.json())
      .then(data => {
        const allSubjects = data.flatMap(sem =>
          sem.subjects.map(sub => ({
            unit: sub.title,
            subject_code: sub.subject_code,
            semester: sem.semester,
            link: sub.url
          }))
        )
        setLessons(allSubjects)
      })
  }, []
// unjeurfvfdscjj

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedLessons')) || []
    setCompleted(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completed))
  }, [completed])

  if (lessons.length === 0) return <div>Loading...</div>

  const current = lessons[index]
  const isCompleted = completed.includes(current.unit)

  const markComplete = () => {
    if (!isCompleted) {
      setCompleted(prev => [...prev, current.unit])
    }
  }

  const next = () => {
    if (index < lessons.length - 1) setIndex(index + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: 'url("/background1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          color: 'white'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            padding: '2rem',
            borderRadius: '1rem',
            maxWidth: '700px',
            width: '100%'
          }}
        >
          <h2>📚 {current.unit}</h2>
          <p><strong>Subject Code:</strong> {current.subject_code}</p>
          <p><strong>Semester:</strong> {current.semester}</p>

          <a
            href={current.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (!isCompleted) {
                setCompleted(prev => [...prev, current.unit])
              }
            }}
            style={{ color: '#00f0ff', textDecoration: 'underline' }}
          >
            📥 Open Note
          </a>

          <div style={{ marginTop: '20px', display: 'flex', gap: '1rem' }}>
            <button onClick={prev} disabled={index === 0}>⏮️ Previous</button>
            <button onClick={next} disabled={index === lessons.length - 1}>⏭️ Next</button>
            <button
              onClick={markComplete}
              disabled={isCompleted}
              style={{
                backgroundColor: isCompleted ? '#ddd' : '#4CAF50',
                color: isCompleted ? '#555' : '#fff',
                marginLeft: 'auto'
              }}
            >
              {isCompleted ? '✅ Completed' : 'Mark as Completed'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Lessons