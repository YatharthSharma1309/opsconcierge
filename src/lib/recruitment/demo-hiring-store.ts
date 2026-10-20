import type { CandidateStatus } from "@/lib/recruitment/types";

export const DEMO_HIRING_STORAGE_KEY = "opsconcierge.demoHiringStatus";

export type DemoHiringOverrides = Record<string, CandidateStatus>;

const EMPTY: DemoHiringOverrides = {};

export type DemoHiringStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export type DemoHiringStore = {
  read: () => DemoHiringOverrides;
  write: (candidateId: string, status: CandidateStatus) => void;
  subscribe: (listener: () => void) => () => void;
};

export function createDemoHiringStore(storage: DemoHiringStorage): DemoHiringStore {
  let cachedRaw: string | null | undefined;
  let cached: DemoHiringOverrides = EMPTY;
  const listeners = new Set<() => void>();

  function read(): DemoHiringOverrides {
    let raw: string | null = null;
    try {
      raw = storage.getItem(DEMO_HIRING_STORAGE_KEY);
    } catch {
      return EMPTY;
    }

    if (raw === cachedRaw) return cached;

    if (!raw) {
      cachedRaw = raw;
      cached = EMPTY;
      return cached;
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        cachedRaw = raw;
        cached = parsed as DemoHiringOverrides;
        return cached;
      }
    } catch {
      // Unreadable JSON is cleared below.
    }

    try {
      storage.removeItem(DEMO_HIRING_STORAGE_KEY);
    } catch {
      // Storage can be blocked; the in-memory snapshot stays empty.
    }

    cachedRaw = null;
    cached = EMPTY;
    return cached;
  }

  function write(candidateId: string, status: CandidateStatus) {
    const next = { ...read(), [candidateId]: status };
    const raw = JSON.stringify(next);
    storage.setItem(DEMO_HIRING_STORAGE_KEY, raw);
    cachedRaw = raw;
    cached = next;
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  return { read, write, subscribe };
}
