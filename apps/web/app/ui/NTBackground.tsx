"use client";

import Novatrix from "@/components/eldoraui/novatrix-background";

// when i see my design skills everytime im prayinf for ai slop designs!!

export function NTBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-0 h-200 overflow-hidden"
    >
      <Novatrix
        color={[0.18, 0.72, 1]}
        amplitude={0.08}
        mouseReact={false}
        speed={0.75}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 52%, var(--background) 100%)",
        }}
      />
    </div>
  );
}
