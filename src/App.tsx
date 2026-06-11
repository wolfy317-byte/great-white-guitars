import { Button } from "@/components/ui/button";
import { ArrowRight, Music, Zap, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import LaunchPage from "@/components/LaunchPage";
import ModelPage from "@/components/ModelPage";
import TigerSharkPage from "@/components/TigerSharkPage";

const TRANSITION_VIDEO_ID = "1200303032";
const TRANSITION_VIDEO_SRC = `https://player.vimeo.com/video/${TRANSITION_VIDEO_ID}?autoplay=1&loop=0&title=0&byline=0&portrait=0&controls=0&dnt=1`;

function VideoTransition({ destination, onComplete }: { destination: "meg" | "tiger-shark"; onComplete: () => void }) {
  const [visible, setVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const completed = useRef(false);

  const finish = () => {
    if (completed.current) return;
    completed.current = true;
    onComplete();
  };

  const beginFadeOut = () => {
    setFadingOut(true);
    setTimeout(finish, 500); // wait for fade-out transition then navigate
  };

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 50);

    // postMessage from Vimeo player — fires {event:"finish"} when done
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.event === "finish") beginFadeOut();
      } catch {}
    };
    window.addEventListener("message", handleMessage);

    // Fallback: video is ~2s, start fade-out at 2.2s
    const fallback = setTimeout(beginFadeOut, 2200);

    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fallback);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{ zIndex: 200, opacity: visible && !fadingOut ? 1 : 0, transition: visible ? "opacity 0.5s ease" : "opacity 0.6s ease", overflow: "hidden" }}
    >
      <iframe
        src={TRANSITION_VIDEO_SRC}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        frameBorder={0}
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          border: "none",
          pointerEvents: "none",
        }}
        title="Transition video"
      />
      {/* Transparent overlay — blocks any residual pointer events */}
      <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "all", background: "transparent" }} />
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
  const [page, setPage] = useState<"launch" | "site" | "meg" | "tiger-shark">("launch");
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

  return (
    <>
      {transitioning && (
        <VideoTransition destination={transitioning} onComplete={handleTransitionComplete} />
      )}
      {page === "launch" && <LaunchPage onEnterSite={() => setPage("site")} />}
      {page === "meg" && <ModelPage onBack={() => setPage("site")} />}
      {page === "tiger-shark" && <TigerSharkPage onBack={() => setPage("site")} />}
      {page === "site" && (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800" style={{ position: "relative" }}>
      {/* Fixed video background */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0, pointerEvents: "none" }}>
        <iframe
          src="https://www.youtube.com/embed/1tVD2iwX2bc?autoplay=1&mute=1&loop=1&playlist=1tVD2iwX2bc&controls=0&rel=0&playsinline=1&iv_load_policy=3&modestbranding=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder={0}
          className="absolute"
          style={{ top: "-5%", left: "-5%", width: "110%", height: "115%", border: "none", pointerEvents: "none" }}
          title="Site background video"
        />
        {/* CSS overlay — blocks all pointer events reaching the iframe */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "all", background: "transparent" }} />
      </div>
      {/* Fixed dark overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: "linear-gradient(to bottom, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.45) 40%, rgba(9,9,11,0.85) 75%, rgba(9,9,11,1.0) 100%)" }} />
      {/* Navigation */}
      <nav className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0" style={{ zIndex: 50 }}>
        <div className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Great White Guitars" className="h-24 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#models" className="hover:text-white transition-colors">Models</a>
            <a href="#about" className="hover:text-white transition-colors">The Hybrid Concept</a>
            <a href="#custom" className="hover:text-white transition-colors">Custom Shop</a>
          </div>
          <Button variant="outline" className="hidden md:flex border-zinc-700 hover:bg-zinc-800 hover:text-white text-zinc-300">
            Build Yours
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <style>{`
        @keyframes gwg-float-left {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50%       { transform: translateY(-18px) rotate(-4deg); }
        }
        @keyframes gwg-float-right {
          0%, 100% { transform: translateY(0px) rotate(4deg); }
          50%       { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes yt-cover {
          0%   { opacity: 1; }
          8%   { opacity: 0; }
          97%  { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
      <section className="relative overflow-hidden" style={{ zIndex: 10, minHeight: "92vh", display: "flex", alignItems: "center" }}>
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
                className="w-[110px] xl:w-[130px] group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "drop-shadow(0 0 24px rgba(80,160,255,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.85))" }}
              />
              <p className="text-center text-zinc-500 text-xs mt-2 group-hover:text-white transition-colors">The Meg™</p>
            </div>

            {/* Center — Text */}
            <div className="text-center flex flex-col items-center px-0 md:px-40 xl:px-48">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
                Familiar shapes.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">
                  Unexpected voices.
                </span>
              </h1>
              <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-xl">
                We build hybrid guitars that break tradition. Experience the ergonomic comfort of a classic singlecut, powered by the crystalline chime of an SSS pickup configuration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => handleModelClick("meg")} className="bg-white text-zinc-950 hover:bg-zinc-200 h-14 px-8 text-base">
                  Explore The Meg™
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleModelClick("tiger-shark")} className="border-zinc-800 hover:bg-zinc-900 h-14 px-8 text-base bg-transparent text-zinc-300">
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
                className="w-[110px] xl:w-[130px] group-hover:scale-105 transition-transform duration-500"
                style={{ filter: "drop-shadow(0 0 24px rgba(160,80,255,0.2)) drop-shadow(0 10px 30px rgba(0,0,0,0.85))" }}
              />
              <p className="text-center text-zinc-500 text-xs mt-2 group-hover:text-white transition-colors">The Tiger Shark™</p>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="about" className="py-24 bg-zinc-950 border-y border-zinc-800/50" style={{ position: "relative", zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                <Music className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Hybrid Voicing</h3>
              <p className="text-zinc-400 leading-relaxed">
                Great White Guitars pairs familiar guitar feel with unexpected pickup, wood, and construction combinations. The result is a custom-order instrument that feels comfortable right away, but speaks with a voice you do not usually find in that shape.
              </p>
            </div>
            <div>
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Modern Wiring</h3>
              <p className="text-zinc-400 leading-relaxed">
                5-way switching and push-pull pots for models with coil-tapped humbuckers.
              </p>
            </div>
            <div>
              <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Boutique Build</h3>
              <p className="text-zinc-400 leading-relaxed">
                Hand-finished necks, tops, and bodies, stainless steel frets, and locking tuners come standard on every Great White instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12 text-center text-zinc-500 bg-zinc-950" style={{ position: "relative", zIndex: 10 }}>
        <p>&copy; {new Date().getFullYear()} Great White Guitars. All rights reserved.</p>
      </footer>
    </div>
      )}
    </>
  );
}

export default App;
