import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TatkalCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 9,
    minutes: 42,
    seconds: 18
  })
  const [isPrepMode, setIsPrepMode] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const isNearTatkal = timeLeft.hours === 0 && timeLeft.minutes < 10

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-8 max-w-2xl mx-auto mb-8"
    >
      <h3 className="text-2xl font-bold mb-4 text-center">
        ⏰ Tatkal Opens In:
      </h3>

      {/* Countdown Display */}
      <div className="flex justify-center gap-4 mb-6">
        {['hours', 'minutes', 'seconds'].map((unit) => (
          <motion.div
            key={unit}
            animate={isNearTatkal ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-center"
          >
            <div className={`text-5xl font-bold ${
              isNearTatkal ? 'text-tatkal-orange' : 'text-white'
            }`}>
              {String(timeLeft[unit]).padStart(2, '0')}
            </div>
            <div className="text-sm text-blue-200 mt-1 capitalize">{unit}</div>
          </motion.div>
        ))}
      </div>

      {/* Prep Mode Toggle */}
      {!isPrepMode ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsPrepMode(true)}
          className="btn-primary w-full"
        >
          🎯 Enter Prep Mode
        </motion.button>
      ) : (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <span className="text-green-400 text-lg">✅ Prep Mode Active</span>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {[
              'Train selected: Rajdhani Express',
              'Passenger details: Saurabh Pandey',
              'Payment method: UPI (saved)',
              'Seat preference: Lower berth'
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 p-3 bg-white/10 rounded-lg"
              >
                <span className="text-green-400">✅</span>
                <span className="text-sm">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Execute Button */}
          <motion.button
            animate={
              timeLeft.hours === 0 && timeLeft.minutes === 0
                ? { scale: [1, 1.1, 1] }
                : {}
            }
            transition={{ duration: 0.5, repeat: Infinity }}
            className={`w-full py-4 rounded-xl font-bold text-lg ${
              timeLeft.hours === 0 && timeLeft.minutes === 0
                ? 'bg-green-500 hover:bg-green-600 animate-pulse'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
            disabled={!(timeLeft.hours === 0 && timeLeft.minutes === 0)}
          >
            {timeLeft.hours === 0 && timeLeft.minutes === 0
              ? '🚀 EXECUTE NOW (1-Click Booking!)'
              : '⏰ Waiting for 10:00 AM...'}
          </motion.button>

          <p className="text-xs text-center text-blue-200">
            At exactly 10:00 AM, this button will execute your booking in 2 seconds!
          </p>
        </div>
      )}
    </motion.div>
  )
}
