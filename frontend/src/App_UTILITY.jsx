import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'
import { languages, getTranslation } from './utils/languages'

// SERIOUS UTILITY APP - 20 LANGUAGES + 15 FEATURES

function LanguageSelector({ currentLang, onChangeLang }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white border-2 border-blue-600 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2"
      >
        <span>🌐</span>
        <span>{languages.find(l => l.code === currentLang)?.nativeName}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-2xl max-h-96 overflow-y-auto z-50 min-w-[200px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                onChangeLang(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 ${
                currentLang === lang.code ? 'bg-blue-100 font-bold' : ''
              }`}
            >
              <div className="font-semibold">{lang.nativeName}</div>
              <div className="text-xs text-gray-500">{lang.name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function LandingPage() {
  const navigate = useNavigate()
  const [lang, setLang] = useState('en')

  const features = [
    { id: 'book', icon: '🎫', key: 'bookTicket', route: '/search', color: 'blue' },
    { id: 'pnr', icon: '🔍', key: 'checkPNR', route: '/pnr', color: 'green' },
    { id: 'live', icon: '📍', key: 'liveStatus', route: '/live-status', color: 'orange' },
    { id: 'seats', icon: '💺', key: 'seatAvailability', route: '/seat-check', color: 'purple' },
    { id: 'fare', icon: '💰', key: 'fareCalculator', route: '/fare', color: 'yellow' },
    { id: 'cancel', icon: '❌', key: 'cancel', route: '/cancel', color: 'red' },
    { id: 'food', icon: '🍛', key: 'foodOrder', route: '/food', color: 'pink' },
    { id: 'alert', icon: '⏰', key: 'tatkalAlert', route: '/tatkal-alert', color: 'indigo' },
    { id: 'voice', icon: '🎤', key: 'voiceBooking', route: '/voice', color: 'teal' },
    { id: 'train-between', icon: '🚂', text: { en: 'Trains Between Stations', hi: 'स्टेशनों के बीच ट्रेन', ta: 'நிலையங்களுக்கு இடையே ரயில்கள்' }, route: '/trains-between', color: 'cyan' },
    { id: 'coach', icon: '🚃', text: { en: 'Coach Position', hi: 'कोच स्थिति', ta: 'பெட்டி நிலை' }, route: '/coach-position', color: 'lime' },
    { id: 'platform', icon: '🛤️', text: { en: 'Platform Info', hi: 'प्लेटफ़ॉर्म जानकारी', ta: 'மேடைத் தகவல்' }, route: '/platform', color: 'amber' },
    { id: 'wheelchair', icon: '♿', text: { en: 'Wheelchair Booking', hi: 'व्हीलचेयर बुकिंग', ta: 'சக்கர நாற்காலி பதிவு' }, route: '/wheelchair', color: 'rose' },
    { id: 'group', icon: '👥', text: { en: 'Group Booking', hi: 'समूह बुकिंग', ta: 'குழு பதிவு' }, route: '/group', color: 'violet' },
    { id: 'senior', icon: '👴', text: { en: 'Senior Citizen', hi: 'वरिष्ठ नागरिक', ta: 'மூத்த குடிமக்கள்' }, route: '/senior', color: 'sky' }
  ]

  const colorClasses = {
    blue: 'from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
    green: 'from-green-500 to-green-700 hover:from-green-600 hover:to-green-800',
    orange: 'from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800',
    purple: 'from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
    yellow: 'from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800',
    red: 'from-red-500 to-red-700 hover:from-red-600 hover:to-red-800',
    pink: 'from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800',
    indigo: 'from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800',
    teal: 'from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800',
    cyan: 'from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800',
    lime: 'from-lime-500 to-lime-700 hover:from-lime-600 hover:to-lime-800',
    amber: 'from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800',
    rose: 'from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800',
    violet: 'from-violet-500 to-violet-700 hover:from-violet-600 hover:to-violet-800',
    sky: 'from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🚂</div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">TatkalEasy</h1>
              <p className="text-xs text-gray-600">Indian Railways Made Simple</p>
            </div>
          </div>
          <LanguageSelector currentLang={lang} onChangeLang={setLang} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-5xl font-bold text-blue-900 mb-4">
              {lang === 'hi' ? 'भारतीय रेलवे को आसान बनाया' :
               lang === 'ta' ? 'இந்திய ரயில்வே எளிமையாக்கப்பட்டது' :
               lang === 'te' ? 'భారతీయ రైల్వే సులభం చేయబడింది' :
               lang === 'bn' ? 'ভারতীয় রেলওয়ে সহজ করা হয়েছে' :
               'Indian Railways Made Easy'}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {lang === 'hi' ? 'भारत की सभी 20 भाषाओं में उपलब्ध। सबके लिए तत्काल टिकट बुकिंग।' :
               lang === 'ta' ? 'இந்தியாவின் 20 மொழிகளில் கிடைக்கிறது. அனைவருக்கும் உடனடி டிக்கெட் பதிவு.' :
               'Available in 20 Indian languages. Instant booking for everyone.'}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              { value: '28s', label: lang === 'hi' ? 'बुकिंग समय' : 'Booking Time', icon: '⚡' },
              { value: '20', label: lang === 'hi' ? 'भाषाएँ' : 'Languages', icon: '🌐' },
              { value: '15+', label: lang === 'hi' ? 'सेवाएं' : 'Services', icon: '🎯' },
              { value: '24/7', label: lang === 'hi' ? 'सहायता' : 'Support', icon: '💬' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-8">
            {lang === 'hi' ? 'सभी सेवाएं' :
             lang === 'ta' ? 'அனைத்து சேவைகள்' :
             'All Services'}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {features.map((feature, i) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(feature.route)}
                className={`bg-gradient-to-br ${colorClasses[feature.color]} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}
              >
                <div className="text-5xl mb-3">{feature.icon}</div>
                <div className="text-sm font-bold leading-tight">
                  {feature.text ? (feature.text[lang] || feature.text.en) : getTranslation(feature.key, lang)}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">
            {lang === 'hi' ? 'भारत के लिए, भारत द्वारा बनाया गया' :
             lang === 'ta' ? 'இந்தியாவுக்காக, இந்தியாவால் உருவாக்கப்பட்டது' :
             'Built for India, by India'}
          </p>
          <p className="text-sm text-blue-200">
            {lang === 'hi' ? 'सभी 20 आधिकारिक भाषाओं में उपलब्ध' :
             'Available in all 20 official Indian languages'}
          </p>
        </div>
      </div>
    </div>
  )
}

// PNR Status Check
function PNRStatusPage() {
  const [pnr, setPnr] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const checkPNR = async () => {
    setLoading(true)
    // Mock response
    setTimeout(() => {
      setStatus({
        pnr: pnr,
        trainNo: '12301',
        trainName: 'Rajdhani Express',
        from: 'New Delhi',
        to: 'Mumbai',
        dateOfJourney: '2026-08-25',
        class: 'AC 2-Tier',
        status: 'CNF',
        coach: 'A1',
        berth: 45,
        boardingPoint: 'New Delhi',
        chartStatus: 'Chart Prepared'
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all font-semibold text-green-700"
      >
        ← Back to Home
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-6xl text-center mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-center text-green-900 mb-2">PNR Status</h1>
          <p className="text-center text-gray-600 mb-8">Check your ticket confirmation status</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter 10-digit PNR Number
              </label>
              <input
                type="text"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                placeholder="2847568912"
                maxLength={10}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none text-lg font-mono"
              />
            </div>

            <button
              onClick={checkPNR}
              disabled={pnr.length !== 10 || loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Checking...' : 'Check PNR Status'}
            </button>
          </div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-900">Status</h3>
                <span className={`px-4 py-2 rounded-full font-bold ${
                  status.status === 'CNF' ? 'bg-green-500 text-white' :
                  status.status === 'RAC' ? 'bg-yellow-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {status.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">PNR:</span>
                  <span className="font-bold">{status.pnr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Train:</span>
                  <span className="font-bold">{status.trainNo} - {status.trainName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-bold">{status.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-bold">{status.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-bold">{status.dateOfJourney}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coach-Berth:</span>
                  <span className="font-bold">{status.coach} - {status.berth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chart:</span>
                  <span className="font-bold">{status.chartStatus}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// Live Train Status
function LiveStatusPage() {
  const [trainNo, setTrainNo] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  const checkStatus = () => {
    setStatus({
      trainNo: trainNo,
      trainName: 'Shatabdi Express',
      from: 'New Delhi',
      to: 'Mumbai',
      currentLocation: 'Running at KOTA JN',
      delay: '15 mins late',
      nextStation: 'RATLAM JN',
      eta: '14:30',
      stations: [
        { name: 'New Delhi', arrival: '--', departure: '06:00', status: 'Departed' },
        { name: 'Mathura Jn', arrival: '08:15', departure: '08:20', status: 'Departed' },
        { name: 'Kota Jn', arrival: '12:30', departure: '12:45', status: 'Current' },
        { name: 'Ratlam Jn', arrival: '14:30', departure: '14:35', status: 'Upcoming' },
        { name: 'Mumbai', arrival: '20:00', departure: '--', status: 'Upcoming' }
      ]
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all font-semibold text-orange-700"
      >
        ← Back to Home
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-6xl text-center mb-4">📍</div>
          <h1 className="text-4xl font-bold text-center text-orange-900 mb-2">Live Train Status</h1>
          <p className="text-center text-gray-600 mb-8">Track your train in real-time</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Train Number</label>
              <input
                type="text"
                value={trainNo}
                onChange={(e) => setTrainNo(e.target.value)}
                placeholder="12301"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <button
            onClick={checkStatus}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Track Train
          </button>

          {status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 space-y-6"
            >
              <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                <h3 className="text-2xl font-bold mb-4">{status.trainNo} - {status.trainName}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Current Location</div>
                    <div className="text-lg font-bold">{status.currentLocation}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Delay</div>
                    <div className="text-lg font-bold text-red-600">{status.delay}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-4">Journey Progress</h4>
                <div className="space-y-4">
                  {status.stations.map((station, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-xl border-2 ${
                        station.status === 'Current' ? 'bg-orange-100 border-orange-500' :
                        station.status === 'Departed' ? 'bg-gray-50 border-gray-300' :
                        'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-lg">{station.name}</div>
                          <div className="text-sm text-gray-600">
                            Arr: {station.arrival} | Dep: {station.departure}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          station.status === 'Current' ? 'bg-orange-500 text-white' :
                          station.status === 'Departed' ? 'bg-gray-400 text-white' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {station.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// Voice Booking Page
function VoiceBookingPage() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [lang, setLang] = useState('en')
  const navigate = useNavigate()

  const startListening = () => {
    setIsListening(true)
    // Mock voice recognition
    setTimeout(() => {
      setTranscript("I want to book a ticket from New Delhi to Mumbai on 25th August in AC 2-tier")
      setIsListening(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all font-semibold text-teal-700"
      >
        ← Back to Home
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🎤</div>
          <h1 className="text-4xl font-bold text-teal-900 mb-2">Voice Booking</h1>
          <p className="text-gray-600 mb-8">Book tickets by speaking in your language</p>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Language</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 outline-none"
            >
              {languages.slice(0, 10).map(l => (
                <option key={l.code} value={l.code}>{l.nativeName}</option>
              ))}
            </select>
          </div>

          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-64 h-64 rounded-full mx-auto mb-8 transition-all duration-300 ${
              isListening
                ? 'bg-red-500 animate-pulse scale-110'
                : 'bg-gradient-to-br from-teal-500 to-cyan-500 hover:scale-105'
            } shadow-2xl flex items-center justify-center`}
          >
            <div className="text-white">
              <div className="text-8xl mb-4">{isListening ? '🔴' : '🎤'}</div>
              <div className="text-2xl font-bold">
                {isListening ? 'Listening...' : 'Tap to Speak'}
              </div>
            </div>
          </button>

          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-teal-50 rounded-2xl border-2 border-teal-200 text-left"
            >
              <div className="text-sm text-gray-600 mb-2">You said:</div>
              <div className="text-lg font-semibold text-teal-900">{transcript}</div>
              <button className="mt-4 w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 rounded-xl font-bold">
                Proceed to Book
              </button>
            </motion.div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-xl text-left">
            <div className="font-bold text-blue-900 mb-2">💡 Tips:</div>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Speak clearly in your chosen language</li>
              <li>• Mention: From, To, Date, and Class</li>
              <li>• Works for illiterate and elderly passengers</li>
              <li>• Available in all 20 Indian languages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Continue with booking pages from previous version but cleaner
function SearchPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    from: '',
    to: '',
    date: new Date().toISOString().split('T')[0],
    class: 'AC 2-Tier'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-6 px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all font-semibold text-blue-700"
      >
        ← Back to Home
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Book Train Ticket</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
              <input
                type="text"
                value={form.from}
                onChange={(e) => setForm({ ...form, from: e.target.value })}
                placeholder="New Delhi"
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
              <input
                type="text"
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
                placeholder="Mumbai"
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Class</label>
              <select
                value={form.class}
                onChange={(e) => setForm({ ...form, class: e.target.value })}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none text-lg"
              >
                <option>AC 1-Tier</option>
                <option>AC 2-Tier</option>
                <option>AC 3-Tier</option>
                <option>Sleeper</option>
                <option>Second Sitting</option>
              </select>
            </div>

            <button
              onClick={() => navigate('/results')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Search Trains
            </button>

            <button
              onClick={() => navigate('/results')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl"
            >
              🚀 INSTANT DEMO (No Login)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pnr" element={<PNRStatusPage />} />
        <Route path="/live-status" element={<LiveStatusPage />} />
        <Route path="/voice" element={<VoiceBookingPage />} />
        <Route path="/results" element={<div className="p-8 text-center">Results page (reuse from previous App.jsx)</div>} />
        <Route path="/seats" element={<div className="p-8 text-center">Seats page (reuse from previous App.jsx)</div>} />
        <Route path="/success" element={<div className="p-8 text-center">Success page (reuse from previous App.jsx)</div>} />
        {/* Add more routes for other features */}
        <Route path="*" element={<div className="p-8 text-center"><button onClick={() => window.location.href = '/'} className="px-8 py-4 bg-blue-600 text-white rounded-xl">Coming Soon - Go Home</button></div>} />
      </Routes>
    </Router>
  )
}

export default App
