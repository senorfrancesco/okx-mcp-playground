import {
  BASE_ENDPOINT,
  TRADE_ROUTER,
  generateHeaderKey,
} from "../../shared";
import { GetSwapInstructionsParams } from "../../shared/types/params/trade";
import { GetSwapInstructionsResponse } from "../../shared/types/response/trade";
import { secureLog, SecureError } from "../../shared/utils/security";
import { globalRateLimiter } from "../../shared/utils/rateLimiter";

export async function get_swap_instructions(params: GetSwapInstructionsParams): Promise<GetSwapInstructionsResponse> {
  try {
    await globalRateLimiter.waitForToken('get_swap_instructions', 30000);

    const queryParams = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>)
    );

    const requestPath = `${TRADE_ROUTER.GET_SWAP_INSTRUCTIONS}?${queryParams.toString()}`;
    const endpoint = `${BASE_ENDPOINT}${requestPath}`;
    const headers = generateHeaderKey("GET", requestPath, "");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorBody = await response.text();
        secureLog.error("OKX API Error in get_swap_instructions", {
          status: response.status,
          body: errorBody,
        });
        throw new SecureError(
          `Failed to get swap instructions: ${response.statusText}`,
          response.status,
          errorBody
        );
      }

      return await response.json();
    } catch (fetchError: any) {
      clearTimeout(timeout);
      if (fetchError.name === 'AbortError') {
        throw new SecureError("Request timeout", 408);
      }
      throw fetchError;
    }
  } catch (error) {
    if (error instanceof SecureError) {
      secureLog.error("SecureError in get_swap_instructions:", error.toSafeString());
      throw error;
    }
    secureLog.error("Error in get_swap_instructions:", error);
    throw new SecureError("Failed to retrieve swap instructions: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
