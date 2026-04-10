/**
 * 기능(feature) 전용 상수. 여러 화면에서 쓰이면 `shared/config`로 옮길 것.
 * 백엔드 주소는 `.env.local`에 `NEXT_PUBLIC_API_URL` (예: http://localhost:4000).
 */
export const WELCOME_API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const WELCOME_HEALTH_PATH = "/health";

/** UI·로그용 식별자 예시 */
export const WELCOME_FEATURE_KEY = "welcome";
