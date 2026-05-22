import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  X,
  Recycle,
  WifiOff,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { classifyImage, checkApiHealth } from "@/lib/classifier-api";
import { mapPrediction, type ClassificationResult } from "@/lib/waste-categories";

type Status = "idle" | "ready" | "loading" | "done";

export function Classifier() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isVideo, setIsVideo] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkApiHealth().then(setApiOnline);
  }, []);

  const handleFile = (f: File) => {
    setFile(f);
    setIsVideo(f.type.startsWith("video"));
    setPreview(URL.createObjectURL(f));
    setStatus("ready");
    setResult(null);
    setError(null);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const reset = () => {
    setFile(null);
    setPreview("");
    setStatus("idle");
    setResult(null);
    setError(null);
  };

  const classify = async () => {
    if (!file) return;

    if (isVideo) {
      setError("Video classification is coming soon. Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    setStatus("loading");
    setResult(null);
    setError(null);

    try {
      const data = await classifyImage(file);
      setResult(mapPrediction(data.category, data.confidence));
      setStatus("done");
      setApiOnline(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Classification failed. Please try again.");
      setStatus("ready");
      setApiOnline(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {apiOnline === false && (
        <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <WifiOff className="h-5 w-5 shrink-0 mt-0.5" />
          <p>
            Classification API is offline. Start it with{" "}
            <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">
              cd waste-classification && python app.py
            </code>
          </p>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative rounded-3xl bg-white border-2 border-dashed transition-all p-6 sm:p-10 ${
          dragOver
            ? "border-[var(--teal-brand)] shadow-[0_0_0_8px_rgba(14,154,167,0.15)] scale-[1.01]"
            : "border-[var(--teal-brand)]/40"
        } ${!file ? "cursor-pointer hover:border-[var(--teal-brand)] hover:bg-[var(--teal-brand)]/5" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {!file && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="h-20 w-20 rounded-2xl bg-[var(--teal-brand)]/10 flex items-center justify-center mb-5">
              <Upload className="h-10 w-10 text-teal-brand" />
            </div>
            <p className="text-lg font-semibold text-ink">
              Drag & drop your image or video here
            </p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
            <p className="text-xs text-muted-foreground mt-4">
              Images: JPG, PNG, WEBP · Video preview only (classification uses images)
            </p>
          </div>
        )}

        {file && (
          <div className="space-y-5">
            <div className="relative rounded-2xl overflow-hidden bg-black/5 max-h-[420px] flex items-center justify-center">
              {isVideo ? (
                <video src={preview} controls className="max-h-[420px] w-full" />
              ) : (
                <img src={preview} alt="upload preview" className="max-h-[420px] object-contain" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reset();
                }}
                className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                aria-label="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground truncate">{file.name}</p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center" role="alert">
          {error}
        </p>
      )}

      <button
        onClick={classify}
        disabled={!file || status === "loading" || isVideo}
        className="mt-5 w-full bg-[var(--teal-brand)] hover:bg-[var(--teal-brand)]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-[var(--teal-brand)]/30 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing waste with AI...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Classify Now
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Powered by your custom-trained CNN (cardboard · glass · metal · paper · plastic · trash)
      </p>

      {result && (
        <div className="mt-8 rounded-3xl bg-white shadow-xl border border-border p-6 sm:p-8 animate-[fade-in_0.5s_ease-out]">
          <div className="flex items-start gap-4">
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${
                result.kind === "waste"
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {result.kind === "waste" ? (
                <AlertTriangle className="h-6 w-6" />
              ) : (
                <CheckCircle2 className="h-6 w-6" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs font-bold tracking-widest uppercase ${
                  result.kind === "waste" ? "text-red-600" : "text-amber-600"
                }`}
              >
                {result.kind === "waste"
                  ? "🔴 Waste Detected"
                  : "⚠️ Uncertain Classification"}
              </p>
              <div className="mt-3">
                <span className="inline-flex items-center gap-2 bg-[var(--ocean)] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                  <Recycle className="h-4 w-4" />
                  {result.category}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm font-medium text-ink mb-2">
                  <span>Confidence</span>
                  <span className="text-teal-brand font-bold">{result.confidence}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--teal-brand)] to-[var(--earth-green)] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>

              <p className="mt-5 text-sm text-ink/80">{result.tip}</p>

              {result.kind === "waste" && (
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-teal-brand hover:underline"
                >
                  See Solutions →
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
