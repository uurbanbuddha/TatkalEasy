import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import './styles/indian-game-surfer.css'
import { languages, getTranslation } from './utils/languages'

// MARIO + SUBWAY SURFERS + INDIAN RAILWAYS = THIS!
// Ultimate Gaming Experience!

function UltimateGamingApp() {
  return (
    <Router>
      <GameWorld />
      <Routes>
        <Route path="/" element={<GamingLanding />} />
        <Route path="/search" element={<GamingSearch />} />
        <Route path="/results" element={<GamingResults />} />
        <Route path="/seats" element={<GamingSeats />} />
        <Route path="/success" element={<GamingSuccess />} />
      </Routes>
    </Router>
  )
}

// Animated Game World Background
function GameWorld() {
  const [coins, setCoins] = useState([])
  const [snacks, setSnacks] = useState([])

  useEffect(() => {
    // Generate coin rain
    const coinInterval = setInterval(() => {
      const newCoin = {
        id: Date.now(),
        left: Math.random() * 100 + '%',
        delay: Math.random() * 2
      }
      setCoins(prev => [...prev, newCoin])
      setTimeout(() => {
        setCoins(prev => prev.filter(c => c.id !== newCoin.id))
      }, 3000)
    }, 500)

    // Generate floating snacks
    const snackInterval = setInterval(() => {
      const items = ['🫖', '🥟', '🍛', '🧈', '🥤']
      const newSnack = {
        id: Date.now(),
        item: items[Math.floor(Math.random() * items.length)],
        delay: Math.random() * 5
      }
      setSnacks(prev => [...prev, newSnack])
      setTimeout(() => {
        setSnacks(prev => prev.filter(s => s.id !== newSnack.id))
      }, 5000)
    }, 2000)

    return () => {
      clearInterval(coinInterval)
      clearInterval(snackInterval)
    }
  }, [])

  return (
    <>
      {/* Background Layers */}
      <div className="railway-surfer-world">
        <div className="railway-tracks" />
        <div className="railway-sleepers" />
        <div className="rangoli-pattern" />
      </div>

      <div className="graffiti-buildings" />

      {/* Running Train Character */}
      <div className="running-train">🚂</div>

      {/* Auto-Rickshaw Obstacles */}
      <div className="auto-rickshaw">🛺</div>

      {/* Coin Rain */}
      {coins.map(coin => (
        <div
          key={coin.id}
          className="coin-rain"
          style={{
            left: coin.left,
            animationDelay: `${coin.delay}s`
          }}
        >
          🪙
        </div>
      ))}

      {/* Floating Snacks */}
      {snacks.map(snack => (
        <div
          key={snack.id}
          className="floating-snacks"
          style={{
            animationDelay: `${snack.delay}s`
          }}
        >
          {snack.item}
        </div>
      ))}

      {/* Power-Up Chai */}
      <div className="power-up-chai">☕</div>
    </>
  )
}

// Game HUD Component
function GameHUD({ score, coins, level, multiplier, combo }) {
  return (
    <>
      <div className="game-hud">
        <div className="hud-item">
          <span className="hud-icon">⭐</span>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>SCORE</div>
            <div style={{ fontSize: '24px' }}>{score.toLocaleString()}</div>
          </div>
        </div>

        <div className="hud-item">
          <span className="hud-icon">🪙</span>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>COINS</div>
            <div style={{ fontSize: '24px' }}>×{coins}</div>
          </div>
        </div>

        <div className="hud-item">
          <span className="hud-icon">🎯</span>
          <div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>LEVEL</div>
            <div style={{ fontSize: '24px' }}>{level}</div>
          </div>
        </div>
      </div>

      {multiplier > 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="multiplier"
        >
          ×{multiplier}
        </motion.div>
      )}

      {combo > 0 && (
        <div className="combo-display">
          COMBO ×{combo}!
        </div>
      )}
    </>
  )
}

