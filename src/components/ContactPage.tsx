import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnershipAttribution from "@/components/PartnershipAttribution";

interface ContactPageProps {
  onBack: () => void;
}

const CONTACT_EMAIL = "Bruce@greatwhiteguitars.com";

export default function ContactPage({ onBack }: ContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Custom guitar inquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`${projectType} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject: ${projectType}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#04111f] text-zinc-50">
      <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-[#04111f]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} aria-label="Back to Great White Guitars">
            <img src="/logo.png" alt="Great White Guitars" className="h-12 w-auto" />
          </button>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-20 items-start">
          <section>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-5">Start a conversation</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Build something uncommon.</h1>
            <p className="text-lg text-zinc-300 leading-relaxed mb-10">
              Tell us what you play, what you hear, and what you want your instrument to become.
              We will follow up to discuss the model, configuration, materials, finish, and next steps.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="h-11 w-11 rounded-full bg-zinc-800 flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-widest text-zinc-500 mb-1">Email</span>
                {CONTACT_EMAIL}
              </span>
            </a>
          </section>

          <form onSubmit={handleSubmit} className="rounded-xl border border-zinc-800 bg-zinc-950/35 p-6 md:p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <label className="block text-sm text-zinc-300">
                Name
                <input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 w-full rounded-md border border-zinc-700 bg-[#071522] px-4 py-3 text-white outline-none transition focus:border-zinc-400"
                />
              </label>
              <label className="block text-sm text-zinc-300">
                Email
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-md border border-zinc-700 bg-[#071522] px-4 py-3 text-white outline-none transition focus:border-zinc-400"
                />
              </label>
            </div>

            <label className="block mt-6 text-sm text-zinc-300">
              What can we help you with?
              <select
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
                className="mt-2 w-full rounded-md border border-zinc-700 bg-[#071522] px-4 py-3 text-white outline-none transition focus:border-zinc-400"
              >
                <option>Custom guitar inquiry</option>
                <option>The Meg inquiry</option>
                <option>Tiger Shark inquiry</option>
                <option>General question</option>
              </select>
            </label>

            <label className="block mt-6 text-sm text-zinc-300">
              Tell us about your idea
              <textarea
                required
                rows={7}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Model, finish, pickup configuration, playing style, or anything else you have in mind..."
                className="mt-2 w-full resize-y rounded-md border border-zinc-700 bg-[#071522] px-4 py-3 text-white placeholder:text-zinc-600 outline-none transition focus:border-zinc-400"
              />
            </label>

            <Button type="submit" size="lg" className="mt-7 h-14 w-full bg-zinc-100 text-zinc-950 hover:bg-white">
              Continue in your email app
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-zinc-600 text-center">
              Your email application will open with these details ready to send.
            </p>
          </form>
        </div>
      </main>

      <footer className="border-t border-zinc-800/50 py-10 text-center text-zinc-600 text-xs">
        <PartnershipAttribution compact />
        <p className="mt-6">&copy; {new Date().getFullYear()} Great White Guitars. All rights reserved.</p>
      </footer>
    </div>
  );
}
