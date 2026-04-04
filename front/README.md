# web

[next-express-starter](../README.md)의 Next.js 앱입니다.

## 폴더 구조

```
front/
├── public/                 # 정적 파일
├── src/
│   ├── app/                # App Router (라우트·레이아웃·전역 스타일만)
│   ├── pages/              # 화면 조립 (라우트별 하위 폴더 + PascalCase *.tsx)
│   ├── features/           # 기능 단위 (api/, constants/, hooks/, ui/, index.ts)
│   └── shared/             # 공용 (ui/, lib/, config/)
├── next.config.ts
└── package.json
```

새 라우트는 `app/<경로>/page.tsx`를 추가하고, 본문은 `pages/<화면>/`에서 조립한다. 기능 전용 UI·로직은 `features`에, 여러 화면에서 쓰는 것만 `shared`에 둔다.

## 컨벤션

아래는 `src` 기준으로 이름 짓기, 폴더 역할, API·스타일을 한곳에 모은 규칙이다.

### 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| `pages/<화면>/`, `features/<기능>/` 폴더 | 소문자 한 단어 또는 kebab-case | `home`, `user-settings` |
| 화면·컴포넌트 `.tsx` | PascalCase | `HomePage.tsx`, `WelcomeBanner.tsx` |
| App Router 진입 파일 | 프레임워크 규약(소문자) | `page.tsx`, `layout.tsx` |
| `api` / `hooks` / `constants` / `shared/lib` 등 `.ts` | kebab-case 파일명 | `welcome-api.ts`, `use-welcome-health.ts` |
| React 훅 | 식별자는 `use`로 시작 | `useWelcomeHealth` in `use-welcome-health.ts` |
| export | 기능 루트 `index.ts`에서만 외부 공개 | 컴포넌트·함수·변수 camelCase, 타입·인터페이스 PascalCase |

### 레이어와 역할

| 경로 | 역할 |
|------|------|
| `src/app` | 라우트 전용. `page.tsx` / `layout.tsx`만 두고 본문은 `@/pages/...`에서 가져온다. |
| `src/pages` | 화면 조립. 라우트별 폴더 + PascalCase 페이지 컴포넌트 (`home/HomePage.tsx`). |
| `src/features` | 도메인 단위: `api/`, `constants/`, `hooks/`, `ui/`, 루트 `index.ts`. 여러 기능이 공유하는 API 베이스 URL 등은 `shared/config`로 옮긴다. |
| `src/shared` | 여러 기능 공용 `ui/`, `lib/`, `config/`만 둔다. |

- **클라이언트 컴포넌트**: 상호작용·브라우저 API가 필요할 때만 `"use client"`.
- **경로 별칭**: `@/...` → `src/*` (`tsconfig`의 `@/*`).

### API 호출

| 항목 | 규칙 |
|------|------|
| 위치 | `features/<기능>/api/`, kebab-case 파일. 백엔드와 통신하는 **`async` 함수**만 export (`fetchWelcomeHealth` 등). |
| 베이스 URL | `process.env.NEXT_PUBLIC_API_URL` (예: `http://localhost:4000`). 기능 전용은 `constants/`, 공통은 `shared/config`. |
| URL 조립 | 백엔드 기준 절대 경로 (`/health`, `/api/...`) + `new URL(경로, 베이스)`. |
| 구현 | 표준 **`fetch`**. Next `fetch` 옵션(`cache`, `next.revalidate` 등)은 필요 시 명시. RSC·훅에서 재사용 가능하게 브라우저 전용 API에만 묶지 않는다. |
| 호출 경로 | **`api/` → 훅·서버 컴포넌트·서버 액션** 위주. UI에 `fetch`를 직접 흩뿌리지 않는다. |
| 응답 | `res.ok` 확인 후 파싱. 실패는 `throw` 등 기능 안에서 통일. JSON 필드명은 API 스펙 따름 (예: snake_case). |
| 인증·쿠키 | 필요 시만 `credentials: "include"` 등. CORS·쿠키는 백엔드와 맞춘다. |

### 스타일

| 구분 | 규칙 |
|------|------|
| 기본 | 레이아웃·색·타이포·간격은 **Tailwind** 클래스 (`className`, 필요 시 `cn()`). |
| 인라인 `style` | **런타임에 JS로 정해지는 값**만 (스크롤, 드래그, 차트, 애니메이션 진행 등). 정적 스타일은 Tailwind. |

---

실행·스크립트는 저장소 루트 `README.md`를 본다.

환경 변수: `.env.example`을 복사해 `.env.local`을 만들고 값을 맞춘다 (`NEXT_PUBLIC_*`만 브라우저에 노출됨).
