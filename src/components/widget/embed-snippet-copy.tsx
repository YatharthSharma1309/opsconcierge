"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";

type EmbedSnippetCopyProps = {
  label: string;
  text: string;
};

export function EmbedSnippetCopy({ label, text }: EmbedSnippetCopyProps) {
  const [message, setMessage] = useState<string | null>(null);

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied!");
      window.setTimeout(() => setMessage(null), 2000);
    } catch {
      setMessage("Copy failed — select the snippet manually.");
    }
  }

  return (
    <div className="mt-3 flex items-center gap-2">
      <button type="button" onClick={copySnippet} className={buttonClassName({ variant: "secondary", size: "sm" })}>
        <Copy className="h-3.5 w-3.5" />
        {label}
      </button>
      {message ? <span className="text-xs text-emerald-700">{message}</span> : null}
    </div>
  );
}
