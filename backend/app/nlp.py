import spacy
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import re

# Load Spacy model
try:
    nlp = spacy.load("en_core_web_md")
except:
    nlp = None

# Load Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_keywords(text: str) -> list:
    """Extract high-signal technical keywords from text."""
    if not nlp:
        return []
    
    doc = nlp(text)
    
    # Priority labels for keywords
    target_labels = ["ORG", "PRODUCT", "WORK_OF_ART", "GPE", "PERSON"]
    keywords = set()
    
    for ent in doc.ents:
        if ent.label_ in target_labels:
            # Clean and filter out very short or numeric strings
            val = ent.text.strip()
            if len(val) > 2 and not val.isdigit():
                keywords.add(val)
                
    # Also extract noun chunks (skills are often multi-word)
    for chunk in doc.noun_chunks:
        val = chunk.text.strip()
        # Filter out common filler words in noun chunks
        if not re.search(r'\b(a|the|of|in|to|with)\b', val, re.I) and len(val) > 2:
            keywords.add(val)
            
    # Add common tech terms that Spacy might miss
    tech_terms = ["Python", "JavaScript", "React", "Node.js", "AWS", "Docker", "Kubernetes", "SQL", "NoSQL", "Git", "Agile", "Scrum", "CI/CD", "Machine Learning", "Data Analysis", "Project Management", "Stakeholder Management"]
    for term in tech_terms:
        if re.search(rf'\b{re.escape(term)}\b', text, re.I):
            keywords.add(term)
            
    return list(keywords)

def get_match_score(resume_text: str, jd_text: str) -> dict:
    """Calculate a more precise match score with 80-90% target potential."""
    
    jd_keywords = extract_keywords(jd_text)
    resume_keywords = extract_keywords(resume_text)
    
    # 1. Hard Keyword Salience (50% weight)
    matched_keywords = []
    for kw in jd_keywords:
        if re.search(rf'\b{re.escape(kw)}\b', resume_text, re.I):
            matched_keywords.append(kw)
            
    keyword_score = (len(matched_keywords) / len(jd_keywords) * 100) if jd_keywords else 100
    
    # 2. Semantic Similarity (30% weight) - Check how well roles align
    embeddings = model.encode([resume_text, jd_text])
    similarity = util.cos_sim(embeddings[0], embeddings[1]).item()
    semantic_score = max(0, similarity * 100) # Ensure positive
    
    # 3. Structural Integrity (20% weight)
    sections = ["experience", "education", "skills", "contact", "summary"]
    section_count = sum(1 for sec in sections if re.search(rf'\b{sec}\b', resume_text, re.I))
    section_integrity = (section_count / len(sections) * 100)
    
    # Combine with weights
    overall_score = (keyword_score * 0.5) + (semantic_score * 0.3) + (section_integrity * 0.2)
    
    # Missing keywords (top 15)
    missing = [kw for kw in jd_keywords if kw not in matched_keywords]
    
    return {
        "overall_score": round(overall_score, 1),
        "breakdown": {
            "keyword_match": round(keyword_score, 1),
            "semantic_alignment": round(semantic_score, 1),
            "section_integrity": round(section_integrity, 1)
        },
        "missing_keywords": missing[:15],
        "matched_keywords": matched_keywords
    }
