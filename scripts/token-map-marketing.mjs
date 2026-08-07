import fs from "fs";
import path from "path";

const files = [
  "src/components/marketing/hero-ops-preview.tsx",
  "src/components/marketing/how-it-works-section.tsx",
  "src/components/marketing/ops-lanes.tsx",
  "src/components/marketing/founder-pains-section.tsx",
  "src/components/marketing/product-demo-walkthrough.tsx",
];

const map = [
  [/bg-blue-950/g, "bg-primary"],
  [/text-blue-950/g, "text-primary"],
  [/bg-blue-900/g, "bg-primary"],
  [/text-blue-900/g, "text-primary"],
  [/hover:bg-blue-800/g, "hover:bg-[var(--primary-hover)]"],
  [/bg-blue-800/g, "bg-[var(--primary-hover)]"],
  [/text-blue-800/g, "text-primary"],
  [/bg-blue-700/g, "bg-primary"],
  [/text-blue-700/g, "text-primary"],
  [/ring-blue-700/g, "ring-accent"],
  [/border-blue-300/g, "border-primary/30"],
  [/border-blue-200/g, "border-primary/20"],
  [/ring-blue-200/g, "ring-primary/20"],
  [/border-blue-100/g, "border-primary/15"],
  [/ring-blue-100/g, "ring-primary/15"],
  [/from-blue-50/g, "from-primary-soft"],
  [/bg-blue-50/g, "bg-primary-soft"],
  [/shadow-blue-900/g, "shadow-slate-900"],
  [/shadow-blue/g, "shadow-slate"],
  [/rounded-lg bg-primary-soft/g, "rounded-md bg-primary-soft"],
  [/rounded-full bg-primary /g, "rounded-md bg-primary "],
];

for (const rel of files) {
  const f = path.join(process.cwd(), rel);
  let s = fs.readFileSync(f, "utf8");
  const before = s;
  for (const [re, rep] of map) s = s.replace(re, rep);
  // Chip radius: rounded-lg status tags → rounded-md when paired with blue→primary already
  s = s.replace(/rounded-lg (px-2 py-0\.5 text-\[10px\])/g, "rounded-md $1");
  s = s.replace(/rounded-lg (bg-primary-soft)/g, "rounded-md $1");
  s = s.replace(/rounded-lg (bg-teal-50)/g, "rounded-md $1");
  if (s !== before) {
    fs.writeFileSync(f, s);
    console.log("updated", rel);
  } else {
    console.log("unchanged", rel);
  }
}
