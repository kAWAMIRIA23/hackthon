import { useId } from "react";

type LogoIconProps = {
  size?: number;
  className?: string;
};

/** AWAI Blue brand mark — water droplet, AI scan arcs, sustainability accent */
export function LogoIcon({ size = 36, className = "" }: LogoIconProps) {
  const uid = useId().replace(/:/g, "");
  const bgId = `awai-bg-${uid}`;
  const dropId = `awai-drop-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={bgId} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0A2342" />
          <stop offset="1" stopColor="#0E9AA7" />
        </linearGradient>
        <linearGradient id={dropId} x1="32" y1="16" x2="32" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#B8F0F4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${bgId})`} />
      <path
        d="M32 18c-6.5 0-11.5 5.2-11.5 11.8 0 7.8 11.5 16.2 11.5 16.2s11.5-8.4 11.5-16.2C43.5 23.2 38.5 18 32 18z"
        fill={`url(#${dropId})`}
      />
      <path
        d="M32 22.5c3.8 0 6.8 3.1 6.8 6.9 0 4.6-6.8 9.8-6.8 9.8s-6.8-5.2-6.8-9.8c0-3.8 3-6.9 6.8-6.9z"
        fill="#0E9AA7"
        opacity="0.35"
      />
      <circle cx="32" cy="29" r="2.2" fill="#4CAF50" />
      <path
        d="M46 24a10 10 0 0 1 0 16"
        stroke="#7FE8F0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M18 24a10 10 0 0 0 0 16"
        stroke="#7FE8F0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M24 46h16" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
