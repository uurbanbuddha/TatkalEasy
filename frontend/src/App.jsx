import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './index.css'
import ChatWidget from './components/ChatWidget'

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated train in background */}
      <motion.div
        className="absolute top-10 text-6xl"
        animate={{ x: ['-100vw', '100vw'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      >
        🚂
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          TATKAL MADE EASY
        </h1>
        <p className="text-2xl mb-8 text-blue-200">
          Book your ticket in 30 seconds, not 5 minutes
        </p>

        {/* Stats with count-up animation */}
        <div className="flex gap-8 justify-center mb-12">
          <motion.div
            className="glass-card p-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-bold text-tatkal-orange">2,847</div>
            <div className="text-sm">Tickets booked today</div>
          </motion.div>
          <motion.div
            className="glass-card p-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-bold text-green-400">28s</div>
            <div className="text-sm">Avg booking time</div>
          </motion.div>
          <motion.div
            className="glass-card p-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl font-bold text-yellow-400">4.9/5</div>
            <div className="text-sm">Satisfaction</div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          className="btn-primary text-2xl px-12 py-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/search')}
        >
          Start Booking →
        </motion.button>

        {/* AI Badge */}
        <motion.div
          className="mt-8 glass-card inline-block px-6 py-3"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">
            ✨ Powered by OpenAI Codex
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Search Page Component
function SearchPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    from: 'Bangalore',
    to: 'Mumbai',
    date: 'Tomorrow',
    class: 'AC 2-Tier'
  })

  const handleSearch = () => {
    navigate('/results')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 max-w-2xl w-full"
      >
        <h2 className="text-4xl font-bold mb-8 text-center">
          Where do you want to go?
        </h2>

        <div className="space-y-6">
          {/* From */}
          <div>
            <label className="block mb-2 text-sm font-semibold">FROM 🏙️</label>
            <input
              type="text"
              className="input-field"
              value={formData.from}
              onChange={(e) => setFormData({...formData, from: e.target.value})}
            />
          </div>

          {/* Animated arrow */}
          <div className="text-center text-4xl animate-bounce">↓</div>

          {/* To */}
          <div>
            <label className="block mb-2 text-sm font-semibold">TO 🌆</label>
            <input
              type="text"
              className="input-field"
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm font-semibold">DATE 📅</label>
            <input
              type="text"
              className="input-field"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          {/* Class */}
          <div>
            <label className="block mb-2 text-sm font-semibold">CLASS 🛏️</label>
            <select
              className="input-field"
              value={formData.class}
              onChange={(e) => setFormData({...formData, class: e.target.value})}
            >
              <option>AC 1-Tier</option>
              <option>AC 2-Tier</option>
              <option>AC 3-Tier</option>
              <option>Sleeper</option>
            </select>
          </div>

          {/* Search Button */}
          <motion.button
            className="btn-primary w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
          >
            Find Trains 🔍
          </motion.button>

          {/* OR Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 glass-card">OR</span>
            </div>
          </div>

          {/* AI Chat Button */}
          <motion.button
            className="btn-secondary w-full"
            whileHover={{ scale: 1.02 }}
            onClick={() => alert('AI Chat coming soon!')}
          >
            💬 Just tell me where you want to go
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// Train Results Page
function ResultsPage() {
  const navigate = useNavigate()

  const trains = [
    {
      name: 'Rajdhani Express',
      number: '12431',
      departure: '10:15 AM',
      arrival: '8:45 PM',
      duration: '10h 30m',
      price: 2100,
      available: 48,
      total: 72,
      badge: '🔥 Popular'
    },
    {
      name: 'Shatabdi Express',
      number: '12027',
      departure: '6:00 AM',
      arrival: '2:30 PM',
      duration: '8h 30m',
      price: 1200,
      available: 24,
      total: 72,
      badge: '⚡ Fast'
    }
  ]

  return (
    <div className="min-h-screen p-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Available Trains
      </motion.h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {trains.map((train, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="train-card"
            onClick={() => navigate('/seats')}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">🚆 {train.name}</h3>
                  <span className="text-sm glass-card px-3 py-1">{train.badge}</span>
                </div>
                <p className="text-blue-200">Train #{train.number}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-tatkal-orange">₹{train.price}</div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <div className="text-2xl font-bold">{train.departure}</div>
                <div className="text-sm text-blue-200">Departure</div>
              </div>
              <div className="flex-1 mx-4">
                <div className="text-center text-sm mb-1">{train.duration}</div>
                <div className="h-1 bg-gradient-to-r from-tatkal-orange to-yellow-400 rounded"></div>
              </div>
              <div>
                <div className="text-2xl font-bold">{train.arrival}</div>
                <div className="text-sm text-blue-200">Arrival</div>
              </div>
            </div>

            {/* Availability Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Seat Availability</span>
                <span className="font-bold">{train.available}/{train.total}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${(train.available / train.total) * 100}%` }}
                  transition={{ duration: 1, delay: idx * 0.2 + 0.3 }}
                />
              </div>
            </div>

            <motion.button
              className="btn-primary w-full mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Now →
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Seat Selection Page
function SeatsPage() {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const navigate = useNavigate()

  // Mock seat data (10 rows, 4 seats per row)
  const seats = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    isBooked: Math.random() > 0.5
  }))

  const handleBook = () => {
    if (selectedSeat) {
      navigate('/success')
    }
  }

  return (
    <div className="min-h-screen p-8">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Select Your Seat
      </motion.h2>

      <div className="max-w-4xl mx-auto glass-card p-8">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold mb-2">AC 2-Tier Coach A1</h3>
          <p className="text-blue-200">Click to select your preferred seat</p>
        </div>

        {/* Seat Legend */}
        <div className="flex gap-6 justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="seat seat-available w-8 h-8"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat seat-booked w-8 h-8"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat seat-selected w-8 h-8"></div>
            <span>Selected</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {seats.map((seat) => (
            <motion.button
              key={seat.id}
              className={`seat ${
                seat.isBooked
                  ? 'seat-booked'
                  : selectedSeat === seat.id
                  ? 'seat-selected'
                  : 'seat-available'
              }`}
              whileHover={!seat.isBooked ? { scale: 1.1 } : {}}
              whileTap={!seat.isBooked ? { scale: 0.9 } : {}}
              onClick={() => !seat.isBooked && setSelectedSeat(seat.id)}
              disabled={seat.isBooked}
            >
              {seat.id}
            </motion.button>
          ))}
        </div>

        {selectedSeat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-xl mb-4">
              Selected: <span className="font-bold text-yellow-400">Seat #{selectedSeat}</span>
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBook}
            >
              Confirm & Pay →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Success Page with Confetti
function SuccessPage() {
  const confettiColors = ['#ff6b35', '#f7931e', '#ffd700', '#4caf50', '#2196f3']

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
            top: '-10px'
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360 * 3],
            opacity: [1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-12 text-center max-w-2xl relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>

        <h2 className="text-5xl font-bold mb-4">TICKET CONFIRMED!</h2>

        {/* Ticket Card */}
        <motion.div
          className="glass-card p-8 my-8"
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-blue-200">PNR:</span>
              <span className="font-bold">8234567890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Train:</span>
              <span className="font-bold">12431 Rajdhani Express</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Date:</span>
              <span className="font-bold">Aug 26, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">Seat:</span>
              <span className="font-bold">A1-24 (Lower Berth)</span>
            </div>
            <div className="flex justify-between border-t border-white/20 pt-3 mt-3">
              <span className="text-blue-200">Amount:</span>
              <span className="font-bold text-2xl text-green-400">₹2,100</span>
            </div>
          </div>

          {/* Mock QR Code */}
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center text-black text-4xl">
              QR
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-2xl font-bold text-tatkal-orange mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Booked in 28 seconds! 🚀
        </motion.div>

        <div className="flex gap-4 justify-center">
          <button className="btn-secondary">Download</button>
          <button className="btn-secondary">Share</button>
          <button className="btn-primary" onClick={() => window.location.href = '/'}>
            Book Another
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Main App with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/seats" element={<SeatsPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>

      {/* Floating AI Chat Widget - appears on all pages */}
      <ChatWidget />
    </Router>
  )
}

export default App
