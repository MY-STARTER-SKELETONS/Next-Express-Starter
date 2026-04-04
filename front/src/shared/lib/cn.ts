/** className 조각을 합칩니다. (의존성 없는 최소 유틸) */
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
