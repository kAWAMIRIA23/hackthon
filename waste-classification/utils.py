import tensorflow as tf
import numpy as np
from PIL import Image
import os

# Load the trained classifier model from an environment override or the local models folder
DEFAULT_MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'waste_classification_model.h5')
MODEL_PATH = os.environ.get('MODEL_PATH', DEFAULT_MODEL_PATH)
print(f"Attempting to load model from: {MODEL_PATH}")

# If model file is not present locally and HF_MODEL_ID is provided, try to download it from Hugging Face
HF_MODEL_ID = os.environ.get('HF_MODEL_ID')
if not os.path.exists(MODEL_PATH) and HF_MODEL_ID:
    try:
        from huggingface_hub import hf_hub_download
        print(f"Downloading model file from Hugging Face repo: {HF_MODEL_ID}")
        # Attempt to download the specific file name into the models dir
        models_dir = os.path.dirname(MODEL_PATH)
        os.makedirs(models_dir, exist_ok=True)
        downloaded_path = hf_hub_download(repo_id=HF_MODEL_ID, filename=os.path.basename(MODEL_PATH))
        if downloaded_path:
            MODEL_PATH = downloaded_path
            print(f"Model downloaded to: {MODEL_PATH}")
    except Exception as e:
        print(f"Could not download model from Hugging Face: {e}")

# Check if file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"Model file not found at: {MODEL_PATH}. Place the trained model at this path or set MODEL_PATH to its location, or set HF_MODEL_ID to download from the Hub."
    )

try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {str(e)}")
    raise

# Categories mapping
CATEGORIES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

def preprocess_image(image_path):
    """Preprocess the image to match model requirements."""
    # Load and resize image
    img = Image.open(image_path)
    img = img.resize((128, 128))
    
    # Convert to array and preprocess
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0)  # Create batch axis
    img_array = img_array / 255.0  # Normalize
    
    return img_array

def predict_waste_category(image_path):
    """Predict the waste category for a given image."""
    # Preprocess the image
    processed_image = preprocess_image(image_path)
    
    # Make prediction
    predictions = model.predict(processed_image)
    predicted_class = np.argmax(predictions[0])
    
    # Return predicted category
    return CATEGORIES[predicted_class] 