import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import './styles/indian-railways.css'
import './styles/enhanced-railways.css'

// Railway Tracks Background
function RailwayTracks() {
  return <div className="railway-tracks" />
}

// Steam Particles
function SteamParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="steam-particle"
          style={{
            left: `${20 + Math.random() * 60}%`,
            bottom: '-40px',
            animationDelay: `${i * 0.8}s`
          }}
        />
      ))}
    </div>
  )
}

// Sticky Nav - Railway Style
function RailwayNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gradient-to-r from-amber-900/95 to-amber-800/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-5xl">🚂</span>
          <div className="station-board-text text-2xl" style={{ color: '#FDB913' }}>
            TATKALEASY
          </div>
        </div>
        <div className="flex gap-8">
          <a href="/" className="text-amber-200 hover:text-amber-50 transition-all duration-300 font-bold text-lg">
            HOME
          </a>
          <a href="/search" className="text-amber-200 hover:text-amber-50 transition-all duration-300 font-bold text-lg">
            BOOK NOW
          </a>
        </div>
      </div>
    </motion.nav>
  )
}

// Landing Page - Indian Railways Heritage
function LandingPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ tickets: 0, time: 0, rating: 0 })

  useEffect(() => {
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
    <div className="min-h-screen relative overflow-hidden">
      <RailwayNav />
      <RailwayTracks />
      <SteamParticles />

      <div className="relative z-10 pt-32 px-4">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center">
          <motion.div className="text-center max-w-6xl">

            {/* Running Train */}
            <motion.div
              className="train-running mb-12"
              initial={{ x: '-100vw' }}
              animate={{ x: '100vw' }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            >
              🚂💨
            </motion.div>

            {/* Station Board Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="station-board-enhanced mb-8 mx-auto max-w-5xl"
              role="banner"
            >
              <h1 className="station-board-text text-7xl md:text-8xl mb-4">
                TATKAL
                <br />
                <span className="text-5xl md:text-6xl">REIMAGINED</span>
              </h1>
              <div className="flex justify-center gap-4 mt-6" role="presentation" aria-label="Railway signal lights">
                <div className="signal-light-enhanced" aria-label="Green signal"></div>
                <div className="signal-light-enhanced yellow" aria-label="Yellow signal"></div>
                <div className="signal-light-enhanced red" aria-label="Red signal"></div>
              </div>
            </motion.div>

            {/* Flip Board Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="station-board-flip max-w-4xl mx-auto mb-12"
            >
              <div className="text-3xl">
                {['B', 'O', 'O', 'K', ' ', 'I', 'N', ' ', '2', '8', 'S'].map((char, i) => (
                  <span
                    key={i}
                    className="flip-letter"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {char === ' ' ? ' ' : char}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Heritage Banner */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="heritage-banner mb-12"
            >
              Indian Railways Ka Digital Safar
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
            >
              <button
                onClick={() => navigate('/search')}
                className="btn-railway-enhanced"
                aria-label="Book a train ticket"
              >
                🎫 BOOK TICKET
              </button>

              <button
                onClick={() => navigate('/results')}
                className="btn-railway-enhanced"
                style={{
                  background: 'linear-gradient(135deg, #FDB913 0%, #e5a812 100%)',
                  color: '#2C2416',
                  borderColor: '#2C2416'
                }}
                aria-label="Try instant demo without login"
              >
                ⚡ INSTANT DEMO
              </button>
            </motion.div>

            {/* Demo Card - Vintage Ticket Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              className="vintage-ticket max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="platform-circle">J</div>
                <div>
                  <h3 className="text-3xl font-black" style={{ color: '#654321' }}>
                    FOR JUDGES & REVIEWERS
                  </h3>
                  <p className="text-xl text-gray-700">Click "INSTANT DEMO" - No login needed!</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'ROUTE', value: 'BLR → MUM', icon: '🛤️' },
                  { label: 'TIME', value: '28 SECONDS', icon: '⚡' },
                  { label: 'TRAIN', value: 'RAJDHANI', icon: '🚄' },
                  { label: 'STATUS', value: 'READY', icon: '✅' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-4 bg-white/50 rounded-lg">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="text-xs font-bold text-gray-600 uppercase">{item.label}</div>
                    <div className="text-lg font-black" style={{ color: '#654321' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <div className="chai-stall-banner">
                  ☕ NO LOGIN • FULL ACCESS • TEST EVERYTHING
                </div>
              </div>
            </motion.div>

            {/* Platform Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="platform-indicator inline-block mt-8"
            >
              AI-POWERED PLATFORM
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section - Railway Style */}
        <div className="max-w-7xl mx-auto pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="station-board text-center mb-12"
          >
            <h2 className="station-board-text text-5xl">TODAY'S STATS</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎫', value: Math.floor(stats.tickets), label: 'TICKETS BOOKED' },
              { icon: '⚡', value: `${Math.floor(stats.time)}s`, label: 'AVG TIME' },
              { icon: '⭐', value: stats.rating.toFixed(1), label: 'RATING' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="railway-stat"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="text-7xl mb-4">{stat.icon}</div>
                <div className="railway-stat-number">{stat.value}</div>
                <div className="text-xl mt-2 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Search Page - Railway Ticket Booth Style
function SearchPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'AC 2-Tier'
  })

  return (
    <div className="min-h-screen relative">
      <RailwayNav />
      <RailwayTracks />
      <SteamParticles />

      <div className="flex items-center justify-center min-h-screen p-4 pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="train-coach-card max-w-3xl w-full"
        >
          <div className="text-center mb-8">
            <div className="station-board inline-block px-16 py-6">
              <h2 className="station-board-text text-6xl">WHERE TO?</h2>
            </div>
          </div>

          <div className="crossing-gate mb-12"></div>

          <div className="space-y-10">
            {/* From */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-4 text-amber-900 uppercase tracking-widest text-sm font-black flex items-center gap-3">
                <span className="platform-circle" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                  A
                </span>
                DEPARTURE STATION
              </label>
              <input
                type="text"
                className="w-full px-6 py-4 text-2xl font-bold rounded-lg border-4 border-amber-900 focus:border-green-800 focus:outline-none bg-amber-50"
                placeholder="BANGALORE"
                value={formData.from}
                onChange={(e) => setFormData({...formData, from: e.target.value})}
              />
            </motion.div>

            {/* Arrow with Signal Lights */}
            <motion.div
              className="flex justify-center items-center gap-4"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="signal-light"></div>
              <div className="text-6xl">↓</div>
              <div className="signal-light yellow"></div>
            </motion.div>

            {/* To */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-4 text-amber-900 uppercase tracking-widest text-sm font-black flex items-center gap-3">
                <span className="platform-circle" style={{ width: '40px', height: '40px', fontSize: '20px' }}>
                  B
                </span>
                ARRIVAL STATION
              </label>
              <input
                type="text"
                className="w-full px-6 py-4 text-2xl font-bold rounded-lg border-4 border-amber-900 focus:border-green-800 focus:outline-none bg-amber-50"
                placeholder="MUMBAI"
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
              />
            </motion.div>

            {/* Date & Class */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label className="block mb-4 text-amber-900 uppercase tracking-widest text-sm font-black">
                  📅 JOURNEY DATE
                </label>
                <input
                  type="date"
                  className="w-full px-6 py-4 text-xl font-bold rounded-lg border-4 border-amber-900 focus:border-green-800 focus:outline-none bg-amber-50"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-4 text-amber-900 uppercase tracking-widest text-sm font-black">
                  🛏️ COACH CLASS
                </label>
                <select
                  className="w-full px-6 py-4 text-xl font-bold rounded-lg border-4 border-amber-900 focus:border-green-800 focus:outline-none bg-amber-50"
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                >
                  <option>AC 1-Tier</option>
                  <option>AC 2-Tier</option>
                  <option>AC 3-Tier</option>
                  <option>Sleeper</option>
                </select>
              </div>
            </motion.div>

            {/* Search Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => navigate('/results')}
              className="ir-button w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🔍 FIND TRAINS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Results Page - Departure Board Style
function ResultsPage() {
  const navigate = useNavigate()

  const trains = [
    {
      number: '12431',
      name: 'RAJDHANI EXPRESS',
      departure: '10:15',
      arrival: '20:45',
      duration: '10h 30m',
      price: 2100,
      available: 48,
      total: 72,
      platform: '3',
      badge: '🔥 POPULAR'
    },
    {
      number: '12027',
      name: 'SHATABDI EXPRESS',
      departure: '06:00',
      arrival: '14:30',
      duration: '8h 30m',
      price: 1200,
      available: 24,
      total: 72,
      platform: '7',
      badge: '⚡ FASTEST'
    }
  ]

  return (
    <div className="min-h-screen relative">
      <RailwayNav />
      <RailwayTracks />

      <div className="relative z-10 pt-32 px-4 pb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="station-board text-center mb-12"
        >
          <h2 className="station-board-text text-6xl">AVAILABLE TRAINS</h2>
          <div className="flex justify-center gap-4 mt-6">
            <div className="signal-light"></div>
            <div className="signal-light"></div>
            <div className="signal-light"></div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {trains.map((train, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="train-coach-card cursor-pointer"
              onClick={() => navigate('/seats')}
              whileHover={{ y: -12, scale: 1.01 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-6 mb-4">
                    <span className="text-7xl">🚄</span>
                    <div className="flex-1">
                      <h3 className="text-5xl font-black mb-2" style={{ color: '#654321' }}>
                        {train.name}
                      </h3>
                      <div className="flex gap-4 items-center">
                        <div className="train-number-plate">#{train.number}</div>
                        <div className="chai-stall-banner">{train.badge}</div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-center">
                      <div className="station-board-flip py-4">
                        <div className="text-4xl">{train.departure}</div>
                      </div>
                      <div className="text-sm uppercase mt-2 font-bold text-gray-700">DEPART</div>
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-black mb-2" style={{ color: '#654321' }}>
                        {train.duration}
                      </div>
                      <div className="crossing-gate"></div>
                    </div>

                    <div className="text-center">
                      <div className="station-board-flip py-4">
                        <div className="text-4xl">{train.arrival}</div>
                      </div>
                      <div className="text-sm uppercase mt-2 font-bold text-gray-700">ARRIVE</div>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="station-board inline-block px-8 py-6 mb-4">
                    <div className="text-6xl font-black station-board-text">₹{train.price}</div>
                  </div>

                  <div className="platform-indicator inline-block">
                    PLATFORM {train.platform}
                  </div>
                </div>
              </div>

              {/* Availability Bar */}
              <div className="bg-amber-100 rounded-lg p-4 border-2 border-amber-900">
                <div className="flex justify-between text-lg mb-2 font-bold text-amber-900">
                  <span>SEATS AVAILABLE</span>
                  <span className="text-2xl">{train.available}/{train.total}</span>
                </div>
                <div className="h-6 bg-amber-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-600 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(train.available / train.total) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.15 + 0.3 }}
                  />
                </div>
              </div>

              <button
                className="ir-button w-full mt-6"
                onClick={() => navigate('/seats')}
              >
                SELECT TRAIN →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Seats Page - Coach Window Style
function SeatsPage() {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const navigate = useNavigate()

  const seats = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    isBooked: Math.random() > 0.6
  }))

  return (
    <div className="min-h-screen relative">
      <RailwayNav />
      <RailwayTracks />

      <div className="relative z-10 pt-32 px-4 pb-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="station-board text-center mb-12"
        >
          <h2 className="station-board-text text-6xl">SELECT YOUR SEAT</h2>
        </motion.div>

        <div className="train-coach-card">
          <div className="text-center mb-12">
            <div className="heritage-banner inline-block mb-4">
              AC 2-TIER COACH A1
            </div>
            <p className="text-2xl text-gray-700 font-bold">Click on available seats (windows)</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-12 justify-center mb-16">
            <div className="flex items-center gap-4">
              <div className="seat-window available" style={{ width: '60px', height: '60px' }} />
              <span className="text-xl font-bold text-green-800">AVAILABLE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="seat-window booked" style={{ width: '60px', height: '60px' }} />
              <span className="text-xl font-bold text-gray-600">BOOKED</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="seat-window selected" style={{ width: '60px', height: '60px' }} />
              <span className="text-xl font-bold" style={{ color: '#FDB913' }}>SELECTED</span>
            </div>
          </div>

          {/* Seat Grid - Coach Windows */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-16">
            {seats.map((seat, idx) => (
              <motion.button
                key={seat.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className={`seat-window ${
                  seat.isBooked
                    ? 'booked'
                    : selectedSeat === seat.id
                    ? 'selected'
                    : 'available'
                }`}
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
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="text-center"
              >
                <div className="station-board inline-block px-16 py-8 mb-8">
                  <p className="text-3xl station-board-text mb-2">SELECTED SEAT</p>
                  <p className="text-7xl font-black station-board-text">#{selectedSeat}</p>
                </div>

                <button
                  onClick={() => navigate('/success')}
                  className="ir-button"
                >
                  CONFIRM & PAY ₹2,100 →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Success Page - Vintage Ticket
function SuccessPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <RailwayNav />
      <RailwayTracks />

      {/* Confetti */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            fontSize: `${20 + Math.random() * 20}px`
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
        >
          {['🎉', '🎊', '🚂', '🎫', '⭐'][i % 5]}
        </motion.div>
      ))}

      <div className="flex items-center justify-center min-h-screen p-4 pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="train-coach-card max-w-5xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="text-9xl mb-8 text-center"
          >
            🎉
          </motion.div>

          <div className="station-board text-center mb-12">
            <h2 className="station-board-text text-7xl">TICKET CONFIRMED!</h2>
          </div>

          {/* Vintage Ticket */}
          <motion.div
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="vintage-ticket my-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'PNR', value: '8234567890' },
                { label: 'TRAIN', value: '12431 RAJDHANI' },
                { label: 'DATE', value: 'AUG 26, 2026' },
                { label: 'SEAT', value: 'A1-24 LOWER' },
                { label: 'FROM', value: 'BANGALORE' },
                { label: 'TO', value: 'MUMBAI' },
                { label: 'DEPARTURE', value: '10:15 AM' },
                { label: 'AMOUNT', value: '₹2,100' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <div className="text-xs font-bold text-gray-600 uppercase mb-1">{item.label}</div>
                  <div className="text-2xl font-black" style={{ color: '#654321' }}>{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mb-8">
              <div className="station-board inline-block px-12 py-12">
                <div className="text-8xl font-black station-board-text">QR</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="heritage-banner mb-12"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            BOOKED IN 28 SECONDS! 🚀
          </motion.div>

          <div className="flex flex-wrap gap-6 justify-center">
            <button className="ir-button">📥 DOWNLOAD</button>
            <button className="ir-button">📤 SHARE</button>
            <button className="ir-button" onClick={() => window.location.href = '/'}>
              🔁 BOOK ANOTHER
            </button>
          </div>
        </motion.div>
      </div>
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
