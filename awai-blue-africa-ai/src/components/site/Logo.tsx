import { Link } from "@tanstack/react-router";
import { LogoIcon } from "./LogoIcon";

export const AWAI_MISSION_SHORT =
  "AI-powered waste intelligence for Africa's climate and environmental solutions.";

export const AWAI_MISSION =
  "We use artificial intelligence to classify waste from images, surface environmental data, and help communities and partners act on Africa's climate crisis — turning pollution insight into real solutions for cleaner land, water, and air.";

type LogoProps = {
  light?: boolean;
  showTagline?: boolean;
  /** When true, wraps logo + text in a link to home */
  clickable?: boolean;
  className?: string;
};

function LogoContent({ light = false, showTagline = false }: Omit<LogoProps, "clickable" | "className">) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <LogoIcon size={36} className="shrink-0 drop-shadow-md" />
      <div className="flex flex-col leading-tight min-w-0">
        <span
          className={`font-display font-extrabold text-lg tracking-tight whitespace-nowrap ${
            light ? "text-white" : "text-ocean"
          }`}
        >
          AWAI <span className="text-teal-brand">Blue</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 hidden lg:block text-[11px] font-normal leading-snug max-w-[240px] ${
              light ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            {AWAI_MISSION_SHORT}
          </span>
        )}
      </div>
    </div>
  );
}

export function Logo({ light = false, showTagline = false, clickable = false, className = "" }: LogoProps) {
  if (clickable) {
    return (
      <Link
        to="/"
        className={`group rounded-xl outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[var(--teal-brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
        aria-label="AWAI Blue — Home"
      >
        <LogoContent light={light} showTagline={showTagline} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <LogoContent light={light} showTagline={showTagline} />
    </div>
  );
}
