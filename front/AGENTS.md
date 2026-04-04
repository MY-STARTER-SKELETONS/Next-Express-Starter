<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 프론트엔드 에이전트 가이드

Next.js(App Router) + TypeScript + Tailwind. 상세 구조·실행은 `front/README.md`를 본다.

## 구조 요약

- `src/app/`: 라우트 전용. `page.tsx` / `layout.tsx`만 두고, 화면 본문은 `@/pages/...`에서 import.
- `src/pages/<화면>/`: 화면 조립. PascalCase 페이지 컴포넌트(예: `HomePage.tsx`).
- `src/features/<기능>/`: `api/`, `constants/`, `hooks/`, `ui/`, 루트 `index.ts`로 export 정리.
- `src/shared/`: 여러 기능 공용 `ui/`, `lib/`, `config/`만.

## 반드시 지킬 것

- **라우트 vs 화면**: 새 URL은 `app/<경로>/page.tsx`를 추가하고, UI 조립은 `pages/<화면>/`에 둔다.
- **기능 경계**: 기능 전용 로직·UI는 `features`; 여러 화면이 쓰는 것만 `shared`로 승격.
- **export**: 기능 바깥으로보낼 것은 해당 `features/<기능>/index.ts`에서만 정리.
- **클라이언트**: 상호작용·브라우저 API가 필요할 때만 파일 상단에 `"use client"`.
- **경로**: `@/...` 별칭 (`tsconfig`의 `@/*` → `./src/*`).
- **스타일**: 기본은 Tailwind 유틸 + 필요 시 `cn()`. 정적 모양은 인라인 `style`로 두지 않는다(런타임 측정값 등 예외만).

## 네이밍 (요약)

- 화면·기능 폴더: 소문자 한 단어 또는 kebab-case (`home`, `user-settings`).
- `.tsx` 컴포넌트 파일: PascalCase. App Router 진입 파일만 프레임워크 규약(`page.tsx`, `layout.tsx` 등).
- `.ts` 모듈: kebab-case (`welcome-api.ts`, `use-welcome-health.ts`).
- 훅: 이름은 `useXxx`, 파일명은 kebab-case. 타입·인터페이스는 PascalCase, 값은 camelCase.

## 환경 변수

`.env.example`을 참고해 `.env.local`을 만든다. 브라우저 노출은 `NEXT_PUBLIC_*`만.

자세한 규칙은 `front/README.md`의 컨벤션 절을 따른다.
