/**
 * Unified API request helper with security, rate limiting, and error handling
 */
import { BASE_ENDPOINT, generateHeaderKey } from "../index";
import { secureLog, SecureError } from "./security";
import { globalRateLimiter } from "./rateLimiter";

export interface ApiRequestOptions {
  method: "GET" | "POST";
  path: string;
  queryParams?: Record<string, any>;
  body?: Record<string, any>;
  timeoutMs?: number;
  rateLimitKey?: string;
}

/**
 * Unified secure API request function
 * All hooks should use this instead of raw fetch
 */
export async function secureApiRequest<T>(
  options: ApiRequestOptions
): Promise<T> {
  const {
    method,
    path,
    queryParams = {},
    body,
    timeoutMs = 30000,
    rateLimitKey = 'global',
  } = options;

  try {
    // ✅ Step 1: Rate limiting
    await globalRateLimiter.waitForToken(rateLimitKey, timeoutMs);

    // ✅ Step 2: Build request path with query params
    const queryString = new URLSearchParams(
      Object.entries(queryParams).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const requestPath = queryString ? `${path}?${queryString}` : path;
    const fullUrl = `${BASE_ENDPOINT}${requestPath}`;

    // ✅ Step 3: Prepare request body
    const requestBody = body ? JSON.stringify(body) : "";

    // ✅ Step 4: Generate HMAC signature
    const headers = generateHeaderKey(method, requestPath, requestBody);

    // ✅ Step 5: Execute request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers,
        ...(method === "POST" && requestBody ? { body: requestBody } : {}),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // ✅ Step 6: Enhanced error handling
      if (!response.ok) {
        const errorBody = await response.text();
        secureLog.error(`OKX API Error [${method} ${path}]`, {
          status: response.status,
          statusText: response.statusText,
          body: errorBody,
        });

        throw new SecureError(
          `API request failed: ${response.statusText}`,
          response.status,
          errorBody
        );
      }

      return await response.json();
    } catch (fetchError: any) {
      clearTimeout(timeout);

      if (fetchError.name === 'AbortError') {
        throw new SecureError(
          `Request timeout: ${method} ${path} took longer than ${timeoutMs}ms`,
          408
        );
      }

      throw fetchError;
    }
  } catch (error) {
    // ✅ Step 7: Secure logging
    if (error instanceof SecureError) {
      secureLog.error(`SecureError [${method} ${path}]:`, error.toSafeString());
      throw error;
    }

    secureLog.error(`Unexpected error [${method} ${path}]:`, error);
    throw new SecureError(
      `API request failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
