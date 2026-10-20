"use client";

import { useState } from "react";
import { Button, buttonClassName } from "@/components/ui/button";

type ShortlistHandoffProps = {
  jobId: string;
};

export function ShortlistHandoff({ jobId }: ShortlistHandoffProps) {
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function copyLink() {
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch(`/api/recruitment/jobs/${jobId}/share`, {
        method: "POST",
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setNotice(data.error ?? "Could not create the shortlist link.");
        return;
      }
      await navigator.clipboard.writeText(data.url);
      setNotice("Link copied. Anyone with it can read who moved forward. They cannot change it.");
    } catch {
      setNotice("Could not copy the shortlist link.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex flex-wrap gap-2">
        <a
          href={`/api/recruitment/jobs/${jobId}/export`}
          className={buttonClassName({ variant: "secondary", size: "sm" })}
        >
          Export CSV
        </a>
        <Button type="button" size="sm" onClick={() => void copyLink()} disabled={busy}>
          {busy ? "Copying…" : "Copy shortlist link"}
        </Button>
      </div>
      {notice ? <p className="max-w-sm text-xs leading-5 text-muted">{notice}</p> : null}
    </div>
  );
}
