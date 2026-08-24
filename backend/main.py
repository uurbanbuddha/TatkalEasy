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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
