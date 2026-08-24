import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import './index.css'
import './styles/futuristic.css'
import './styles/ultra-premium.css'

// ============ PREMIUM COMPONENTS ============

// Custom Cursor (Technique #1)
function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 4)
      cursorY.set(e.clientY - 4)
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <>
      <motion.div className="cursor-dot" style={{ left: cursorXSpring, top: cursorYSpring }} />
      <motion.div className="cursor-outline" style={{ left: cursorXSpring, top: cursorYSpring }} />
    </>
  )
}

// Particles (Technique #2)
function Particles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(40)].map((_, i) => (
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

// Cyber Grid (Technique #3)
function CyberGrid() {
  return <div className="cyber-grid" />
}

// Scroll Progress (Technique #4)
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX, transformOrigin: 'left' }}
    />
  )
}

// Sticky Nav (Technique #5)
function StickyNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`nav-sticky ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <motion.div
          className="text-2xl font-black text-hologram"
          whileHover={{ scale: 1.05 }}
        >
          TATKALEASY
        </motion.div>
        <div className="flex gap-8">
          <a href="/" className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hoverable">Home</a>
          <a href="/search" className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hoverable">Book</a>
        </div>
      </div>
    </motion.nav>
  )
}

// Scroll Reveal Hook (Technique #6)
function useScrollReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

// Magnetic Button (Technique #7)
function MagneticButton({ children, onClick, className = '' }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setPosition({ x, y })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      className={`btn-ultra hoverable ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.button>
  )
}

// ============ PAGES ============

