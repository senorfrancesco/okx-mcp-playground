import crypto from "crypto";
import { ENV } from "../env";

export const joinEndpoint = (
  base: string,
  paths: string,
  query: Record<
    string,
    | string
    | number
    | boolean
    | [string | number]
    | string[]
    | number[]
    | undefined
  > = {}
): string => {
  const safeQuery = Object.entries(query).map(([key, value]) => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    } else if (Array.isArray(value)) {
      return value
        .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
        .join("&");
    }
    return "";
  });
  return base + paths + (safeQuery.length > 0 ? "?" + safeQuery.join("&") : "");
};

/**
 * Generate OKX API authentication headers with HMAC SHA256 signature
 * @param method HTTP method (GET, POST, etc.)
 * @param requestPath API endpoint path (e.g., /api/v5/dex/aggregator/swap)
 * @param body Request body as string (empty string for GET requests)
 * @returns Headers object with proper authentication
 */
export const generateHeaderKey = (
  method: string,
  requestPath: string,
  body: string = ""
): Record<string, string> => {
  // Generate ISO timestamp
  const timestamp = new Date().toISOString();

  // Create signature message: timestamp + method + requestPath + body
  const message = timestamp + method.toUpperCase() + requestPath + body;

  // Generate HMAC SHA256 signature
  const signature = crypto
    .createHmac("sha256", ENV.OKX_API_SECRET)
    .update(message)
    .digest("base64");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "OK-ACCESS-KEY": ENV.OKX_API_KEY,
    "OK-ACCESS-SIGN": signature,  // ✅ Now using proper HMAC signature
    "OK-ACCESS-PASSPHRASE": ENV.OKX_PASSPHRASE,
    "OK-ACCESS-TIMESTAMP": timestamp,
  };

  // Add Project ID only if provided (optional per OKX API docs)
  if (ENV.OKX_PROJECT_ID) {
    headers["OK-ACCESS-PROJECT"] = ENV.OKX_PROJECT_ID;
  }

  return headers;
};
