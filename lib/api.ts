// 用于与后端/API/AI服务通信的通用工具
export async function fetchAPI(endpoint: string, options?: RequestInit) {
  const res = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    }
  });
  if (!res.ok) throw new Error("网络请求失败");
  return await res.json();
}