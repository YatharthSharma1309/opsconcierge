import { describe, expect, it } from "vitest";
import { csvCell, shortlistCsv, type ShortlistCsvRow } from "@/lib/recruitment/shortlist";

describe("shortlistCsv", () => {
  it("quotes commas and keeps the client, evidence, and gaps", () => {
    const row: ShortlistCsvRow = {
      clientName: "Harbor & Co.",
      jobTitle: "Full-Stack Engineer",
      name: "Maya Chen",
      status: "Shortlisted",
      score: 91,
      summary: 'Quotes "React" and AWS.',
      evidence: "React: Built the customer portal",
      gaps: "Team leadership",
      fileName: "maya-chen.pdf",
    };

    const csv = shortlistCsv([row]);

    expect(csv.startsWith("\uFEFFClient,Job,Name,Status")).toBe(true);
    expect(csv).toContain('"Quotes ""React"" and AWS."');
    expect(csv).toContain("Harbor & Co.,Full-Stack Engineer,Maya Chen,Shortlisted,91");
    expect(csvCell("a,b")).toBe('"a,b"');
  });
});
