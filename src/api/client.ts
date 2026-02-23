const BASE_URL = import.meta.env.VITE_BASE_URL as string;

if (!BASE_URL) {
  throw new Error("No se encontro la env VITE_BASE_URL.");
}

export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Fallo GET de ${path}: ${res.status} ${res.statusText} ${text ? ` - ${text}` : ""}`);
    }

    return (await res.json()) as T;
}

export async function apiPost<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`POST ${path} failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ""}`);
    }

    return (await res.json()) as TResponse;
}