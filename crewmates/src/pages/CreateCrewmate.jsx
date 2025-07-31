import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCrewmate } from '../services/crewmateService'
import './CreateCrewmate.css'

const speedOptions = [
  { value: 1, label: 'Slow' },
  { value: 2, label: 'Normal' },
  { value: 3, label: 'Fast' },
  { value: 4, label: 'Super Fast' }
]

const colorOptions = [
  'Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown', 'Cyan', 'Lime'
]

function CreateCrewmate() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    speed: 1,
    color: 'Red'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      alert('Please enter a name for your crewmate')
      return
    }

    setIsSubmitting(true)
    
    try {
      await createCrewmate(formData)
      navigate('/gallery')
    } catch (error) {
      console.error('Error creating crewmate:', error)
      alert('Failed to create crewmate. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'speed' ? parseInt(value) : value
    }))
  }

  return (
    <div className="create-crewmate">
      <div className="create-content">
        <h1>Create a New Crewmate</h1>
        
        <div className="crewmate-preview">
          <img src="/crewmates.png" alt="Crewmates" className="preview-image" />
        </div>

        <form onSubmit={handleSubmit} className="create-form">
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

          <button type="submit" className="create-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Crewmate'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCrewmate