import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './index.css'

// Clean Portfolio-Inspired Design for Indian Railways

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tight">TATKALEASY</div>
          <div className="flex gap-8">
            <button onClick={() => navigate('/search')} className="text-sm font-medium hover:text-[#FDB913] transition">
              BOOK NOW
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.95] tracking-tighter mb-8">
              BOOK TATKAL<br/>
              <span className="text-[#FDB913]">IN 28 SECONDS</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
              The fastest way to book Indian Railways Tatkal tickets.
              No timeouts. No confusion. Just results.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => navigate('/search')}
                className="px-12 py-6 bg-[#FDB913] text-black font-bold text-lg rounded-full hover:bg-[#e5a812] transition-all hover:scale-105 active:scale-95"
              >
                START BOOKING
              </button>
              <button
                onClick={() => navigate('/results')}
                className="px-12 py-6 bg-white/5 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all hover:scale-105 active:scale-95 border border-white/10"
              >
                INSTANT DEMO
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '2,847', label: 'Tickets Booked Today' },
              { number: '28s', label: 'Average Booking Time' },
              { number: '4.9', label: 'User Rating' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-7xl font-black text-[#FDB913] mb-4">{stat.number}</div>
                <div className="text-xl text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Info */}
      <section className="py-32 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">FOR JUDGES</h2>
          <p className="text-2xl text-gray-400 mb-12 leading-relaxed">
            Click "INSTANT DEMO" to test the full booking flow.<br/>
            No login required. Complete flow in 28 seconds.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'ROUTE', value: 'BLR → MUM' },
              { label: 'TIME', value: '28 SEC' },
              { label: 'TRAIN', value: 'RAJDHANI' },
              { label: 'STATUS', value: 'READY' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="text-xs text-gray-500 mb-2">{item.label}</div>
                <div className="text-xl font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function SearchPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ from: '', to: '', date: new Date().toISOString().split('T')[0], class: 'AC 2-Tier' })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tight cursor-pointer" onClick={() => navigate('/')}>TATKALEASY</div>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <h1 className="text-6xl font-black mb-16 tracking-tight">WHERE TO?</h1>

          <div className="space-y-8">
            <div>
              <label className="block text-sm text-gray-500 mb-3 uppercase tracking-wider">FROM</label>
              <input
                type="text"
                placeholder="Bangalore"
                value={form.from}
                onChange={(e) => setForm({...form, from: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-2xl focus:outline-none focus:border-[#FDB913] transition"
              />
            </div>

            <div className="text-center text-4xl text-gray-600">↓</div>

            <div>
              <label className="block text-sm text-gray-500 mb-3 uppercase tracking-wider">TO</label>
              <input
                type="text"
                placeholder="Mumbai"
                value={form.to}
                onChange={(e) => setForm({...form, to: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-2xl focus:outline-none focus:border-[#FDB913] transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-3 uppercase tracking-wider">DATE</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({...form, date: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-[#FDB913] transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-3 uppercase tracking-wider">CLASS</label>
                <select
                  value={form.class}
                  onChange={(e) => setForm({...form, class: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-[#FDB913] transition"
                >
                  <option>AC 1-Tier</option>
                  <option>AC 2-Tier</option>
                  <option>AC 3-Tier</option>
                  <option>Sleeper</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => navigate('/results')}
              className="w-full px-12 py-6 bg-[#FDB913] text-black font-bold text-xl rounded-full hover:bg-[#e5a812] transition-all hover:scale-[1.02] active:scale-95 mt-8"
            >
              FIND TRAINS
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ResultsPage() {
  const navigate = useNavigate()
  const trains = [
    { number: '12431', name: 'Rajdhani Express', dep: '10:15', arr: '20:45', dur: '10h 30m', price: 2100, avail: 48, total: 72 },
    { number: '12027', name: 'Shatabdi Express', dep: '06:00', arr: '14:30', dur: '8h 30m', price: 1200, avail: 24, total: 72 }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tight cursor-pointer" onClick={() => navigate('/')}>TATKALEASY</div>
        </div>
      </nav>

      <div className="px-6 pt-32 pb-16 max-w-6xl mx-auto">
        <h1 className="text-6xl font-black mb-16 tracking-tight">AVAILABLE TRAINS</h1>

        <div className="space-y-6">
          {trains.map((train, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate('/seats')}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#FDB913]/50 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🚄</span>
                    <div>
                      <h3 className="text-3xl font-black">{train.name}</h3>
                      <p className="text-gray-500">#{train.number}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 items-center">
                    <div className="text-center">
                      <div className="text-3xl font-black text-[#FDB913]">{train.dep}</div>
                      <div className="text-sm text-gray-500 mt-1">DEPART</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg text-gray-400 mb-2">{train.dur}</div>
                      <div className="h-1 bg-gradient-to-r from-[#FDB913] to-white rounded-full"></div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-[#FDB913]">{train.arr}</div>
                      <div className="text-sm text-gray-500 mt-1">ARRIVE</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">SEATS</span>
                      <span className="font-bold">{train.avail}/{train.total}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${(train.avail/train.total)*100}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center lg:items-end gap-4">
                  <div className="text-6xl font-black text-[#FDB913]">₹{train.price}</div>
                  <button className="px-8 py-4 bg-[#FDB913] text-black font-bold rounded-full hover:bg-[#e5a812] transition">
                    SELECT →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SeatsPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const seats = Array.from({ length: 40 }, (_, i) => ({ id: i + 1, booked: Math.random() > 0.6 }))

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-black tracking-tight cursor-pointer" onClick={() => navigate('/')}>TATKALEASY</div>
        </div>
      </nav>

      <div className="px-6 pt-32 pb-16 max-w-6xl mx-auto">
        <h1 className="text-6xl font-black mb-8 tracking-tight">SELECT SEAT</h1>
        <p className="text-xl text-gray-400 mb-16">AC 2-Tier Coach A1</p>

        <div className="flex gap-8 justify-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#22C55E] rounded-xl"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl"></div>
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FDB913] rounded-xl"></div>
            <span>Selected</span>
          </div>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-8 gap-4 mb-16">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => !seat.booked && setSelected(seat.id)}
              disabled={seat.booked}
              className={`aspect-square rounded-xl text-xl font-bold transition-all hover:scale-110 active:scale-95 ${
                seat.booked ? 'bg-white/10 opacity-40 cursor-not-allowed' :
                selected === seat.id ? 'bg-[#FDB913] text-black' :
                'bg-[#22C55E] text-black hover:bg-[#16A34A]'
              }`}
            >
              {seat.id}
            </button>
          ))}
        </div>

        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-3xl mb-8">Selected: <span className="font-black text-[#FDB913]">SEAT #{selected}</span></p>
            <button
              onClick={() => navigate('/success')}
              className="px-16 py-6 bg-[#FDB913] text-black font-bold text-xl rounded-full hover:bg-[#e5a812] transition-all hover:scale-105 active:scale-95"
            >
              CONFIRM & PAY ₹2,100
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <div className="text-8xl mb-8">🎉</div>
        <h1 className="text-7xl font-black mb-8 tracking-tight">CONFIRMED!</h1>
        <p className="text-3xl text-gray-400 mb-16">Booked in 28 seconds</p>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'PNR', value: '8234567890' },
              { label: 'TRAIN', value: '12431' },
              { label: 'SEAT', value: 'A1-24' },
              { label: 'AMOUNT', value: '₹2,100' }
            ].map((item, i) => (
              <div key={i}>
                <div className="text-sm text-gray-500 mb-2">{item.label}</div>
                <div className="text-2xl font-black">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 transition">
            DOWNLOAD
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-12 py-5 bg-[#FDB913] text-black rounded-full font-bold hover:bg-[#e5a812] transition"
          >
            BOOK ANOTHER
          </button>
        </div>
      </motion.div>
    </div>
  )
}

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
