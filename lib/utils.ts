// 通用工具函数
export function formatDate(date: string | Date, locale = "zh-CN") {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale);
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}