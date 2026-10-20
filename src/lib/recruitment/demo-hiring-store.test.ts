import { describe, expect, it } from "vitest";
import {
  createDemoHiringStore,
  DEMO_HIRING_STORAGE_KEY,
} from "./demo-hiring-store";

function memoryStorage() {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };
}

describe("demo hiring store", () => {
  it("returns the same empty snapshot until a status is saved", () => {
    const store = createDemoHiringStore(memoryStorage());
    const first = store.read();
    expect(first).toEqual({});
    expect(store.read()).toBe(first);
  });

  it("saves a status and notifies subscribers", () => {
    const storage = memoryStorage();
    const store = createDemoHiringStore(storage);
    let calls = 0;
    store.subscribe(() => {
      calls += 1;
    });

    store.write("maya-chen", "shortlisted");

    expect(store.read()["maya-chen"]).toBe("shortlisted");
    expect(store.read()).toBe(store.read());
    expect(calls).toBe(1);
    expect(storage.data.get(DEMO_HIRING_STORAGE_KEY)).toContain("shortlisted");
  });

  it("drops unreadable storage instead of throwing", () => {
    const storage = memoryStorage();
    storage.setItem(DEMO_HIRING_STORAGE_KEY, "{");
    const store = createDemoHiringStore(storage);

    expect(store.read()).toEqual({});
    expect(storage.data.has(DEMO_HIRING_STORAGE_KEY)).toBe(false);
  });
});
