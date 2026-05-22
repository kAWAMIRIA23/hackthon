export interface ClassificationResult {
  kind: "waste" | "uncertain";
  category: string;
  confidence: number;
  tip: string;
}

const CATEGORY_INFO: Record<string, { displayName: string; tip: string }> = {
  plastic: {
    displayName: "Plastic Waste",
    tip: "♻️ This material can be recycled. See Solutions →",
  },
  metal: {
    displayName: "Metal Waste",
    tip: "🔩 Sell to scrap collectors — high recycling value.",
  },
  paper: {
    displayName: "Paper Waste",
    tip: "📄 Recyclable up to 7 times. Keep it dry.",
  },
  cardboard: {
    displayName: "Cardboard Waste",
    tip: "📦 Flatten and recycle with paper products.",
  },
  glass: {
    displayName: "Glass Waste",
    tip: "🫙 Rinse and take to a glass recycling point.",
  },
  trash: {
    displayName: "General Waste",
    tip: "🗑️ Sort further if possible — avoid landfill when you can.",
  },
};

export function mapPrediction(category: string, confidence: number): ClassificationResult {
  const key = category.toLowerCase();
  const info = CATEGORY_INFO[key] ?? {
    displayName: category.charAt(0).toUpperCase() + category.slice(1),
    tip: "Dispose responsibly and check local recycling guidelines.",
  };
  const confidencePct = Math.round(confidence * 100);

  if (confidence < 0.25) {
    return {
      kind: "uncertain",
      category: info.displayName,
      confidence: confidencePct,
      tip: "The model isn't confident about this image. Try a clearer, well-lit photo of the waste item.",
    };
  }

  const tip =
    confidence < 0.5
      ? `Low confidence (${confidencePct}%). ${info.tip}`
      : info.tip;

  return {
    kind: "waste",
    category: info.displayName,
    confidence: confidencePct,
    tip,
  };
}
