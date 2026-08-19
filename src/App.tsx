import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Zap, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LaunchPage from "@/components/LaunchPage";
import ModelPage from "@/components/ModelPage";
import TigerSharkPage from "@/components/TigerSharkPage";
import PartnershipAttribution from "@/components/PartnershipAttribution";
import ContactPage from "@/components/ContactPage";

const TRANSITION_VIDEO_SRC = "/transition.mov";

function VideoTransition({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const completed = useRef(false);

  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    onComplete();
  };

  const beginFadeOut = () => {
    if (completed.current) return;
    setFadingOut(true);
    setTimeout(finish, 500);
  };

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 50);
    // Fallback in case onEnded doesn't fire
    const fallback = setTimeout(beginFadeOut, 6000);
    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{ zIndex: 200, opacity: visible && !fadingOut ? 1 : 0, transition: visible ? "opacity 0.5s ease" : "opacity 0.6s ease", overflow: "hidden" }}
    >
      <video
        src={TRANSITION_VIDEO_SRC}
        autoPlay
        muted
        playsInline
        onEnded={beginFadeOut}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
      <button
        onClick={beginFadeOut}
        className="absolute bottom-8 right-8 text-xs text-white/40 hover:text-white/80 transition-colors tracking-widest uppercase"
        style={{ zIndex: 10 }}
      >
        Skip →
      </button>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<"launch" | "site" | "meg" | "tiger-shark" | "contact">("launch");
  const [transitioning, setTransitioning] = useState<null | "meg" | "tiger-shark">(null);

  const handleModelClick = (dest: "meg" | "tiger-shark") => {
    setTransitioning(dest);
  };

  const handleTransitionComplete = () => {
    if (transitioning) {
      setPage(transitioning);
      setTransitioning(null);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  return (
    <>
      {transitioning && (
        <VideoTransition onComplete={handleTransitionComplete} />
      )}
      {page === "launch" && <LaunchPage onEnterSite={() => setPage("site")} />}
      {page === "meg" && <ModelPage onBack={() => setPage("site")} />}
      {page === "tiger-shark" && <TigerSharkPage onBack={() => setPage("site")} />}
      {page === "contact" && <ContactPage onBack={() => setPage("site")} />}
      {page === "site" && (
    <div className="min-h-screen text-zinc-50 font-sans selection:bg-zinc-800" style={{ background: "#04111f" }}>
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-[#04111f]/90 backdrop-blur-xl sticky top-0" style={{ zIndex: 50 }}>
        <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Great White Guitars" className="h-24 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#models" className="hover:text-white transition-colors">Models</a>
            <a href="#about" className="hover:text-white transition-colors">The Hybrid Concept</a>
            <a href="#custom" className="hover:text-white transition-colors">Custom Shop</a>
            <button onClick={() => setPage("contact")} className="hover:text-white transition-colors">Contact</button>
          </div>
          <Button onClick={() => setPage("contact")} variant="outline" className="hidden md:flex border-zinc-700 hover:bg-zinc-800 hover:text-white text-zinc-300">
            Build Yours
          </Button>
        </div>
      </nav>

      {/* Hero Section — video at top, fades into deep navy */}
      <style>{`
        @keyframes gwg-float-left {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50%       { transform: translateY(-18px) rotate(-4deg); }
        }
        @keyframes gwg-float-right {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50%       { transform: translateY(-18px) rotate(4deg); }
        }
      `}</style>
      <section className="relative overflow-hidden" style={{ minHeight: "82vh", display: "flex", alignItems: "center" }}>
        {/* Video layer — contained in hero, fades to page color */}
        <div className="absolute inset-0">
          <video
            src="/site-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(4,17,31,0.4) 0%, rgba(4,17,31,0.2) 40%, rgba(4,17,31,0.75) 75%, rgba(4,17,31,1) 100%)"
          }} />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 relative" style={{ zIndex: 10 }}>
          <div className="relative flex flex-col items-center">

            {/* Left — The Meg (absolute, vertically centered) */}
            <div
              className="hidden md:block absolute cursor-pointer group"
              style={{ left: 0, top: "50%", transform: "translateY(-50%)", animation: "gwg-float-left 5.5s ease-in-out infinite" }}
              onClick={() => handleModelClick("meg")}
            >
              <img
                src="/meg-front.png"
                alt="The Meg™"
                className="w-[127px] xl:w-[150px] group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "drop-shadow(0 0 24px rgba(80,160,255,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.85))" }}
              />
              <p className="text-center text-zinc-400 text-xs mt-2 group-hover:text-white transition-colors">The Meg™</p>
            </div>

            {/* Center — Text */}
            <div className="text-center flex flex-col items-center px-0 md:px-40 xl:px-48">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                Familiar shapes.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">
                  Unexpected voices.
                </span>
              </h1>
              <p className="text-lg text-zinc-300 mb-10 leading-relaxed max-w-xl">
                We build hybrid guitars that break tradition. Experience the ergonomic comfort of a classic singlecut, powered by the crystalline chime of an SSS pickup configuration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => handleModelClick("meg")}
                  className="h-14 px-8 text-base text-zinc-200 border border-zinc-600/60 hover:border-zinc-400/80 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 40%, #222222 60%, #2e2e2e 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.5)",
                    letterSpacing: "0.04em",
                  }}>
                  Explore The Meg™
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" onClick={() => handleModelClick("tiger-shark")}
                  className="h-14 px-8 text-base text-zinc-200 border border-zinc-600/60 hover:border-zinc-400/80 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 40%, #222222 60%, #2e2e2e 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.5)",
                    letterSpacing: "0.04em",
                  }}>
                  Explore The Tiger Shark™
                </Button>
              </div>
            </div>

            {/* Right — Tiger Shark (absolute, vertically centered) */}
            <div
              className="hidden md:block absolute cursor-pointer group"
              style={{ right: 0, top: "50%", transform: "translateY(-50%)", animation: "gwg-float-right 6.2s ease-in-out infinite" }}
              onClick={() => handleModelClick("tiger-shark")}
            >
              <img
                src="/tiger-blood.png"
                alt="The Tiger Shark™"
                className="w-[127px] xl:w-[150px] group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "drop-shadow(0 0 24px rgba(160,80,255,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.85))" }}
              />
              <p className="text-center text-zinc-400 text-xs mt-2 group-hover:text-white transition-colors">The Tiger Shark™</p>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="about" className="py-24 bg-[#04111f] border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                <Music className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hybrid Voicing</h3>
              <p className="text-zinc-300 leading-relaxed">
                Great White Guitars pairs familiar guitar feel with unexpected pickup, wood, and construction combinations. The result is a custom-order instrument that feels comfortable right away, but speaks with a voice you do not usually find in that shape.
              </p>
            </div>
            <div>
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Wiring</h3>
              <p className="text-zinc-300 leading-relaxed">
                5-way switching and push-pull pots for models with coil-tapped humbuckers.
              </p>
            </div>
            <div>
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Boutique Build</h3>
              <p className="text-zinc-300 leading-relaxed">
                Designed by Great White Guitars and brought to life by Pyro Guitars, our primary manufacturing partner. Hand-finished necks, tops, and bodies, stainless steel frets, and locking tuners come standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing partnership */}
      <section className="border-t border-zinc-800/50 bg-[#030d18] py-16 px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center">
          <PartnershipAttribution />
          <p className="max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed">
            Great White Guitars creates original instrument concepts, visual identities, and designs.
            Pyro Guitars brings those designs to life through experienced craftsmanship and manufacturing.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-10 text-center text-zinc-500 bg-[#04111f]">
        <PartnershipAttribution compact />
        <p className="mt-6 text-xs">&copy; {new Date().getFullYear()} Great White Guitars. All rights reserved.</p>
      </footer>
    </div>
      )}
    </>
  );
}

export default App;
