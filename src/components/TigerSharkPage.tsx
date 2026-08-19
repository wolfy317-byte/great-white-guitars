import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TigerSharkPageProps {
  onBack: () => void;
}

const FINISHES = [
  {
    id: "blood-in-the-water",
    name: "Blood in the Water",
    subtitle: "Flame Maple",
    swatch: "/swatch-tiger-blood.png",
    image: "/tiger-blood.png",
  },
  {
    id: "mighty-mississippi",
    name: "Mighty Mississippi",
    subtitle: "Flame Maple",
    swatch: "/swatch-tiger-mississippi.png",
    image: "/tiger-mississippi.png",
  },
  {
    id: "storm",
    name: "Storm",
    subtitle: "Flame Maple",
    swatch: "/swatch-tiger-storm.png",
    image: "/tiger-storm.png",
  },
];

const SPECS = [
  { label: "Body Style", value: "Offset Double-Cut" },
  { label: "Body Wood", value: "Mahogany" },
  { label: "Pickup Layout", value: "HSH" },
  { label: "Hardware", value: "Chrome / Black Nickel" },
  { label: "Scale Length", value: '25.5"' },
  { label: "Neck Profile", value: "Slim C" },
];

export default function TigerSharkPage({ onBack }: TigerSharkPageProps) {
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
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(4,17,31,0.3) 0%, rgba(4,17,31,0.15) 40%, rgba(4,17,31,0.7) 75%, rgba(4,17,31,1) 100%)"
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-32 text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-600/30 bg-zinc-800/20 px-4 py-1.5 text-xs text-zinc-300 tracking-[0.2em] uppercase mb-8">
            Species Series
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            THE TIGER SHARK<span className="text-zinc-300">™</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl tracking-wide max-w-xl mx-auto">
            Offset body. HSH voice. Built for the hunt.
          </p>
        </div>
      </section>

      {/* Guitar image + finish selector */}
      <div className="flex flex-col items-center pt-16 pb-4 px-6 gap-10">

        {/* Guitar with crossfade — click to open lightbox */}
        <div
          className="relative w-[269px] md:w-[346px] cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
          title="Click to enlarge"
        >
          {FINISHES.map((finish, i) => (
            <img
              key={finish.id}
              src={finish.image}
              alt={`The Tiger Shark — ${finish.name}`}
              className="w-full transition-opacity duration-300 hover:scale-[1.02] transition-transform"
              style={{
                opacity: activeFinish.id === finish.id ? 1 : 0,
                filter: "drop-shadow(0 0 40px rgba(40,140,255,0.18)) drop-shadow(0 16px 48px rgba(0,0,0,0.7))",
                position: i === 0 ? "relative" : "absolute",
                top: i === 0 ? undefined : 0,
                left: i === 0 ? undefined : 0,
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
              {FINISHES.map((finish, i) => (
                <img
                  key={finish.id}
                  src={finish.image}
                  alt={`The Tiger Shark — ${finish.name}`}
                  className="w-full transition-opacity duration-300"
                  style={{
                    opacity: activeFinish.id === finish.id ? 1 : 0,
                    filter: "drop-shadow(0 0 60px rgba(40,140,255,0.2)) drop-shadow(0 24px 64px rgba(0,0,0,0.9))",
                    position: i === 0 ? "relative" : "absolute",
                    top: i === 0 ? undefined : 0,
                    left: i === 0 ? undefined : 0,
                  }}
                />
              ))}
              <p className="text-center text-zinc-300 mt-6 font-medium tracking-wide">{activeFinish.name}</p>
              <p className="text-center text-zinc-400 text-sm mt-1">{activeFinish.subtitle}</p>
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

      {/* Philosophy */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
          The Tiger Shark carries a different kind of energy. Where THE MEG™ is built around mass and presence, the Tiger Shark is restless, aggressive, and adaptable. Its offset double-cut platform is designed to feel fast and alive, with a shape that hangs differently, plays differently, and brings its own attitude before a note is ever played.
        </p>
        <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light mt-6">
          Like its namesake, the Tiger Shark is built to go after anything in its path. The HSH pickup layout gives it a wide tonal range, from thick humbucker power to sharper, more articulate voices, making it one of the most versatile instruments in the Great White Guitars lineup. Flame maple across the neck, cap, fretboard, and headstock ties the whole instrument together visually, while the finish language gives each build its own story, movement, and identity.
        </p>
      </section>

      {/* Specs */}
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
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-4">Hardware Finishes</p>
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-zinc-700" style={{
                background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
              }} />
              <span className="text-xs text-zinc-400">Chrome</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-zinc-700" style={{
                background: "linear-gradient(135deg, #3f3f46, #18181b)",
              }} />
              <span className="text-xs text-zinc-400">Black Nickel</span>
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
