import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// SOLUTION TO: "Session timeout mid-booking" + "Lost all entered data"
// Auto-saves every field, restores on refresh

export function useAutoSave(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(`autosave_${key}`)
    return saved ? JSON.parse(saved) : initialValue
  })

  const [lastSaved, setLastSaved] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSaving(true)
      localStorage.setItem(`autosave_${key}`, JSON.stringify(value))
      setLastSaved(new Date())
      setTimeout(() => setSaving(false), 500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [value, key])

  const clearSaved = () => {
    localStorage.removeItem(`autosave_${key}`)
  }

  return [value, setValue, { saving, lastSaved, clearSaved }]
}

export function AutoSaveIndicator({ saving, lastSaved }) {
  return (
    <AnimatePresence>
      {saving || lastSaved ? (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          className="fixed top-20 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 text-sm z-50"
        >
          {saving ? (
            <>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-700">Saving...</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-700">Saved {getTimeAgo(lastSaved)}</span>
            </>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function getTimeAgo(date) {
  if (!date) return ''
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 10) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  return 'recently'
}

export function SessionExtender() {
  const [sessionTime, setSessionTime] = useState(1800) // 30 minutes
  const [showExtend, setShowExtend] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => {
        if (prev === 300) { // 5 minutes left
          setShowExtend(true)
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const extendSession = () => {
    setSessionTime(1800)
    setShowExtend(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <>
      <AnimatePresence>
        {showExtend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl">
              <div className="text-6xl text-center mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-center mb-2">Session Expiring Soon</h3>
              <p className="text-gray-600 text-center mb-6">
                Your session will expire in <span className="font-bold text-orange-600">{formatTime(sessionTime)}</span>
              </p>
              <button
                onClick={extendSession}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Extend Session by 30 Minutes
              </button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Don't worry - your progress is auto-saved!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session timer in corner */}
      <div className="fixed bottom-4 left-4 bg-white shadow-md rounded-lg px-3 py-2 text-xs text-gray-600">
        Session: {formatTime(sessionTime)}
      </div>
    </>
  )
}
