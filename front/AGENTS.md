<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 프론트엔드 에이전트 가이드

Next.js(App Router) + TypeScript + Tailwind입니다. 상세 구조·실행 방법은 `front/README.md`를 참고합니다.

**모듈**: `package.json`의 `"type": "module"` 기준으로 패키지는 ESM입니다. 소스에는 `import`/`export`를 쓰며, 타입만 가져올 때는 `import type`을 씁니다. **직접 추가하는 파일은 `.ts` / `.tsx` / `.mts`만 쓰고, `.js` / `.mjs`는 쓰지 않습니다**(설정도 `*.mts`입니다). 예외는 생성물·의존성뿐입니다.

## 구조 요약

- `src/app/`: 라우트 전용입니다. `page.tsx` / `layout.tsx`만 두고, 화면 본문은 `@/views/...`에서 가져옵니다.
- `src/views/<화면>/`: 화면 조립입니다. PascalCase 컴포넌트·파일명은 **`View`로 끝냅니다**(예: `HomeView.tsx`). (`src/pages`는 Next Pages Router 예약 경로이므로 쓰지 않습니다.)
- `src/features/<기능>/`: `api/`, `constants/`, `hooks/`, `ui/`, 루트 `index.ts`로 export를 정리합니다.
- `src/shared/`: 여러 기능이 공용으로 쓰는 `ui/`, `lib/`, `config/`만 둡니다.

## 반드시 지킬 것

- **라우트 vs 화면**: 새 URL은 `app/<경로>/page.tsx`를 추가하고, UI 조립은 `views/<화면>/`에 둡니다.
- **기능 경계**: 기능 전용 로직·UI는 `features`에 두고, 여러 화면이 쓰는 것만 `shared`로 승격합니다.
- **export**: 기능 바깥으로보낼 것은 해당 `features/<기능>/index.ts`에서만 정리합니다.
- **클라이언트**: 상호작용·브라우저 API가 필요할 때만 파일 상단에 `"use client"`를 둡니다.
- **경로**: `@/...` 별칭을 씁니다(`tsconfig`의 `@/*` → `./src/*`).
- **스타일**: 기본은 Tailwind 유틸이며, 필요 시 `cn()`을 씁니다. 정적 모양은 인라인 `style`로 두지 않습니다(런타임 측정값 등 예외만 허용합니다).

## 네이밍 (요약)

- 화면·기능 폴더: 소문자 한 단어 또는 kebab-case입니다(`home`, `user-settings`).
- `.tsx` 컴포넌트 파일: `views` 밖은 PascalCase입니다(`WelcomeBanner.tsx` 등). `views` 안은 PascalCase + **`View` 접미사**입니다(`HomeView.tsx`). App Router 진입 파일만 프레임워크 규약(`page.tsx`, `layout.tsx` 등)을 따릅니다.
- `.ts` 모듈: camelCase입니다(`welcomeApi.ts`, `useWelcomeHealth.ts`). 기능 루트 배럴만 `index.ts` 예외입니다.
- 훅: 이름은 `useXxx`, 파일명은 `useXxx.ts`(camelCase)로 맞춥니다. 타입·인터페이스는 PascalCase, 값은 camelCase입니다.

## 환경 변수

`.env.example`을 참고해 `.env.local`을 만듭니다. 브라우저에 노출되는 것은 `NEXT_PUBLIC_*`뿐입니다.

자세한 규칙은 `front/README.md`의 컨벤션 절을 따릅니다.
