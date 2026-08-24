import React, { useState } from 'react'
import { motion } from 'framer-motion'

// SOLUTION TO: "Have to enter same passenger details repeatedly"
// Save family profiles, auto-fill in one click

export function FamilyProfiles({ onSelectPassengers }) {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      gender: 'Male',
      berth: 'Lower',
      type: 'self',
      saved: true
    },
    {
      id: 2,
      name: 'Priya Kumar',
      age: 42,
      gender: 'Female',
      berth: 'Lower',
      type: 'spouse',
      saved: true
    },
    {
      id: 3,
      name: 'Aarav Kumar',
      age: 12,
      gender: 'Male',
      berth: 'Middle',
      type: 'child',
      saved: true
    }
  ])

  const [selected, setSelected] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    setSelected(profiles.map(p => p.id))
  }

  const clearAll = () => {
    setSelected([])
  }

  const handleConfirm = () => {
    const selectedProfiles = profiles.filter(p => selected.includes(p.id))
    onSelectPassengers(selectedProfiles)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">👨‍👩‍👧‍👦</div>
          <div>
            <h2 className="text-2xl font-bold">Family Profiles</h2>
            <p className="text-sm opacity-90">Save once, use forever!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <button
          onClick={selectAll}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          ✓ Select All
        </button>
        <button
          onClick={clearAll}
          className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
        >
          ✗ Clear All
        </button>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          + Add New
        </button>
      </div>

      {/* Profiles Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {profiles.map(profile => (
          <motion.div
            key={profile.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSelect(profile.id)}
            className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all ${
              selected.includes(profile.id)
                ? 'ring-4 ring-blue-500'
                : 'hover:shadow-xl'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{profile.name}</h4>
                  <p className="text-sm text-gray-500 capitalize">{profile.type}</p>
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                selected.includes(profile.id)
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'border-gray-300'
              }`}>
                {selected.includes(profile.id) && '✓'}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600">Age</div>
                <div className="font-bold">{profile.age} years</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-600">Gender</div>
                <div className="font-bold">{profile.gender}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 col-span-2">
                <div className="text-xs text-purple-600">Preferred Berth</div>
                <div className="font-bold text-purple-900">{profile.berth}</div>
              </div>
            </div>

            {profile.age > 60 && (
              <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                <span className="text-sm font-semibold text-green-700">
                  ✅ 40% Senior Citizen Discount
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Confirm Button */}
      {selected.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Continue with {selected.length} Passenger{selected.length > 1 ? 's' : ''}
        </motion.button>
      )}

      {/* Benefits */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
        <h4 className="font-bold text-blue-900 mb-4">✨ Benefits</h4>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: '⚡', text: 'One-click booking' },
            { icon: '💾', text: 'Saved forever' },
            { icon: '✏️', text: 'Easy to edit' },
            { icon: '👥', text: 'Unlimited profiles' },
            { icon: '🎯', text: 'Auto-fill details' },
            { icon: '🔒', text: 'Secure & private' }
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 bg-white rounded-lg p-3">
              <span className="text-2xl">{benefit.icon}</span>
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4">
        <div className="font-bold mb-3 text-center">⏱️ Time Saved</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-red-600 font-bold mb-1">❌ IRCTC</div>
            <div className="text-4xl font-bold text-gray-800 mb-1">5 mins</div>
            <div className="text-sm text-gray-600">Entering details manually</div>
          </div>
          <div className="text-center">
            <div className="text-green-600 font-bold mb-1">✅ TatkalEasy</div>
            <div className="text-4xl font-bold text-green-600 mb-1">10 sec</div>
            <div className="text-sm text-gray-600">Select saved profiles</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function QuickFrequentRoutes({ onSelectRoute }) {
  const frequentRoutes = [
    { from: 'New Delhi', to: 'Mumbai', bookings: 15 },
    { from: 'Bangalore', to: 'Chennai', bookings: 8 },
    { from: 'Delhi', to: 'Kolkata', bookings: 5 }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h4 className="font-bold text-lg mb-4">🔥 Frequent Routes</h4>
      <div className="space-y-3">
        {frequentRoutes.map((route, i) => (
          <button
            key={i}
            onClick={() => onSelectRoute(route)}
            className="w-full bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-indigo-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 transition-all text-left"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🚂</div>
                <div>
                  <div className="font-bold">{route.from} → {route.to}</div>
                  <div className="text-xs text-gray-500">Booked {route.bookings} times</div>
                </div>
              </div>
              <div className="text-blue-600 font-bold">→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
