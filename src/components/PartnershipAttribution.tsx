interface PartnershipAttributionProps {
  compact?: boolean;
}

export default function PartnershipAttribution({ compact = false }: PartnershipAttributionProps) {
  return (
    <div className={`flex flex-col items-center text-center ${compact ? "gap-3" : "gap-5"}`}>
      <p className={`${compact ? "text-[11px]" : "text-sm"} uppercase tracking-[0.22em] text-zinc-500`}>
        Designed by Great White Guitars. Built by
      </p>
      <img
        src="/pyro-logo.png"
        alt="Pyro Electric Guitars & Basses"
        className={`${compact ? "w-36" : "w-48 md:w-56"} h-auto object-contain`}
      />
    </div>
  );
}
