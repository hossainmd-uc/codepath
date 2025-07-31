import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to the Crewmate Creator!</h1>
        <div className="home-description">
          <p>
            Here is where you can create your very own set of crewmates before sending them off into space!
          </p>
        </div>
        
        <div className="home-image">
          <img src="/crewmates.png" alt="Crewmates" className="crewmates-image" />
        </div>
        
        <div className="home-actions">
          <Link to="/create" className="action-button primary">
            Create a New Crewmate
          </Link>
          <Link to="/gallery" className="action-button secondary">
            View Crewmate Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home