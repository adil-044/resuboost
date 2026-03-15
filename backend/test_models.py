import os
from google import genai
import google.genai.errors as errors

api_key = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

models = [
    'gemini-2.0-flash-001',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-flash-latest',
    'gemini-flash-latest',
    'gemini-2.0-flash-lite-001',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash',
]

for m in models:
    print(f"Testing {m}...", end=" ")
    try:
        response = client.models.generate_content(model=m, contents="hi")
        print("SUCCESS")
    except Exception as e:
        print(f"FAILED: {e}")
