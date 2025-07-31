import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllCrewmates } from '../services/crewmateService'
import './Gallery.css'

function Gallery() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCrewmates()
  }, [])

  const loadCrewmates = async () => {
    try {
      setLoading(true)
      const data = await getAllCrewmates()
      setCrewmates(data || [])
    } catch (err) {
      setError('Failed to load crewmates')
      console.error('Error loading crewmates:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getSpeedLabel = (speed) => {
    const speedLabels = {
      1: 'Slow',
      2: 'Normal', 
      3: 'Fast',
      4: 'Super Fast'
    }
    return speedLabels[speed] || 'Unknown'
  }

  if (loading) {
    return (
      <div className="gallery">
        <div className="loading">Loading crewmates...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gallery">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <div className="gallery">
      <div className="gallery-header">
        <h1>Your Crewmate Gallery</h1>
        {crewmates.length === 0 && (
          <div className="empty-state">
            <p>You haven't created any crewmates yet!</p>
            <Link to="/create" className="create-link">
              Create Your First Crewmate
            </Link>
          </div>
        )}
      </div>

      {crewmates.length > 0 && (
        <div className="crewmates-grid">
          {crewmates.map(crewmate => (
            <div key={crewmate.id} className="crewmate-card">
              <Link to={`/crewmate/${crewmate.id}`} className="crewmate-link">
                <div className="crewmate-image">
                  <img src="/crewmates.png" alt={crewmate.name} />
                </div>
                <div className="crewmate-info">
                  <h3>{crewmate.name}</h3>
                  <div className="crewmate-attributes">
                    <div className="attribute">
                      <span className="label">Speed:</span>
                      <span className="value">{getSpeedLabel(crewmate.speed)}</span>
                    </div>
                    <div className="attribute">
                      <span className="label">Color:</span>
                      <span className="value">
                        <span 
                          className={`color-dot ${crewmate.color.toLowerCase()}`}
                        ></span>
                        {crewmate.color}
                      </span>
                    </div>
                  </div>
                  <div className="created-date">
                    Created: {formatDate(crewmate.created_at)}
                  </div>
                </div>
              </Link>
              <div className="crewmate-actions">
                <Link to={`/edit/${crewmate.id}`} className="edit-button">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery