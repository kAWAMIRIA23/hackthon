from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import io
import os
import importlib.util

from PIL import Image

# Dynamically load local utils.py to reuse model loading logic
utils_path = os.path.join(os.path.dirname(__file__), "utils.py")
spec = importlib.util.spec_from_file_location("waste_utils", utils_path)
wutils = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wutils)

from predict_core import format_result, predict_with_tta

model = wutils.model
CATEGORIES = wutils.CATEGORIES

app = FastAPI(title="Waste Classification API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Waste Classification API is running", "categories": CATEGORIES}


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
        img = Image.open(io.BytesIO(contents))
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    probs = predict_with_tta(model, img)
    result = format_result(probs, CATEGORIES)

    return JSONResponse(result)
