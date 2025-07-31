import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CreateCrewmate from './pages/CreateCrewmate'
import Gallery from './pages/Gallery'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
            <Route path="/edit/:id" element={<EditCrewmate />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
