import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModelPageProps {
  onBack: () => void;
}

const FINISHES = [
  {
    id: "charcoal-burst",
    name: "Great White",
    subtitle: "Flame Maple",
    swatch: "/swatch-great-white.png",
    image: "/meg-front.png",
  },
  {
    id: "abyss-blue",
    name: "Marianas",
    subtitle: "Flame Maple",
    swatch: "/swatch-marianas.png",
    image: "/meg-blue-burst.png",
  },
  {
    id: "ocean-wave",
    name: "Night Swim",
    subtitle: "Flame Maple",
    swatch: "/swatch-night-swim.png",
    image: "/meg-ocean-wave.png",
  },
  {
    id: "aurora",
    name: "Blood in the Water",
    subtitle: "Flame Maple",
    swatch: "/swatch-blood-in-the-water.png",
    image: "/meg-aurora.png",
  },
];

const SPECS = [
  { label: "Body Style", value: "Singlecut" },
  { label: "Body Wood", value: "Mahogany" },
  { label: "Pickup Layout", value: "SSS" },
  { label: "Hardware", value: "Gold" },
  { label: "Scale Length", value: '25.5"' },
  { label: "Neck Profile", value: "Slim C" },
];

export default function ModelPage({ onBack }: ModelPageProps) {
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [hoveredFinish, setHoveredFinish] = useState<typeof FINISHES[0] | null>(null);
  const activeFinish = hoveredFinish ?? selectedFinish;
  const introRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const [loopVisible, setLoopVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleIntroEnded = () => {
    setLoopVisible(true);
    loopRef.current?.play();
  };

  return (
    <div className="min-h-screen text-zinc-50 font-sans selection:bg-zinc-800" style={{ background: "#04111f" }}>

      {/* Nav */}
      <nav className="border-b border-zinc-800/50 bg-[#04111f]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 group">
            <img src="/logo.png" alt="Great White Guitars" className="h-12 w-auto" />
          </button>
          <button onClick={onBack} className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
            ← Back
          </button>
        </div>
      </nav>

      {/* Hero — video fades into page body */}
      <section className="relative overflow-hidden" style={{ minHeight: "60vh" }}>
        {/* Video layer */}
        <div className="absolute inset-0">
          <video
            ref={introRef}
            src="/model-bg.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleIntroEnded}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              opacity: loopVisible ? 0 : 1,
              transition: "opacity 1.5s ease",
            }}
          />
          <video
            ref={loopRef}
            src="/site-bg.mp4"
            muted
            loop
            playsInline
            style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              objectFit: "cover",
              opacity: loopVisible ? 1 : 0,
              transition: "opacity 1.5s ease",
            }}
          />
          {/* Fade video into page body color at bottom */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(4,17,31,0.3) 0%, rgba(4,17,31,0.15) 40%, rgba(4,17,31,0.7) 75%, rgba(4,17,31,1) 100%)"
          }} />
        </div>

        {/* Hero text */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-32 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-600/30 bg-zinc-800/20 px-4 py-1.5 text-xs text-zinc-300 tracking-[0.2em] uppercase mb-8">
            Flagship Model
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            THE MEG<span className="text-zinc-300">™</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl tracking-wide max-w-xl mx-auto">
            Singlecut body. SSS voice. Uncommon by design.
          </p>
        </div>
      </section>

      {/* Guitar image + finish selector */}
      <div className="flex flex-col items-center pt-16 pb-4 px-6 gap-10">

        {/* Guitar image with crossfade — click to open lightbox */}
        <div
          className="relative w-[269px] md:w-[346px] cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
          title="Click to enlarge"
        >
          {FINISHES.map((finish) => (
            <img
              key={finish.id}
              src={finish.image}
              alt={`The Meg — ${finish.name}`}
              className="w-full absolute top-0 left-0 transition-opacity duration-300 hover:scale-[1.02] transition-transform"
              style={{
                opacity: activeFinish.id === finish.id ? 1 : 0,
                filter: "drop-shadow(0 0 40px rgba(40,140,255,0.18)) drop-shadow(0 16px 48px rgba(0,0,0,0.7))",
                position: finish === FINISHES[0] ? "relative" : "absolute",
              }}
            />
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 300, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <div
              className="relative max-w-xl w-full px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-10 right-8 text-zinc-400 hover:text-white text-2xl leading-none transition-colors"
                style={{ zIndex: 10 }}
              >
                ✕
              </button>
              {FINISHES.map((finish) => (
                <img
                  key={finish.id}
                  src={finish.image}
                  alt={`The Meg — ${finish.name}`}
                  className="w-full transition-opacity duration-300"
                  style={{
                    opacity: activeFinish.id === finish.id ? 1 : 0,
                    filter: "drop-shadow(0 0 60px rgba(40,140,255,0.2)) drop-shadow(0 24px 64px rgba(0,0,0,0.9))",
                    position: finish === FINISHES[0] ? "relative" : "absolute",
                    top: finish === FINISHES[0] ? undefined : 0,
                    left: finish === FINISHES[0] ? undefined : 0,
                  }}
                />
              ))}
              <p className="text-center text-zinc-300 mt-6 font-medium tracking-wide">{activeFinish.name}</p>
              <p className="text-center text-zinc-500 text-sm mt-1">{activeFinish.subtitle}</p>
            </div>
          </div>
        )}

        {/* Finish name */}
        <div className="text-center">
          <p className="text-white font-medium tracking-wide">{activeFinish.name}</p>
          <p className="text-zinc-400 text-sm">{activeFinish.subtitle}</p>
        </div>

        {/* Swatch selector */}
        <div className="flex gap-4">
          {FINISHES.map((finish) => (
            <button
              key={finish.id}
              onClick={() => setSelectedFinish(finish)}
              onMouseEnter={() => setHoveredFinish(finish)}
              onMouseLeave={() => setHoveredFinish(null)}
              title={finish.name}
              className={cn(
                "w-9 h-9 rounded-full border-2 transition-all duration-200",
                selectedFinish.id === finish.id
                  ? "border-white scale-110 shadow-lg"
                  : "border-zinc-700 hover:border-zinc-500 hover:scale-105"
              )}
              style={{
                backgroundImage: `url(${finish.swatch})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </div>

      {/* Philosophy / Story */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
          THE MEG™ is the flagship electric model of Great White Guitars, inspired by
          the scale, presence, and mythic weight of the Megalodon. It reflects the core
          brand philosophy of familiar feel with deeper identity: a guitar that players
          can understand immediately, but one that carries its own visual language
          through finish, inlay, headstock shape, and species-driven character.
        </p>
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light mt-6">
          With its single-cut platform and SSS pickup layout, THE MEG™ explores a
          combination that is uncommon in this body style, giving players a familiar
          shape with a voice they do not usually find in a single-cut guitar. Its
          iconography connects directly to the ocean, from shark-inspired inlay
          direction to flowing headstock language and finish systems shaped by natural
          movement.
        </p>
      </section>

      {/* Specs grid */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent mb-16" />

        <h2 className="text-sm tracking-[0.2em] uppercase text-zinc-400 mb-10">Specifications</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">
          {SPECS.map((spec) => (
            <div key={spec.label}>
              <p className="text-xs text-zinc-600 uppercase tracking-widest mb-1">{spec.label}</p>
              <p className="text-zinc-200 font-medium">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Wood configurations */}
        <div className="mt-14">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-6">Wood Configurations</p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Flame */}
            <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/40">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-3">Option A — Flame</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li><span className="text-zinc-600 mr-2">Body</span>Mahogany</li>
                <li><span className="text-zinc-600 mr-2">Top (Cap)</span>High Grade Flamed Maple</li>
                <li><span className="text-zinc-600 mr-2">Neck</span>High Grade Flamed Maple</li>
                <li><span className="text-zinc-600 mr-2">Fretboard</span>High Grade Flamed Maple</li>
                <li><span className="text-zinc-600 mr-2">Headstock</span>High Grade Flamed Maple</li>
              </ul>
            </div>
            {/* Quilted */}
            <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/40">
              <p className="text-xs text-zinc-400 uppercase tracking-widest mb-3">Option B — Quilted</p>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li><span className="text-zinc-600 mr-2">Body</span>Mahogany</li>
                <li><span className="text-zinc-600 mr-2">Top (Cap)</span>High Grade Quilted Maple</li>
                <li><span className="text-zinc-600 mr-2">Neck</span>High Grade Quilted Maple</li>
                <li><span className="text-zinc-600 mr-2">Fretboard</span>High Grade Quilted Maple</li>
                <li><span className="text-zinc-600 mr-2">Headstock</span>High Grade Quilted Maple</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Hardware finishes */}
        <div className="mt-14">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Hardware Finish</p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-zinc-700" style={{
                background: "linear-gradient(135deg, #facc15, #b8960b)",
                boxShadow: "0 0 12px rgba(250,204,21,0.15)",
              }} />
              <span className="text-xs text-zinc-400">Gold</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800/50 py-16 text-center">
        <button
          onClick={onBack}
          className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-4"
        >
          ← Back to Great White Guitars
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 text-center text-zinc-600 text-xs">
        <p>&copy; {new Date().getFullYear()} Great White Guitars. All rights reserved.</p>
      </footer>
    </div>
  );
}
