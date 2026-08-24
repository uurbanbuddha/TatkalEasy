import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// SOLUTION TO: "Waitlist status confusion" + "WL 127/48 - what does this mean?"
// AI-powered confirmation prediction with historical data

export function WaitlistPredictor({ trainNumber, waitlistPosition, travelClass, date }) {
  const [prediction, setPrediction] = useState(null)
  const [historicalData, setHistoricalData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI prediction based on historical data
    setTimeout(() => {
      const mockHistoricalData = [
        { date: '2024-08-01', maxConfirmed: 85 },
        { date: '2024-08-08', maxConfirmed: 92 },
        { date: '2024-08-15', maxConfirmed: 78 },
        { date: '2024-08-22', maxConfirmed: 88 }
      ]

      const avgConfirmation = mockHistoricalData.reduce((a, b) => a + b.maxConfirmed, 0) / mockHistoricalData.length
      const probability = Math.max(0, Math.min(100, (avgConfirmation - waitlistPosition) / avgConfirmation * 100))

      setPrediction({
        probability: Math.round(probability),
        avgConfirmation: Math.round(avgConfirmation),
        daysToConfirm: Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24) * 0.3),
        recommendation: probability > 70 ? 'high' : probability > 40 ? 'medium' : 'low'
      })

      setHistoricalData(mockHistoricalData)
      setLoading(false)
    }, 1500)
  }, [trainNumber, waitlistPosition, date])

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    )
  }

  const getStatusColor = () => {
    if (prediction.recommendation === 'high') return 'green'
    if (prediction.recommendation === 'medium') return 'yellow'
    return 'red'
  }

  const getStatusMessage = () => {
    if (prediction.recommendation === 'high')
      return '✅ High chance of confirmation! This ticket usually gets confirmed.'
    if (prediction.recommendation === 'medium')
      return '⚠️ Moderate chance. Consider looking at alternative trains.'
    return '❌ Low chance of confirmation. We recommend booking alternate train or date.'
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${
        getStatusColor() === 'green' ? 'from-green-500 to-emerald-500' :
        getStatusColor() === 'yellow' ? 'from-yellow-500 to-orange-500' :
        'from-red-500 to-pink-500'
      } p-6 text-white`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">
            {prediction.recommendation === 'high' ? '🎉' :
             prediction.recommendation === 'medium' ? '🤔' : '⚠️'}
          </div>
          <div>
            <h3 className="text-2xl font-bold">WL {waitlistPosition}</h3>
            <p className="text-sm opacity-90">Current Position</p>
          </div>
        </div>

        <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
          <div className="text-5xl font-bold mb-1">{prediction.probability}%</div>
          <div className="text-sm">Confirmation Probability</div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-4">
        {/* Status Message */}
        <div className={`p-4 rounded-xl border-2 ${
          getStatusColor() === 'green' ? 'bg-green-50 border-green-200' :
          getStatusColor() === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
          'bg-red-50 border-red-200'
        }`}>
          <p className="font-semibold">{getStatusMessage()}</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-900">{prediction.avgConfirmation}</div>
            <div className="text-sm text-blue-700">Avg. WL Confirmed</div>
            <div className="text-xs text-gray-600 mt-1">on this train historically</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-900">{prediction.daysToConfirm}</div>
            <div className="text-sm text-purple-700">Days to Confirm</div>
            <div className="text-xs text-gray-600 mt-1">estimated timeline</div>
          </div>
        </div>

        {/* Historical Trend */}
        <div>
          <h4 className="font-bold mb-3">📊 Historical Confirmation Trend</h4>
          <div className="space-y-2">
            {historicalData.map((data, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">
                  {new Date(data.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.maxConfirmed / 100) * 100}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                  />
                </div>
                <span className="text-sm font-semibold w-12">WL {data.maxConfirmed}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-start gap-2 mb-2">
            <div className="text-xl">🤖</div>
            <h4 className="font-bold text-purple-900">AI Insights</h4>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• This train usually clears WL up to position {prediction.avgConfirmation}</li>
            <li>• {waitlistPosition < prediction.avgConfirmation
              ? `Your position ${waitlistPosition} is likely to confirm`
              : `Your position ${waitlistPosition} is beyond usual confirmation range`
            }</li>
            <li>• Check chart 4-5 hours before departure for final status</li>
            {prediction.recommendation !== 'high' && (
              <li>• <span className="font-semibold">Alternative:</span> Try booking on {travelClass === 'AC 2-Tier' ? '3-Tier' : 'Sleeper'} class</li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
            📧 Set Alert
          </button>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
            🔍 Find Alternatives
          </button>
        </div>

        {/* Comparison */}
        <div className="text-xs text-center text-gray-500 pt-3 border-t">
          <div className="font-semibold mb-1">🎯 TatkalEasy vs IRCTC</div>
          <div>IRCTC: "WL 45/127" ❓ | TatkalEasy: "{prediction.probability}% will confirm" ✅</div>
        </div>
      </div>
    </div>
  )
}

export function WaitlistAutoAlert({ pnr, currentStatus, onStatusChange }) {
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const [channels, setChannels] = useState({
    sms: true,
    email: true,
    push: false
  })

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-lg">Auto-Alert System</h4>
        <button
          onClick={() => setAlertsEnabled(!alertsEnabled)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            alertsEnabled
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {alertsEnabled ? '✅ Enabled' : 'Enable'}
        </button>
      </div>

      {alertsEnabled && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Get notified instantly when your waitlist status changes
          </p>

          <div className="space-y-2">
            {Object.entries(channels).map(([channel, enabled]) => (
              <label key={channel} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setChannels({ ...channels, [channel]: e.target.checked })}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <div className="font-semibold capitalize">{channel} Notifications</div>
                  <div className="text-xs text-gray-500">
                    {channel === 'sms' && 'Instant SMS to your registered mobile'}
                    {channel === 'email' && 'Email alerts with detailed status'}
                    {channel === 'push' && 'Browser push notifications'}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
            <div className="font-semibold text-blue-900 mb-1">📬 You'll be notified when:</div>
            <ul className="text-blue-800 space-y-1">
              <li>• Waitlist position changes</li>
              <li>• Ticket gets confirmed (CNF)</li>
              <li>• RAC converts to CNF</li>
              <li>• Chart is prepared</li>
              <li>• 24 hours before journey</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
