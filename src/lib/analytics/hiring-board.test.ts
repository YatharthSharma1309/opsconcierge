import { describe, expect, it } from "vitest";
import { buildHiringBoard } from "@/lib/analytics/hiring-board";

const now = new Date("2026-10-19T00:00:00.000Z");

describe("buildHiringBoard", () => {
  it("counts stages, score bands, and the funnel from real candidates", () => {
    const board = buildHiringBoard(
      [
        {
          displayName: "Alex Rivera",
          status: "shortlisted",
          createdAt: "2026-10-01T00:00:00.000Z",
          jobTitle: "Support engineer",
          score: 88,
        },
        {
          displayName: "Jordan Lee",
          status: "interviewing",
          createdAt: "2026-09-01T00:00:00.000Z",
          jobTitle: "Support engineer",
          score: 72,
        },
        {
          displayName: "Sam Patel",
          status: "new",
          createdAt: "2026-08-01T00:00:00.000Z",
          jobTitle: "Support engineer",
          score: 54,
        },
        {
          displayName: "Morgan Chen",
          status: "rejected",
          createdAt: "2026-10-10T00:00:00.000Z",
          jobTitle: "Support engineer",
          score: 38,
        },
        {
          displayName: "Archived Person",
          status: "archived",
          createdAt: "2026-10-10T00:00:00.000Z",
          jobTitle: "Support engineer",
          score: 10,
        },
      ],
      now,
    );

    expect(board.received).toBe(4);
    expect(board.hired).toBe(0);
    expect(board.interviewing).toBe(1);
    expect(board.shortlisted).toBe(1);
    expect(board.notMoving).toBe(1);
    expect(board.addedLast30Days).toBe(2);
    expect(board.averageAlignment).toBe(63);
    expect(board.bands.map((band) => band.count)).toEqual([1, 1, 1, 1]);
    expect(board.funnel.map((step) => step.count)).toEqual([4, 4, 2, 1, 0]);
    expect(board.note).toContain("Alex Rivera");
    expect(board.note).toContain("88%");
  });

  it("stays empty without inventing a score", () => {
    const board = buildHiringBoard([], now);
    expect(board.averageAlignment).toBeNull();
    expect(board.received).toBe(0);
    expect(board.note).toMatch(/after a resume/i);
  });
});
