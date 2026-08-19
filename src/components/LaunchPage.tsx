interface LaunchPageProps {
  onEnterSite: () => void;
}



export default function LaunchPage({ onEnterSite }: LaunchPageProps) {
  return (
    <>
      {/* Keyframes — outside layout so style tag doesn't affect flex flow */}
      <style>{`
        @keyframes gwg-sign-sink {
          0%   { top:-12%; opacity:0;    transform:rotate(-4deg) translateX(0px);   filter:brightness(1.05) saturate(0.9) hue-rotate(0deg); }
          2%   { opacity:0.85; }
          6%   { transform:rotate(-2deg) translateX(6px);  filter:brightness(0.88) saturate(1.1) hue-rotate(30deg); }
          12%  { transform:rotate( 3deg) translateX(-4px); filter:brightness(0.70) saturate(1.4) hue-rotate(80deg); }
          18%  { transform:rotate(-1deg) translateX(5px);  filter:brightness(0.52) saturate(1.7) hue-rotate(140deg); }
          24%  { transform:rotate( 2deg) translateX(-3px); filter:brightness(0.34) saturate(1.9) hue-rotate(175deg); }
          28%  { opacity:0.55; }
          31%  { top:108%; opacity:0; transform:rotate(-3deg) translateX(0px); filter:brightness(0.18) saturate(2.0) hue-rotate(195deg); }
          32%  { top:-12%; opacity:0; transform:rotate(-4deg) translateX(0px); filter:brightness(1.05) saturate(0.9) hue-rotate(0deg); }
          100% { top:-12%; opacity:0; transform:rotate(-4deg) translateX(0px); filter:brightness(1.05) saturate(0.9) hue-rotate(0deg); }
        }
      `}</style>

      {/* Page root */}
      <div className="relative min-h-screen bg-[#040c14]">

        {/* ── Fixed video ── */}
        <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0, pointerEvents: "none" }}>
          <video
            src="/launch-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ position: "absolute", top: "-5%", left: "-5%", width: "110%", height: "115%", objectFit: "cover", pointerEvents: "none" }}
          />
        </div>

        {/* ── Fixed dark overlay ── */}
        <div className="fixed inset-0 pointer-events-none" style={{
          zIndex: 1,
          background: "linear-gradient(180deg, rgba(4,12,20,0.30) 0%, rgba(4,12,20,0.15) 45%, rgba(4,12,20,0.55) 82%, rgba(4,12,20,0.90) 100%)",
        }} />

        {/* ══════════════════════════════
            HERO — video shows through, logo on top
        ══════════════════════════════ */}
        <div className="relative w-full" style={{ minHeight: "76vh", zIndex: 10 }}>

          {/* Sinking warning sign */}
          <div className="absolute pointer-events-none" style={{
            left: "68%", width: "77px",
            animation: "gwg-sign-sink 65s linear 4s infinite",
            top: "-12%", zIndex: 12,
          }}>
            <img
              src="/warning-sign.jpg"
              alt="No Swimming Shark In Area"
              style={{ width: "100%", borderRadius: "4px", boxShadow: "0 4px 18px rgba(0,0,0,0.55)", transform: "rotate(-4deg)" }}
            />
          </div>

          {/* Logo + badge */}
          <div className="relative z-10 flex flex-col items-center gap-8 pt-24 pb-40 px-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-600/40 bg-zinc-800/30 px-5 py-2 text-sm text-zinc-300 tracking-widest uppercase backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse" />
              Coming Soon
            </div>
            <img
              src="/logo.png"
              alt="Great White Guitars"
              className="h-72 md:h-96 w-auto"
              style={{ filter: "drop-shadow(0 0 50px rgba(40,160,255,0.35)) drop-shadow(0 8px 32px rgba(0,0,0,0.6))" }}
            />
          </div>

          {/* Bottom fade into solid bg */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{
            height: "200px",
            background: "linear-gradient(to bottom, transparent, #040c14)",
            zIndex: 11,
          }} />
        </div>

        {/* ══════════════════════════════
            CONTENT BELOW — solid bg covers fixed video
        ══════════════════════════════ */}
        <div className="relative w-full bg-[#040c14]" style={{ zIndex: 10 }}>

          {/* Brand Philosophy */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-6 pb-4">
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
              Great White Guitars began with a love of music, a fascination with the ocean,
              and a question: what happens when you stop choosing between the guitar you know
              and the guitar you imagine? Every instrument we build carries the weight of that
              question. Hybrid configurations. Uncommon combinations. Custom-order instruments
              designed to feel familiar in the hands while carrying an identity all their own.
            </p>
          </div>

          {/* Guitar Teaser Strip */}
          <div className="relative w-full overflow-hidden" style={{ height: "90px" }}>
            <img
              src="/guitar-teaser.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "30% 50%" }}
            />
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040c14] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040c14] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#040c14] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#040c14] to-transparent" />
          </div>

          {/* Preview link — no lifeguard sign */}
          <div className="py-16 flex flex-col items-center gap-3">
            <button
              onClick={onEnterSite}
              className="group relative focus:outline-none"
              aria-label="Enter the site"
            >
              <img
                src="/no-lifeguard-sign.jpg"
                alt="No Lifeguard On Duty — Swim At Your Own Risk"
                className="w-40 rounded-sm transition-all duration-300 group-hover:scale-105"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.6)", filter: "brightness(0.85) saturate(0.9)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(1) saturate(1) drop-shadow(0 0 12px rgba(100,200,255,0.4))"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.85) saturate(0.9)"; }}
              />
              <span className="absolute inset-0 rounded-sm ring-2 ring-zinc-400/0 group-hover:ring-zinc-400/30 transition-all duration-300" />
            </button>
            <span className="text-zinc-600 text-xs tracking-widest uppercase">enter at your own risk</span>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-blue-900/30 to-transparent" />
        </div>

      </div>{/* end page root */}
    </>
  );
}
