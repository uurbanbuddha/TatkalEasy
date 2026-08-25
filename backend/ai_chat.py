"""
AI Chat Integration — powered by an OpenAI model, per the
"Build What Moves India" brief requirement that Codex/an OpenAI model be a
meaningful part of the build, not bolted on for the submission.
"""
import os
import json
from dotenv import load_dotenv
from openai import OpenAI
from typing import Optional, Dict, Any

load_dotenv()

_client = None
if os.getenv('OPENAI_API_KEY'):
    _client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')

SYSTEM_PROMPT = """You are TatkalAI, a friendly AI assistant for Indian train ticket booking via IRCTC Tatkal.

Your role:
- Help users book train tickets conversationally
- Understand natural language queries like "Book me a ticket to Mumbai tomorrow"
- Provide train recommendations based on user preferences
- Answer questions about Tatkal booking rules, timings, cancellation policies
- Be concise, friendly, and helpful

Available routes (mock data):
- Bangalore to Mumbai (Rajdhani Express, Shatabdi Express, Mumbai Mail)
- Delhi to Mumbai (Punjab Mail)
- Delhi to Kolkata (Rajdhani Express)

Key information:
- Tatkal opens at 10:00 AM for AC classes, 11:00 AM for Sleeper
- Tatkal tickets are released 1 day before journey date
- Cancellation allowed up to 30 minutes before departure

This is a hackathon prototype using mock train data and simulated bookings —
never claim to access real IRCTC systems or real personal data.
Always be helpful and guide users towards booking their tickets quickly!
"""

async def chat_with_ai(user_message: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Process user message with an OpenAI model.
    Falls back to a rule-based responder if the API is unavailable.
    """
    if _client is None:
        return fallback_response(user_message)

    try:
        response = _client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            max_tokens=300,
            temperature=0.7,
        )

        ai_message = response.choices[0].message.content

        result = {
            "message": ai_message,
            "success": True,
            "powered_by": OPENAI_MODEL,
        }

        message_lower = ai_message.lower()

        if "book" in message_lower or "train" in message_lower:
            result["action"] = "search"
            result["suggestions"] = [
                "Bangalore to Mumbai",
                "Delhi to Mumbai",
                "Delhi to Kolkata"
            ]

        if "mumbai" in message_lower or "bangalore" in message_lower or "delhi" in message_lower:
            result["action"] = "search"
            if context and "detected_route" in context:
                result["route"] = context["detected_route"]

        return result

    except Exception as e:
        print(f"OpenAI API Error: {str(e)}")
        return fallback_response(user_message)

def fallback_response(user_message: str) -> Dict[str, Any]:
    """
    Rule-based fallback if the OpenAI API is unavailable or unconfigured.
    """
    message_lower = user_message.lower()

    if "book" in message_lower or "ticket" in message_lower:
        return {
            "message": "I can help you book a ticket! Where would you like to go? Just tell me the source and destination cities.",
            "success": True,
            "suggestions": ["Bangalore to Mumbai", "Delhi to Mumbai", "Delhi to Kolkata"]
        }
    elif "mumbai" in message_lower:
        return {
            "message": "Great! I found trains to Mumbai. From which city are you traveling?",
            "success": True,
            "action": "search"
        }
    elif "tatkal" in message_lower:
        return {
            "message": "Tatkal booking opens at 10:00 AM for AC classes and 11:00 AM for Sleeper classes, one day before journey date.",
            "success": True
        }
    else:
        return {
            "message": "I'm here to help you book train tickets! Try saying 'Book a ticket' or tell me where you want to go.",
            "success": True,
            "suggestions": ["Book a ticket", "Bangalore to Mumbai", "When does Tatkal open?"]
        }

def test_ai_chat():
    """Test the AI chat locally"""
    test_messages = [
        "Book me a ticket to Mumbai",
        "I want to travel from Bangalore to Mumbai tomorrow",
        "When does Tatkal open?",
        "What's the cancellation policy?"
    ]

    print("Testing AI Chat Integration...")
    for msg in test_messages:
        print(f"\nUser: {msg}")
        import asyncio
        result = asyncio.run(chat_with_ai(msg))
        print(f"AI: {result['message']}")

if __name__ == "__main__":
    test_ai_chat()
