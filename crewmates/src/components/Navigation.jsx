import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <img src="/crewmates.png" alt="Crewmates" className="nav-logo" />
          Crewmates
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/create" 
            className={`nav-link ${location.pathname === '/create' ? 'active' : ''}`}
          >
            Create a Crewmate
          </Link>
          <Link 
            to="/gallery" 
            className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
          >
            Crewmate Gallery
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation