export interface ApiFetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
  token?: string | null
): Promise<T> {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${baseURL}${path}`, {
    credentials: 'include',
    ...options,
    headers,
  });

  if (!res.ok) {
    // Optionally, throw a more detailed error
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
}
