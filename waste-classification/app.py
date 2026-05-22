import os
import sys
import importlib.util

from utils import predict_waste_category


def run_gradio():
    try:
        import gradio as gr
    except Exception:
        print("Gradio is not installed. Install with: pip install gradio")
        sys.exit(1)

    def classify_waste(image_path):
        if not image_path:
            raise gr.Error("Please upload an image first.")

        category = predict_waste_category(image_path)
        return image_path, category

    with gr.Blocks() as demo:
        gr.Markdown(
            "# Waste Classification\n"
            "Upload an image of waste and the trained model will predict its category."
        )

        with gr.Row():
            image_input = gr.Image(type="filepath", label="Upload Image")
            image_output = gr.Image(type="filepath", label="Preview")

        category_output = gr.Textbox(label="Predicted Category")
        classify_button = gr.Button("Classify Waste", variant="primary")

        classify_button.click(
            fn=classify_waste,
            inputs=image_input,
            outputs=[image_output, category_output],
        )

    port = int(os.environ.get("PORT", 7860))
    demo.launch(
        server_name="0.0.0.0",
        server_port=port,
        theme=gr.themes.Soft(),
    )


def run_api():
    try:
        import uvicorn
    except Exception:
        print("Uvicorn is required to run API mode. Install with: pip install uvicorn fastapi")
        sys.exit(1)

    api_path = os.path.join(os.path.dirname(__file__), "api.py")
    spec = importlib.util.spec_from_file_location("waste_api", api_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    app = getattr(module, "app")

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)


if __name__ == "__main__":
    # RUN_MODE: 'gradio' to launch the Gradio UI; default launches the FastAPI service.
    mode = os.environ.get("RUN_MODE", "").lower()
    if mode in ("gradio", "1", "true"):
        run_gradio()
    else:
        run_api()
