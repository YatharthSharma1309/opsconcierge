import fs from "fs";
import path from "path";

const roots = [
  "src/components/chat",
  "src/components/widget",
  "src/components/tickets",
  "src/components/execution",
  "src/components/recruitment",
  "src/components/dashboard",
];

const files = [];
function walk(p) {
  if (!fs.existsSync(p)) return;
  const st = fs.statSync(p);
  if (st.isFile() && /\.(tsx|ts)$/.test(p)) files.push(p);
  else if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
  }
}
for (const r of roots) walk(path.join(process.cwd(), r));

const map = [
  [/indigo-950/g, "slate-900"],
  [/indigo-900/g, "blue-950"],
  [/indigo-800/g, "blue-900"],
  [/indigo-700/g, "blue-900"],
  [/indigo-600/g, "blue-900"],
  [/indigo-500/g, "blue-800"],
  [/indigo-400/g, "blue-700"],
  [/indigo-300/g, "blue-300"],
  [/indigo-200/g, "blue-200"],
  [/indigo-100/g, "blue-100"],
  [/indigo-50/g, "blue-50"],
  [/violet-700/g, "slate-700"],
  [/violet-600/g, "slate-600"],
  [/violet-500/g, "slate-500"],
  [/violet-50/g, "slate-50"],
  [/shadow-indigo/g, "shadow-slate"],
  [/ring-indigo/g, "ring-blue"],
  [/border-indigo/g, "border-blue"],
  [/text-indigo/g, "text-blue"],
  [/bg-indigo/g, "bg-blue"],
  [/from-indigo/g, "from-blue"],
  [/via-violet/g, "via-slate"],
  [/to-cyan/g, "to-teal"],
  [/hover:text-indigo/g, "hover:text-blue"],
  [/hover:bg-indigo/g, "hover:bg-blue"],
  [/hover:border-indigo/g, "hover:border-blue"],
  [/group-hover:text-indigo/g, "group-hover:text-blue"],
  [/focus:ring-indigo/g, "focus:ring-teal"],
];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  const before = s;
  for (const [re, rep] of map) s = s.replace(re, rep);
  if (s !== before) {
    fs.writeFileSync(f, s);
    console.log("updated", path.relative(process.cwd(), f));
  }
}
