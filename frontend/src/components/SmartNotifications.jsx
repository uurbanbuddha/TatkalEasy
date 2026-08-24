import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// SOLUTION TO: "No real-time updates" + "Platform changes not notified"
// Smart notifications for everything - train delays, platform changes, booking status

export function SmartNotifications() {
  const [notifications, setNotifications] = useState([])
  const [settings, setSettings] = useState({
    trainDelay: true,
    platformChange: true,
    bookingStatus: true,
    pnrUpdate: true,
    tatkalOpen: true,
    fareDrops: true
  })

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Simulate incoming notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'delay',
        title: 'Train Delayed',
        message: 'Rajdhani Express (12301) delayed by 30 minutes',
        time: new Date(),
        icon: '⏰',
        action: 'View Details',
        priority: 'high'
      },
      {
        id: 2,
        type: 'platform',
        title: 'Platform Changed',
        message: 'Your train now arriving at Platform 5 (was Platform 3)',
        time: new Date(Date.now() - 300000),
        icon: '🚂',
        action: 'Navigate',
        priority: 'critical'
      }
    ]

    setNotifications(mockNotifications)
  }, [])

  const sendBrowserNotification = (notif) => {
    if (Notification.permission === 'granted') {
      new Notification(notif.title, {
        body: notif.message,
        icon: '/train-icon.png',
        badge: '/train-badge.png'
      })
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">🔔 Smart Notifications</h3>

        <div className="space-y-3">
          {Object.entries(settings).map(([key, enabled]) => (
            <label
              key={key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div>
                <div className="font-semibold capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-xs text-gray-500">
                  {getNotificationDescription(key)}
                </div>
              </div>
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded"
              />
            </label>
          ))}
        </div>

        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
          Save Preferences
        </button>
      </div>

      {/* Active Notifications */}
      <AnimatePresence>
        {notifications.map(notif => (
          <NotificationCard
            key={notif.id}
            notification={notif}
            onDismiss={() => markAsRead(notif.id)}
          />
        ))}
      </AnimatePresence>

      {/* Notification Types */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
        <h4 className="font-bold text-purple-900 mb-4">📬 What You'll Get</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: '🚂', text: 'Train delay updates' },
            { icon: '🛤️', text: 'Platform changes' },
            { icon: '✅', text: 'Booking confirmations' },
            { icon: '🔄', text: 'PNR status changes' },
            { icon: '⏰', text: 'Tatkal opening reminders' },
            { icon: '💰', text: 'Fare drop alerts' },
            { icon: '🎫', text: 'Chart preparation notices' },
            { icon: '📍', text: 'Train arrival predictions' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-sm">
        <div className="font-bold mb-2">🎯 TatkalEasy vs IRCTC</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-red-600 font-semibold mb-1">❌ IRCTC:</div>
            <ul className="text-gray-600 space-y-1">
              <li>• No real-time notifications</li>
              <li>• Must check manually</li>
              <li>• Miss platform changes</li>
              <li>• No delay alerts</li>
            </ul>
          </div>
          <div>
            <div className="text-green-600 font-semibold mb-1">✅ TatkalEasy:</div>
            <ul className="text-gray-600 space-y-1">
              <li>• Instant push notifications</li>
              <li>• SMS + Email + App alerts</li>
              <li>• Never miss updates</li>
              <li>• Proactive reminders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationCard({ notification, onDismiss }) {
  const priorityColors = {
    critical: 'from-red-500 to-pink-500',
    high: 'from-orange-500 to-red-500',
    medium: 'from-blue-500 to-indigo-500',
    low: 'from-gray-500 to-gray-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${priorityColors[notification.priority]} p-1`} />
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{notification.icon}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-lg">{notification.title}</h4>
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-3">{notification.message}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {getTimeAgo(notification.time)}
              </span>
              {notification.action && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                  {notification.action}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function getNotificationDescription(key) {
  const descriptions = {
    trainDelay: 'Get notified when your train is running late',
    platformChange: 'Instant alert if platform changes',
    bookingStatus: 'Updates on your booking confirmation',
    pnrUpdate: 'Status changes for your PNR',
    tatkalOpen: 'Reminder 15 mins before Tatkal opens',
    fareDrops: 'Alert when fares drop on your routes'
  }
  return descriptions[key] || ''
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function TatkalReminderSetup({ trainNumber, date, onSetReminder }) {
  const [reminderSet, setReminderSet] = useState(false)
  const [methods, setMethods] = useState({
    push: true,
    sms: false,
    email: false
  })

  const handleSetReminder = () => {
    setReminderSet(true)
    onSetReminder({ trainNumber, date, methods })

    // Schedule notification
    const tatkalTime = new Date(date)
    tatkalTime.setHours(9, 45, 0, 0) // 9:45 AM, 15 mins before

    if (Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification('Tatkal Opens in 15 Minutes!', {
          body: `Get ready to book ${trainNumber}. All details pre-filled!`,
          icon: '/train-icon.png'
        })
      }, tatkalTime - Date.now())
    }
  }

  if (reminderSet) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h4 className="font-bold text-green-900 text-xl mb-2">Reminder Set!</h4>
        <p className="text-green-700">
          You'll get notified 15 minutes before Tatkal opens
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h4 className="font-bold text-lg mb-4">⏰ Set Tatkal Reminder</h4>
      <p className="text-gray-600 mb-4">
        Never miss Tatkal booking window! Get reminded 15 minutes before.
      </p>

      <div className="space-y-3 mb-6">
        {Object.entries(methods).map(([method, enabled]) => (
          <label key={method} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setMethods({ ...methods, [method]: e.target.checked })}
              className="w-5 h-5"
            />
            <div className="capitalize font-medium">{method} Notification</div>
          </label>
        ))}
      </div>

      <button
        onClick={handleSetReminder}
        className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
      >
        Set Reminder
      </button>
    </div>
  )
}
