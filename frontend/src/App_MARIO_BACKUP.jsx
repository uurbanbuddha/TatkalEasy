import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import './styles/mario-railways.css'

// MARIO-STYLE INDIAN RAILWAYS GAME!

// Sound effects (using Web Audio API)
const playSound = (frequency, duration = 100) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = 'square'

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration / 1000)
}

const sounds = {
  coin: () => {
    playSound(1000, 100)
    setTimeout(() => playSound(1200, 100), 100)
  },
  jump: () => {
    playSound(400, 50)
    setTimeout(() => playSound(600, 100), 50)
  },
  powerup: () => {
    playSound(800, 100)
    setTimeout(() => playSound(1000, 100), 100)
    setTimeout(() => playSound(1200, 100), 200)
  },
  levelComplete: () => {
    const notes = [523, 587, 659, 698, 784, 880, 988, 1047]
    notes.forEach((note, i) => {
      setTimeout(() => playSound(note, 150), i * 150)
    })
  }
}

// Game State
function GameProvider({ children }) {
  const [score, setScore] = useState(0)
  const [coins, setCoins] = useState(0)
  const [level, setLevel] = useState(1)
  const [coinsFloat, setCoinsFloat] = useState([])

  const addCoin = (x, y) => {
    setCoins(c => c + 1)
    setScore(s => s + 100)
    sounds.coin()

    const id = Date.now()
    setCoinsFloat(prev => [...prev, { id, x, y }])
    setTimeout(() => {
      setCoinsFloat(prev => prev.filter(c => c.id !== id))
    }, 2000)
  }

  const addPoints = (points, x, y) => {
    setScore(s => s + points)
    sounds.powerup()

    const popup = document.createElement('div')
    popup.className = 'points-popup'
    popup.textContent = `+${points}`
    popup.style.left = `${x}px`
    popup.style.top = `${y}px`
    document.body.appendChild(popup)

    setTimeout(() => popup.remove(), 2000)
  }

  return (
    <GameContext.Provider value={{ score, coins, level, addCoin, addPoints, setLevel }}>
      {children}
      {coinsFloat.map(coin => (
        <div key={coin.id} className="coin-float" style={{ left: coin.x, top: coin.y }}>
          🪙
        </div>
      ))}
    </GameContext.Provider>
  )
}

const GameContext = React.createContext()
const useGame = () => React.useContext(GameContext)

// Background
function GameWorld() {
  return (
    <>
      <div className="mario-world" />
      <div className="ground-blocks" />

      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="pixel-cloud"
          style={{
            top: `${20 + i * 15}%`,
            animationDuration: `${30 + i * 10}s`,
            animationDelay: `${i * 5}s`
          }}
        />
      ))}

      <div className="train-mario">🚂</div>
    </>
  )
}

// Score HUD
function ScoreHUD() {
  const { score, coins, level } = useGame()

  return (
    <div className="score-display">
      <div className="score-row">
        <span>SCORE</span>
        <span style={{ color: '#FFD700' }}>{score.toString().padStart(6, '0')}</span>
      </div>
      <div className="score-row coin-counter">
        <span>🪙</span>
        <span>×{coins}</span>
      </div>
      <div className="score-row">
        <span>LEVEL</span>
        <span>{level}</span>
      </div>
    </div>
  )
}

// Power Block Button
function PowerBlock({ children, onClick, ...props }) {
  const { addCoin } = useGame()

  const handleClick = (e) => {
    addCoin(e.clientX, e.clientY)
    sounds.jump()
    onClick?.(e)
  }

  return (
    <button className="power-block" onClick={handleClick} {...props}>
      {children}
    </button>
  )
}

