import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function Progress() {
  const [completedLessons, setCompletedLessons] = useState([])
  const [allLessons, setAllLessons] = useState([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('completedLessons')) || []
    setCompletedLessons(saved)
  }, [])

  useEffect(() => {
    fetch('/notes.json')
      .then(res => res.json())
      .then(data => {
        const all = data.flatMap(sem =>
          sem.subjects.map(sub => ({
            unit: sub.title,
            subject_code: sub.subject_code,
            semester: sem.semester,
            url: sub.url
          }))
        )
        setAllLessons(all)
      })
  }, [])

  const totalUnits = allLessons.length
  const completedUnits = completedLessons.length
  const remainingUnits = totalUnits - completedUnits
  const percentage = totalUnits === 0 ? 0 : Math.round((completedUnits / totalUnits) * 100)
  const progressBarWidth = `${percentage}%`

  const handleDownloadReport = () => {
    const content = `
Learning Progress Report:

Total Lessons: ${totalUnits}
Completed Lessons: ${completedUnits}
Progress: ${percentage}%

Completed:
${completedLessons.join('\n')}

Remaining:
${allLessons
        .filter(lesson => !completedLessons.includes(lesson.unit))
        .map(lesson => lesson.unit)
        .join('\n')}
    `
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'progress-report.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Navbar />
      <div style={{
        padding: '40px',
        maxWidth: '700px',
        margin: 'auto',
        borderRadius: '12px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h2 style={{ textAlign: 'center' }}>📊 Learning Progress</h2>
        <div style={{
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          overflow: 'hidden',
          margin: '20px 0'
        }}>
          <div style={{
            height: '25px',
            width: progressBarWidth,
            backgroundColor: '#4caf50',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        <p style={{ textAlign: 'center', fontSize: '18px' }}>{percentage}% Completed</p>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={boxStyle}>✅ <strong>{completedUnits}</strong><br />Completed</div>
          <div style={boxStyle}>⏳ <strong>{remainingUnits}</strong><br />Remaining</div>
          <div style={boxStyle}>📘 <strong>{totalUnits}</strong><br />Total</div>
        </div>

        <div style={{
          marginTop: '30px',
          background: '#e6f3ff',
          padding: '15px',
          borderRadius: '10px',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          💬 Tip: Revise completed lessons weekly to stay sharp!
        </div>

        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button onClick={() => setShowDetails(true)}>📈 View Full Report</button>
          <button onClick={handleDownloadReport}>📄 Download Summary</button>
        </div>

        {showDetails && (
          <div style={{
            marginTop: '30px',
            textAlign: 'left',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <h4>✅ Completed Lessons</h4>
            <ul>
              {completedLessons.map((unit, i) => (
                <li key={i}>{unit}</li>
              ))}
            </ul>

            <h4 style={{ marginTop: '20px' }}>❌ Remaining Lessons</h4>
            <ul>
              {allLessons
                .filter(lesson => !completedLessons.includes(lesson.unit))
                .map((lesson, i) => (
                  <li key={i}>
                    {lesson.unit} –{' '}
                    <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                      📎 Open Note
                    </a>
                  </li>
                ))}
            </ul>

            <button
              onClick={() => setShowDetails(false)}
              style={{
                marginTop: '20px',
                background: '#ccc',
                padding: '10px 20px',
                borderRadius: '8px'
              }}
            >
              ❌ Close
            </button>
          </div>
        )}
      </div>
    </>
  )
}

const boxStyle = {
  background: '#fafafa',
  border: '1px solid #ddd',
  padding: '15px 20px',
  borderRadius: '10px',
  textAlign: 'center',
  width: '30%',
  minWidth: '120px',
  fontSize: '16px'
}

export default Progress
