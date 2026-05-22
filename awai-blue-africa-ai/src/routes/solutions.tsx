import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import {
  CheckCircle2, Cpu, Coins, Brush, Tractor, GraduationCap, Droplets, Landmark,
  Globe2, Database, ArrowRight, Recycle, Sparkles, Palette, Shirt, Building2,
  Zap, HardHat,
} from "lucide-react";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — AWAI Blue: Turning Waste Into Wealth" },
      {
        name: "description",
        content:
          "AWAI Blue's classification model and continent-wide solutions for turning waste into wealth, art, and a better Africa.",
      },
      { property: "og:title", content: "AWAI Blue Solutions" },
      {
        property: "og:description",
        content: "Classification is just the beginning. Here's what happens when we act on the data.",
      },
    ],
  }),
  component: SolutionsPage,
});

const incomeCards = [
  {
    icon: Recycle,
    title: "Plastic Recycling Cooperatives",
    text: "Women-led cooperatives in Rwanda, Uganda, and South Africa collect and sell plastic waste to recycling facilities, earning $2–5 per kg and creating dignified income from what others discard.",
  },
  {
    icon: HardHat,
    title: "Waste-to-Bricks",
    text: "Entrepreneurs in Uganda and Kenya compress plastic waste into building bricks — 5–7x stronger than concrete — and sell them for construction at a fraction of traditional material costs, creating jobs and housing.",
  },
  {
    icon: Zap,
    title: "Waste-to-Energy",
    text: "Cities like Kampala and Nairobi are piloting waste-to-energy plants that convert municipal solid waste into electricity for thousands of households. One tonne of waste can generate 500–600 kWh of clean energy.",
  },
];

const artCards = [
  { icon: Palette, title: "Sculpture & Visual Art", text: "Artists across Africa from Nairobi to Cape Town create award-winning sculptures from metal scrap, e-waste, and plastic bottles — exhibited in international galleries and redefining African creativity." },
  { icon: Shirt, title: "Fashion & Textiles", text: "Designers in Accra, Lagos, and Dakar craft high-end fashion collections from recycled fabrics, bottle caps, and tyre rubber — proving Africa leads in sustainable circular fashion." },
  { icon: Building2, title: "Community Architecture", text: "Communities in East and West Africa use discarded glass bottles, tyres, and plastic waste as building materials for eco-homes, schools, and community centres at up to 60% lower construction cost." },
];

const sectorCards = [
  { icon: Tractor, title: "Agriculture", text: "Composted organic waste returns nutrients to farmland, reducing fertiliser dependency and improving soil health across Sub-Saharan Africa." },
  { icon: GraduationCap, title: "Education", text: "School programs across Africa teach children waste sorting from age 5, building a generation of environmentally conscious citizens and leaders." },
  { icon: Droplets, title: "Water Protection", text: "Waste classification data helps identify contamination hotspots near water sources, enabling faster community and government intervention before rivers and wells are damaged." },
  { icon: Landmark, title: "Policy & Governance", text: "Countries like Kenya, Rwanda, and Morocco lead with plastic bans and extended producer responsibility laws now being adopted continent-wide." },
  { icon: Globe2, title: "Global Circular Economy", text: "African recycled materials — aluminium, copper, plastic — feed global manufacturing supply chains, making Africa a key player in the $4.5 trillion circular economy." },
  { icon: Database, title: "Technology & Data", text: "Platforms like AWAI Blue generate real-time waste classification data that helps governments map hotspots, allocate resources, and measure environmental progress at scale." },
];

function SolutionsPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative -mt-16 pt-36 pb-28 sm:pt-44 sm:pb-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: "radial-gradient(circle at 30% 70%, var(--teal-brand), transparent 50%)",
        }} />
        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05]">
            Turning Waste Into <span className="text-teal-soft">Wealth, Art,</span> and a Better Africa
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Classification is just the beginning. Here's what happens when we act on the data.
          </p>
        </div>
      </section>

      {/* AI MODEL */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-14 lg:grid-cols-2 items-center">
          <div className="reveal">
            <p className="text-teal-brand text-sm font-semibold tracking-widest uppercase">Our AI</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">
              Meet the AWAI Blue Classification Model
            </h2>
            <p className="mt-5 text-ink/80 leading-relaxed">
              Built on a custom-trained Convolutional Neural Network (CNN), our model detects and classifies
              waste from images and video with over <span className="text-teal-brand font-bold">95% accuracy</span>
              — giving communities, governments, and NGOs the data they need to act.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Real-time image classification",
                "Video frame analysis",
                "Multi-class: Plastic | Organic | E-Waste | Metal | Paper | Clean",
                "Confidence scoring per prediction",
                "Deployable on mobile and web",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 border border-[var(--teal-brand)]/30 bg-[var(--teal-brand)]/5 text-ink rounded-full px-5 py-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-brand shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mock classifier card */}
          <div className="reveal">
            <div className="rounded-3xl bg-gradient-hero p-1 shadow-2xl">
              <div className="rounded-[1.4rem] bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-teal-brand tracking-widest uppercase">
                    <Cpu className="h-4 w-4" /> AWAI Blue Model v1.0
                  </div>
                  <span className="text-xs text-muted-foreground">Live preview</span>
                </div>
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--ocean)] to-[var(--teal-brand)] flex items-center justify-center relative overflow-hidden">
                  <Recycle className="h-20 w-20 text-white/40" />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> ANALYZING
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="bg-ocean text-white text-sm font-semibold px-3 py-1.5 rounded-full">Plastic Waste</span>
                  <span className="text-sm text-muted-foreground">→ Recyclable</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1.5 text-ink">
                    <span className="font-medium">Confidence</span>
                    <span className="font-bold text-teal-brand">94%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[94%] bg-gradient-to-r from-[var(--teal-brand)] to-[var(--earth-green)] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WASTE AS INCOME */}
      <section className="bg-[var(--teal-brand)] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, white, transparent 50%)",
        }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 text-white/85 text-sm font-semibold tracking-widest uppercase">
              <Coins className="h-4 w-4" /> Income
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold">Waste Can Be Money</h2>
            <p className="mt-4 text-white/85 text-lg">
              Across Africa, waste is already being turned into livelihoods.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {incomeCards.map((c, i) => (
              <div key={c.title} className="reveal bg-white text-ink rounded-3xl p-7 shadow-xl hover:-translate-y-1 transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="h-12 w-12 rounded-2xl bg-[var(--earth-green)]/10 text-[var(--earth-green)] flex items-center justify-center">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ocean">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WASTE AS ART */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.97 0.04 75) 0%, oklch(0.94 0.07 55) 100%)" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 text-amber-warm text-sm font-semibold tracking-widest uppercase">
              <Brush className="h-4 w-4" /> Art & Culture
            </div>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">
              Africa Is Turning Trash Into Treasure
            </h2>
            <p className="mt-4 text-ink/80 text-lg">Creativity and sustainability go hand in hand.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {artCards.map((c, i) => (
              <div key={c.title} className="reveal bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="aspect-[5/3] bg-gradient-to-br from-[var(--amber-warm)] to-orange-600 flex items-center justify-center">
                  <c.icon className="h-16 w-16 text-white/70" />
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold text-ocean">{c.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <p className="text-teal-brand text-sm font-semibold tracking-widest uppercase">Across sectors</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">
              Beyond Our Model: A Continent-Wide Response
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Technology is one piece. Here is the bigger picture.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectorCards.map((c, i) => (
              <div key={c.title} className="reveal bg-white rounded-3xl p-7 border border-border hover:border-[var(--teal-brand)]/50 hover:shadow-xl hover:-translate-y-1 transition-all" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--ocean)] to-[var(--teal-brand)] text-white flex items-center justify-center">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ocean">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-ocean-deep text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, var(--teal-brand), transparent 60%)",
        }} />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <Sparkles className="h-10 w-10 text-teal-soft mx-auto" />
          <h2 className="mt-5 font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1]">
            The Waste Crisis Has a Solution.<br />It Starts With <span className="text-teal-soft">You.</span>
          </h2>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            Use AWAI Blue to classify waste in your community, contribute data, and be part of Africa's clean future.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              hash="classifier"
              className="inline-flex items-center justify-center gap-2 bg-[var(--earth-green)] hover:bg-[var(--earth-green)]/90 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
            >
              Classify Waste Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-ocean font-semibold px-8 py-4 rounded-full transition-all"
            >
              Learn About the Crisis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}