// Landing Page
function LandingPage() {
  const navigate = useNavigate()
  const { addPoints } = useGame()

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameWorld />
      <ScoreHUD />

      <div className="game-nav">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div style={{ color: 'white', fontSize: '16px' }}>TATKALEASY</div>
        </div>
      </div>

      <section className="min-h-screen flex items-center justify-center px-6 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl"
        >
          <div className="station-board-pixel mb-12 inline-block">
            <h1 style={{ fontSize: 'clamp(20px, 4vw, 32px)', lineHeight: 1.5 }}>
              BOOK TATKAL
              <br />
              IN 28 SECONDS!
            </h1>
          </div>

          <p style={{ color: 'white', fontSize: '18px', marginBottom: '48px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '16px', border: '4px solid white' }}>
            FASTEST TRAIN BOOKING GAME!
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <PowerBlock onClick={() => navigate('/search')}>
              START GAME
            </PowerBlock>
            <PowerBlock onClick={() => navigate('/results')}>
              DEMO LEVEL
            </PowerBlock>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6">
            {[
              { icon: '🎫', value: '2,847', label: 'TICKETS' },
              { icon: '⚡', value: '28s', label: 'TIME' },
              { icon: '⭐', value: '4.9', label: 'RATING' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="pixel-card"
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{stat.icon}</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}

// Search Page
function SearchPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ from: '', to: '', date: new Date().toISOString().split('T')[0], class: 'AC 2-Tier' })

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameWorld />
      <ScoreHUD />

      <div className="game-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div style={{ color: 'white', fontSize: '16px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            ← BACK
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-6 pt-24 relative z-10">
        <div className="pixel-card max-w-2xl w-full">
          <h1 style={{ fontSize: '32px', marginBottom: '32px', textAlign: 'center' }}>WHERE TO?</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '12px' }}>FROM</label>
              <input
                type="text"
                className="input-pixel w-full"
                placeholder="BANGALORE"
                value={form.from}
                onChange={(e) => setForm({...form, from: e.target.value})}
              />
            </div>

            <div style={{ textAlign: 'center', fontSize: '32px' }}>↓</div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '12px' }}>TO</label>
              <input
                type="text"
                className="input-pixel w-full"
                placeholder="MUMBAI"
                value={form.to}
                onChange={(e) => setForm({...form, to: e.target.value})}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '12px' }}>DATE</label>
                <input
                  type="date"
                  className="input-pixel w-full"
                  value={form.date}
                  onChange={(e) => setForm({...form, date: e.target.value})}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '12px' }}>CLASS</label>
                <select className="input-pixel w-full" value={form.class} onChange={(e) => setForm({...form, class: e.target.value})}>
                  <option>AC 2-TIER</option>
                  <option>AC 3-TIER</option>
                  <option>SLEEPER</option>
                </select>
              </div>
            </div>

            <PowerBlock onClick={() => navigate('/results')} style={{ width: '100%', marginTop: '16px' }}>
              FIND TRAINS
            </PowerBlock>
          </div>
        </div>
      </div>
    </div>
  )
}