// Landing Page - Gaming Style
function GamingLanding() {
  const navigate = useNavigate()
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [level, setLevel] = useState(1)
  const [lang, setLang] = useState('en')

  const collectCoin = (e) => {
    setCoins(prev => prev + 1)
    setScore(prev => prev + 100)

    // Create particle effect
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = e.clientX + 'px'
      particle.style.top = e.clientY + 'px'
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`
      document.body.appendChild(particle)
      setTimeout(() => particle.remove(), 2000)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameHUD score={score} coins={coins} level={level} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <div className="text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="neon-text mb-8 game-title">
              TATKAL
              <br />
              EXPRESS
            </div>

            <p
              className="text-2xl md:text-3xl mb-12 urban-text"
              style={{
                color: 'white',
                textShadow: '3px 3px 0 #000, 0 0 20px #00F0FF',
                fontWeight: 'bold'
              }}
            >
              🚂 28-Second Booking • 20 Languages • Infinite Fun! 🎮
            </p>

            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={(e) => {
                  collectCoin(e)
                  setTimeout(() => navigate('/search'), 300)
                }}
                className="game-button"
              >
                🎮 START GAME
              </button>

              <button
                onClick={(e) => {
                  collectCoin(e)
                  setTimeout(() => navigate('/results'), 300)
                }}
                className="game-button"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FF6B00 50%, #FF10F0 100%)'
                }}
              >
                ⚡ INSTANT DEMO
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: '⚡', value: '28s', label: 'BOOKING' },
              { icon: '🌍', value: '20', label: 'LANGUAGES' },
              { icon: '🎯', value: '15+', label: 'FEATURES' },
              { icon: '🏆', value: '1.4B', label: 'PLAYERS' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="train-game-card cursor-pointer"
                onClick={(e) => collectCoin(e)}
              >
                <div className="text-5xl mb-3">{stat.icon}</div>
                <div
                  className="text-4xl font-bold mb-2 urban-text"
                  style={{ color: '#00F0FF' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{ color: '#FFF000', fontFamily: "'Press Start 2P'" }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
            {[
              { icon: '🎫', label: 'BOOK' },
              { icon: '🔍', label: 'PNR' },
              { icon: '📍', label: 'TRACK' },
              { icon: '💺', label: 'SEATS' },
              { icon: '💰', label: 'FARE' },
              { icon: '🍛', label: 'FOOD' },
              { icon: '🎤', label: 'VOICE' },
              { icon: '♿', label: 'ACCESS' }
            ].map((feature, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 1 }}
                onClick={(e) => collectCoin(e)}
                className="train-game-card text-center py-6 hover:scale-110"
              >
                <div className="text-4xl mb-2">{feature.icon}</div>
                <div
                  className="text-xs font-bold"
                  style={{
                    color: '#00FF41',
                    fontFamily: "'Press Start 2P'",
                    textShadow: '0 0 10px #00FF41'
                  }}
                >
                  {feature.label}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Search Page
function GamingSearch() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'AC 2-Tier'
  })
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative z-10">
      <GameHUD score={score} coins={coins} level={1} />

      <div className="max-w-3xl mx-auto">
        <div className="train-game-card">
          <div className="train-game-header">
            <h2
              className="text-4xl text-center urban-text"
              style={{ color: 'white', textShadow: '3px 3px 0 #000' }}
            >
              🎯 SELECT ROUTE
            </h2>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label
                className="block mb-2 text-sm font-bold"
                style={{
                  color: '#00F0FF',
                  fontFamily: "'Press Start 2P'",
                  textShadow: '0 0 10px #00F0FF'
                }}
              >
                FROM STATION
              </label>
              <input
                type="text"
                value={form.from}
                onChange={(e) => setForm({ ...form, from: e.target.value })}
                placeholder="New Delhi"
                className="w-full px-6 py-4 text-xl font-bold rounded-xl border-4 border-neon-cyan bg-black text-white focus:outline-none focus:border-neon-yellow transition-all"
                style={{
                  fontFamily: "'Lilita One'",
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                }}
              />
            </div>

            <div>
              <label
                className="block mb-2 text-sm font-bold"
                style={{
                  color: '#00F0FF',
                  fontFamily: "'Press Start 2P'",
                  textShadow: '0 0 10px #00F0FF'
                }}
              >
                TO STATION
              </label>
              <input
                type="text"
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
                placeholder="Mumbai"
                className="w-full px-6 py-4 text-xl font-bold rounded-xl border-4 border-neon-cyan bg-black text-white focus:outline-none focus:border-neon-yellow transition-all"
                style={{
                  fontFamily: "'Lilita One'",
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block mb-2 text-sm font-bold"
                  style={{
                    color: '#00F0FF',
                    fontFamily: "'Press Start 2P'",
                    textShadow: '0 0 10px #00F0FF'
                  }}
                >
                  DATE
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-6 py-4 text-lg font-bold rounded-xl border-4 border-neon-cyan bg-black text-white focus:outline-none focus:border-neon-yellow transition-all"
                  style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-bold"
                  style={{
                    color: '#00F0FF',
                    fontFamily: "'Press Start 2P'",
                    textShadow: '0 0 10px #00F0FF'
                  }}
                >
                  CLASS
                </label>
                <select
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className="w-full px-6 py-4 text-lg font-bold rounded-xl border-4 border-neon-cyan bg-black text-white focus:outline-none focus:border-neon-yellow transition-all"
                  style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)' }}
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
                onClick={() => {
                  setScore(prev => prev + 500)
                  setCoins(prev => prev + 5)
                  navigate('/results')
                }}
                className="game-button flex-1"
              >
                🚀 SEARCH
              </button>
              <button
                onClick={() => navigate('/')}
                className="game-button"
                style={{
                  background: 'linear-gradient(135deg, #FF3333 0%, #CC0000 100%)'
                }}
              >
                ← BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Results Page
function GamingResults() {
  const navigate = useNavigate()
  const [score, setScore] = useState(500)
  const [coins, setCoins] = useState(5)
  const [level, setLevel] = useState(2)

  const trains = [
    { number: '12301', name: 'RAJDHANI', time: '10:15 AM', duration: '10h 30m', price: 2100, seats: 48 },
    { number: '12027', name: 'SHATABDI', time: '6:00 AM', duration: '8h 30m', price: 1200, seats: 24 },
    { number: '12009', name: 'MUMBAI MAIL', time: '11:00 PM', duration: '12h 30m', price: 1800, seats: 62 }
  ]

  const selectTrain = () => {
    setScore(prev => prev + 1000)
    setCoins(prev => prev + 10)
    setLevel(3)

    // Create explosion
    const explosion = document.createElement('div')
    explosion.className = 'explosion'
    explosion.style.left = '50%'
    explosion.style.top = '50%'
    document.body.appendChild(explosion)
    setTimeout(() => explosion.remove(), 1000)

    setTimeout(() => navigate('/seats'), 500)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative z-10">
      <GameHUD score={score} coins={coins} level={level} />

      <div className="max-w-5xl mx-auto">
        <h2
          className="text-5xl text-center mb-12 urban-text"
          style={{
            color: 'white',
            textShadow: '0 0 20px #00F0FF, 3px 3px 0 #000'
          }}
        >
          🚂 CHOOSE YOUR TRAIN
        </h2>

        <div className="space-y-6">
          {trains.map((train, i) => (
            <motion.div
              key={train.number}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="train-game-card cursor-pointer"
              onClick={selectTrain}
            >
              <div className="train-game-header">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <h3
                      className="text-3xl font-bold urban-text"
                      style={{ color: 'white', textShadow: '2px 2px 0 #000' }}
                    >
                      {train.name}
                    </h3>
                    <p
                      style={{
                        color: '#FFF000',
                        fontFamily: "'Press Start 2P'",
                        fontSize: '14px'
                      }}
                    >
                      {train.number}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-5xl font-bold urban-text"
                      style={{ color: '#00FF41', textShadow: '0 0 20px #00FF41' }}
                    >
                      ₹{train.price}
                    </div>
                    <div style={{ color: 'white', fontSize: '14px' }}>
                      {train.seats} SEATS
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div
                      style={{
                        color: '#00F0FF',
                        fontSize: '12px',
                        fontFamily: "'Press Start 2P'"
                      }}
                    >
                      DEPART
                    </div>
                    <div
                      className="text-3xl font-bold mt-2 urban-text"
                      style={{ color: 'white' }}
                    >
                      {train.time}
                    </div>
                  </div>

                  <div className="text-5xl" style={{ color: '#FFF000' }}>
                    →→→
                  </div>

                  <div className="text-center">
                    <div
                      style={{
                        color: '#00F0FF',
                        fontSize: '12px',
                        fontFamily: "'Press Start 2P'"
                      }}
                    >
                      DURATION
                    </div>
                    <div
                      className="text-3xl font-bold mt-2 urban-text"
                      style={{ color: 'white' }}
                    >
                      {train.duration}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Seats Page
function GamingSeats() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])
  const [score, setScore] = useState(1500)
  const [coins, setCoins] = useState(15)
  const [level, setLevel] = useState(3)
  const [combo, setCombo] = useState(0)

  const seats = Array.from({ length: 72 }, (_, i) => ({
    number: i + 1,
    status: i < 48 ? 'available' : 'booked'
  }))

  const toggleSeat = (seat) => {
    if (seat.status === 'booked') return

    setSelected(prev =>
      prev.includes(seat.number)
        ? prev.filter(s => s !== seat.number)
        : [...prev, seat.number]
    )

    setScore(prev => prev + 200)
    setCoins(prev => prev + 2)
    setCombo(prev => prev + 1)

    setTimeout(() => setCombo(0), 2000)
  }

  const confirmSeats = () => {
    setScore(prev => prev + 5000)
    setCoins(prev => prev + 50)
    setLevel(4)

    // Level complete banner
    const banner = document.createElement('div')
    banner.className = 'level-complete-banner'
    banner.innerHTML = '<div class="level-complete-text">LEVEL COMPLETE!</div>'
    document.body.appendChild(banner)
    setTimeout(() => banner.remove(), 2000)

    setTimeout(() => navigate('/success'), 2000)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative z-10">
      <GameHUD score={score} coins={coins} level={level} combo={combo} />

      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl text-center mb-12 urban-text"
          style={{
            color: 'white',
            textShadow: '0 0 20px #00FF41, 3px 3px 0 #000'
          }}
        >
          🎯 SELECT SEATS
        </h2>

        <div className="seat-game-grid mb-8">
          {seats.slice(0, 54).map(seat => (
            <div
              key={seat.number}
              onClick={() => toggleSeat(seat)}
              className={`seat-game-block ${
                selected.includes(seat.number) ? 'selected' :
                seat.status
              }`}
            >
              {seat.number}
            </div>
          ))}
        </div>

        {selected.length > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={confirmSeats}
            className="game-button w-full"
            style={{
              fontSize: '2.5rem',
              padding: '30px'
            }}
          >
            🏆 CONFIRM {selected.length} SEAT{selected.length > 1 ? 'S' : ''}
          </motion.button>
        )}
      </div>
    </div>
  )
}

// Success Page
function GamingSuccess() {
  const navigate = useNavigate()
  const [score] = useState(6700)
  const [coins] = useState(67)
  const [level] = useState(4)

  useEffect(() => {
    // Fireworks
    const interval = setInterval(() => {
      const explosion = document.createElement('div')
      explosion.className = 'explosion'
      explosion.style.left = Math.random() * 100 + '%'
      explosion.style.top = Math.random() * 100 + '%'
      document.body.appendChild(explosion)
      setTimeout(() => explosion.remove(), 1000)
    }, 300)

    setTimeout(() => clearInterval(interval), 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <GameHUD score={score} coins={coins} level={level} />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="trophy-display max-w-3xl w-full"
      >
        <div className="text-center">
          <div className="text-9xl mb-6">🏆</div>

          <h2
            className="text-6xl mb-6 urban-text"
            style={{
              color: '#FFD700',
              textShadow: '0 0 30px #FFD700, 4px 4px 0 #000'
            }}
          >
            VICTORY!
          </h2>

          <p
            className="text-3xl mb-8"
            style={{
              color: 'white',
              fontFamily: "'Bangers'",
              textShadow: '2px 2px 0 #000'
            }}
          >
            TICKET BOOKED SUCCESSFULLY!
          </p>

          <div className="bg-black bg-opacity-80 border-4 border-neon-yellow rounded-2xl p-8 mb-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-left">
                <div
                  style={{
                    color: '#00F0FF',
                    fontSize: '14px',
                    fontFamily: "'Press Start 2P'"
                  }}
                >
                  PNR NUMBER
                </div>
                <div
                  className="text-3xl font-bold mt-2 urban-text"
                  style={{ color: 'white' }}
                >
                  2847568912
                </div>
              </div>

              <div className="text-left">
                <div
                  style={{
                    color: '#00F0FF',
                    fontSize: '14px',
                    fontFamily: "'Press Start 2P'"
                  }}
                >
                  TRAIN
                </div>
                <div
                  className="text-3xl font-bold mt-2 urban-text"
                  style={{ color: 'white' }}
                >
                  12301
                </div>
              </div>

              <div className="text-left">
                <div
                  style={{
                    color: '#00F0FF',
                    fontSize: '14px',
                    fontFamily: "'Press Start 2P'"
                  }}
                >
                  SEAT
                </div>
                <div
                  className="text-2xl font-bold mt-2 urban-text"
                  style={{ color: 'white' }}
                >
                  A1 - 45
                </div>
              </div>

              <div className="text-left">
                <div
                  style={{
                    color: '#00F0FF',
                    fontSize: '14px',
                    fontFamily: "'Press Start 2P'"
                  }}
                >
                  FINAL SCORE
                </div>
                <div
                  className="text-2xl font-bold mt-2 urban-text"
                  style={{ color: '#FFD700' }}
                >
                  {score.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="game-button flex-1"
            >
              🎮 PLAY AGAIN
            </button>
            <button
              className="game-button flex-1"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF6B00 100%)'
              }}
            >
              📥 DOWNLOAD
            </button>
          </div>

          <p
            className="mt-6 text-sm"
            style={{
              color: '#00FF41',
              fontFamily: "'Press Start 2P'",
              textShadow: '0 0 10px #00FF41'
            }}
          >
            ✅ SMS SENT • EMAIL SENT • YOU WIN!
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default UltimateGamingApp
