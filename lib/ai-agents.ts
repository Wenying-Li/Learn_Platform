// AI智能体调用和分发逻辑（可扩展为调用不同专业领域的AI服务）
type AgentType = "frontend" | "backend" | "datascience" | "default";

export const agentMap: Record<AgentType, string> = {
  frontend: "/api/ai/frontend",
  backend: "/api/ai/backend",
  datascience: "/api/ai/datascience",
  default: "/api/ai/default"
};

export async function callAgent(
  agentType: AgentType,
  payload: Record<string, any>
) {
  const endpoint = agentMap[agentType] || agentMap.default;
  return await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(res => res.json());
}