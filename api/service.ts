export const getApiBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  if (baseUrl) {
    return `${baseUrl}/api/v1`;
  }

  return "/api/v1";
};

type RequestOptions = {
  params?: Record<string, string | number>;
  body?: object;
  headers?: Record<string, string>;
  query?: Record<string, string>;
};

class ApiService {
  private apiPath: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    const baseUrl = this.getBaseUrl();
    this.apiPath = baseUrl ? `${baseUrl}/api/v1` : "/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }

  private getBaseUrl(): string {
    const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envBaseUrl && typeof envBaseUrl === "string") {
      return envBaseUrl.trim();
    }

    return "";
  }

  private getHeaders(): Record<string, string> {
    const headers = { ...this.defaultHeaders };

    return headers;
  }

  private formatUrl(path: string, options?: RequestOptions): string {
    let url = path;

    if (options?.params) {
      for (const [key, value] of Object.entries(options.params)) {
        url = url.replace(`:${key}`, String(value));
      }
    }

    if (options?.query) {
      const queryString = new URLSearchParams(options.query).toString();
      url = `${url}${queryString ? `?${queryString}` : ""}`;
    }

    return `${this.apiPath}${url}`;
  }

  private async request<T>(
    method: string,
    path: string,
    options?: RequestOptions
  ): Promise<T> {
    const url = this.formatUrl(path, options);
    const headers = { ...this.getHeaders(), ...options?.headers };

    const response = await fetch(url, {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  }

  public async get<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return this.request<T>("GET", path, options);
  }

  public async post<T>(path: string, options?: RequestOptions) {
    return this.request<T>("POST", path, options);
  }

  public async put<T>(path: string, options?: RequestOptions) {
    return this.request<T>("PUT", path, options);
  }

  public async patch<T>(path: string, options?: RequestOptions) {
    return this.request<T>("PATCH", path, options);
  }

  public async delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>("DELETE", path, options);
  }
}

export const apiService = new ApiService();
