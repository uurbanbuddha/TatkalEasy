const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://tatkaleasy-backend.onrender.com'

async function request(endpoint, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `Request failed (${res.status})`)
  }

  return res.json()
}

export const api = {
  searchTrains: (fromStation, toStation, date, travelClass) =>
    request('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        from_station: fromStation,
        to_station: toStation,
        date,
        travel_class: travelClass,
      }),
    }),

  bookTicket: (trainNumber, seatNumber, passengerName, passengerAge, passengerGender) =>
    request('/api/book', {
      method: 'POST',
      body: JSON.stringify({
        train_number: trainNumber,
        seat_number: seatNumber,
        passenger_name: passengerName,
        passenger_age: passengerAge,
        passenger_gender: passengerGender,
      }),
    }),

  checkPNRStatus: (pnr) =>
    request('/api/pnr-status', {
      method: 'POST',
      body: JSON.stringify({ pnr }),
    }),

  getLiveStatus: (trainNumber, date) =>
    request('/api/live-status', {
      method: 'POST',
      body: JSON.stringify({ train_number: trainNumber, date }),
    }),

  checkSeatAvailability: (trainNumber, fromStation, toStation, date, travelClass) =>
    request('/api/seat-availability', {
      method: 'POST',
      body: JSON.stringify({
        train_number: trainNumber,
        from_station: fromStation,
        to_station: toStation,
        date,
        travel_class: travelClass,
      }),
    }),

  calculateFare: (fromStation, toStation, travelClass, passengerType) =>
    request('/api/fare-calculator', {
      method: 'POST',
      body: JSON.stringify({
        from_station: fromStation,
        to_station: toStation,
        travel_class: travelClass,
        passenger_type: passengerType,
      }),
    }),

  cancelTicket: (pnr, reason) =>
    request('/api/cancel-ticket', {
      method: 'POST',
      body: JSON.stringify({ pnr, reason }),
    }),

  orderFood: (pnr, station, items) =>
    request('/api/order-food', {
      method: 'POST',
      body: JSON.stringify({ pnr, station, items }),
    }),

  setTatkalAlert: (trainNumber, date, email, phone) =>
    request('/api/tatkal-alert', {
      method: 'POST',
      body: JSON.stringify({ train_number: trainNumber, date, email, phone }),
    }),

  getStats: () => request('/api/stats'),

  getCoachPosition: (trainNumber) => request(`/api/coach-position/${trainNumber}`),

  getPlatformInfo: (stationCode) => request(`/api/platform-info/${stationCode}`),
}

export default api
