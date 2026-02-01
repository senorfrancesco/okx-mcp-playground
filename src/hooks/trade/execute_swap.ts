import {
  BASE_ENDPOINT,
  TRADE_ROUTER,
  generateHeaderKey,
  joinEndpoint,
} from "../../shared";
import { ExecuteSwapParams } from "../../shared/types/params/trade";
import { ExecuteSwapResponse } from "../../shared/types/response/trade";
import { ExecuteSwapParamsSchema, validateInput } from "../../shared/utils/validation";
import { secureLog, SecureError } from "../../shared/utils/security";
import { globalRateLimiter } from "../../shared/utils/rateLimiter";

export async function execute_swap(params: ExecuteSwapParams): Promise<ExecuteSwapResponse> {
  try {
    // ✅ Step 1: Validate input parameters
    const validated = validateInput(ExecuteSwapParamsSchema, params);

    // ✅ Step 2: Rate limiting
    await globalRateLimiter.waitForToken('execute_swap', 30000);

    // ✅ Step 3: Build endpoint with validated params
    const queryString = new URLSearchParams(
      Object.entries(validated).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const requestPath = `${TRADE_ROUTER.EXECUTE_SWAP}?${queryString}`;
    const fullEndpoint = `${BASE_ENDPOINT}${requestPath}`;

    // ✅ Step 4: Generate proper HMAC signature
    const headers = generateHeaderKey("GET", requestPath, "");

    // ✅ Step 5: Execute request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(fullEndpoint, {
        method: "GET",
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // ✅ Step 6: Enhanced error handling with API response details
      if (!response.ok) {
        const errorBody = await response.text();
        secureLog.error("OKX API Error in execute_swap", {
          status: response.status,
          statusText: response.statusText,
          body: errorBody,
        });

        throw new SecureError(
          `Failed to execute swap: ${response.statusText}`,
          response.status,
          errorBody
        );
      }

      return await response.json();
    } catch (fetchError: any) {
      clearTimeout(timeout);

      if (fetchError.name === 'AbortError') {
        throw new SecureError("Request timeout: execute_swap took longer than 30 seconds", 408);
      }

      throw fetchError;
    }
  } catch (error) {
    // ✅ Step 7: Secure logging without exposing sensitive data
    if (error instanceof SecureError) {
      secureLog.error("SecureError in execute_swap:", error.toSafeString());
      throw error;
    }

    secureLog.error("Unexpected error in execute_swap:", error);
    throw new SecureError("Failed to execute swap: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
