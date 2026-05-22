"""Shared inference helpers used by api.py and utils.py."""
import json
import os

import numpy as np
import tensorflow as tf
from PIL import Image

DEFAULT_CATEGORIES = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]


def load_class_indices(models_dir: str) -> list[str]:
    path = os.path.join(models_dir, "class_indices.json")
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            indices = json.load(f)
        return [name for name, _ in sorted(indices.items(), key=lambda x: x[1])]
    return DEFAULT_CATEGORIES.copy()


def preprocess_pil_image(img: Image.Image) -> np.ndarray:
    img = img.convert("RGB").resize((128, 128))
    arr = tf.keras.preprocessing.image.img_to_array(img)
    return np.expand_dims(arr, 0) / 255.0


def predict_probs(model, batch: np.ndarray) -> np.ndarray:
    return model.predict(batch, verbose=0)[0]


def predict_with_tta(model, img: Image.Image) -> np.ndarray:
    """Average predictions on original + horizontal flip for stabler results."""
    arr = preprocess_pil_image(img)[0]
    flipped = np.fliplr(arr)
    batch = np.stack([arr, flipped], axis=0)
    preds = model.predict(batch, verbose=0)
    return np.mean(preds, axis=0)


def format_result(probs: np.ndarray, categories: list[str], min_confidence: float = 0.35):
    top_idx = int(np.argmax(probs))
    confidence = float(probs[top_idx])
    sorted_idx = np.argsort(probs)[::-1]
    top2 = [
        {"category": categories[i], "confidence": float(probs[i])}
        for i in sorted_idx[:2]
    ]
    return {
        "category": categories[top_idx],
        "confidence": confidence,
        "probabilities": {categories[i]: float(probs[i]) for i in range(len(categories))},
        "top2": top2,
        "low_confidence": confidence < min_confidence,
    }
