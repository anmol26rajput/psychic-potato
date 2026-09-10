/** The five floating primitives that orbit the hero. Drawn as inline SVG
 * rather than shipped as renders, so they stay crisp and weigh nothing. */

function Sphere({ id = "sph" }: { id?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#e6ccff" />
          <stop offset="45%" stopColor="#b07de8" />
          <stop offset="100%" stopColor="#6b3fa0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#${id})`} />
      <ellipse cx="36" cy="30" rx="14" ry="9" fill="#fff" opacity="0.35" transform="rotate(-25 36 30)" />
    </svg>
  );
}

function Pyramid({ id = "pyr" }: { id?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffb27a" />
          <stop offset="100%" stopColor="#f4762b" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2601c" />
          <stop offset="100%" stopColor="#b8420c" />
        </linearGradient>
      </defs>
      <path d="M50 6 L10 82 L50 92 Z" fill={`url(#${id}a)`} />
      <path d="M50 6 L92 74 L50 92 Z" fill={`url(#${id}b)`} />
    </svg>
  );
}

function Cylinder({ id = "cyl" }: { id?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8fc4ff" />
          <stop offset="40%" stopColor="#4f9bf0" />
          <stop offset="100%" stopColor="#2a63b8" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bcdcff" />
          <stop offset="100%" stopColor="#7cb2ee" />
        </linearGradient>
      </defs>
      <path d="M14 26 H86 V74 A36 16 0 0 1 14 74 Z" fill={`url(#${id}a)`} />
      <ellipse cx="50" cy="26" rx="36" ry="16" fill={`url(#${id}b)`} />
    </svg>
  );
}

function Cube({ id = "cub" }: { id?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe08a" />
          <stop offset="100%" stopColor="#f5bf3f" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9a92c" />
          <stop offset="100%" stopColor="#c8871a" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d69420" />
          <stop offset="100%" stopColor="#a96c12" />
        </linearGradient>
      </defs>
      <path d="M50 8 L90 30 L50 52 L10 30 Z" fill={`url(#${id}a)`} />
      <path d="M10 30 L50 52 L50 94 L10 72 Z" fill={`url(#${id}b)`} />
      <path d="M90 30 L50 52 L50 94 L90 72 Z" fill={`url(#${id}c)`} />
    </svg>
  );
}

function Squircle({ id = "sqr" }: { id?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`${id}a`} x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#d8f08a" />
          <stop offset="55%" stopColor="#a6cf3f" />
          <stop offset="100%" stopColor="#6f9c1c" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="84" height="84" rx="22" fill={`url(#${id}a)`} />
      <ellipse cx="36" cy="30" rx="16" ry="10" fill="#fff" opacity="0.3" transform="rotate(-22 36 30)" />
    </svg>
  );
}

function Star({ id = "str" }: { id?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id={`${id}a`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#d8f3ff" />
          <stop offset="50%" stopColor="#8fd4ea" />
          <stop offset="100%" stopColor="#5aa8c4" />
        </linearGradient>
      </defs>
      {/* Rounded five-point star — the template's puffy 3D version. */}
      <path
        d="M50 6 C55 6 57 10 59 16 L65 33 C67 38 69 40 74 41 L92 44 C98 45 100 50 96 54 L83 67 C79 71 78 74 79 79 L82 96 C83 102 79 105 74 102 L58 94 C53 91 47 91 42 94 L26 102 C21 105 17 102 18 96 L21 79 C22 74 21 71 17 67 L4 54 C0 50 2 45 8 44 L26 41 C31 40 33 38 35 33 L41 16 C43 10 45 6 50 6 Z"
        fill={`url(#${id}a)`}
      />
      <ellipse cx="38" cy="34" rx="11" ry="7" fill="#fff" opacity="0.35" transform="rotate(-25 38 34)" />
    </svg>
  );
}

const primitives = [Pyramid, Star, Sphere, Squircle, Cylinder, Cube];

/** One primitive per list index, cycling. `idPrefix` keeps the SVG gradient
 * ids unique when the same primitive is used in more than one section. */
export function ShapeByIndex({
  index,
  idPrefix = "svc",
}: {
  index: number;
  idPrefix?: string;
}) {
  const Shape = primitives[index % primitives.length];
  return <Shape id={`${idPrefix}-${index}`} />;
}

type Placement = {
  Shape: (p: { id?: string }) => React.ReactElement;
  id: string;
  /** Tailwind position + size classes. */
  cls: string;
  rotate: string;
  duration: string;
  delay: string;
};

/* Positions traced off the reference hero at 1280x900: two columns at ~19%
   and ~71%, three rows at ~19%, ~42% and ~65%, shapes ~140px across. */
const placements: Placement[] = [
  {
    Shape: Pyramid,
    id: "p1",
    cls: "left-[16%] top-[17%] w-[76px] lg:w-[112px] xl:w-[144px]",
    rotate: "-12deg",
    duration: "9s",
    delay: "0s",
  },
  {
    Shape: Star,
    id: "t1",
    cls: "right-[16%] top-[16%] w-[76px] lg:w-[112px] xl:w-[144px]",
    rotate: "10deg",
    duration: "11.5s",
    delay: "-1.5s",
  },
  {
    Shape: Sphere,
    id: "s1",
    cls: "left-[11%] top-[41%] w-[72px] lg:w-[104px] xl:w-[136px]",
    rotate: "0deg",
    duration: "11s",
    delay: "-2s",
  },
  {
    Shape: Squircle,
    id: "q1",
    cls: "right-[12%] top-[43%] w-[66px] lg:w-[96px] xl:w-[124px]",
    rotate: "14deg",
    duration: "12s",
    delay: "-1s",
  },
  {
    Shape: Cylinder,
    id: "c1",
    cls: "left-[15%] top-[63%] w-[74px] lg:w-[108px] xl:w-[140px]",
    rotate: "8deg",
    duration: "10s",
    delay: "-4s",
  },
  {
    Shape: Cube,
    id: "b1",
    cls: "right-[16%] top-[64%] w-[72px] lg:w-[104px] xl:w-[136px]",
    rotate: "-8deg",
    duration: "10.5s",
    delay: "-3s",
  },
];

export default function Shapes() {
  return (
    // Sits above the wordmark, as in the reference. The stage is capped and
    // centred so the shapes stay in orbit around the content instead of
    // drifting to the bezels on an ultrawide monitor. Hidden on phones, where
    // they would land on the headline.
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-full max-w-[1180px] -translate-x-1/2 md:block xl:max-w-[1320px]"
      aria-hidden
    >
      {placements.map(({ Shape, id, cls, rotate, duration, delay }) => (
        <div
          key={id}
          className={`floaty absolute ${cls}`}
          style={
            {
              "--r": rotate,
              "--float-duration": duration,
              "--float-delay": delay,
              filter: "drop-shadow(0 24px 32px rgba(16,16,16,0.14))",
            } as React.CSSProperties
          }
        >
          <Shape id={id} />
        </div>
      ))}
    </div>
  );
}
