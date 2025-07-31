import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCrewmateById, updateCrewmate, deleteCrewmate } from '../services/crewmateService'
import './EditCrewmate.css'

const speedOptions = [
  { value: 1, label: 'Slow' },
  { value: 2, label: 'Normal' },
  { value: 3, label: 'Fast' },
  { value: 4, label: 'Super Fast' }
]

const colorOptions = [
  'Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown', 'Cyan', 'Lime'
]

function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    speed: 1,
    color: 'Red'
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCrewmate()
  }, [id])

  const loadCrewmate = async () => {
    try {
      setLoading(true)
      const data = await getCrewmateById(id)
      setCrewmate(data)
      setFormData({
        name: data.name,
        speed: data.speed,
        color: data.color
      })
    } catch (err) {
      setError('Failed to load crewmate')
      console.error('Error loading crewmate:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Please enter a name for your crewmate')
      return
    }

    setSubmitting(true)
    
    try {
      await updateCrewmate(id, formData)
      navigate(`/crewmate/${id}`)
    } catch (error) {
      console.error('Error updating crewmate:', error)
      alert('Failed to update crewmate. Please try again.')
    } finally {
      setSubmitting(false)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'speed' ? parseInt(value) : value
    }))
  }

  if (loading) {
    return (
      <div className="edit-crewmate">
        <div className="loading">Loading crewmate...</div>
      </div>
    )
  }

  if (error || !crewmate) {
    return (
      <div className="edit-crewmate">
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
    <div className="edit-crewmate">
      <div className="edit-content">
        <div className="edit-header">
          <Link to={`/crewmate/${id}`} className="back-button">
            ← Back to {crewmate.name}
          </Link>
          <h1>Update {crewmate.name}</h1>
        </div>
        
        <div className="crewmate-preview">
          <img src="/crewmates.png" alt="Crewmates" className="preview-image" />
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="current-stats">
            <h3>Current Stats</h3>
            <p><strong>Name:</strong> {crewmate.name}</p>
            <p><strong>Speed:</strong> {speedOptions.find(s => s.value === crewmate.speed)?.label}</p>
            <p><strong>Color:</strong> {crewmate.color}</p>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter crewmate name"
              required
            />
          </div>

          <div className="form-group">
            <label>Speed (mph):</label>
            <div className="speed-options">
              {speedOptions.map(option => (
                <label key={option.value} className="radio-option">
                  <input
                    type="radio"
                    name="speed"
                    value={option.value}
                    checked={formData.speed === option.value}
                    onChange={handleInputChange}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Color:</label>
            <div className="color-options">
              {colorOptions.map(color => (
                <label key={color} className="color-option">
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={formData.color === color}
                    onChange={handleInputChange}
                  />
                  <span className={`color-swatch ${color.toLowerCase()}`}></span>
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="update-button" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Crewmate'}
            </button>
            <button 
              type="button"
              onClick={handleDelete} 
              className="delete-button"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Crewmate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCrewmate