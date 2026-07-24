interface Props {
  deferCuration: boolean;
  wineLean: string;
  noSparkling: boolean;
  investmentBottle: boolean;
  seed?: number;
}

type BottleKind = "red" | "white" | "sparkling" | "gold" | "mystery";

function buildCase(p: Props): BottleKind[] {
  if (p.deferCuration) {
    const bottles: BottleKind[] = Array(12).fill("mystery");
    if (p.investmentBottle) bottles[11] = "gold";
    return bottles;
  }

  let reds = 6;
  let whites = 6;
  if (p.wineLean === "red") {
    reds = 9;
    whites = 3;
  } else if (p.wineLean === "white") {
    reds = 3;
    whites = 9;
  }

  const bottles: BottleKind[] = [
    ...Array(reds).fill("red" as BottleKind),
    ...Array(whites).fill("white" as BottleKind),
  ];

  if (!p.noSparkling) {
    bottles[bottles.length - 1] = "sparkling";
  }
  if (p.investmentBottle) {
    bottles[bottles.length - (p.noSparkling ? 1 : 2)] = "gold";
  }
  return bottles;
}

function wobble(seed: number, i: number): number {
  const x = Math.sin(seed * 374761 + i * 668265) * 43758.5453;
  return ((x - Math.floor(x)) * 4.8 - 2.4);
}

const FILLS: Record<BottleKind, string> = {
  red: "#a3302b",
  white: "#ddc98f",
  sparkling: "#ddc98f",
  gold: "#c9a227",
  mystery: "#b5aca2",
};

export default function CaseRack(props: Props) {
  const bottles = buildCase(props);
  const seed = props.seed ?? 7;

  return (
    <svg
      width="100%"
      viewBox="0 0 680 180"
      role="img"
      aria-label="Your twelve-bottle case"
    >
      <g transform="translate(34,20)">
        {bottles.map((kind, i) => {
          const tilt = wobble(seed, i);
          const w = 16 + ((seed + i) % 3);
          const bodyY = 32 + ((seed * (i + 3)) % 5);
          const fill = FILLS[kind];
          return (
            <g
              key={i}
              transform={`translate(${i * 51},0) rotate(${tilt.toFixed(1)} 20 80)`}
            >
              <rect x="12" y={bodyY} width={w} height={110 - bodyY} rx="6" fill={fill} />
              <rect x={12 + w / 2 - 3.5} y={bodyY - 20} width="7" height="24" rx="2.5" fill={fill} />
              {kind === "sparkling" && (
                <>
                  <circle cx="18" cy={bodyY + 18} r="1.8" fill="#fff" opacity="0.85" />
                  <circle cx="23" cy={bodyY + 29} r="1.4" fill="#fff" opacity="0.85" />
                  <circle cx="19" cy={bodyY + 42} r="1.8" fill="#fff" opacity="0.85" />
                  <circle cx="24" cy={bodyY + 54} r="1.4" fill="#fff" opacity="0.85" />
                  <circle cx="20" cy={bodyY + 65} r="1.6" fill="#fff" opacity="0.85" />
                </>
              )}
              {kind === "gold" && (
                <>
                  <rect x={12 + w + 1} y={bodyY + 4} width="15" height="12" rx="2" fill="#f6f2ea" stroke="#c9a227" strokeWidth="1" />
                  <text
                    x={12 + w + 8.5}
                    y={bodyY + 13.5}
                    textAnchor="middle"
                    style={{ fontFamily: "Verdana", fontSize: "9px", fill: "#c9a227", fontWeight: "bold" }}
                  >
                    $
                  </text>
                </>
              )}
              {kind === "mystery" && (
                <text
                  x={12 + w / 2}
                  y={bodyY + 45}
                  textAnchor="middle"
                  style={{ fontFamily: "Verdana", fontSize: "14px", fill: "#f6f2ea", fontWeight: "bold" }}
                >
                  ?
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}