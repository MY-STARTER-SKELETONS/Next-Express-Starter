"use client";

import { useEffect, useState } from "react";
import { fetchWelcomeHealth } from "../api/welcomeApi";

type HealthState = "loading" | "ok" | "error";

/** 마운트 시 `/health`를 한 번 조회하는 예시 훅 */
export function useWelcomeHealth(): HealthState {
  const [state, setState] = useState<HealthState>("loading");

  useEffect(() => {
    let cancelled = false;
    fetchWelcomeHealth()
      .then(() => {
        if (!cancelled) setState("ok");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
