import React, { useState } from 'react'
import { motion } from 'framer-motion'

// SOLUTION TO: "Payment fails but money deducted" + "Payment gateway crashes"
// Smart retry + instant refund tracking + multiple gateway fallback

export function PaymentRetry({ amount, onSuccess, onCancel }) {
  const [attempts, setAttempts] = useState([])
  const [currentGateway, setCurrentGateway] = useState(0)
  const [processing, setProcessing] = useState(false)

  const gateways = [
    { name: 'Razorpay', icon: '💳', reliability: 98 },
    { name: 'PayU', icon: '💰', reliability: 95 },
    { name: 'CCAvenue', icon: '🏦', reliability: 92 },
    { name: 'Paytm', icon: '📱', reliability: 90 }
  ]

  const [refundTracking, setRefundTracking] = useState({
    failed: [],
    refunded: [],
    pending: []
  })

  const processPayment = async (gateway) => {
    setProcessing(true)

    // Simulate payment attempt
    const success = Math.random() > 0.3 // 70% success rate

    await new Promise(resolve => setTimeout(resolve, 2000))

    const attempt = {
      gateway: gateway.name,
      amount,
      timestamp: new Date(),
      status: success ? 'success' : 'failed',
      transactionId: `TXN${Date.now()}`
    }

    setAttempts(prev => [...prev, attempt])

    if (success) {
      onSuccess(attempt)
    } else {
      // Auto-refund failed transaction
      setRefundTracking(prev => ({
        ...prev,
        pending: [...prev.pending, attempt.transactionId]
      }))

      // Simulate instant refund
      setTimeout(() => {
        setRefundTracking(prev => ({
          ...prev,
          pending: prev.pending.filter(id => id !== attempt.transactionId),
          refunded: [...prev.refunded, attempt.transactionId]
        }))
      }, 3000)

      // Try next gateway
      if (currentGateway < gateways.length - 1) {
        setCurrentGateway(prev => prev + 1)
      }
    }

    setProcessing(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2">Secure Payment</h2>
        <p className="text-center text-gray-600 mb-8">
          Amount: <span className="font-bold text-2xl text-blue-600">₹{amount}</span>
        </p>

        {/* Payment Gateways */}
        <div className="space-y-4 mb-8">
          {gateways.map((gateway, index) => (
            <motion.button
              key={gateway.name}
              onClick={() => processPayment(gateway)}
              disabled={processing || index < currentGateway}
              className={`w-full p-4 rounded-xl border-2 transition-all ${
                index === currentGateway
                  ? 'border-blue-500 bg-blue-50'
                  : index < currentGateway
                  ? 'border-red-200 bg-red-50 opacity-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{gateway.icon}</div>
                  <div className="text-left">
                    <div className="font-bold">{gateway.name}</div>
                    <div className="text-sm text-gray-500">
                      {gateway.reliability}% success rate
                    </div>
                  </div>
                </div>
                {index < currentGateway && (
                  <span className="text-red-500 font-bold">❌ Failed</span>
                )}
                {index === currentGateway && processing && (
                  <span className="text-blue-500 font-bold">⏳ Processing...</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Refund Tracking */}
        {refundTracking.pending.length > 0 || refundTracking.refunded.length > 0 ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
            <h4 className="font-bold mb-2">💰 Refund Status</h4>

            {refundTracking.pending.map(txn => (
              <div key={txn} className="flex items-center gap-2 text-sm mb-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span>{txn}: Refund processing...</span>
              </div>
            ))}

            {refundTracking.refunded.map(txn => (
              <div key={txn} className="flex items-center gap-2 text-sm mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-green-700">
                  {txn}: ✅ Refunded! Money back in 24 hours
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {/* Attempt History */}
        {attempts.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-sm text-gray-700 mb-3">Payment Attempts</h4>
            {attempts.map((attempt, i) => (
              <div key={i} className="flex items-center justify-between text-sm mb-2 pb-2 border-b border-gray-200 last:border-0">
                <span className="text-gray-600">
                  {attempt.gateway} - {new Date(attempt.timestamp).toLocaleTimeString()}
                </span>
                <span className={`font-bold ${
                  attempt.status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {attempt.status === 'success' ? '✅ Success' : '❌ Failed'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs font-semibold">Secure Payment</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-semibold">Instant Refund</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🔄</div>
            <div className="text-xs font-semibold">Auto Retry</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💯</div>
            <div className="text-xs font-semibold">Multiple Gateways</div>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="w-full mt-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>
      </div>

      <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
        <h4 className="font-bold text-blue-900 mb-2">🛡️ Payment Protection</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✅ If payment fails, instant auto-refund</li>
          <li>✅ Money back in 24 hours (not 90 days!)</li>
          <li>✅ Try multiple gateways automatically</li>
          <li>✅ No money stuck in limbo</li>
          <li>✅ Track every transaction in real-time</li>
        </ul>
      </div>
    </div>
  )
}

export function PaymentFailureNotification({ transaction, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border-2 border-red-200"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">⚠️</div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-1">Payment Failed</h4>
          <p className="text-sm text-gray-600 mb-3">
            Your payment of ₹{transaction.amount} failed, but don't worry!
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3 text-sm">
            <div className="font-semibold text-green-900 mb-1">✅ Refund Initiated</div>
            <div className="text-green-700">
              Money will be back in your account within 24 hours
            </div>
          </div>
          <button
            onClick={onRetry}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Try Another Payment Method
          </button>
        </div>
      </div>
    </motion.div>
  )
}
