export function cn(...classNames: (string | boolean | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}
