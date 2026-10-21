import { describe, expect, it } from "vitest";
import { rankChunksByKeywords } from "./retrieve";

const faq = {
  id: "chunk-1",
  documentId: "doc-1",
  documentTitle: "support-faq",
  content:
    "Customers can request a full refund within 14 days of purchase. After 14 days, refunds are reviewed case by case. We accept Visa and PayPal.",
};

describe("rankChunksByKeywords", () => {
  it("keeps a chunk when the question uses words from the document", () => {
    const ranked = rankChunksByKeywords("What is the refund policy?", [faq]);
    expect(ranked).toHaveLength(1);
    expect(ranked[0]?.documentTitle).toBe("support-faq");
  });

  it("drops the only chunk when the overlap is just common words", () => {
    const ranked = rankChunksByKeywords(
      "What is your Austin office street address?",
      [faq],
    );
    expect(ranked).toHaveLength(0);
  });
});
