import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CountUp } from "@/components/site/CountUp";
import {
  Home, Droplets, Wind, Sprout, HeartPulse, ArrowRight, Trophy, Scan,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AWAI Blue — Africa's Waste Crisis, AI Response" },
      {
        name: "description",
        content:
          "AWAI Blue was built to classify, understand, and reduce the waste destroying Africa's people, land, water, and future.",
      },
      { property: "og:title", content: "About AWAI Blue" },
      {
        property: "og:description",
        content: "Africa's waste crisis is real. AI is our response.",
      },
    ],
  }),
  component: AboutPage,
});

function StatPill({ value, suffix, label, light = false }: { value: number | string; suffix?: string; label: string; light?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl ${light ? "bg-white/10 border border-white/15 text-white" : "bg-white border border-border text-ink"}`}>
      <div className={`font-display text-3xl font-extrabold ${light ? "text-teal-soft" : "text-teal-brand"}`}>
        {typeof value === "number" ? <CountUp end={value} suffix={suffix} /> : value}
      </div>
      <p className={`text-xs mt-2 leading-relaxed ${light ? "text-white/80" : "text-muted-foreground"}`}>{label}</p>
    </div>
  );
}

function AboutPage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative -mt-16 pt-36 pb-28 sm:pt-44 sm:pb-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: "radial-gradient(circle at 70% 30%, rgba(14,154,167,0.4), transparent 50%)",
        }} />
        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05]">
            Africa's Waste Crisis Is Real.{" "}
            <span className="text-teal-soft">AI Is Our Response.</span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            AWAI Blue was built to classify, understand, and reduce the waste destroying our people,
            our land, our water, and our future.
          </p>
        </div>
      </section>

      {/* SCALE OF PROBLEM */}
      <section className="bg-ocean-deep py-24 text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <p className="text-teal-soft text-sm font-semibold tracking-widest uppercase">Section 01</p>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold">
              Waste in Africa. The Numbers Tell the Story.
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatPill light value={125} suffix="M" label="Tonnes of waste generated in Africa annually" />
            <StatPill light value="1 in 3" label="Africans has no access to proper waste collection" />
            <StatPill light value={70} suffix="%" label="of Africa's water sources contaminated by waste" />
            <StatPill light value={40} suffix="%+" label="of African waste is burned in the open air" />
          </div>
        </div>
      </section>

      {/* SUB A — HOUSEHOLDS */}
      <SubSection
        eyebrow="People & Communities"
        icon={<Home className="h-6 w-6" />}
        title="Where People Live, Waste Accumulates"
        body="In cities like Lagos, Nairobi, Kampala, and Accra, the average household generates over 0.5kg of waste daily. With fewer than 40% of urban homes having reliable waste collection, waste fills streets, schoolyards, and markets — turning the spaces where families live into health hazards. Children play in it. Mothers cook beside it. Communities are forced to accept it as normal. This is the everyday reality for hundreds of millions of people across Africa."
        badge="Only 4% of Africa's waste is formally recycled"
        imgLabel="Households & Communities"
        imgSrc="/images/households-communities.jpg"
      />

      {/* SUB B — WATER */}
      <section className="bg-ocean-deep text-white py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-14 lg:grid-cols-2 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="rounded-3xl relative overflow-hidden border border-white/10 shadow-xl">
              <img
                src="/images/water-sources.jpg"
                alt="Communities collecting water at a rural water source"
                width={612}
                height={408}
                loading="eager"
                decoding="async"
                className="block w-full h-auto max-h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-5 left-5 text-xs text-white uppercase tracking-widest font-semibold drop-shadow-md">
                Water sources
              </span>
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-teal-soft text-sm font-semibold tracking-widest uppercase">
              <Droplets className="h-4 w-4" /> Water & Sanitation
            </div>
            <h3 className="mt-3 text-3xl sm:text-5xl font-extrabold">Our Water Is Under Threat</h3>
            <p className="mt-5 text-white/80 leading-relaxed">
              Across Africa, rivers, lakes, and groundwater systems are being silently poisoned by waste. When plastic, chemicals, and untreated sewage leach into soil, they contaminate the boreholes and wells that millions of rural families depend on daily. Lake Victoria — shared by Uganda, Kenya, and Tanzania, home to 40 million people — receives thousands of tonnes of plastic waste every year. The Nile, Niger, and Congo rivers carry waste from inland communities to coastal populations, spreading contamination across borders.
            </p>
            <p className="mt-4 text-white/80 leading-relaxed">
              Waterborne diseases like cholera, typhoid, and dysentery spike in communities near dump sites. Women and girls — who carry most of the burden of water collection — walk further each year to find clean water as local sources become unsafe.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <StatPill light value={70} suffix="%" label="of Africa's surface water is affected by waste pollution" />
              <StatPill light value={80} suffix="%" label="of diseases in Africa are linked to unsafe water & sanitation" />
              <StatPill light value={20} suffix="%" label="of school days girls miss due to water-related illness" />
              <StatPill light value="Microplastics" label="Fish in contaminated lakes absorb microplastics eaten by communities" />
            </div>
          </div>
        </div>
      </section>

      {/* SUB C — AIR */}
      <section className="bg-[oklch(0.985_0.02_85)] py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-14 lg:grid-cols-2 items-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 text-amber-warm text-sm font-semibold tracking-widest uppercase">
              <Wind className="h-4 w-4" /> Air Quality
            </div>
            <h3 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">The Air Our Children Breathe</h3>
            <p className="mt-5 text-ink/80 leading-relaxed">
              When waste is not collected, communities burn it. Open burning of plastic, rubber, and e-waste releases dioxins, furans, and toxic fine particles into the air. In informal settlements across Kampala, Nairobi, and Dakar, residents breathe in the equivalent of 40 cigarettes worth of toxic air on high burning days. Infants, pregnant women, and the elderly bear the greatest burden — suffering from lung disease, cancer, and developmental disorders caused by the smoke they cannot escape.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatPill value={600000} label="Africans die annually from air pollution-related illness" />
              <StatPill value={40} suffix="%+" label="of African waste is burned in the open" />
              <StatPill value="3x" label="higher rates of respiratory illness in children near dump sites" />
            </div>
          </div>
          <div className="reveal">
            <div className="rounded-3xl relative overflow-hidden border border-border shadow-xl">
              <img
                src="/images/air-burning.jpg"
                alt="Open burning of waste releasing toxic smoke into the air"
                width={640}
                height={392}
                loading="eager"
                decoding="async"
                className="block w-full h-auto max-h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-5 left-5 text-xs text-white uppercase tracking-widest font-semibold drop-shadow-md">
                Air & burning
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SUB D — SOIL */}
      <section className="bg-[oklch(0.97_0.04_145)] py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-14 lg:grid-cols-2 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="rounded-3xl relative overflow-hidden border border-border shadow-xl">
              <img
                src="/images/soil-farms.jpg"
                alt="Landfill waste contaminating soil near farmland"
                width={825}
                height={549}
                loading="eager"
                decoding="async"
                className="block w-full h-auto max-h-[520px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-5 left-5 text-xs text-white uppercase tracking-widest font-semibold drop-shadow-md">
                Soil & farms
              </span>
            </div>
          </div>
          <div className="reveal order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-earth-green text-sm font-semibold tracking-widest uppercase">
              <Sprout className="h-4 w-4" /> Soil & Food
            </div>
            <h3 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">Poisoned Land, Threatened Harvests</h3>
            <p className="mt-5 text-ink/80 leading-relaxed">
              Africa feeds itself from the soil — yet that soil is under growing threat. Plastic waste buried in farmland blocks water absorption and root growth. Heavy metals from e-waste and batteries leach into agricultural soil, contaminating crops that end up on family tables. Microplastics have now been detected in fruits, vegetables, and grains grown near contaminated dump sites across the continent. The food chain — from soil to plate — is being silently disrupted by waste we cannot always see.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatPill value="1 in 5" label="African farmlands near urban areas show waste contamination" />
              <StatPill value={68} suffix="%" label="of food samples near West African dump sites contain microplastics" />
              <StatPill value="$3B" label="lost annually by African farmers due to soil contamination" />
            </div>
          </div>
        </div>
      </section>

      {/* SUB E — HEALTH & DIGNITY */}
      <section className="bg-ocean text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 30% 30%, var(--teal-brand), transparent 50%)",
        }} />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="reveal max-w-3xl">
            <div className="inline-flex items-center gap-2 text-teal-soft text-sm font-semibold tracking-widest uppercase">
              <HeartPulse className="h-4 w-4" /> Health & Dignity
            </div>
            <h3 className="mt-3 text-3xl sm:text-5xl font-extrabold">Waste Is a Human Rights Issue</h3>
            <p className="mt-5 text-white/85 leading-relaxed">
              The burden of waste does not fall equally. It falls hardest on the poor, on women, on children, and on communities with the least political power to demand better. Waste pickers — many of them women and children — sort through toxic materials with bare hands to survive. Families living within 500 metres of a dump site face dramatically higher rates of cancer, birth defects, skin disease, and mental health conditions. This is not just an environmental problem. It is a dignity problem. A justice problem. And it demands an intelligent, scalable response.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatPill light value="10M+" label="Africans live within 500m of an unmanaged dump site" />
            <StatPill light value={60} suffix="%" label="of informal waste workers are women with zero safety protection" />
            <StatPill light value="5x" label="higher blood lead in children near e-waste sites" />
            <StatPill light value="#1" label="cause of childhood cognitive impairment in parts of West Africa: lead poisoning from waste" />
          </div>
        </div>
      </section>

      {/* WHY AI */}
      <section className="bg-background py-24">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center reveal">
          <p className="text-teal-brand text-sm font-semibold tracking-widest uppercase">Why AI</p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">
            You Can't Solve What You Can't See
          </h2>
          <p className="mt-4 text-lg text-teal-brand font-medium">
            Identification is the first step to intervention.
          </p>
          <p className="mt-8 text-lg text-ink/80 leading-relaxed">
            Most waste management systems in Africa fail before they begin — because there is no data.
            No one knows exactly what waste is accumulating, where it is, or how fast it is growing.
            AWAI Blue changes that. Our AI model classifies waste from a single photo or video in under
            3 seconds — turning every smartphone into a waste detection tool and every community member
            into a data point in a continent-wide solution.
          </p>
          <div className="mt-10 inline-flex items-center gap-2 bg-secondary text-ocean font-semibold px-5 py-3 rounded-full">
            <Scan className="h-5 w-5 text-teal-brand" />
            Classify in under 3 seconds
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-secondary/50 py-24">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="reveal bg-gradient-hero rounded-[2rem] p-10 sm:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, var(--teal-brand), transparent 40%)",
            }} />
            <div className="relative">
              <p className="text-teal-soft text-sm font-semibold tracking-widest uppercase">Our story</p>
              <h3 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold leading-tight">
                AWAI Blue was created by a team that believes African women must lead the AI solutions Africa needs most.
              </h3>
              <p className="mt-6 text-white/85 leading-relaxed max-w-2xl mx-auto">
                Built as part of the African Women in AI (AWAI) Hackathon — Blue Track. We didn't just build a model. We built a mission.
              </p>
              <div className="inline-flex items-center gap-2 mt-8 bg-white/10 border border-white/20 backdrop-blur text-white text-sm font-medium px-4 py-2 rounded-full">
                <Trophy className="h-4 w-4 text-amber-warm" />
                AWAI Hackathon — Blue Track Submission
              </div>
              <div className="mt-10">
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 bg-[var(--earth-green)] hover:bg-[var(--earth-green)]/90 text-white font-semibold px-8 py-4 rounded-full shadow-xl transition-all hover:-translate-y-0.5"
                >
                  See Our Solutions
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function SubSection({
  eyebrow, icon, title, body, badge, imgLabel, imgSrc,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  badge?: string;
  imgLabel: string;
  imgSrc: string;
}) {
  return (
    <section className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid gap-14 lg:grid-cols-2 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 text-teal-brand text-sm font-semibold tracking-widest uppercase">
            {icon} {eyebrow}
          </div>
          <h3 className="mt-3 text-3xl sm:text-5xl font-extrabold text-ocean">{title}</h3>
          <p className="mt-5 text-ink/80 leading-relaxed">{body}</p>
          {badge && (
            <div className="mt-7 inline-block bg-[var(--amber-warm)]/15 text-[var(--amber-warm)] border border-[var(--amber-warm)]/30 font-semibold px-5 py-2.5 rounded-full text-sm">
              {badge}
            </div>
          )}
        </div>
        <div className="reveal">
          <div className="rounded-3xl relative overflow-hidden border border-border shadow-xl bg-[var(--ocean-deep)]">
            <img
              src={imgSrc}
              alt={imgLabel}
              width={612}
              height={408}
              loading="eager"
              decoding="async"
              className="block w-full h-auto max-h-[520px] object-cover object-center [image-rendering:auto]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-5 left-5 text-xs text-white uppercase tracking-widest font-semibold drop-shadow-md">
              {imgLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}