// Landing Page
function LandingPage() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ tickets: 0, time: 0, rating: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -75])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const [statsRef, statsVisible] = useScrollReveal()

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
    <div className="min-h-screen page-transition">
      <ScrollProgress />
      <StickyNav />
      <CyberGrid />
      <Particles />

      {/* Hero Section */}
      <motion.div style={{ opacity }} className="relative z-10 pt-32">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <motion.div style={{ y: y1 }} className="text-center max-w-6xl">

            {/* Animated Cyber Train */}
            <motion.div
              className="cyber-train mb-12 text-8xl"
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

            {/* Fragmented Typography (Technique #8) */}
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="text-display mb-8"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                TAT
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                KAL
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-6xl md:text-7xl"
              >
                REIMAGINED
              </motion.span>
            </motion.h1>

            {/* Divider with Glow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="divider-premium w-96 mx-auto mb-12"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-3xl md:text-4xl mb-16 text-cyan-200 font-light"
            >
              Book in <span className="text-hologram font-black text-5xl">30 seconds</span>, not 5 minutes
            </motion.p>

            {/* Magnetic CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <MagneticButton onClick={() => navigate('/search')}>
                🚀 START BOOKING
              </MagneticButton>
            </motion.div>

            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 tag-premium inline-block"
            >
              <span>✨</span>
              <span>AI-POWERED BOOKING</span>
            </motion.div>

          </motion.div>
        </div>

        {/* Stats Bento Grid (Technique #9) */}
        <motion.div
          style={{ y: y2 }}
          ref={statsRef}
          className={`scroll-reveal ${statsVisible ? 'revealed' : ''} max-w-7xl mx-auto px-4 pb-32`}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={statsVisible ? { opacity: 1 } : {}}
            className="text-6xl font-black mb-16 text-center text-hologram"
          >
            TRUSTED BY THOUSANDS
          </motion.h2>

          <div className="bento-grid">
            {[
              { icon: '🎫', value: Math.floor(stats.tickets), label: 'Tickets Booked Today', span: 'col-span-2' },
              { icon: '⚡', value: `${Math.floor(stats.time)}s`, label: 'Avg Booking Time', span: '' },
              { icon: '⭐', value: stats.rating.toFixed(1), label: 'User Rating', span: '' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className={`bento-card hoverable ${stat.span}`}
                initial={{ opacity: 0, y: 60 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <div className="text-8xl mb-6">{stat.icon}</div>
                <div className="stat mb-4">{stat.value}</div>
                <div className="text-xl text-cyan-300 uppercase tracking-widest font-black">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Search Page
function SearchPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'AC 2-Tier'
  })

  return (
    <div className="min-h-screen page-transition">
      <ScrollProgress />
      <StickyNav />
      <CyberGrid />
      <Particles />

      <div className="flex items-center justify-center min-h-screen p-4 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-premium max-w-3xl w-full relative z-10"
        >
          <h2 className="text-display text-7xl mb-6 text-center">
            WHERE TO?
          </h2>

          <div className="divider-premium w-48 mx-auto mb-16" />

          <div className="space-y-12">
            {/* From */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block mb-4 text-cyan-300 uppercase tracking-widest text-sm font-black">
                🏙️ DEPARTURE CITY
              </label>
              <input
                type="text"
                className="input-premium hoverable"
                placeholder="Bangalore"
                value={formData.from}
                onChange={(e) => setFormData({...formData, from: e.target.value})}
              />
            </motion.div>

            {/* Animated Arrow */}
            <motion.div
              className="text-center text-7xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.div>

            {/* To */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block mb-4 text-cyan-300 uppercase tracking-widest text-sm font-black">
                🌆 ARRIVAL CITY
              </label>
              <input
                type="text"
                className="input-premium hoverable"
                placeholder="Mumbai"
                value={formData.to}
                onChange={(e) => setFormData({...formData, to: e.target.value})}
              />
            </motion.div>

            {/* Date & Class */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div>
                <label className="block mb-4 text-cyan-300 uppercase tracking-widest text-sm font-black">
                  📅 TRAVEL DATE
                </label>
                <input
                  type="date"
                  className="input-premium hoverable"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-4 text-cyan-300 uppercase tracking-widest text-sm font-black">
                  🛏️ CLASS
                </label>
                <select
                  className="input-premium hoverable"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <MagneticButton onClick={() => navigate('/results')} className="w-full">
                🔍 FIND TRAINS
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Results Page
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
    <div className="min-h-screen page-transition">
      <ScrollProgress />
      <StickyNav />
      <CyberGrid />
      <Particles />

      <div className="relative z-10 pt-32 px-4 pb-16 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display text-7xl mb-6 text-center"
        >
          AVAILABLE TRAINS
        </motion.h2>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="divider-premium w-64 mx-auto mb-16"
        />

        <div className="space-y-8">
          {trains.map((train, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="card-premium train-card-premium hoverable cursor-pointer"
              onClick={() => navigate('/seats')}
              whileHover={{ y: -16, scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                <div className="flex items-center gap-6">
                  <span className="text-7xl">🚄</span>
                  <div>
                    <h3 className="text-5xl font-black text-white mb-2">{train.name}</h3>
                    <p className="text-cyan-300 text-xl">Train #{train.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-7xl font-black text-hologram">₹{train.price}</div>
                  <div className="tag-premium mt-4">{train.badge}</div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-center">
                  <div className="text-6xl font-black text-cyan-300">{train.departure}</div>
                  <div className="text-sm text-gray-400 uppercase mt-2 tracking-wider">Departure</div>
                </div>

                <div className="flex-1 mx-12 relative">
                  <div className="text-center text-xl text-cyan-300 mb-3 font-bold">{train.duration}</div>
                  <div className="h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white rounded-full"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{ opacity: 0.3, width: '50%' }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-6xl font-black text-cyan-300">{train.arrival}</div>
                  <div className="text-sm text-gray-400 uppercase mt-2 tracking-wider">Arrival</div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <div className="flex justify-between text-lg mb-3">
                  <span className="text-cyan-300 uppercase font-black tracking-widest">Seat Availability</span>
                  <span className="text-white font-black text-3xl">{train.available}/{train.total}</span>
                </div>
                <div className="progress-premium">
                  <motion.div
                    className="progress-fill-premium"
                    initial={{ width: 0 }}
                    animate={{ width: `${(train.available / train.total) * 100}%` }}
                    transition={{ duration: 1.2, delay: idx * 0.15 + 0.3 }}
                  />
                </div>
              </div>

              <MagneticButton className="w-full mt-8">
                SELECT TRAIN →
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Seats Page
function SeatsPage() {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const navigate = useNavigate()

  const seats = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    isBooked: Math.random() > 0.6
  }))

  return (
    <div className="min-h-screen page-transition">
      <ScrollProgress />
      <StickyNav />
      <CyberGrid />
      <Particles />

      <div className="relative z-10 pt-32 px-4 pb-16 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-display text-7xl mb-6 text-center"
        >
          SELECT YOUR SEAT
        </motion.h2>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="divider-premium w-64 mx-auto mb-16"
        />

        <div className="card-premium">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-black text-cyan-300 mb-3">AC 2-TIER COACH A1</h3>
            <p className="text-2xl text-gray-400">Click to select your preferred seat</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-12 justify-center mb-20">
            <div className="flex items-center gap-4">
              <div className="seat-premium available w-20 h-20" />
              <span className="text-cyan-300 text-xl font-bold">Available</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="seat-premium booked w-20 h-20" />
              <span className="text-gray-400 text-xl font-bold">Booked</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="seat-premium selected w-20 h-20" />
              <span className="text-hologram text-xl font-black">Selected</span>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 mb-20">
            {seats.map((seat, idx) => (
              <motion.button
                key={seat.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className={`seat-premium hoverable ${
                  seat.isBooked
                    ? 'booked'
                    : selectedSeat === seat.id
                    ? 'selected'
                    : 'available'
                }`}
                whileHover={!seat.isBooked ? { scale: 1.15, y: -8 } : {}}
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
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                className="text-center"
              >
                <p className="text-4xl mb-10">
                  Selected: <span className="text-display text-6xl">SEAT #{selectedSeat}</span>
                </p>
                <MagneticButton onClick={() => navigate('/success')}>
                  CONFIRM & PAY ₹2,100 →
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// Success Page
function SuccessPage() {
  const confettiColors = ['#00f3ff', '#9d4edd', '#ff006e', '#fb5607', '#ffd60a']

  return (
    <div className="min-h-screen page-transition relative overflow-hidden">
      <ScrollProgress />
      <StickyNav />
      <CyberGrid />

      {/* Confetti */}
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${8 + Math.random() * 8}px`,
            height: `${8 + Math.random() * 8}px`,
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
            top: '-20px',
            boxShadow: `0 0 20px ${confettiColors[i % confettiColors.length]}`
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360 * 5],
            opacity: [1, 0.8, 0],
            x: [0, (Math.random() - 0.5) * 200]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeIn'
          }}
        />
      ))}

      <div className="flex items-center justify-center min-h-screen p-4 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="card-premium max-w-5xl relative z-10"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.3, 1.3, 1.3, 1]
            }}
            transition={{ duration: 0.6, repeat: 2 }}
            className="text-9xl mb-10 text-center"
          >
            🎉
          </motion.div>

          <h2 className="text-display text-8xl mb-6 text-center">
            TICKET CONFIRMED!
          </h2>

          <div className="divider-premium w-96 mx-auto mb-16" />

          {/* Ticket */}
          <motion.div
            className="card-premium bg-gradient-to-br from-cyan-500/10 to-purple-500/10 my-16"
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                >
                  <div className="text-cyan-400 text-sm uppercase mb-2 tracking-widest font-black">{item.label}</div>
                  <div className="text-white text-3xl font-black">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: 'spring' }}
                className="w-52 h-52 bg-white rounded-3xl flex items-center justify-center text-black text-8xl font-black shadow-2xl"
              >
                QR
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="text-6xl font-black text-hologram mb-16 text-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Booked in 28 seconds! 🚀
          </motion.div>

          <div className="flex flex-wrap gap-6 justify-center">
            <MagneticButton>📥 DOWNLOAD</MagneticButton>
            <MagneticButton>📤 SHARE</MagneticButton>
            <MagneticButton onClick={() => window.location.href = '/'}>
              🔁 BOOK ANOTHER
            </MagneticButton>
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
      <CustomCursor />
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
