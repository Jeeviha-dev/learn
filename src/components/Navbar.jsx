import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/dashboard" style={{ marginRight: '10px' }}>Dashboard</Link>
      <Link to="/planner" style={{ marginRight: '10px' }}>Planner</Link>
      <Link to="/lessons" style={{ marginRight: '10px' }}>Lessons</Link>
      <Link to="/progress" style={{ marginRight: '10px' }}>Progress</Link>
      <Link to="/goals" style={{ marginRight: '10px' }}>Goals</Link>
      <Link to="/settings" style={{ marginRight: '10px' }}>Settings</Link>
      <Link to="/" style={{ float: 'right', color: 'red' }}>Logout</Link>
    </nav>
  )
}

export default Navbar
