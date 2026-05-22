import os

import tensorflow as tf
from PIL import Image

from predict_core import load_class_indices, predict_with_tta, format_result

DEFAULT_MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "waste_classification_model.h5")
MODEL_PATH = os.environ.get("MODEL_PATH", DEFAULT_MODEL_PATH)
print(f"Attempting to load model from: {MODEL_PATH}")

HF_MODEL_ID = os.environ.get("HF_MODEL_ID")
if not os.path.exists(MODEL_PATH) and HF_MODEL_ID:
    try:
        from huggingface_hub import hf_hub_download

        print(f"Downloading model file from Hugging Face repo: {HF_MODEL_ID}")
        models_dir = os.path.dirname(MODEL_PATH)
        os.makedirs(models_dir, exist_ok=True)
        downloaded_path = hf_hub_download(repo_id=HF_MODEL_ID, filename=os.path.basename(MODEL_PATH))
        if downloaded_path:
            MODEL_PATH = downloaded_path
            print(f"Model downloaded to: {MODEL_PATH}")
    except Exception as e:
        print(f"Could not download model from Hugging Face: {e}")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model file not found at: {MODEL_PATH}. Place the trained model at this path or set MODEL_PATH."
    )

try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise

CATEGORIES = load_class_indices(os.path.join(os.path.dirname(__file__), "models"))
print(f"Categories (inference order): {CATEGORIES}")


def preprocess_image(image_path):
    """Preprocess the image to match model requirements."""
    img = Image.open(image_path).convert("RGB").resize((128, 128))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)
    return img_array / 255.0


def predict_waste_category(image_path):
    """Predict the waste category for a given image."""
    img = Image.open(image_path)
    probs = predict_with_tta(model, img)
    return format_result(probs, CATEGORIES)["category"]
