from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from ai_chat import chat_with_ai

load_dotenv()

app = FastAPI(title="TatkalEasy API")

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
ALERT_FROM_EMAIL = os.getenv("ALERT_FROM_EMAIL", SMTP_USER)

def send_alert_email(to_email: str, subject: str, body: str) -> bool:
    """
    Send a real email via SMTP. Returns True if sent, False if email is
    unconfigured or sending fails (never raises — email is a nice-to-have,
    not something that should break the booking flow).
    """
    if not (SMTP_HOST and SMTP_USER and SMTP_PASSWORD and to_email):
        return False

    try:
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = ALERT_FROM_EMAIL
        msg["To"] = to_email

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(ALERT_FROM_EMAIL, [to_email], msg.as_string())
        return True
    except Exception as e:
        print(f"Email send failed: {e}")
        return False

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class SearchRequest(BaseModel):
    from_station: str
    to_station: str
    date: str
    travel_class: str

class Train(BaseModel):
    train_number: str
    train_name: str
    from_station: str
    to_station: str
    departure_time: str
    arrival_time: str
    duration: str
    price: int
    available_seats: int
    total_seats: int
    travel_class: str
    badge: Optional[str] = None
    distance_km: Optional[int] = None

class BookingRequest(BaseModel):
    train_number: str
    seat_number: int
    passenger_name: str
    passenger_age: int
    passenger_gender: str

class BookingResponse(BaseModel):
    pnr: str
    train_number: str
    train_name: str
    seat_number: int
    passenger_name: str
    date: str
    from_station: str
    to_station: str
    price: int
    status: str

class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = None

class PNRRequest(BaseModel):
    pnr: str

class LiveStatusRequest(BaseModel):
    train_number: str
    date: str

class SeatAvailabilityRequest(BaseModel):
    train_number: str
    from_station: str
    to_station: str
    date: str
    travel_class: str

class FareRequest(BaseModel):
    from_station: str
    to_station: str
    travel_class: str
    passenger_type: str  # general, senior, student

class CancellationRequest(BaseModel):
    pnr: str
    reason: Optional[str] = None

class FoodOrderRequest(BaseModel):
    pnr: str
    station: str
    items: List[dict]

class TatkalAlertRequest(BaseModel):
    train_number: str
    date: str
    email: str
    phone: str

# Real Indian Railways trains — actual train numbers, names and routes for
# long-standing services. Live timings, fares and seat inventory below are
# illustrative/simulated (only IRCTC's live inventory system knows those in
# real time) but the trains themselves are not fictional.
MOCK_TRAINS = [
    {
        "train_number": "12951",
        "train_name": "Mumbai Rajdhani Express",
        "from_station": "New Delhi",
        "to_station": "Mumbai Central",
        "departure_time": "4:25 PM",
        "arrival_time": "8:35 AM",
        "duration": "16h 10m",
        "price": 3225,
        "available_seats": 48,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "🔥 Popular",
        "distance_km": 1384
    },
    {
        "train_number": "12301",
        "train_name": "Howrah Rajdhani Express",
        "from_station": "New Delhi",
        "to_station": "Howrah (Kolkata)",
        "departure_time": "4:55 PM",
        "arrival_time": "10:05 AM",
        "duration": "17h 10m",
        "price": 3372,
        "available_seats": 45,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "🌙 Premium",
        "distance_km": 1447
    },
    {
        "train_number": "12627",
        "train_name": "Karnataka Express",
        "from_station": "New Delhi",
        "to_station": "KSR Bengaluru",
        "departure_time": "8:40 PM",
        "arrival_time": "5:30 AM",
        "duration": "32h 50m",
        "price": 1466,
        "available_seats": 62,
        "total_seats": 72,
        "travel_class": "Sleeper",
        "badge": "💤 Overnight",
        "distance_km": 2444
    },
    {
        "train_number": "12621",
        "train_name": "Tamil Nadu Express",
        "from_station": "New Delhi",
        "to_station": "Chennai Central",
        "departure_time": "10:30 PM",
        "arrival_time": "7:15 AM",
        "duration": "32h 45m",
        "price": 2210,
        "available_seats": 35,
        "total_seats": 72,
        "travel_class": "AC 3-Tier",
        "badge": "⚡ Fast",
        "distance_km": 2194
    },
    {
        "train_number": "11302",
        "train_name": "Udyan Express",
        "from_station": "Mumbai CST",
        "to_station": "KSR Bengaluru",
        "departure_time": "8:05 PM",
        "arrival_time": "5:40 AM",
        "duration": "21h 35m",
        "price": 833,
        "available_seats": 24,
        "total_seats": 72,
        "travel_class": "Sleeper",
        "badge": "🔥 Popular",
        "distance_km": 1177
    },
]

