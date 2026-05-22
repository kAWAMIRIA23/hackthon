import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Classifier } from "@/components/site/Classifier";
import { CountUp } from "@/components/site/CountUp";
import { Upload, Cpu, ClipboardCheck, Trophy, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AWAI Blue — AI-Powered Waste Classification for Africa" },
      {
        name: "description",
        content:
          "Upload an image or video and get instant AI waste classification. Help build a cleaner, healthier Africa.",
      },
      { property: "og:title", content: "AWAI Blue — AI for a Cleaner Africa" },
      {
        property: "og:description",
        content: "AI-powered waste classification platform built for Africa.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { end: 54, suffix: "", label: "Countries Affected by Africa's Waste Crisis" },
  { end: 125, suffix: "M", label: "Tonnes of Waste Generated in Africa Annually" },
  { end: 70, suffix: "%", label: "of Africa's Water Sources Contaminated by Waste" },
  { end: 4, suffix: "%", label: "Less Than This of African Waste is Recycled" },
];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative -mt-16 pt-32 pb-28 sm:pt-40 sm:pb-36 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 70%, rgba(14,154,167,0.4), transparent 50%)",
        }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full mb-8">
            <Trophy className="h-4 w-4 text-amber-warm" />
            AWAI Hackathon — Blue Track
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] max-w-5xl mx-auto">
            AI-Powered Waste Classification for{" "}
            <span className="text-teal-soft">Africa</span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-teal-soft max-w-2xl mx-auto leading-relaxed">
            Upload an image or video. Get instant AI results. Help build a cleaner, healthier continent.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              hash="classifier"
              className="inline-flex items-center justify-center gap-2 bg-[var(--teal-brand)] hover:bg-[var(--teal-brand)]/90 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-[var(--teal-brand)]/30 hover:-translate-y-0.5 transition-all"
            >
              <Upload className="h-5 w-5" />
              Upload & Classify
            </Link>
            <Link
              to="/"
              hash="how"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-ocean font-semibold px-8 py-4 rounded-full transition-all"
            >
              See How It Works
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Animated wave */}
        <div className="absolute bottom-0 inset-x-0 overflow-hidden leading-none pointer-events-none">
          <svg className="animate-wave block w-[200%] h-20" viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path d="M0 40 Q 360 0 720 40 T 1440 40 T 2160 40 T 2880 40 V80 H0 Z" fill="rgba(255,255,255,0.08)" />
            <path d="M0 50 Q 360 10 720 50 T 1440 50 T 2160 50 T 2880 50 V80 H0 Z" fill="rgba(255,255,255,0.12)" />
          </svg>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="bg-ocean-deep text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="reveal text-center sm:text-left border-l-2 border-[var(--teal-brand)]/60 pl-5">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-teal-soft">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-white/75 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto reveal">
            <p className="text-teal-brand text-sm font-semibold tracking-widest uppercase">How it works</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">
              Classify Waste in 3 Simple Steps
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: Upload, title: "Upload", text: "Take a photo or video of any waste material.", n: "01" },
              { icon: Cpu, title: "Analyze", text: "Our deep learning model identifies and classifies it.", n: "02" },
              { icon: ClipboardCheck, title: "Results", text: "Get the waste type, confidence score, and next steps.", n: "03" },
            ].map((s, i) => (
              <div key={i} className="reveal relative bg-white rounded-3xl border border-border p-8 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="absolute top-6 right-6 font-display text-5xl font-extrabold text-[var(--teal-brand)]/15">{s.n}</span>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--ocean)] to-[var(--teal-brand)] flex items-center justify-center text-white">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-ocean">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSIFIER */}
      <section id="classifier" className="bg-secondary/50 py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto reveal mb-12">
            <p className="text-teal-brand text-sm font-semibold tracking-widest uppercase">Live demo</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">Try the Classifier</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powered by our custom-trained AI model.
            </p>
          </div>
          <div className="reveal">
            <Classifier />
          </div>
        </div>
      </section>
    </Layout>
  );
}
