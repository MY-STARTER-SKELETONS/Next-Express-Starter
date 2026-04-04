# web

[next-express-starter](../README.md)의 Next.js 앱입니다.

## 폴더 구조

```
front/
├── public/                 # 정적 파일
├── src/
│   ├── app/                # App Router (라우트·레이아웃·전역 스타일만)
│   ├── pages/              # 화면 조립 (라우트별 하위 폴더 + *-page.tsx)
│   ├── features/           # 기능 단위 (api/, constants/, hooks/, ui/, index.ts)
│   └── shared/             # 공용 (ui/, lib/, config/)
├── next.config.ts
└── package.json
```

새 라우트는 `app/<경로>/page.tsx`를 추가하고, 본문은 `pages/<화면>/`에서 조립한다. 기능 전용 UI·로직은 `features`에, 여러 화면에서 쓰는 것만 `shared`에 둔다.

## 컨벤션

- **`src/app`**: 라우트 전용. `page.tsx` / `layout.tsx`만 두고, 화면 본문은 `@/pages/...`에서 가져온다.
- **`src/pages`**: 화면 조립. 라우트별 폴더(예: `home/`) + `*-page.tsx`처럼 역할이 드러나는 이름을 쓴다.
- **`src/features`**: 기능(도메인) 단위. `api/`(백엔드 호출), `constants/`(기능 전용 상수), `hooks/`, `ui/`를 두고, 루트 `index.ts`로 필요한 것만 export 한다. 여러 기능이 공유하는 API 베이스 URL 등은 `shared/config`로 승격한다.
- **`src/shared`**: 여러 기능에서 쓰는 UI(`ui/`), 유틸(`lib/`), 상수·설정(`config/`)만 둔다.
- **클라이언트 컴포넌트**: 상호작용·브라우저 API가 필요할 때만 파일 상단에 `"use client"`를 둔다.
- **경로 별칭**: `import ... from "@/..."` (`tsconfig`의 `@/*` → `./src/*`).

실행·스크립트는 저장소 루트 `README.md`를 본다.

환경 변수: `.env.example`을 복사해 `.env.local`을 만들고 값을 맞춘다 (`NEXT_PUBLIC_*`만 브라우저에 노출됨).
