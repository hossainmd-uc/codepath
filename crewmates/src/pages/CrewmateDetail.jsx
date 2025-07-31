import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCrewmateById, deleteCrewmate } from '../services/crewmateService'
import './CrewmateDetail.css'

function CrewmateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadCrewmate()
  }, [id])

  const loadCrewmate = async () => {
    try {
      setLoading(true)
      const data = await getCrewmateById(id)
      setCrewmate(data)
    } catch (err) {
      setError('Failed to load crewmate')
      console.error('Error loading crewmate:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this crewmate? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      await deleteCrewmate(id)
      navigate('/gallery')
    } catch (err) {
      alert('Failed to delete crewmate. Please try again.')
      console.error('Error deleting crewmate:', err)
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
      <div className="crewmate-detail">
        <div className="loading">Loading crewmate...</div>
      </div>
    )
  }

  if (error || !crewmate) {
    return (
      <div className="crewmate-detail">
        <div className="error">
          {error || 'Crewmate not found'}
          <Link to="/gallery" className="back-link">
            Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="crewmate-detail">
      <div className="detail-container">
        <div className="detail-header">
          <Link to="/gallery" className="back-button">
            ← Back to Gallery
          </Link>
          <h1>{crewmate.name}</h1>
        </div>

        <div className="detail-content">
          <div className="crewmate-image-section">
            <div className="detail-image">
              <img src="/crewmates.png" alt={crewmate.name} />
            </div>
          </div>

          <div className="crewmate-info-section">
            <div className="info-card">
              <h2>Crewmate Details</h2>
              
              <div className="detail-attributes">
                <div className="detail-attribute">
                  <span className="attribute-label">Name:</span>
                  <span className="attribute-value">{crewmate.name}</span>
                </div>
                
                <div className="detail-attribute">
                  <span className="attribute-label">Speed:</span>
                  <span className="attribute-value">{getSpeedLabel(crewmate.speed)} ({crewmate.speed}/4)</span>
                </div>
                
                <div className="detail-attribute">
                  <span className="attribute-label">Color:</span>
                  <span className="attribute-value">
                    <span className={`color-indicator ${crewmate.color.toLowerCase()}`}></span>
                    {crewmate.color}
                  </span>
                </div>
                
                <div className="detail-attribute">
                  <span className="attribute-label">Created:</span>
                  <span className="attribute-value">{formatDate(crewmate.created_at)}</span>
                </div>
              </div>

              <div className="detail-actions">
                <Link to={`/edit/${crewmate.id}`} className="edit-button">
                  Edit Crewmate
                </Link>
                <button 
                  onClick={handleDelete} 
                  className="delete-button"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete Crewmate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrewmateDetail