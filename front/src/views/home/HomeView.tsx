"use client";

import { WelcomeBanner, WelcomeStatus } from "@/features/welcome";
import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/config/site";
import { Button } from "@/shared/ui/Button";

/** 홈 화면 조립 — `views`는 app 라우트에서 가져다 쓰는 조합 레이어 (Next 예약 `pages/`와 구분) */
export function HomeView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-zinc-950">
      <main className="w-full max-w-lg space-y-8 rounded-2xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <WelcomeBanner
          eyebrow={SITE_NAME}
          title="스켈레톤 구조 데모"
          description={SITE_DESCRIPTION}
        />
        <WelcomeStatus />
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              window.alert(
                "shared/ui/Button → features/welcome → views/home/HomeView → app/page 연결 예시입니다.",
              );
            }}
          >
            클라이언트 버튼
          </Button>
          <Button type="button" variant="outline">
            보조 스타일
          </Button>
        </div>
      </main>
    </div>
  );
}
