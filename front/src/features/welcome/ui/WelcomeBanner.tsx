type WelcomeBannerProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

/** 환영 영역 — features 단위로 묶인 UI 예시 */
export function WelcomeBanner({
  title,
  description,
  eyebrow,
}: WelcomeBannerProps) {
  return (
    <header className="space-y-3">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
        {description}
      </p>
    </header>
  );
}
