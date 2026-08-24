from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from ai_chat import chat_with_ai

load_dotenv()

app = FastAPI(title="TatkalEasy API")

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

# Mock train database
MOCK_TRAINS = [
    {
        "train_number": "12431",
        "train_name": "Rajdhani Express",
        "from_station": "Bangalore",
        "to_station": "Mumbai",
        "departure_time": "10:15 AM",
        "arrival_time": "8:45 PM",
        "duration": "10h 30m",
        "price": 2100,
        "available_seats": 48,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "🔥 Popular"
    },
    {
        "train_number": "12027",
        "train_name": "Shatabdi Express",
        "from_station": "Bangalore",
        "to_station": "Mumbai",
        "departure_time": "6:00 AM",
        "arrival_time": "2:30 PM",
        "duration": "8h 30m",
        "price": 1200,
        "available_seats": 24,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "⚡ Fast"
    },
    {
        "train_number": "12009",
        "train_name": "Mumbai Mail",
        "from_station": "Bangalore",
        "to_station": "Mumbai",
        "departure_time": "11:00 PM",
        "arrival_time": "11:30 AM",
        "duration": "12h 30m",
        "price": 1800,
        "available_seats": 62,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "💤 Overnight"
    },
    {
        "train_number": "12137",
        "train_name": "Punjab Mail",
        "from_station": "Delhi",
        "to_station": "Mumbai",
        "departure_time": "7:30 AM",
        "arrival_time": "5:15 PM",
        "duration": "9h 45m",
        "price": 1950,
        "available_seats": 35,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "🔥 Popular"
    },
    {
        "train_number": "12301",
        "train_name": "Rajdhani Express",
        "from_station": "Delhi",
        "to_station": "Kolkata",
        "departure_time": "4:55 PM",
        "arrival_time": "10:05 AM",
        "duration": "17h 10m",
        "price": 2400,
        "available_seats": 45,
        "total_seats": 72,
        "travel_class": "AC 2-Tier",
        "badge": "🌙 Premium"
    },
]

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

@app.post("/api/fare-calculator")
async def calculate_fare(request: FareRequest):
    """
    Calculate fare between stations
    """
    base_fares = {
        "AC 1-Tier": 3500,
        "AC 2-Tier": 2100,
        "AC 3-Tier": 1400,
        "Sleeper": 600,
        "Second Sitting": 300
    }

    base_fare = base_fares.get(request.travel_class, 1000)

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
        "base_fare": base_fare,
        "discount_percent": discount * 100,
        "discount_amount": base_fare * discount,
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
    Set alert for Tatkal booking
    """
    return {
        "alert_id": f"ALERT{datetime.now().strftime('%Y%m%d%H%M%S')}",
        "train_number": request.train_number,
        "date": request.date,
        "email": request.email,
        "phone": request.phone,
        "tatkal_time": "10:00 AM",
        "alert_time": "09:45 AM",
        "status": "Active",
        "message": "You will receive alert 15 mins before Tatkal opens"
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
