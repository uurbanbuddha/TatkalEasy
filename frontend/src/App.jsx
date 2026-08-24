import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import './styles/futuristic.css'

// Particles Component
function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  )
}

// Cyber Grid Background
function CyberGrid() {
  return <div className="cyber-grid" />
}

// Landing Page - FUTURISTIC
function LandingPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ tickets: 0, time: 0, rating: 0 })

  useEffect(() => {
    // Animate stats counting up
    const interval = setInterval(() => {
      setStats(prev => ({
        tickets: Math.min(prev.tickets + 47, 2847),
        time: Math.min(prev.time + 1, 28),
        rating: Math.min(prev.rating + 0.1, 4.9)
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <CyberGrid />
      <Particles />

      <div className="relative z-10 text-center max-w-6xl">
        {/* Cyber Train Animation */}
        <motion.div
          className="cyber-train mb-8"
          animate={{
            x: ['-100vw', '100vw'],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{
            x: { duration: 6, repeat: Infinity, ease: 'linear' },
            rotate: { duration: 2, repeat: Infinity }
          }}
        >
          🚄
        </motion.div>

        {/* Holographic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-8xl md:text-9xl font-black mb-6 text-hologram"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          TATKAL
          <br />
          <span className="text-6xl md:text-7xl">REIMAGINED</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="neon-line w-64 mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl md:text-3xl mb-12 text-cyan-200 font-light"
        >
          Book in <span className="text-hologram font-bold">30 seconds</span>, not 5 minutes
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: '🎫', value: Math.floor(stats.tickets), label: 'Tickets Booked Today', color: 'cyan' },
            { icon: '⚡', value: `${Math.floor(stats.time)}s`, label: 'Avg Booking Time', color: 'purple' },
            { icon: '⭐', value: stats.rating.toFixed(1), label: 'User Rating', color: 'pink' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card-futuristic p-6"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <div className="stat-counter mb-2">{stat.value}</div>
              <div className="text-sm text-cyan-300 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/search')}
          className="btn-neon"
        >
          🚀 START BOOKING
        </motion.button>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 inline-block badge-futuristic"
        >
          <span>✨</span>
          <span>AI-POWERED</span>
        </motion.div>
      </div>
    </div>
  )
}

// Search Page - FUTURISTIC
function SearchPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'AC 2-Tier'
  })

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <CyberGrid />
      <Particles />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-futuristic p-12 max-w-2xl w-full relative z-10"
      >
        <h2 className="text-5xl font-black mb-8 text-center text-hologram">
          WHERE TO?
        </h2>

        <div className="neon-line w-32 mx-auto mb-12" />

        <div className="space-y-8">
          {/* From */}
          <div>
            <label className="block mb-3 text-cyan-300 uppercase tracking-wider text-sm font-bold">
              🏙️ FROM
            </label>
            <input
              type="text"
              className="input-futuristic w-full"
              placeholder="Bangalore"
              value={formData.from}
              onChange={(e) => setFormData({...formData, from: e.target.value})}
            />
          </div>

          {/* Animated Arrow */}
          <motion.div
            className="text-center text-5xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>

          {/* To */}
          <div>
            <label className="block mb-3 text-cyan-300 uppercase tracking-wider text-sm font-bold">
              🌆 TO
            </label>
            <input
              type="text"
              className="input-futuristic w-full"
              placeholder="Mumbai"
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
            />
          </div>

          {/* Date & Class Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 text-cyan-300 uppercase tracking-wider text-sm font-bold">
                📅 DATE
              </label>
              <input
                type="date"
                className="input-futuristic w-full"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>

            <div>
              <label className="block mb-3 text-cyan-300 uppercase tracking-wider text-sm font-bold">
                🛏️ CLASS
              </label>
              <select
                className="input-futuristic w-full"
                value={formData.class}
                onChange={(e) => setFormData({...formData, class: e.target.value})}
              >
                <option>AC 1-Tier</option>
                <option>AC 2-Tier</option>
                <option>AC 3-Tier</option>
                <option>Sleeper</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/results')}
            className="btn-neon w-full"
          >
            🔍 FIND TRAINS
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// Train Results - FUTURISTIC
function ResultsPage() {
  const navigate = useNavigate()

  const trains = [
    {
      number: '12431',
      name: 'Rajdhani Express',
      departure: '10:15',
      arrival: '20:45',
      duration: '10h 30m',
      price: 2100,
      available: 48,
      total: 72,
      badge: '🔥 POPULAR'
    },
    {
      number: '12027',
      name: 'Shatabdi Express',
      departure: '06:00',
      arrival: '14:30',
      duration: '8h 30m',
      price: 1200,
      available: 24,
      total: 72,
      badge: '⚡ FASTEST'
    }
  ]

  return (
    <div className="min-h-screen p-8 relative">
      <CyberGrid />
      <Particles />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-black mb-12 text-center text-hologram"
        >
          AVAILABLE TRAINS
        </motion.h2>

        <div className="space-y-6">
          {trains.map((train, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="glass-card-futuristic train-card-futuristic p-8"
              onClick={() => navigate('/seats')}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-4xl">🚄</span>
                    <h3 className="text-3xl font-bold text-white">{train.name}</h3>
                    <span className="badge-futuristic">{train.badge}</span>
                  </div>
                  <p className="text-cyan-300">Train #{train.number}</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-black text-hologram">₹{train.price}</div>
                </div>
              </div>

              {/* Time Display */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-300">{train.departure}</div>
                  <div className="text-sm text-gray-400 uppercase mt-1">Departure</div>
                </div>

                <div className="flex-1 mx-8 relative">
                  <div className="text-center text-sm text-cyan-300 mb-2">{train.duration}</div>
                  <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full" />
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-300">{train.arrival}</div>
                  <div className="text-sm text-gray-400 uppercase mt-1">Arrival</div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-cyan-300 uppercase">Seat Availability</span>
                  <span className="text-white font-bold">{train.available}/{train.total}</span>
                </div>
                <div className="progress-bar-futuristic">
                  <motion.div
                    className="progress-fill-futuristic"
                    initial={{ width: 0 }}
                    animate={{ width: `${(train.available / train.total) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.2 + 0.3 }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-neon w-full mt-6"
              >
                SELECT TRAIN →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Seat Selection - FUTURISTIC WITH VISUAL MAP
function SeatsPage() {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const navigate = useNavigate()

  const seats = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    isBooked: Math.random() > 0.6
  }))

  return (
    <div className="min-h-screen p-8 relative">
      <CyberGrid />
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-6xl font-black mb-4 text-center text-hologram"
        >
          SELECT YOUR SEAT
        </motion.h2>

        <div className="neon-line w-48 mx-auto mb-12" />

        <div className="glass-card-futuristic p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-cyan-300 mb-2">AC 2-TIER COACH A1</h3>
            <p className="text-gray-400">Click to select your preferred seat</p>
          </div>

          {/* Seat Legend */}
          <div className="flex gap-8 justify-center mb-12">
            <div className="flex items-center gap-3">
              <div className="seat-futuristic seat-available-futuristic w-12 h-12" />
              <span className="text-cyan-300">Available</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="seat-futuristic seat-booked-futuristic w-12 h-12" />
              <span className="text-gray-400">Booked</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="seat-futuristic seat-selected-futuristic w-12 h-12" />
              <span className="text-hologram font-bold">Selected</span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-12">
            {seats.map((seat) => (
              <motion.button
                key={seat.id}
                className={`seat-futuristic ${
                  seat.isBooked
                    ? 'seat-booked-futuristic'
                    : selectedSeat === seat.id
                    ? 'seat-selected-futuristic'
                    : 'seat-available-futuristic'
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

          {/* Selected Info */}
          <AnimatePresence>
            {selectedSeat && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-center"
              >
                <p className="text-2xl mb-6">
                  Selected: <span className="text-hologram font-black text-4xl">SEAT #{selectedSeat}</span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/success')}
                  className="btn-neon"
                >
                  CONFIRM & PAY →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Success Page - FUTURISTIC
function SuccessPage() {
  const confettiColors = ['#00f3ff', '#9d4edd', '#ff006e', '#fb5607', '#ffd60a']

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <CyberGrid />

      {/* Confetti */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
            top: '-10px',
            boxShadow: `0 0 10px ${confettiColors[i % confettiColors.length]}`
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
        className="glass-card-futuristic p-12 text-center max-w-3xl relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="text-9xl mb-6"
        >
          🎉
        </motion.div>

        <h2 className="text-7xl font-black mb-6 text-hologram">
          TICKET CONFIRMED!
        </h2>

        <div className="neon-line w-64 mx-auto mb-12" />

        {/* Ticket Card */}
        <motion.div
          className="glass-card-futuristic p-8 my-8"
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-6 text-left">
            {[
              { label: 'PNR', value: '8234567890' },
              { label: 'Train', value: '12431 Rajdhani' },
              { label: 'Date', value: 'Aug 26, 2026' },
              { label: 'Seat', value: 'A1-24 Lower' },
              { label: 'From', value: 'Bangalore' },
              { label: 'To', value: 'Mumbai' },
              { label: 'Departure', value: '10:15 AM' },
              { label: 'Amount', value: '₹2,100' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-cyan-400 text-sm uppercase mb-1">{item.label}</div>
                <div className="text-white text-xl font-bold">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-40 h-40 bg-white rounded-lg flex items-center justify-center text-black text-6xl">
              QR
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-4xl font-black text-hologram mb-8"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Booked in 28 seconds! 🚀
        </motion.div>

        <div className="flex gap-4 justify-center">
          <button className="btn-neon">📥 DOWNLOAD</button>
          <button className="btn-neon">📤 SHARE</button>
          <button className="btn-neon" onClick={() => window.location.href = '/'}>
            🔁 BOOK ANOTHER
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// Main App
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
    </Router>
  )
}

export default App