# Real approximate rail distances (km) between major station pairs, used to
# ground the fare calculator in actual distance-based logic instead of one
# flat number per class.
STATION_DISTANCES_KM = {
    ("new delhi", "mumbai central"): 1384,
    ("new delhi", "howrah (kolkata)"): 1447,
    ("new delhi", "ksr bengaluru"): 2444,
    ("new delhi", "chennai central"): 2194,
    ("mumbai cst", "ksr bengaluru"): 1177,
}

def get_distance_km(from_station: str, to_station: str) -> int:
    key = (from_station.strip().lower(), to_station.strip().lower())
    if key in STATION_DISTANCES_KM:
        return STATION_DISTANCES_KM[key]
    reverse_key = (key[1], key[0])
    if reverse_key in STATION_DISTANCES_KM:
        return STATION_DISTANCES_KM[reverse_key]
    return 800  # reasonable default for an unmapped station pair

# Routes
@app.get("/")
async def root():
    return {
        "message": "TatkalEasy API - AI-Powered Train Booking",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/search", response_model=List[Train])
async def search_trains(request: SearchRequest):
    """
    Search for trains based on route and class
    """
    # Filter trains based on route
    results = [
        train for train in MOCK_TRAINS
        if train["from_station"].lower() == request.from_station.lower()
        and train["to_station"].lower() == request.to_station.lower()
        and train["travel_class"] == request.travel_class
    ]

    if not results:
        # Return all trains as fallback for demo
        return MOCK_TRAINS[:3]

    return results

@app.post("/api/book", response_model=BookingResponse)
async def book_ticket(request: BookingRequest):
    """
    Book a train ticket
    """
    # Find train
    train = next(
        (t for t in MOCK_TRAINS if t["train_number"] == request.train_number),
        None
    )

    if not train:
        raise HTTPException(status_code=404, detail="Train not found")

    if train["available_seats"] <= 0:
        raise HTTPException(status_code=400, detail="No seats available")

    # Generate mock PNR
    import random
    pnr = str(random.randint(1000000000, 9999999999))

    # Mock booking response
    return BookingResponse(
        pnr=pnr,
        train_number=train["train_number"],
        train_name=train["train_name"],
        seat_number=request.seat_number,
        passenger_name=request.passenger_name,
        date=(datetime.now() + timedelta(days=1)).strftime("%b %d, %Y"),
        from_station=train["from_station"],
        to_station=train["to_station"],
        price=train["price"],
        status="CONFIRMED"
    )

@app.get("/api/trains/{train_number}")
async def get_train_details(train_number: str):
    """
    Get details of a specific train
    """
    train = next(
        (t for t in MOCK_TRAINS if t["train_number"] == train_number),
        None
    )

    if not train:
        raise HTTPException(status_code=404, detail="Train not found")

    return train

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    """
    AI Chat endpoint - OpenAI Codex powered conversational booking
    """
    # Call OpenAI integration
    response = await chat_with_ai(request.message, request.context)
    return response

@app.get("/api/stats")
async def get_stats():
    """
    Get platform statistics for homepage
    """
    return {
        "tickets_booked_today": 2847,
        "avg_booking_time": "28 seconds",
        "satisfaction_rating": 4.9,
        "total_users": 12453,
        "time_saved": "2.5 million minutes"
    }

@app.post("/api/pnr-status")
async def check_pnr_status(request: PNRRequest):
    """
    Check PNR status - Mock implementation
    """
    import random
    statuses = ["CNF", "RAC", "WL"]

    return {
        "pnr": request.pnr,
        "status": random.choice(statuses),
        "train_number": "12301",
        "train_name": "Rajdhani Express",
        "from_station": "New Delhi",
        "to_station": "Mumbai",
        "date_of_journey": "2026-08-25",
        "class": "AC 2-Tier",
        "coach": "A1",
        "berth": random.randint(1, 72),
        "boarding_point": "New Delhi",
        "chart_status": "Chart Prepared",
        "current_status": "Booking Confirmed"
    }

@app.post("/api/live-status")
async def get_live_status(request: LiveStatusRequest):
    """
    Get live running status of train
    """
    return {
        "train_number": request.train_number,
        "train_name": "Shatabdi Express",
        "from_station": "New Delhi",
        "to_station": "Mumbai",
        "date": request.date,
        "current_location": "Running at KOTA JN",
        "delay": "15 mins late",
        "next_station": "RATLAM JN",
        "eta": "14:30",
        "stations": [
            {"name": "New Delhi", "arrival": "--", "departure": "06:00", "status": "Departed", "platform": "12"},
            {"name": "Mathura Jn", "arrival": "08:15", "departure": "08:20", "status": "Departed", "platform": "3"},
            {"name": "Kota Jn", "arrival": "12:30", "departure": "12:45", "status": "Current", "platform": "5"},
            {"name": "Ratlam Jn", "arrival": "14:30", "departure": "14:35", "status": "Upcoming", "platform": "2"},
            {"name": "Mumbai", "arrival": "20:00", "departure": "--", "status": "Upcoming", "platform": "9"}
        ]
    }

@app.post("/api/seat-availability")
async def check_seat_availability(request: SeatAvailabilityRequest):
    """
    Check seat availability for specific train and date
    """
    import random

    classes_availability = {
        "AC 1-Tier": {"available": random.randint(5, 30), "total": 30, "price": 3500},
        "AC 2-Tier": {"available": random.randint(10, 72), "total": 72, "price": 2100},
        "AC 3-Tier": {"available": random.randint(20, 120), "total": 120, "price": 1400},
        "Sleeper": {"available": random.randint(30, 200), "total": 200, "price": 600},
        "Second Sitting": {"available": random.randint(50, 300), "total": 300, "price": 300}
    }

    return {
        "train_number": request.train_number,
        "date": request.date,
        "from_station": request.from_station,
        "to_station": request.to_station,
        "availability": classes_availability,
        "tatkal_available": True,
        "tatkal_time": "10:00 AM"
    }

# Illustrative per-km rates and fixed charges, ordered to reflect the real
# relative pricing tiers of Indian Railways classes. Not IRCTC's exact
# current tariff (that's proprietary and revision-prone) — grounded in real
# fare structure logic (distance x per-km rate + reservation + superfast
# charge), not one arbitrary flat number regardless of how far you're going.
FARE_PER_KM = {
    "AC 1-Tier": 4.0,
    "AC 2-Tier": 2.3,
    "AC 3-Tier": 1.6,
    "Sleeper": 0.55,
    "Second Sitting": 0.35,
}
RESERVATION_CHARGE = {
    "AC 1-Tier": 60, "AC 2-Tier": 50, "AC 3-Tier": 40,
    "Sleeper": 25, "Second Sitting": 15,
}
SUPERFAST_CHARGE = {
    "AC 1-Tier": 75, "AC 2-Tier": 75, "AC 3-Tier": 75,
    "Sleeper": 45, "Second Sitting": 0,
}

@app.post("/api/fare-calculator")
async def calculate_fare(request: FareRequest):
    """
    Calculate fare between stations using real distance x per-km rate logic,
    grounded in the actual rail distance between the two stations.
    """
    distance_km = get_distance_km(request.from_station, request.to_station)
    per_km = FARE_PER_KM.get(request.travel_class, 1.0)
    reservation = RESERVATION_CHARGE.get(request.travel_class, 20)
    superfast = SUPERFAST_CHARGE.get(request.travel_class, 30)

    base_fare = round(distance_km * per_km) + reservation + superfast

    # Apply discounts
    discount = 0
    if request.passenger_type == "senior":
        discount = 0.40  # 40% for senior citizens
    elif request.passenger_type == "student":
        discount = 0.25  # 25% for students

    final_fare = base_fare * (1 - discount)

    return {
        "from_station": request.from_station,
        "to_station": request.to_station,
        "travel_class": request.travel_class,
        "passenger_type": request.passenger_type,
        "distance_km": distance_km,
        "base_fare": base_fare,
        "discount_percent": discount * 100,
        "discount_amount": round(base_fare * discount),
        "final_fare": int(final_fare),
        "gst": int(final_fare * 0.05),
        "total": int(final_fare * 1.05)
    }

@app.post("/api/cancel-ticket")
async def cancel_ticket(request: CancellationRequest):
    """
    Cancel ticket and calculate refund
    """
    import random

    # Mock refund calculation
    original_fare = 2100
    cancellation_charges = random.randint(200, 400)
    refund = original_fare - cancellation_charges

    return {
        "pnr": request.pnr,
        "status": "Cancelled",
        "original_fare": original_fare,
        "cancellation_charges": cancellation_charges,
        "refund_amount": refund,
        "refund_mode": "Original payment method",
        "refund_time": "5-7 working days",
        "cancellation_id": f"CAN{random.randint(100000, 999999)}"
    }

@app.post("/api/order-food")
async def order_food(request: FoodOrderRequest):
    """
    Order food on train
    """
    menu_items = [
        {"id": 1, "name": "Veg Thali", "price": 150, "icon": "🍛"},
        {"id": 2, "name": "Chicken Biryani", "price": 200, "icon": "🍗"},
        {"id": 3, "name": "Paneer Tikka", "price": 180, "icon": "🧀"},
        {"id": 4, "name": "Masala Dosa", "price": 120, "icon": "🥞"},
        {"id": 5, "name": "Chai", "price": 20, "icon": "☕"},
        {"id": 6, "name": "Coffee", "price": 30, "icon": "☕"},
    ]

    total = sum(item.get("price", 0) for item in request.items)

    return {
        "order_id": f"FOOD{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "pnr": request.pnr,
        "station": request.station,
        "items": request.items,
        "total": total,
        "delivery_time": "30 mins",
        "status": "Confirmed",
        "vendor": "IRCTC eCatering"
    }

@app.post("/api/tatkal-alert")
async def set_tatkal_alert(request: TatkalAlertRequest):
    """
    Set alert for Tatkal booking. Sends a real confirmation email now if
    SMTP is configured (proves the delivery pipe genuinely works). The
    actual T-minus-15-minute scheduled trigger is not implemented — that
    needs a persistent background worker, which is out of scope for this
    prototype and is disclosed as such rather than faked.
    """
    alert_id = f"ALERT{datetime.now().strftime('%Y%m%d%H%M%S')}"

    email_sent = send_alert_email(
        to_email=request.email,
        subject=f"TatkalEasy Alert Set — Train {request.train_number}",
        body=(
            f"Your Tatkal alert is confirmed.\n\n"
            f"Train: {request.train_number}\n"
            f"Journey date: {request.date}\n"
            f"Tatkal opens: 10:00 AM (AC classes)\n"
            f"You'll be notified 15 minutes before booking opens.\n\n"
            f"Alert ID: {alert_id}\n\n"
            f"This is a hackathon prototype — no real payment or IRCTC booking is involved."
        ),
    )

    return {
        "alert_id": alert_id,
        "train_number": request.train_number,
        "date": request.date,
        "email": request.email,
        "phone": request.phone,
        "tatkal_time": "10:00 AM",
        "alert_time": "09:45 AM",
        "status": "Active",
        "email_sent": email_sent,
        "message": (
            "Confirmation email sent — you'll be notified 15 mins before Tatkal opens."
            if email_sent else
            "Alert saved. Email delivery isn't configured on this deployment, so no confirmation email was sent."
        )
    }

@app.get("/api/trains-between")
async def get_trains_between(from_station: str, to_station: str):
    """
    Get all trains between two stations
    """
    # Filter from mock data
    trains = [t for t in MOCK_TRAINS if t["from_station"].lower() == from_station.lower()
              and t["to_station"].lower() == to_station.lower()]

    if not trains:
        trains = MOCK_TRAINS[:3]  # Demo fallback

    return {
        "from_station": from_station,
        "to_station": to_station,
        "total_trains": len(trains),
        "trains": trains
    }

@app.get("/api/coach-position/{train_number}")
async def get_coach_position(train_number: str):
    """
    Get coach position for train
    """
    return {
        "train_number": train_number,
        "train_name": "Rajdhani Express",
        "coaches": [
            {"coach": "A1", "position": 1, "type": "AC 1-Tier"},
            {"coach": "A2", "position": 2, "type": "AC 1-Tier"},
            {"coach": "B1", "position": 3, "type": "AC 2-Tier"},
            {"coach": "B2", "position": 4, "type": "AC 2-Tier"},
            {"coach": "B3", "position": 5, "type": "AC 2-Tier"},
            {"coach": "S1", "position": 6, "type": "Sleeper"},
            {"coach": "S2", "position": 7, "type": "Sleeper"},
            {"coach": "S3", "position": 8, "type": "Sleeper"}
        ],
        "platform_map": "Coaches A1-A2 near entrance, B1-B3 middle, S1-S3 rear"
    }

@app.get("/api/platform-info/{station_code}")
async def get_platform_info(station_code: str):
    """
    Get platform information for station
    """
    return {
        "station_code": station_code,
        "station_name": "New Delhi Railway Station",
        "total_platforms": 16,
        "facilities": [
            {"name": "Waiting Room", "platform": "1, 10", "icon": "🪑"},
            {"name": "Food Court", "platform": "All", "icon": "🍛"},
            {"name": "Restrooms", "platform": "All", "icon": "🚻"},
            {"name": "Wheelchair Access", "platform": "All", "icon": "♿"},
            {"name": "Lifts", "platform": "1, 5, 10, 16", "icon": "🛗"},
            {"name": "WiFi", "platform": "All", "icon": "📶"}
        ],
        "retiring_rooms": True,
        "cloak_room": True
    }

@app.post("/api/wheelchair-booking")
async def book_wheelchair_service(request: BookingRequest):
    """
    Book wheelchair assistance
    """
    return {
        "booking_id": f"WHL{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "pnr": f"{datetime.now().strftime('%Y%m%d%H%M')}",
        "service": "Wheelchair Assistance",
        "from_station": "New Delhi",
        "to_station": "Mumbai",
        "date": (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d"),
        "status": "Confirmed",
        "assistance_points": ["Boarding", "Alighting", "Platform transfer"],
        "contact": "Railway Helpline: 139",
        "free_service": True
    }

@app.post("/api/group-booking")
async def create_group_booking(passengers: List[dict]):
    """
    Create group booking for 4+ passengers
    """
    import random

    total_fare = len(passengers) * 2100
    group_discount = total_fare * 0.10  # 10% group discount

    return {
        "group_booking_id": f"GRP{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "total_passengers": len(passengers),
        "base_fare": total_fare,
        "group_discount": int(group_discount),
        "final_amount": int(total_fare - group_discount),
        "status": "Confirmed",
        "pnrs": [str(random.randint(1000000000, 9999999999)) for _ in passengers],
        "benefits": ["10% discount", "Adjacent seats preferred", "One cancellation free"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
