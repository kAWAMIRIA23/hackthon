import { Droplet, Leaf } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-[var(--teal-brand)] to-[var(--ocean)] flex items-center justify-center shadow-md">
        <Droplet className="h-5 w-5 text-white absolute" strokeWidth={2.5} />
        <Leaf className="h-3 w-3 text-[var(--earth-green)] absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5" strokeWidth={3} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-extrabold text-lg tracking-tight ${light ? "text-white" : "text-ocean"}`}>
          AWAI <span className="text-teal-brand">Blue</span>
        </span>
      </div>
    </div>
  );
}