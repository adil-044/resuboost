import os
from google import genai
from typing import List

# Configure Client using the new SDK
api_key = os.getenv("GOOGLE_API_KEY")
if api_key:
    print(f"--- AI STATUS: API Key found ({api_key[:4]}...{api_key[-4:]}) ---")
    client = genai.Client(api_key=api_key)
    # Using 'gemini-flash-latest' which is verified to work with this key
    MODEL_ID = 'gemini-flash-latest' 
else:
    print("--- AI STATUS: ERROR - No GOOGLE_API_KEY found in environment ---")
    client = None

def optimize_resume_text(resume_markdown: str, job_description: str, missing_keywords: List[str] = []) -> str:
    """Use Gemini 2.0 to rewrite the resume for maximum ATS compatibility."""
    if not client:
        return f"# ERROR: AI KEY NOT FOUND\n\nPlease set your GOOGLE_API_KEY environment variable.\n\nRAW TEXT PREVIEW:\n{resume_markdown[:500]}..."
    
    prompt = f"""
    ROLE: Elite Executive Resume Architect & ATS Logic Expert.
    TASK: Transform the 'NOISY RAW TEXT' into a world-class, deduplicated, 95%+ ATS-optimized Executive Resume.
    
    --- 
    CRITICAL RULES (FORBIDDEN ACTIONS):
    1. DO NOT repeat the Name, Email, or Address after the initial header.
    2. DO NOT dump keywords in a random list at the end. Every keyword MUST be woven into a specific bullet point or a categorized skill section.
    3. DO NOT include meta-text like 'PROFESSIONAL SUMMARY' or 'EXPERIENCE' inside the actual section content.
    
    ---
    CLEANING PROTOCOL:
    1. EXTRACT: Find the Name and Contact info ONCE. Place it at the very top.
    2. CATEGORIZE: Group these keywords into the TECHNICAL SKILLS section: {', '.join(missing_keywords)}
    3. INJECT: Rewrite Experience bullets to naturally include relevant keywords from the JD. Bold them: **Keyword**.
    
    ---
    REQUIRED STRUCTURE (Markdown):
    # [FULL NAME]
    [Email | Phone | LinkedIn | Location]
    
    ---
    
    ## EXECUTIVE SUMMARY
    [A 3-4 sentence professional narrative. Integrate 2-3 core keywords here. No first-person pronouns.]
    
    ---
    
    ## TECHNICAL SKILLS & COMPETENCIES
    [Categorized list: e.g., Culinary Operations, Management & Leadership, Compliance, etc. Categorize every keyword provided above here.]
    
    ---
    
    ## PROFESSIONAL EXPERIENCE
    [Company Name | Job Title | Dates]
    - [High-impact bullet using Action + Context + Result formula. Weave in keywords naturally.]
    
    ---
    
    ## EDUCATION & CERTIFICATIONS
    [Clean list of degrees and certifications.]
    
    ---
    
    JOB DESCRIPTION:
    {job_description}
    
    RAW DATA TO PROCESS:
    {resume_markdown}
    
    OUTPUT FINAL EXECUTIVE MARKDOWN:
    """
    
    try:
        response = client.models.generate_content(
            model=MODEL_ID,
            contents=prompt
        )
        text = response.text
        # Clean up code blocks
        text = text.replace('```markdown', '').replace('```', '').strip()
        return text
    except Exception as e:
        error_msg = f"--- AI ERROR: {str(e)} ---"
        print(error_msg)
        return f"# AI OPTIMIZATION ERROR\n\n{error_msg}\n\nPlease check your backend terminal for details."

def generate_gap_questions(missing_keywords: List[str], job_description: str) -> List[str]:
    """Generate specific questions focused on missing keystrings to hit 90%+."""
    if not client or not missing_keywords:
        return ["Describe your experience with the technical requirements of this role."]
    
    keystrings = missing_keywords[:10]
    prompt = f"""
    You are an expert ATS Optimizer. 
    The following specific KEYSTRINGS are missing from the resume but are critical for a 95% match score.
    
    MISSING KEYSTRINGS: {', '.join(keystrings)}
    
    TASK: Generate 5 targeted interview-style questions. Each question MUST ask about 1-2 of these keystrings specifically.
    
    OUTPUT: A JSON list of 5 strings. No markdown blocks, just raw JSON.
    """
    
    try:
        response = client.models.generate_content(
            model=MODEL_ID,
            contents=prompt
        )
        text = response.text.replace('```json', '').replace('```', '').strip()
        if '[' in text and ']' in text:
            text = text[text.find('['):text.rfind(']')+1]
        import json
        return json.loads(text)
    except Exception as e:
        print(f"Question Gen Error: {e}")
        return [f"Tell me about your experience with {kw}." for kw in keystrings[:5]]

def optimize_with_context(resume_markdown: str, job_description: str, user_answers: str) -> str:
    """Aggressive 90%+ optimization pass integrating user answers."""
    if not client:
        return resume_markdown
    
    prompt = f"""
    ROLE: Expert Resume Architect.
    GOAL: Achieve a 95%+ ATS match score.
    
    CRITICAL: Extract Name/Contact info ONCE at the top. Remove any duplicates found in the body.
    
    CONTEXT:
    1. CURRENT RESUME: {resume_markdown}
    2. TARGET JOB: {job_description}
    3. NEW USER DETAILS: {user_answers}
    
    TASK:
    - Rewrite the resume to INTEGRATE every detail from the New User Details.
    - Ensure keywords from the user answers are **bolded**.
    - RESTRUCTURE into a clean Executive Markdown format with --- dividers.
    - Maintain single-column, professional objective language.
    
    OUTPUT: ONLY the optimized Markdown.
    """
    
    try:
        response = client.models.generate_content(
            model=MODEL_ID,
            contents=prompt
        )
        text = response.text.replace('```markdown', '').replace('```', '').strip()
        return text
    except Exception as e:
        print(f"Final Optimization Error: {e}")
        return resume_markdown
