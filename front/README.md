# web

[next-express-starter](../README.md)의 Next.js 앱입니다.

`package.json`에 **`"type": "module"`** 이 있으며, 프론트 루트 설정은 **`.mts`(ESM TypeScript)** 로만 둡니다. 이 저장소 컨벤션에 따르면 **직접 작성하는 소스에는 `.js` / `.mjs`를 쓰지 않습니다**(빌드 산출물·`node_modules` 등은 제외입니다).

- **`next.config.mts` / `postcss.config.mts`**: Next가 Node **타입 스트립**(`--experimental-next-config-strip-types`)으로 로드합니다.
- **`eslint.config.mts`**: `lint` 스크립트가 `node --experimental-strip-types`로 ESLint를 실행합니다. **Node 22+** 사용을 권장합니다.

`src/`의 TS/TSX는 번들러가 ESM으로 처리합니다.

## 폴더 구조

```
front/
├── public/                 # 정적 파일
├── src/
│   ├── app/                # App Router (라우트·레이아웃·전역 스타일만)
│   ├── views/              # 화면 조립 (`pages`는 Next 예약 경로라 사용하지 않음)
│   ├── features/           # 기능 단위 (api/, constants/, hooks/, ui/, index.ts)
│   └── shared/             # 공용 (ui/, lib/, config/)
├── eslint.config.mts       # flat config (ESM TS)
├── next.config.mts
├── postcss.config.mts
└── package.json
```

새 라우트는 `app/<경로>/page.tsx`를 추가하고, 본문은 `views/<화면>/`에서 조립합니다. 기능 전용 UI·로직은 `features`에, 여러 화면에서 쓰는 것만 `shared`에 둡니다.

## 컨벤션

아래는 `src` 기준으로 이름 짓기, 폴더 역할, API·스타일을 한곳에 모은 규칙입니다.

### 네이밍

| 대상 | 규칙 | 예시 |
|------|------|------|
| `views/<화면>/`, `features/<기능>/` 폴더 | 소문자 한 단어 또는 kebab-case를 씁니다 | `home`, `user-settings` |
| `views` 안 `.tsx` | PascalCase이며, **컴포넌트 이름·파일명 모두 `View`로 끝냅니다** | `HomeView.tsx` → `export function HomeView` |
| `features`·`shared` 안 UI `.tsx` | PascalCase를 씁니다 | `WelcomeBanner.tsx`, `Button.tsx` |
| App Router 진입 파일 | 프레임워크 규약(소문자)을 따릅니다 | `page.tsx`, `layout.tsx` |
| `api` / `hooks` / `constants` / `shared/lib` 등 `.ts` | **camelCase** 파일명을 씁니다 | `welcomeApi.ts`, `useWelcomeHealth.ts`, `welcomeConstants.ts` |
| 기능 루트 배럴 | 파일명은 `index.ts`만 예외로 둡니다 | `features/welcome/index.ts` |
| React 훅 | 식별자는 `use`로 시작하고, 파일명도 camelCase(`useXxx.ts`)로 맞춥니다 | `useWelcomeHealth` in `useWelcomeHealth.ts` |
| export | 기능 루트 `index.ts`에서만 외부에 공개합니다 | 컴포넌트·함수·변수는 camelCase, 타입·인터페이스는 PascalCase입니다 |

### 레이어와 역할

| 경로 | 역할 |
|------|------|
| `src/app` | 라우트 전용입니다. `page.tsx` / `layout.tsx`만 두고, 본문은 `@/views/...`에서 가져옵니다. |
| `src/views` | 화면 조립입니다. 라우트별 폴더와 **`View` 접미사** PascalCase 컴포넌트(`home/HomeView.tsx` 등)를 둡니다. |
| `src/features` | 도메인 단위입니다. `api/`, `constants/`, `hooks/`, `ui/`, 루트 `index.ts`를 둡니다. 여러 기능이 공유하는 API 베이스 URL 등은 `shared/config`로 옮깁니다. |
| `src/shared` | 여러 기능이 공용으로 쓰는 `ui/`, `lib/`, `config/`만 둡니다. |

- **클라이언트 컴포넌트**: 상호작용·브라우저 API가 필요할 때만 파일 상단에 `"use client"`를 둡니다.
- **경로 별칭**: `@/...`는 `src/*`에 대응합니다(`tsconfig`의 `@/*`).

### API 호출

| 항목 | 규칙 |
|------|------|
| 위치 | `features/<기능>/api/`에 **camelCase** `.ts` 파일을 둡니다. 백엔드와 통신하는 **`async` 함수**만 export합니다(`fetchWelcomeHealth` 등). |
| 베이스 URL | `process.env.NEXT_PUBLIC_API_URL`을 씁니다(예: `http://localhost:4000`). 기능 전용 값은 `constants/`, 공통 값은 `shared/config`에 둡니다. |
| URL 조립 | 백엔드 기준 절대 경로(`/health`, `/api/...`)와 `new URL(경로, 베이스)`로 조립합니다. |
| 구현 | 표준 **`fetch`**를 씁니다. Next `fetch` 옵션(`cache`, `next.revalidate` 등)은 필요할 때만 명시합니다. RSC·훅에서 재사용할 수 있게 브라우저 전용 API에만 묶지 않습니다. |
| 호출 경로 | **`api/` → 훅·서버 컴포넌트·서버 액션** 위주로 호출합니다. UI에 `fetch`를 직접 흩뿌리지 않습니다. |
| 응답 | `res.ok`를 확인한 뒤 파싱합니다. 실패는 `throw` 등으로 기능 안에서 통일합니다. JSON 필드명은 API 스펙을 따릅니다(예: snake_case). |
| 인증·쿠키 | 필요할 때만 `credentials: "include"` 등을 씁니다. CORS·쿠키는 백엔드와 맞춥니다. |

### 스타일

| 구분 | 규칙 |
|------|------|
| 기본 | 레이아웃·색·타이포·간격은 **Tailwind** 클래스(`className`, 필요 시 `cn()`)로 둡니다. |
| 인라인 `style` | **런타임에 JS로 정해지는 값**만 둡니다(스크롤, 드래그, 차트, 애니메이션 진행 등). 정적 스타일은 Tailwind를 씁니다. |

---

실행·스크립트는 저장소 루트 `README.md`를 참고합니다.

환경 변수는 `.env.example`을 복사해 `.env.local`을 만들고 값을 맞춥니다(`NEXT_PUBLIC_*`만 브라우저에 노출됩니다).
