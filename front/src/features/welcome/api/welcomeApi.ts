import {
  WELCOME_API_BASE,
  WELCOME_HEALTH_PATH,
} from "../constants/welcomeConstants";

/** 백엔드 헬스체크 (서버 컴포넌트·클라이언트 훅 모두에서 호출 가능) */
export async function fetchWelcomeHealth(): Promise<{ ok: boolean }> {
  const url = new URL(WELCOME_HEALTH_PATH, WELCOME_API_BASE).toString();
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`health ${res.status}`);
  }
  return res.json() as Promise<{ ok: boolean }>;
}
