import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './index.css'
import './styles/art-gallery.css'
import { languages, getTranslation } from './utils/languages'

// PREMIUM ART GALLERY AESTHETIC + INDIAN RAILWAYS
// Sophisticated, Cultural, Accessible, Beautiful

function ArtGalleryApp() {
  return (
    <Router>
      <div className="canvas-texture mandala-bg min-h-screen">
        <Routes>
          <Route path="/" element={<ArtGalleryLanding />} />
          <Route path="/search" element={<ArtGallerySearch />} />
          <Route path="/results" element={<ArtGalleryResults />} />
          <Route path="/seats" element={<ArtGallerySeats />} />
          <Route path="/success" element={<ArtGallerySuccess />} />
          <Route path="/pnr" element={<PNRStatusPage />} />
          <Route path="/live-status" element={<LiveStatusPage />} />
          <Route path="/voice" element={<VoiceBookingPage />} />
        </Routes>
      </div>
    </Router>
  )
}

// Navigation Component
function ArtNavigation({ lang, setLang }) {
  const navigate = useNavigate()

  return (
    <nav className="gallery-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="cursor-pointer"
            onClick={() => navigate('/')}
          >
            <h1 className="text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}>
              TatkalEasy
            </h1>
            <p className="text-xs tracking-widest" style={{ color: 'var(--earth-ochre)', fontFamily: "'Cormorant Garamond', serif" }}>
              INDIAN RAILWAYS REIMAGINED
            </p>
          </motion.div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/search')}
            className="gallery-nav-link"
          >
            Book Ticket
          </button>
          <button
            onClick={() => navigate('/pnr')}
            className="gallery-nav-link"
          >
            Check PNR
          </button>
          <button
            onClick={() => navigate('/voice')}
            className="gallery-nav-link"
          >
            🎤 Voice
          </button>

          {/* Language Selector */}
          <LanguageSelector lang={lang} setLang={setLang} />
        </div>
      </div>
    </nav>
  )
}

