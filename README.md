# next-express-starter

Next.js(프론트)와 Express + Prisma(백엔드)를 한 저장소에서 시작하기 위한 스타터입니다.

## 구성

| 경로 | 설명 |
|------|------|
| `front/` | Next.js(App Router), Tailwind CSS |
| `back/` | Express 5, Zod, Prisma(PostgreSQL + `pg` 드라이버 어댑터) |

백엔드는 `routes → controller → service → repository` 레이어로 나뉘어 있습니다.

## 요구 사항

- Node.js 20 이상 권장
- PostgreSQL
- npm 9 이상(workspaces 사용)

## 처음 설정

1. **저장소 루트에서 의존성 설치**

   ```bash
   npm install
   ```

   npm workspaces를 쓰므로 **`package-lock.json`은 루트에만** 두는 것을 권장합니다.  
   루트 `postinstall`에서 `back`의 Prisma 클라이언트 생성(`prisma generate`)이 실행됩니다.  
   클라이언트 출력은 `back/src/generated/`이며 Git에는 포함하지 않습니다.

2. **백엔드 환경 변수**

   `back/.env.example`을 참고해 `back/.env`를 만듭니다. 최소한 `DATABASE_URL`과 `PORT`, 프론트와 맞출 `CORS_ORIGIN`(예: `http://localhost:3000`)을 설정합니다.

3. **DB 스키마 적용**

   ```bash
   npm run prisma:migrate -w back
   ```

   (또는 `cd back` 후 `npx prisma migrate dev`)

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   - API: `http://localhost:<PORT>` (기본값은 `back/.env`의 `PORT`, 예: 4000)
   - 웹: `http://localhost:3000` (Next 기본 포트)

두 프로세스는 한 터미널에서 함께 뜨며, Ctrl+C 한 번으로 둘 다 종료됩니다(`concurrently -k`).

## 스크립트 (루트)

| 명령 | 설명 |
|------|------|
| `npm run dev` | 백엔드 + 프론트 동시 개발 모드 |
| `npm run build` | 프론트 프로덕션 빌드 |
| `npm run lint` | 프론트 ESLint |
| `npm run prisma:generate -w back` | Prisma 클라이언트만 재생성 |
| `npm run prisma:migrate -w back` | 마이그레이션(백엔드) |
| `npm run prisma:studio -w back` | Prisma Studio |

워크스페이스 이름은 백엔드 `back`, 프론트 `web`입니다.

## 워크스페이스만 따로 실행

```bash
npm run dev -w back
npm run dev -w web
```

## Prisma 참고

- 스키마: `back/prisma/schema.prisma`
- `prisma generate` 없이 TypeScript만 돌리면 `back/src/generated/prisma`가 없어 오류가 날 수 있습니다. 루트에서 `npm install` 또는 위 `prisma:generate`로 생성하세요.
- 시드: `back`에 `prisma.seed`가 설정되어 있으면 `cd back && npx prisma db seed`로 실행할 수 있습니다.

## 라이선스

ISC (`back/package.json` 기준; 필요 시 통일해 수정하세요.)
