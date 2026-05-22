const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "/api";

export interface PredictResponse {
  category: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export async function classifyImage(file: File): Promise<PredictResponse> {
  const form = new FormData();
  form.append("file", file);

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      body: form,
    });
  } catch {
    throw new Error(
      "Cannot reach the classification API. Start the backend with: cd waste-classification && python app.py",
    );
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const detail =
      body && typeof body === "object" && "detail" in body
        ? String((body as { detail: unknown }).detail)
        : `Classification failed (${response.status})`;
    throw new Error(detail);
  }

  return response.json() as Promise<PredictResponse>;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/`);
    return response.ok;
  } catch {
    return false;
  }
}
