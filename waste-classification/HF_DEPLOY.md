# Deploying this demo to Hugging Face (Spaces)

This file documents the steps to publish the Gradio demo and the trained model to Hugging Face.

Two options:
- Option A — Push the entire Space (code + model) to a Space repository (smaller repos allowed but models are large — use git-lfs).
- Option B — Upload the model to a model repo and push the Gradio app to a Space that downloads the model at runtime using `huggingface_hub`.

Recommended: Option B (keeps the Space lightweight and uses `huggingface_hub` to fetch the model).

Prerequisites
- Have a Hugging Face account.
- Install the CLI: `pip install huggingface-hub` and login: `huggingface-cli login`.
- Install git-lfs: follow https://git-lfs.github.com/ and run `git lfs install`.

Option B (recommended): model repo + Space

1) Create a model repo and upload the model file

```
huggingface-cli repo create your-username/waste-classification-model
git clone https://huggingface.co/your-username/waste-classification-model
cd waste-classification-model
git lfs track "*.h5"
cp /path/to/models/waste_classification_model.h5 .
git add .
git commit -m "Add trained waste classification model"
git push
```

2) Create a Space repository for the demo (via web UI or CLI)

```
huggingface-cli repo create your-username/waste-classification-demo --type=space
git clone https://huggingface.co/spaces/your-username/waste-classification-demo
cd waste-classification-demo
```

3) Copy project files into the cloned Space repo

Copy these files into the Space repo root:
- `app.py` (Gradio app)
- `requirements.txt`
- `utils.py`
- any small assets (logo, README). Do NOT copy `models/` if using Option B.

4) Configure the Space to download the model at runtime

In the Space settings or via environment variables, set `HF_MODEL_ID` to `your-username/waste-classification-model`.

5) Commit and push the Space

```
git add .
git commit -m "Add Gradio demo"
git push
```

Notes
- If you prefer to include the model directly inside the Space, use git-lfs and add `models/waste_classification_model.h5` to the Space repo — but large models can make the repo heavy.
- Our `utils.py` supports `HF_MODEL_ID` and will attempt to download `waste_classification_model.h5` from the model repo at runtime.

If you want, I can prepare the Space repo contents (clean up unused Flask files and templates) and generate exact commands with your Hugging Face username. Reply with your Hugging Face username if you want me to prepare the repo files ready to push.
