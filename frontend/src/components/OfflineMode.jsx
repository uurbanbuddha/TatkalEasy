import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// SOLUTION TO: "Mobile network issues" + "Lost connection mid-booking"
// Works offline, syncs when back online

export function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [pendingActions, setPendingActions] = useState([])
  const [justBackOnline, setJustBackOnline] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setJustBackOnline(true)

      // Sync pending actions
      const stored = localStorage.getItem('offline_queue')
      if (stored) {
        const queue = JSON.parse(stored)
        setPendingActions(queue)

        // Process queue
        processOfflineQueue(queue)
      }

      setTimeout(() => setJustBackOnline(false), 5000)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const processOfflineQueue = async (queue) => {
    for (const action of queue) {
      try {
        // Process each pending action
        await fetch(action.endpoint, {
          method: action.method,
          body: JSON.stringify(action.data),
          headers: { 'Content-Type': 'application/json' }
        })

        // Remove from queue
        const updated = queue.filter(a => a.id !== action.id)
        localStorage.setItem('offline_queue', JSON.stringify(updated))
        setPendingActions(updated)
      } catch (error) {
        console.error('Failed to sync:', error)
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl animate-pulse">📡</div>
                <div>
                  <div className="font-bold text-lg">You're Offline</div>
                  <div className="text-sm opacity-90">
                    Don't worry! You can continue working. Changes will sync when you're back online.
                  </div>
                </div>
              </div>
              {pendingActions.length > 0 && (
                <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur">
                  <span className="font-bold">{pendingActions.length}</span> pending
                </div>
              )}
            </div>
          </motion.div>
        )}

        {justBackOnline && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <div className="text-3xl">✅</div>
              <div>
                <div className="font-bold text-lg">Back Online!</div>
                <div className="text-sm opacity-90">
                  Syncing your changes...
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Queue Manager */}
      {!isOnline && pendingActions.length > 0 && (
        <div className="fixed bottom-20 right-4 bg-white rounded-2xl shadow-2xl p-4 max-w-sm z-40">
          <h4 className="font-bold mb-3">📦 Pending Actions</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pendingActions.map((action, i) => (
              <div key={action.id} className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="font-semibold">{action.type}</div>
                <div className="text-xs text-gray-600">
                  {new Date(action.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center text-gray-500 mt-3">
            Will sync automatically when online
          </p>
        </div>
      )}
    </>
  )
}

export function useOfflineStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(`offline_${key}`)
    return stored ? JSON.parse(stored) : initialValue
  })

  const updateValue = (newValue) => {
    setValue(newValue)
    localStorage.setItem(`offline_${key}`, JSON.stringify(newValue))

    // If offline, add to queue
    if (!navigator.onLine) {
      const queue = JSON.parse(localStorage.getItem('offline_queue') || '[]')
      queue.push({
        id: Date.now(),
        type: `Update ${key}`,
        endpoint: '/api/sync',
        method: 'POST',
        data: { key, value: newValue },
        timestamp: Date.now()
      })
      localStorage.setItem('offline_queue', JSON.stringify(queue))
    }
  }

  return [value, updateValue]
}

// Service Worker for offline capability
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration)
        })
        .catch(error => {
          console.log('SW registration failed:', error)
        })
    })
  }
}
