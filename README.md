# next-express-starter

Next.js(프론트)와 Express + Prisma(백엔드)를 한 저장소에서 시작하기 위한 스타터입니다.

## 구성

| 경로 | 설명 |
|------|------|
| `front/` | Next.js(App Router), Tailwind CSS |
| `back/` | Express 5, Zod, Prisma(PostgreSQL + `pg` 드라이버 어댑터) |

백엔드는 `routes → controller → service → repository` 레이어로 나뉘어 있습니다.

저장소 루트와 `front/`, `back/` 패키지는 모두 **`package.json`의 `"type": "module"`** 로 **ESM**(`import` / `export`)을 씁니다.

## 요구 사항

- Node.js 22 이상을 권장합니다(프론트 `*.mts` 설정·ESLint에 네이티브 타입 스트립을 사용합니다). 런타임만 보면 20 이상도 가능하나, 위 도구는 22에서 검증했습니다.
- PostgreSQL
- [pnpm](https://pnpm.io/installation) 9 이상(또는 Corepack으로 `packageManager` 필드 버전 사용)

## 처음 설정

1. **저장소 루트에서 의존성 설치**

   ```bash
   corepack enable
   pnpm install
   ```

   워크스페이스는 `pnpm-workspace.yaml`로 정의합니다. **`pnpm-lock.yaml`은 루트에만** 두는 것을 권장합니다.  
   루트 `postinstall`에서 `back`의 Prisma 클라이언트 생성(`prisma generate`)이 실행됩니다.  
   클라이언트 출력은 `back/src/generated/`이며 Git에는 포함하지 않습니다.

2. **백엔드 환경 변수**

   `back/.env.example`을 참고해 `back/.env`를 만듭니다. 최소한 `DATABASE_URL`과 `PORT`, 프론트와 맞출 `CORS_ORIGIN`(예: `http://localhost:3000`)을 설정합니다.

3. **DB 스키마 적용**

   ```bash
   pnpm --filter back run prisma:migrate
   ```

   (또는 `cd back` 후 `pnpm exec prisma migrate dev`)

4. **개발 서버 실행**

   ```bash
   pnpm run dev
   ```

   - API: `http://localhost:<PORT>` (기본값은 `back/.env`의 `PORT`, 예: 4000)
   - 웹: `http://localhost:3000` (Next 기본 포트)

두 프로세스는 한 터미널에서 함께 뜨며, Ctrl+C 한 번으로 둘 다 종료됩니다(`concurrently -k`).

## 스크립트 (루트)

| 명령 | 설명 |
|------|------|
| `pnpm run dev` | 백엔드 + 프론트 동시 개발 모드 |
| `pnpm run build` | 프론트 프로덕션 빌드 |
| `pnpm run lint` | 프론트 ESLint |
| `pnpm --filter back run prisma:generate` | Prisma 클라이언트만 재생성 |
| `pnpm --filter back run prisma:migrate` | 마이그레이션(백엔드) |
| `pnpm --filter back run prisma:studio` | Prisma Studio |

워크스페이스 패키지 이름은 백엔드 `back`, 프론트 `web`입니다.

## 워크스페이스만 따로 실행

```bash
pnpm --filter back run dev
pnpm --filter web run dev
```

## Prisma 참고

- 스키마: `back/prisma/schema.prisma`
- `prisma generate` 없이 TypeScript만 돌리면 `back/src/generated/prisma`가 없어 오류가 날 수 있습니다. 루트에서 `pnpm install`을 하거나 위 `prisma:generate`로 생성합니다.
- 시드: `back`에 `prisma.seed`가 설정되어 있으면 `cd back && pnpm exec prisma db seed`로 실행할 수 있습니다.

## 라이선스

ISC입니다(`back/package.json` 기준이며, 필요 시 통일해 수정하면 됩니다).
