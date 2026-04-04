# back

[next-express-starter](../README.md)의 Express API입니다.

## 폴더 구조

```
back/
├── prisma/                 # schema.prisma, migrations/, seed.ts
├── prisma.config.ts        # Prisma CLI 설정 (datasource 등)
├── src/
│   ├── api/                # HTTP 도메인
│   │   ├── index.ts        # 라우터 조립
│   │   └── <도메인>/       # routes, controller, service, repository, schemas
│   ├── config/             # cors, cookies, env 조립
│   ├── db/                 # Prisma 클라이언트 싱글톤
│   ├── schemas/            # Zod (env, 공통 API 등; 하위 api/ 허용)
│   ├── app.ts              # Express 앱
│   └── server.ts           # listen 진입점
└── package.json
```

`src/generated/`는 `prisma generate` 결과물이며 Git에 포함하지 않는다.

## 컨벤션

- **레이어**: `routes` → `controller` → `service` → `repository`. 한 단계씩만 호출한다 (라우트에서 repository 직접 호출 금지).
- **`src/api/<도메인>`**: 도메인별 폴더. `*.routes.ts`, `*.controller.ts`, `*.service.ts`, `*.repository.ts`, `*.schemas.ts`(Zod)를 맞춘다.
- **검증**: 요청/query/body는 `*.schemas.ts`의 Zod로 파싱하고, controller에서 `safeParse` 후 400 처리.
- **DB**: Prisma는 repository에만 둔다. 클라이언트는 `src/db/prisma.ts`의 싱글톤을 import 한다.
- **모듈**: ESM + TypeScript. 소스 간 import 경로는 확장자 `.js`를 붙인다 (`import "./x.js"`).
- **환경 변수**: 런타임 설정은 `src/config/env.ts` — 스키마는 `src/schemas/env.schema.ts`에서 정의·검증.

Prisma·스크립트·실행은 저장소 루트 `README.md`를 본다.
