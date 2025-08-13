// 用户认证相关工具（可与第三方OAuth或自定义API集成）
export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("token") || "";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}