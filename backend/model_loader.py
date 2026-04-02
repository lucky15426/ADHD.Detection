import os
import json
import joblib
import tensorflow as tf

_model = None
_feature_names = None
_text_model = None
_vectorizer = None
_dl_model = None
_tokenizer = None

MODEL_DIR = os.path.join(os.path.dirname(__file__), "model")


def get_model():
    """Returns the behavioral (structured) model."""
    global _model
    if _model is None:
        path = os.path.join(MODEL_DIR, "adhd_model.pkl")
        if os.path.exists(path):
            _model = joblib.load(path)
    return _model


def get_feature_names():
    """Returns feature names for the behavioral model."""
    global _feature_names
    if _feature_names is None:
        path = os.path.join(MODEL_DIR, "feature_names.json")
        if os.path.exists(path):
            with open(path) as f:
                _feature_names = json.load(f)
    return _feature_names


def get_text_model():
    """Returns the best classical text model."""
    global _text_model
    if _text_model is None:
        path = os.path.join(MODEL_DIR, "text_model", "adhd_classifier.pkl")
        if os.path.exists(path):
            _text_model = joblib.load(path)
    return _text_model


def get_vectorizer():
    """Returns the TF-IDF vectorizer for text prediction."""
    global _vectorizer
    if _vectorizer is None:
        path = os.path.join(MODEL_DIR, "text_model", "tfidf_vectorizer.pkl")
        if os.path.exists(path):
            _vectorizer = joblib.load(path)
    return _vectorizer


def get_dl_model():
    """Returns the Deep Learning (ANN) model."""
    global _dl_model
    if _dl_model is None:
        path = os.path.join(MODEL_DIR, "dl_model", "adhd_dl_model.h5")
        if os.path.exists(path):
            _dl_model = tf.keras.models.load_model(path)
    return _dl_model


def get_tokenizer():
    """Returns the Tokenizer for Deep Learning prediction."""
    global _tokenizer
    if _tokenizer is None:
        path = os.path.join(MODEL_DIR, "dl_model", "tokenizer.pkl")
        if os.path.exists(path):
            _tokenizer = joblib.load(path)
    return _tokenizer
