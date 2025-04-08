import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function TopicDetail() {
  const { topicName } = useParams()
  const decodedTopic = decodeURIComponent(topicName)

  const [notes, setNotes] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  // Load notes and completed status
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes-${decodedTopic}`)
    const completedStatus = localStorage.getItem(`completed-${decodedTopic}`)

    if (savedNotes) setNotes(savedNotes)
    if (completedStatus === 'true') setIsCompleted(true)
  }, [decodedTopic])

  // Save notes
  const handleNoteChange = (e) => {
    const newNotes = e.target.value
    setNotes(newNotes)
    localStorage.setItem(`notes-${decodedTopic}`, newNotes)
  }

  // Toggle completed status
  const toggleCompleted = () => {
    const newStatus = !isCompleted
    setIsCompleted(newStatus)
    localStorage.setItem(`completed-${decodedTopic}`, newStatus)
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>
          {decodedTopic} {isCompleted ? '✅' : ''}
        </h1>

        <button onClick={toggleCompleted} style={{ marginBottom: '15px' }}>
          {isCompleted ? '✔️ Marked as Completed' : '☑️ Mark as Completed'}
        </button>

        <p>Your personal notes:</p>
        <textarea
          value={notes}
          onChange={handleNoteChange}
          placeholder="Write your notes here..."
          style={{
            width: '100%',
            height: '200px',
            marginTop: '10px',
            padding: '10px',
            fontSize: '1rem',
          }}
        ></textarea>
      </div>
    </>
  )
}

export default TopicDetail
