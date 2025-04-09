
import { useState } from 'react'
import Navbar from '../components/Navbar'

function Planner() {
  const [subject, setSubject] = useState('')
  const [units, setUnits] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [examDate, setExamDate] = useState('')
  const [preference, setPreference] = useState('Mixed')

  const handleGenerate = () => {
    alert('📚 Study Plan Generated! (you can now implement saving logic)')
  }

  return (
    <>
      <Navbar />
      <div style={{
        padding: '30px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '12px',
        backgroundColor: '#fafafa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          ✏️ Create Your Study Plan
        </h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Subject:</label><br />
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={inputStyle}
            placeholder="e.g. JavaScript"
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Total Units:</label><br />
          <input
            type="number"
            value={units}
            onChange={e => setUnits(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Difficulty:</label><br />
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
            style={inputStyle}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Exam Date:</label><br />
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Preference:</label><br />
          <select
            value={preference}
            onChange={e => setPreference(e.target.value)}
            style={inputStyle}
          >
            <option value="Videos">📺 Videos</option>
            <option value="Notes">📄 Notes</option>
            <option value="Mixed">🧠 Mixed</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          ✅ Generate Plan
        </button>
      </div>
    </>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  marginTop: '5px'
}

export default Planner