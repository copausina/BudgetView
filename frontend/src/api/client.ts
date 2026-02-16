const API_BASE = "http://localhost:8000";

async function request<T>(
  endpoint: string,
  options?: {
    method?: string;
    body?: string;
    params?: Record<string, string>;
  }
): Promise<T> {
  let url = `${API_BASE}${endpoint}`;

  if (options?.params) {
    const query = new URLSearchParams(options.params).toString();
    url += `?${query}`;
  }

  const response = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: options?.body,
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

export const apiClient = {
    get: <T>(
    endpoint: string,
    options?: { params?: Record<string, string> }
  ) =>
    request<T>(endpoint, {
      method: "GET",
      params: options?.params,
    }),

  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};