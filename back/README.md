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
│   ├── errors/             # AppError, 전역 errorHandler
│   ├── middleware/         # 공통 Express 미들웨어·헬퍼 (wrap-async 등)
│   ├── schemas/            # Zod (env, 공통 API 등; 하위 api/ 허용)
│   ├── app.ts              # Express 앱
│   └── server.ts           # listen 진입점
└── package.json
```

`src/generated/`는 `prisma generate` 결과물이며, Git에는 포함하지 않습니다.

## 컨벤션

아래는 `src` 기준 이름·레이어·설정을 한곳에 모은 규칙입니다.

### 네이밍

**파일·폴더**

| 대상 | 규칙 | 예시 |
|------|------|------|
| `src/api/<도메인>/` 폴더 | 소문자 한 단어를 기본으로 하며, 필요 시 kebab-case를 씁니다 | `auth`, `user-session` |
| 도메인 모듈 | `<도메인>.<역할>.ts` 형식입니다 | `*.routes.ts`, `*.controller.ts`, `*.service.ts`, `*.repository.ts`, `*.schemas.ts` |
| `schemas/`, `config/`, `middleware/` | kebab-case입니다 | `env.schema.ts`, `wrap-async.ts`, `cors.ts` |

**코드·데이터**

| 대상 | 규칙 | 예시 |
|------|------|------|
| 도메인 싱글톤 export | `<도메인><역할>` camelCase입니다 | `exampleController`, `authService` |
| 함수·변수·메서드 | camelCase입니다 | `listPaged`, `getById` |
| 타입·인터페이스 | PascalCase입니다 | `LoginBody`, DTO |
| Zod 스키마 변수 | camelCase + `Schema`입니다 | `loginBodySchema` → `z.infer` 타입은 PascalCase |
| Prisma 모델 / 필드 / DB 컬럼 | 모델은 PascalCase, 필드는 camelCase, DB는 `@map("snake_case")`를 씁니다 | `User`, 필드 `createdAt` |
| JSON 응답 필드·에러 코드 문자열 | snake_case입니다 | `validation_error`, `not_found` |

### 레이어와 역할

| 주제 | 규칙 |
|------|------|
| 호출 순서 | `routes` → `controller` → `service` → `repository`로 한 단계씩만 거칩니다. 라우트에서 repository를 직접 호출하지 않습니다. |
| `src/api/<도메인>/` | 위 역할별 `*.ts`와 Zod는 `*.schemas.ts`에 둡니다. |
| `src/middleware/` | 도메인에 묶이지 않는 공통 미들웨어·헬퍼(`wrapAsync` 등)를 둡니다. |
| 검증 | query/body는 `*.schemas.ts`의 Zod로 두고, controller에서 `safeParse` 후 400을 돌려줍니다. |
| DB | Prisma는 repository에만 둡니다. 클라이언트는 `src/db/prisma.ts` 싱글톤을 씁니다. |
| 에러 | `AppError` 등으로 던지고 `src/errors/error-handler.ts`에서 응답 형식을 통일합니다. 앱 마지막에 `errorHandler`를 등록합니다. |

**비동기 라우트·`wrapAsync`**

- 라우트에서는 `wrapAsync(exampleController.list)`처럼 **컨트롤러 메서드를 참조로** 넘깁니다. Promise 거부·동기 예외는 `next(err)`로 모이고, 마지막 `errorHandler`가 응답합니다.
- 메서드를 떼어 넘기면 호출 시 `this`는 컨트롤러 인스턴스가 아닙니다. **컨트롤러 메서드는 `this`에 의존하지 않습니다**(`req`/`res`만 사용합니다). 필요하면 `wrapAsync((req, res) => exampleController.foo(req, res))` 또는 `.bind(exampleController)`를 씁니다.

### 설정·모듈

| 항목 | 규칙 |
|------|------|
| 모듈 | ESM + TypeScript입니다. 소스 간 import에는 확장자 **`.js`**를 붙입니다(`import "./x.js"`). |
| 환경 변수 | 런타임 값은 `src/config/env.ts`, 스키마·검증은 `src/schemas/env.schema.ts`에 둡니다. |

## 인증(로그인) 방식

세션 쿠키와 JWT 등을 아직 고정하지 않았다면 [docs/auth-login.md](docs/auth-login.md)의 레이어별 요약을 참고합니다.

---

Prisma·스크립트·실행 방법은 저장소 루트 `README.md`를 참고합니다.
