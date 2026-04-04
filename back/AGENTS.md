# 백엔드 에이전트 가이드

Express + TypeScript(ESM) + Prisma + Zod API. 상세 구조·실행은 `back/README.md`를 본다.

## 구조 요약

- `src/api/<도메인>/`: `*.routes.ts` → `*.controller.ts` → `*.service.ts` → `*.repository.ts`, 검증은 `*.schemas.ts`(Zod).
- `src/errors/`: `AppError`, 전역 `errorHandler` — 앱에 마지막 미들웨어로 등록됨.
- `src/middleware/`: 공통 Express 미들웨어·헬퍼 (`wrapAsync` 등, kebab-case 파일명).
- `src/db/prisma.ts`: Prisma 싱글톤만 사용.
- `src/config/`, `src/schemas/`: env·CORS 등 공통 설정.
- `src/generated/`: `prisma generate` 결과, Git 제외.

## 반드시 지킬 것

- **레이어**: 라우트에서 repository 직접 호출 금지. `routes` → `controller` → `service` → `repository` 한 단계씩.
- **DB**: Prisma 호출은 repository에만. 클라이언트는 `src/db/prisma.ts` 싱글톤을 상대 경로로 import하고 확장자는 `.js`를 붙인다 (예: `'../../db/prisma.js'`).
- **검증**: 요청 body/query/params는 Zod(`*.schemas.ts`)로 파싱하고, controller에서 `safeParse` 실패 시 400.
- **에러**: 도메인 실패는 `AppError`(또는 프로젝트에 정의된 앱 예외)로 던지고, 응답 형식은 `error-handler`에 맡긴다.
- **import**: 소스 간 import는 확장자 `.js`를 붙인다 (`import "./x.js"`).
- **환경**: 런타임 env는 `src/config/env.ts`, 스키마는 `src/schemas/env.schema.ts`.

## 네이밍 (요약)

- 도메인 폴더: 소문자 한 단어 또는 kebab-case (`auth`, `user-session`).
- 도메인 파일: `<도메인>.<역할>.ts` (예: `auth.routes.ts`).
- 공통 TS 모듈 파일명: kebab-case (`env.schema.ts`).
- export 싱글톤: `<도메인><역할>` camelCase (`authService`).
- JSON 응답 필드·에러 코드 문자열: **snake_case**.

## 새 API 추가 시

1. `src/api/<도메인>/`에 routes · controller · service · repository · schemas를 맞춘다.
2. `src/api/index.ts`에 라우터를 조립한다.
3. Prisma 모델 변경 시 `schema.prisma`와 마이그레이션 흐름을 따른다.

자세한 네이밍·레이어 규칙은 `back/README.md`의 컨벤션 절을 따른다.
