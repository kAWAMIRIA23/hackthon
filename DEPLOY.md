# Deploy AWAI Blue: Vercel (frontend) + Hugging Face (backend)

| Part | Platform | Folder |
|------|----------|--------|
| Website | [Vercel](https://vercel.com) | `awai-blue-africa-ai/` |
| Classification API | [Hugging Face Space](https://huggingface.co/spaces/mariakawa/waste) (Docker) | `waste-classification/hf-space/` |

**Your accounts**

| Item | Value |
|------|--------|
| HF user | `mariakawa` |
| API Space | [mariakawa/waste](https://huggingface.co/spaces/mariakawa/waste) |
| API URL | `https://mariakawa-waste.hf.space` |
| Model repo (optional) | `mariakawa/waste` → set `HF_MODEL_ID=mariakawa/waste` |
| Vercel env | `VITE_API_URL=https://mariakawa-waste.hf.space` |

The frontend calls the API using `VITE_API_URL` (no proxy in production).

---

## Part 1 — Hugging Face backend (do this first)

You need the API URL before configuring Vercel.

### 1a. Upload the model (recommended)

1. Create a **Model** repo on Hugging Face: [mariakawa/waste](https://huggingface.co/mariakawa/waste) (or use an existing model repo).
2. Install CLI and LFS:
   ```powershell
   pip install huggingface_hub
   huggingface-cli login
   git lfs install
   ```
3. Clone the model repo and add the file:
   ```powershell
   git clone https://huggingface.co/mariakawa/waste
   cd waste
   git lfs track "*.h5"
   copy ..\waste-classification\models\waste_classification_model.h5 .
   git add .
   git commit -m "Add waste classification model"
   git push
   ```

### 1b. Create the API Space

1. Go to https://huggingface.co/new-space
2. **Space name:** `waste` (repo: `spaces/mariakawa/waste`)
3. **SDK:** Docker
4. Clone your Space (create it on HF first if it does not exist):
   ```powershell
   git clone https://huggingface.co/spaces/mariakawa/waste
   cd waste
   ```
5. Copy everything from `waste-classification/hf-space/` into the clone (all files at repo root).
6. Push:
   ```powershell
   git add .
   git commit -m "FastAPI waste classification API"
   git push
   ```

### 1c. Space settings

1. **Settings → Variables** → add:
   - `HF_MODEL_ID` = `mariakawa/waste`
2. **Settings → Hardware** → CPU basic (free tier; first boot may take a few minutes while TensorFlow loads).
3. Wait until the Space status is **Running**.

### 1d. Test the API

Your Space URL looks like:

`https://mariakawa-waste.hf.space`

```powershell
curl https://mariakawa-waste.hf.space/
```

You should see JSON with `"status": "ok"`.

**Alternative:** Put `waste_classification_model.h5` in `models/` inside the Space repo and use Git LFS instead of `HF_MODEL_ID`.

---

## Part 2 — Vercel frontend

### 2a. Import the GitHub repo

1. Go to https://vercel.com/new
2. Import `https://github.com/kAWAMIRIA23/hackthon`
3. **Root Directory:** `awai-blue-africa-ai` (required — if this is wrong you get `404: NOT_FOUND`)
4. **Framework Preset:** Other (or TanStack Start if listed)
5. **Build Command:** `npm run build` (default)
6. **Output Directory:** leave **empty** — Nitro writes `.vercel/output` automatically; do not set `dist` or `build`
7. **Node.js:** 22.x
8. Do **not** add a custom `vercel.json` with `framework: tanstack-start` — it breaks Nitro routing

### 2b. Environment variable

In **Project → Settings → Environment Variables**, add:

| Name | Value | Environments |
|------|-------|----------------|
| `VITE_API_URL` | `https://mariakawa-waste.hf.space` | Production, Preview |

No trailing slash. Use your real Hugging Face Space URL.

### 2c. Deploy

Click **Deploy**. After it finishes, open your `*.vercel.app` URL and try the classifier on the home page.

### 2d. Optional — restrict CORS on the API

In the HF Space variables, set:

`ALLOWED_ORIGINS=https://your-app.vercel.app,https://www.your-domain.com`

(Default is `*` if unset.)

---

## How they connect

```
Browser (Vercel site)
    → fetch(VITE_API_URL + "/predict")
    → Hugging Face Space (FastAPI)
    → TensorFlow model
```

Local dev unchanged:

- Backend: `cd waste-classification && python app.py` (port 8000)
- Frontend: `cd awai-blue-africa-ai && npm run dev` (port 8080, proxy `/api` → 8000)
- `.env`: `VITE_API_URL=/api`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Classifier shows “API offline” | Space still building, or wrong `VITE_API_URL`. Redeploy Vercel after fixing the env var. |
| CORS error in browser | Set `ALLOWED_ORIGINS` on HF to your Vercel URL, or leave `*`. |
| Space build fails | Check build logs; ensure `HF_MODEL_ID` is set and the model file exists in that repo. |
| Vercel `404: NOT_FOUND` on every page | Root Directory must be `awai-blue-africa-ai`. Clear Output Directory in Vercel settings. Redeploy **without** build cache. Build logs must show `Generated .vercel/output/nitro.json`. |
| Slow first prediction | Cold start on free HF CPU; normal for TensorFlow. |

---

## Quick checklist

- [ ] Model uploaded to HF model repo (or LFS in Space)
- [ ] Docker Space running, `GET /` returns OK
- [ ] Vercel project root = `awai-blue-africa-ai`
- [ ] `VITE_API_URL` = HF Space URL
- [ ] Classifier works on production site