function LanguageSelector({ lang, setLang }) {
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = languages.find(l => l.code === lang) || languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="language-art-selector flex items-center gap-2"
      >
        <span>🌐</span>
        <span>{currentLang.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border-2 border-sacred-gold rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50 min-w-[200px]">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gallery-cream transition-colors border-b border-gray-100 ${
                lang === l.code ? 'bg-sacred-gold bg-opacity-20 font-bold' : ''
              }`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <div className="font-semibold">{l.nativeName}</div>
              <div className="text-xs text-gray-500">{l.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Landing Page
function ArtGalleryLanding() {
  const navigate = useNavigate()
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen">
      <ArtNavigation lang={lang} setLang={setLang} />

      {/* Hero Section */}
      <section className="spiritual-header min-h-screen flex items-center justify-center pt-20">
        <div className="gallery-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="premium-badge mb-6 mx-auto">
              ✨ Build What Moves India
            </div>

            <h1
              className="text-6xl md:text-7xl font-bold text-white mb-6 embossed-text"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Indian Railways
              <br />
              <span style={{ color: 'var(--sacred-gold)' }}>Reimagined</span>
            </h1>

            <div className="lotus-divider" />

            <p
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-8 opacity-90"
              style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: '1.8' }}
            >
              Book train tickets in 28 seconds. Accessible in 20 Indian languages.
              <br />
              Voice booking for 300 million illiterate Indians.
            </p>

            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={() => navigate('/search')}
                className="art-button"
              >
                Book Your Journey
              </button>
              <button
                onClick={() => navigate('/results')}
                className="art-button gold-accent"
              >
                Instant Demo →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="gallery-container py-20">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
          >
            Built from Real Pain Points
          </h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            9 years of IRCTC complaints analyzed • 1000+ user stories
          </p>
        </div>

        <div className="gallery-stats">
          {[
            { number: '28s', label: 'Booking Time', subtitle: 'vs 5-10 mins IRCTC' },
            { number: '20', label: 'Languages', subtitle: 'vs 2 on IRCTC' },
            { number: '15+', label: 'Features', subtitle: 'Complete Utility' },
            { number: '1.4B', label: 'Indians Served', subtitle: 'Accessible to All' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="gallery-stat-card float-gentle"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="gallery-stat-number">{stat.number}</div>
              <div className="gallery-stat-label">{stat.label}</div>
              <div className="text-sm text-gray-500 mt-2">{stat.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="gallery-container py-20">
        <div className="text-center mb-12">
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
          >
            Complete Railway Utility
          </h2>
          <div className="lotus-divider" />
        </div>

        <div className="gallery-grid">
          {[
            { icon: '🎫', title: 'Tatkal Booking', desc: '28-second booking, no 10 AM crash' },
            { icon: '🔍', title: 'PNR Status', desc: 'AI prediction + instant check' },
            { icon: '📍', title: 'Live Tracking', desc: 'GPS-based real-time updates' },
            { icon: '💺', title: 'Seat Check', desc: 'Visual seat map, all classes' },
            { icon: '💰', title: 'Fare Calculator', desc: '40% senior, 25% student discount' },
            { icon: '❌', title: 'Easy Cancel', desc: '1-click, 24-hour refund' },
            { icon: '🍛', title: 'Food Ordering', desc: '30-min delivery at seat' },
            { icon: '⏰', title: 'Tatkal Alerts', desc: '15-min advance notification' },
            { icon: '🎤', title: 'Voice Booking', desc: 'Speak in 20 languages' },
            { icon: '🚂', title: 'Train Search', desc: 'Compare all trains' },
            { icon: '🚃', title: 'Coach Position', desc: 'Know where to stand' },
            { icon: '🛤️', title: 'Platform Info', desc: 'Facilities & amenities' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="spiritual-card paisley-accent"
              onClick={() => navigate(
                feature.title.includes('PNR') ? '/pnr' :
                feature.title.includes('Voice') ? '/voice' :
                '/search'
              )}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="gallery-container py-20">
        <div className="art-card max-w-4xl mx-auto paper-grain">
          <div className="text-center">
            <p
              className="text-2xl md:text-3xl leading-relaxed mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: 'var(--jewel-burgundy)' }}
            >
              "Built from 1000+ real complaints. Every feature solves actual pain.
              <br />
              This is what IRCTC should have been."
            </p>
            <div className="lotus-divider" />
            <p className="text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Research-backed • Evidence-based • Built for ALL Indians
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

// Search Page (simplified for demo)
function ArtGallerySearch() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'AC 2-Tier'
  })

  return (
    <div className="min-h-screen pt-20">
      <ArtNavigation />

      <div className="gallery-container py-20">
        <div className="max-w-3xl mx-auto">
          <div className="sacred-frame paper-grain">
            <div className="text-center mb-8">
              <h2
                className="text-4xl font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
              >
                Book Your Journey
              </h2>
              <div className="lotus-divider" />
              <p className="text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                28-second booking • No crashes • Auto-save
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  className="block mb-2 font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem' }}
                >
                  From Station
                </label>
                <input
                  type="text"
                  value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })}
                  placeholder="New Delhi"
                  className="w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:border-sacred-gold transition-all"
                  style={{ fontFamily: "'Cormorant Garamond', serif", borderColor: 'var(--gallery-warm-gray)' }}
                />
              </div>

              <div>
                <label
                  className="block mb-2 font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem' }}
                >
                  To Station
                </label>
                <input
                  type="text"
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                  placeholder="Mumbai"
                  className="w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:border-sacred-gold transition-all"
                  style={{ fontFamily: "'Cormorant Garamond', serif", borderColor: 'var(--gallery-warm-gray)' }}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block mb-2 font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem' }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:border-sacred-gold transition-all"
                    style={{ fontFamily: "'Cormorant Garamond', serif", borderColor: 'var(--gallery-warm-gray)' }}
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.125rem' }}
                  >
                    Class
                  </label>
                  <select
                    value={form.class}
                    onChange={(e) => setForm({ ...form, class: e.target.value })}
                    className="w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:border-sacred-gold transition-all"
                    style={{ fontFamily: "'Cormorant Garamond', serif", borderColor: 'var(--gallery-warm-gray)' }}
                  >
                    <option>AC 1-Tier</option>
                    <option>AC 2-Tier</option>
                    <option>AC 3-Tier</option>
                    <option>Sleeper</option>
                    <option>Second Sitting</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/results')}
                  className="art-button flex-1"
                >
                  Search Trains
                </button>
                <button
                  onClick={() => navigate('/results')}
                  className="art-button gold-accent flex-1"
                >
                  Instant Demo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simplified other pages (Results, Seats, Success)
function ArtGalleryResults() {
  const navigate = useNavigate()

  const trains = [
    { number: '12301', name: 'Rajdhani Express', time: '10:15 AM', duration: '10h 30m', price: 2100, seats: 48 },
    { number: '12027', name: 'Shatabdi Express', time: '6:00 AM', duration: '8h 30m', price: 1200, seats: 24 },
    { number: '12009', name: 'Mumbai Mail', time: '11:00 PM', duration: '12h 30m', price: 1800, seats: 62 }
  ]

  return (
    <div className="min-h-screen pt-20">
      <ArtNavigation />

      <div className="gallery-container py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
            >
              Available Trains
            </h2>
            <div className="lotus-divider" />
          </div>

          <div className="space-y-6">
            {trains.map((train, i) => (
              <motion.div
                key={train.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="train-art-card cursor-pointer"
                onClick={() => navigate('/seats')}
              >
                <div className="train-art-card-header">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className="text-2xl font-bold"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {train.name}
                      </h3>
                      <p className="opacity-90" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {train.number}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">₹{train.price}</div>
                      <div className="text-sm opacity-90">{train.seats} seats</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Departure</div>
                      <div className="text-xl font-bold">{train.time}</div>
                    </div>
                    <div className="text-gray-400">→→→</div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Duration</div>
                      <div className="text-xl font-bold">{train.duration}</div>
                    </div>
                  </div>

                  <button className="art-button gold-accent w-full mt-6">
                    Select Seats →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ArtGallerySeats() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  const seats = Array.from({ length: 72 }, (_, i) => ({
    number: i + 1,
    status: i < 48 ? 'available' : 'booked'
  }))

  return (
    <div className="min-h-screen pt-20">
      <ArtNavigation />

      <div className="gallery-container py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
            >
              Select Your Seat
            </h2>
            <div className="lotus-divider" />
            <p className="text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Visual seat map • Click to select • Like flight booking
            </p>
          </div>

          <div className="sacred-frame mb-8">
            <div className="grid grid-cols-6 md:grid-cols-9 gap-3">
              {seats.slice(0, 54).map(seat => (
                <div
                  key={seat.number}
                  onClick={() => {
                    if (seat.status === 'available') {
                      setSelected(prev =>
                        prev.includes(seat.number)
                          ? prev.filter(s => s !== seat.number)
                          : [...prev, seat.number]
                      )
                    }
                  }}
                  className={`seat-art-block ${
                    selected.includes(seat.number) ? 'selected' :
                    seat.status
                  }`}
                >
                  {seat.number}
                </div>
              ))}
            </div>
          </div>

          {selected.length > 0 && (
            <button
              onClick={() => navigate('/success')}
              className="art-button w-full"
            >
              Confirm {selected.length} Seat{selected.length > 1 ? 's' : ''} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function ArtGallerySuccess() {
  return (
    <div className="exhibition-success">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="exhibition-ticket"
      >
        <div className="text-center">
          <div className="text-7xl mb-6">🎉</div>

          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
          >
            Booking Confirmed!
          </h2>

          <div className="lotus-divider" />

          <div className="my-8 p-6 bg-gallery-cream rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <div className="text-sm text-gray-600">PNR Number</div>
                <div className="text-2xl font-bold">2847568912</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Train</div>
                <div className="text-xl font-bold">12301</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold">Aug 25, 2026</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Seat</div>
                <div className="font-semibold">A1 - 45</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="art-button flex-1">Download Ticket</button>
            <button className="art-button gold-accent flex-1">Book Another →</button>
          </div>

          <p className="mt-6 text-sm text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            ✅ Ticket sent to your email • SMS confirmation sent
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// PNR & Voice pages (simplified)
function PNRStatusPage() {
  const [pnr, setPnr] = useState('')

  return (
    <div className="min-h-screen pt-20">
      <ArtNavigation />
      <div className="gallery-container py-20">
        <div className="max-w-2xl mx-auto sacred-frame">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔍</div>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
            >
              Check PNR Status
            </h2>
            <div className="lotus-divider" />
          </div>

          <input
            type="text"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            placeholder="Enter 10-digit PNR"
            maxLength={10}
            className="w-full px-4 py-4 border-2 rounded-lg mb-6 text-center text-2xl tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif", borderColor: 'var(--gallery-warm-gray)' }}
          />

          <button className="art-button w-full">
            Check Status
          </button>
        </div>
      </div>
    </div>
  )
}

function LiveStatusPage() {
  return (
    <div className="min-h-screen pt-20">
      <ArtNavigation />
      <div className="gallery-container py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">📍</div>
          <h2
            className="text-4xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
          >
            Live Train Tracking
          </h2>
          <div className="lotus-divider" />
          <p className="text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            GPS-based real-time tracking • Delay info • Platform updates
          </p>
        </div>
      </div>
    </div>
  )
}

function VoiceBookingPage() {
  const [isListening, setIsListening] = useState(false)

  return (
    <div className="min-h-screen pt-20">
      <ArtNavigation />
      <div className="gallery-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="sacred-frame paper-grain">
            <div className="text-6xl mb-4">🎤</div>
            <h2
              className="text-4xl font-bold mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--jewel-burgundy)' }}
            >
              Voice Booking
            </h2>
            <div className="lotus-divider" />
            <p className="text-gray-600 mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Speak in your language • For 300 million illiterate Indians
            </p>

            <button
              onClick={() => setIsListening(!isListening)}
              className={`w-64 h-64 rounded-full mx-auto mb-8 transition-all ${
                isListening ? 'bg-gradient-to-br from-jewel-maroon to-jewel-burgundy animate-pulse scale-110' :
                'bg-gradient-to-br from-temple-blue to-indigo-deep hover:scale-105'
              } shadow-2xl flex items-center justify-center`}
            >
              <div className="text-white">
                <div className="text-8xl mb-4">{isListening ? '🔴' : '🎤'}</div>
                <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {isListening ? 'Listening...' : 'Tap to Speak'}
                </div>
              </div>
            </button>

            <div className="text-sm text-gray-600" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Supported: Hindi, Tamil, Telugu, Bengali, Marathi + 15 more languages
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtGalleryApp
