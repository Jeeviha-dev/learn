import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

function Lessons() {
  const [index, setIndex] = useState(0)
  const [completedUnits, setCompletedUnits] = useState([])
  const [lessons, setLessons] = useState([])

  useEffect(() => {
    // Fetch notes.json on mount
    fetch('/notes.json')
      .then(res => res.json())
      .then(data => {
        // Example: filter for semester 6 only
        const semester6 = data.filter(note => note.semester === 6)

        const formatted = semester6.map(note => ({
          unit: note.title,
          type: 'note',
          content: `${note.subject} - Semester ${note.semester}`,
          link: note.url
        }))

        // Add to your default lesson units if needed
        const defaultLessons = [
          {
            unit: 'Unit 1: Basics',
            type: 'video',
            link: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          },
          {
            unit: 'Unit 2: Variables & Data Types',
            type: 'note',
            content: 'In this unit, we cover JavaScript variables, const/let/var, and basic data types.',
          },
          {
            unit: 'Unit 3: Functions & Scope',
            type: 'video',
            link: 'https://www.youtube.com/embed/y7QnFLa5WkQ',
          }
        ]

        setLessons([...defaultLessons, ...formatted])
      })
  }, [])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedLessons')) || []
    setCompletedUnits(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedUnits))
  }, [completedUnits])

  if (lessons.length === 0) return <div>Loading lessons...</div>

  const current = lessons[index]
  const isCompleted = completedUnits.includes(current.unit)

  const markComplete = () => {
    const unitName = current.unit
    if (!completedUnits.includes(unitName)) {
      setCompletedUnits([...completedUnits, unitName])
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
      <div style={{ padding: '30px' }}>
        <h2>📚 {current.unit} ({current.type === 'video' ? 'Video' : 'Note'})</h2>

        <div style={{
          margin: '20px 0',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px'
        }}>
          {current.type === 'video' ? (
            <iframe
              width="100%"
              height="400"
              src={current.link}
              title="Lesson Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div>
              <p>{current.content}</p>
              {current.link && (
                <a href={current.link} target="_blank" rel="noopener noreferrer">
                  📥 Open Note
                </a>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={prev} disabled={index === 0}>⏮️ Previous</button>
          <button onClick={next} disabled={index === lessons.length - 1}>⏭️ Next</button>

          <button
            onClick={markComplete}
            disabled={isCompleted}
            style={{
              marginLeft: 'auto',
              backgroundColor: isCompleted ? '#ddd' : '#4CAF50',
              color: isCompleted ? '#333' : '#fff'
            }}
          >
            {isCompleted ? '✅ Completed' : '✅ Mark as Complete'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Lessons
