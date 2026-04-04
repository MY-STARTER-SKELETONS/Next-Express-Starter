"use client";

import { WELCOME_FEATURE_KEY } from "../constants/welcome.constants";
import { useWelcomeHealth } from "../hooks/use-welcome-health";

export function WelcomeStatus() {
  const state = useWelcomeHealth();

  const message =
    state === "loading"
      ? "백엔드 연결 확인 중…"
      : state === "ok"
        ? "백엔드 /health 응답"
        : "백엔드에 연결하지 못함 (서버·CORS·NEXT_PUBLIC_API_URL 확인)";

  return (
    <p
      className="text-xs text-zinc-500 dark:text-zinc-400"
      data-feature={WELCOME_FEATURE_KEY}
    >
      {message}{" "}
      <span className="font-mono text-zinc-400">[{state}]</span>
    </p>
  );
}