// Results Page
function ResultsPage() {
  const navigate = useNavigate()
  const { addPoints, setLevel } = useGame()

  useEffect(() => {
    setLevel(2)
  }, [])

  const trains = [
    { number: '12431', name: 'RAJDHANI', dep: '10:15', arr: '20:45', dur: '10H 30M', price: 2100, avail: 48, total: 72 },
    { number: '12027', name: 'SHATABDI', dep: '06:00', arr: '14:30', dur: '8H 30M', price: 1200, avail: 24, total: 72 }
  ]

  const handleSelect = (e) => {
    addPoints(500, e.clientX, e.clientY)
    setTimeout(() => navigate('/seats'), 300)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameWorld />
      <ScoreHUD />

      <div className="game-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div style={{ color: 'white', fontSize: '16px', cursor: 'pointer' }} onClick={() => navigate('/search')}>
            ← BACK
          </div>
        </div>
      </div>

      <div className="px-6 pt-32 pb-16 max-w-6xl mx-auto relative z-10">
        <div className="station-board-pixel mb-12 inline-block">
          <h1 style={{ fontSize: '24px' }}>TRAINS FOUND</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {trains.map((train, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="train-card-pixel"
              onClick={handleSelect}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚄</div>
                  <h3 style={{ fontSize: '20px', color: 'white', marginBottom: '4px' }}>{train.name}</h3>
                  <p style={{ fontSize: '12px', color: '#ccc' }}>#{train.number}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '32px', color: '#FFD700', fontWeight: 'bold' }}>₹{train.price}</div>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px', color: 'white' }}>
                  <span>SEATS: {train.avail}/{train.total}</span>
                </div>
                <div className="game-progress">
                  <motion.div
                    className="game-progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(train.avail / train.total) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.2 + 0.3 }}
                  />
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
function SeatsPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const { addPoints, setLevel } = useGame()
  const seats = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, booked: Math.random() > 0.6 }))

  useEffect(() => {
    setLevel(3)
  }, [])

  const handleSeatClick = (seat, e) => {
    if (!seat.booked) {
      setSelected(seat.id)
      addPoints(200, e.clientX, e.clientY)
      sounds.powerup()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameWorld />
      <ScoreHUD />

      <div className="game-nav">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div style={{ color: 'white', fontSize: '16px', cursor: 'pointer' }} onClick={() => navigate('/results')}>
            ← BACK
          </div>
        </div>
      </div>

      <div className="px-6 pt-32 pb-16 max-w-6xl mx-auto relative z-10">
        <div className="station-board-pixel mb-12 inline-block">
          <h1 style={{ fontSize: '24px' }}>SELECT SEAT</h1>
        </div>

        <div className="pixel-card">
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <div className="seat-block available" style={{ width: '40px', height: '40px', fontSize: '12px' }}>A</div>
              <span>AVAILABLE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <div className="seat-block selected" style={{ width: '40px', height: '40px', fontSize: '12px' }}>S</div>
              <span>SELECTED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <div className="seat-block booked" style={{ width: '40px', height: '40px', fontSize: '12px' }}>B</div>
              <span>BOOKED</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {seats.map((seat) => (
              <button
                key={seat.id}
                className={`seat-block ${seat.booked ? 'booked' : selected === seat.id ? 'selected' : 'available'}`}
                onClick={(e) => handleSeatClick(seat, e)}
                disabled={seat.booked}
              >
                {seat.id}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center' }}
              >
                <p style={{ fontSize: '20px', marginBottom: '24px' }}>
                  SEAT: <span style={{ color: '#FFD700' }}>#{selected}</span>
                </p>
                <PowerBlock onClick={() => navigate('/success')}>
                  CONFIRM
                </PowerBlock>
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
  const { setLevel } = useGame()
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    setLevel(4)
    setTimeout(() => {
      sounds.levelComplete()
      setShowComplete(true)

      // Fireworks
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          for (let j = 0; j < 12; j++) {
            const firework = document.createElement('div')
            firework.className = 'firework'
            firework.style.left = `${Math.random() * 100}%`
            firework.style.top = `${30 + Math.random() * 40}%`
            firework.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`)
            firework.style.setProperty('--y', `${(Math.random() - 0.5) * 200}px`)
            firework.style.background = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'][Math.floor(Math.random() * 4)]
            document.body.appendChild(firework)
            setTimeout(() => firework.remove(), 1000)
          }
        }, i * 100)
      }
    }, 500)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameWorld />
      <ScoreHUD />

      <AnimatePresence>
        {showComplete && (
          <div className="level-complete">
            <div className="level-complete-content">
              <motion.div
                className="level-complete-title"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                LEVEL COMPLETE!
              </motion.div>

              <div className="ticket-pixel" style={{ display: 'inline-block', marginBottom: '48px' }}>
                <div style={{ fontSize: '16px', marginBottom: '24px' }}>TICKET CONFIRMED!</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '12px' }}>
                  {[
                    { label: 'PNR', value: '8234567890' },
                    { label: 'TRAIN', value: '12431' },
                    { label: 'SEAT', value: 'A1-24' },
                    { label: 'FARE', value: '₹2,100' }
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ marginBottom: '4px', opacity: 0.7 }}>{item.label}</div>
                      <div style={{ fontWeight: 'bold' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ fontSize: '16px', color: '#FFD700', marginBottom: '32px' }}>
                BOOKED IN 28 SECONDS!
              </div>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <PowerBlock onClick={() => window.location.href = '/'}>
                  PLAY AGAIN
                </PowerBlock>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// App with Game Provider
function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/seats" element={<SeatsPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </GameProvider>
  )
}

export default App
