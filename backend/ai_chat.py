"""
AI Chat Integration - Claude via AWS Bedrock for Conversational Booking
"""
import os
import json
from dotenv import load_dotenv
import boto3
from typing import Optional, Dict, Any

# Load environment variables
load_dotenv()

# Initialize AWS Bedrock client for Claude
bedrock_client = boto3.client(
    service_name='bedrock-runtime',
    region_name=os.getenv('AWS_DEFAULT_REGION', 'ap-south-1'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

# System prompt for train booking assistant
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

Always be helpful and guide users towards booking their tickets quickly!
"""

async def chat_with_ai(user_message: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Process user message with Claude via AWS Bedrock

    Args:
        user_message: User's input message
        context: Optional context (previous messages, user preferences, etc.)

    Returns:
        AI response with message and optional actions
    """
    try:
        # Build the prompt with system context
        full_prompt = f"{SYSTEM_PROMPT}\n\nUser: {user_message}\n\nAssistant:"

        # Call Claude via AWS Bedrock
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 300,
            "temperature": 0.7,
            "messages": [
                {
                    "role": "user",
                    "content": full_prompt
                }
            ]
        })

        response = bedrock_client.invoke_model(
            modelId="anthropic.claude-3-sonnet-20240229-v1:0",
            body=body
        )

        # Parse response
        response_body = json.loads(response['body'].read())
        ai_message = response_body['content'][0]['text']

        # Parse response and extract actions
        result = {
            "message": ai_message,
            "success": True
        }

        # Add suggested actions based on content
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
            # Extract route from context
            if context and "detected_route" in context:
                result["route"] = context["detected_route"]

        return result

    except Exception as e:
        print(f"Claude API Error: {str(e)}")
        # Fallback to rule-based response
        return fallback_response(user_message)

def fallback_response(user_message: str) -> Dict[str, Any]:
    """
    Fallback rule-based response if Claude AI fails
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

# Quick test function
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
