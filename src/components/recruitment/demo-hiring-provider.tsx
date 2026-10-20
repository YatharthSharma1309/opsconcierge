"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import {
  createDemoHiringStore,
  type DemoHiringOverrides,
  type DemoHiringStore,
} from "@/lib/recruitment/demo-hiring-store";
import type { CandidateStatus } from "@/lib/recruitment/types";

const SERVER_OVERRIDES: DemoHiringOverrides = {};

type DemoHiringContextValue = {
  statusFor: (candidateId: string, fallback: CandidateStatus) => CandidateStatus;
  setStatus: (candidateId: string, status: CandidateStatus) => void;
};

const DemoHiringContext = createContext<DemoHiringContextValue | null>(null);

let browserStore: DemoHiringStore | null = null;

function getBrowserStore() {
  if (!browserStore) {
    browserStore = createDemoHiringStore(window.sessionStorage);
  }
  return browserStore;
}

function subscribe(onStoreChange: () => void) {
  return getBrowserStore().subscribe(onStoreChange);
}

function getSnapshot() {
  return getBrowserStore().read();
}

export function DemoHiringProvider({ children }: { children: React.ReactNode }) {
  const overrides = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_OVERRIDES);

  const setStatus = useCallback((candidateId: string, status: CandidateStatus) => {
    getBrowserStore().write(candidateId, status);
  }, []);

  const statusFor = useCallback(
    (candidateId: string, fallback: CandidateStatus) => overrides[candidateId] ?? fallback,
    [overrides],
  );

  return (
    <DemoHiringContext.Provider value={{ statusFor, setStatus }}>
      {children}
    </DemoHiringContext.Provider>
  );
}

export function useDemoHiring() {
  const value = useContext(DemoHiringContext);
  if (!value) {
    throw new Error("useDemoHiring must be used inside DemoHiringProvider");
  }
  return value;
}
