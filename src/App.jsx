import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import Planner from './pages/Planner'
import Lessons from './pages/Lessons'
import Progress from './pages/Progress'
import Goals from './pages/Goals'
import Settings from './pages/Settings'
import StudyPlan from './pages/StudyPlan'
import TopicDetail from './pages/TopicDetail'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/study-plan" element={<StudyPlan />} />
        <Route path="/topic/:topicName" element={<TopicDetail />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
