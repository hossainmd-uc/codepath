import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from '../components/Dashboard'
import CryptoDetail from '../components/CryptoDetail'
import FloatingSidebar from '../components/FloatingSidebar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <FloatingSidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crypto/:id" element={<CryptoDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
