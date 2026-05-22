from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import io
import os
import importlib.util
from PIL import Image
import numpy as np
import tensorflow as tf

# Dynamically load local utils.py to reuse model loading logic
utils_path = os.path.join(os.path.dirname(__file__), "utils.py")
spec = importlib.util.spec_from_file_location("waste_utils", utils_path)
wutils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wutils)

model = wutils.model
CATEGORIES = wutils.CATEGORIES

app = FastAPI(title="Waste Classification API")

# Enable CORS for local frontend development (adjust origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Waste Classification API is running"}

ALLOWED_TYPES = {"image/jpeg", "image/png", "image/webp", "image/jpg"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Accepts an uploaded image and returns predicted category + confidence."""
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    content_type = (file.content_type or "").lower()
    if content_type and content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload a JPG, PNG, or WEBP image.",
        )

    contents = await file.read()

    try:
        img = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    # Preprocess: resize and normalize to match training preprocessing
    img = img.resize((128, 128))
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, 0) / 255.0

    # Run model
    preds = model.predict(img_array)
    probs = preds[0]
    top_idx = int(np.argmax(probs))
    category = CATEGORIES[top_idx]
    confidence = float(probs[top_idx])

    return JSONResponse({
        "category": category,
        "confidence": confidence,
        "probabilities": {CATEGORIES[i]: float(probs[i]) for i in range(len(CATEGORIES))},
    })

# For quick local run: `uvicorn api:app --host 0.0.0.0 --port 8000`
