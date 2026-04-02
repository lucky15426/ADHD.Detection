# ====================================================================
# Prediction logic — processes form input → model → result
# ====================================================================

import re
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
try:
    from tensorflow.keras.preprocessing.sequence import pad_sequences
    HAS_TENSORFLOW = True
except ImportError:
    HAS_TENSORFLOW = False

from model_loader import (
    get_model, 
    get_feature_names, 
    get_text_model, 
    get_vectorizer,
    get_dl_model,
    get_tokenizer
)

nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
MAX_SEQ_LEN = 100


def clean_text(text):
    """Text cleaning logic (extracted from adhdML.py for consistency)"""
    if not text:
        return ""
    text = str(text).lower()
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)
    text = re.sub(r'@\w+|#\w+|r/\w+|u/\w+', '', text)
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = text.split()
    tokens = [w for w in tokens if w not in stop_words and len(w) > 2]
    tokens = [lemmatizer.lemmatize(w) for w in tokens]
    return ' '.join(tokens)


def classify_severity(probability: float) -> str:
    if probability < 0.3:
        return "Low"
    elif probability < 0.55:
        return "Mild"
    elif probability < 0.75:
        return "Moderate"
    else:
        return "High"


def make_prediction(input_data: dict) -> dict:
    """
    Takes a dict of feature values + journal_text, runs both models,
    and returns a hybrid prediction.
    """
    # 1. Behavioral Prediction
    model = get_model()
    feature_names = get_feature_names()
    
    proba_behavioral = 0.5
    if model and feature_names:
        features = [float(input_data.get(feat, 5)) for feat in feature_names]
        proba_behavioral = model.predict_proba(np.array([features]))[0][1]

    # 2. Text Prediction (Now using Deep Learning / ANN)
    dl_model = get_dl_model()
    tokenizer = get_tokenizer()
    journal_text = input_data.get("journal_text", "")
    
    proba_text = 0.5
    text_analyzed = False
    
    if HAS_TENSORFLOW and dl_model and tokenizer and journal_text:
        cleaned = clean_text(journal_text)
        if cleaned:
            try:
                # Tokenization and Padding
                seq = tokenizer.texts_to_sequences([cleaned])
                padded = pad_sequences(seq, maxlen=MAX_SEQ_LEN)
                
                # Predict
                pred = dl_model.predict(padded)
                # ANN output is usually a probability (0 to 1)
                proba_text = float(pred[0][0])
                text_analyzed = True
            except Exception as e:
                print(f"⚠️ Text prediction error: {e}")
                text_analyzed = False

    # 3. Hybrid Combination
    if text_analyzed:
        # If the text is extremely short (e.g., "feeling happy nowadays", ~3-4 tokens),
        # the DL model might be overly confident or erratic. 
        # We heavily weight the behavioral data (form input) over short text.
        token_count = len(journal_text.split())
        
        if token_count < 10:
            # Low confidence in text model for very short inputs; behavioral is king
            proba_final = (proba_text * 0.1) + (proba_behavioral * 0.9)
        else:
            # Standard weight: 40% text, 60% behavioral
            proba_final = (proba_text * 0.4) + (proba_behavioral * 0.6)
    else:
        # Fallback to behavioral only if no text provided
        proba_final = proba_behavioral

    prediction = "ADHD Likely" if proba_final >= 0.5 else "ADHD Unlikely"
    severity = classify_severity(proba_final)

    # Per-feature breakdown
    behavioral_scores = {
        "focus_level":     round(input_data.get("focus_level", 5), 1),
        "hyperactivity":   round(input_data.get("hyperactivity", 5), 1),
        "impulsiveness":   round(input_data.get("impulsiveness", 5), 1),
        "stress_level":    round(input_data.get("stress_level", 5), 1),
        "attention_span":  round(input_data.get("attention_span", 5), 1),
        "task_completion": round(input_data.get("task_completion", 5), 1),
    }

    return {
        "prediction":       prediction,
        "confidence":       round(proba_final, 4),
        "severity":         severity,
        "behavioral_scores": behavioral_scores,
        "analysis_details": {
            "behavioral_proba": round(proba_behavioral, 4),
            "text_proba":       round(proba_text, 4) if text_analyzed else None,
            "text_analyzed":    text_analyzed
        }
    }
