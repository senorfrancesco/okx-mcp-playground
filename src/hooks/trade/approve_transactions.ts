import {
  BASE_ENDPOINT,
  TRADE_ROUTER,
  generateHeaderKey,
} from "../../shared";
import { ApproveTransactionsParams } from "../../shared/types/params/trade";
import { ApproveTransactionsResponse } from "../../shared/types/response/trade";
import { secureLog, SecureError } from "../../shared/utils/security";
import { globalRateLimiter } from "../../shared/utils/rateLimiter";

export async function approve_transactions(params: ApproveTransactionsParams): Promise<ApproveTransactionsResponse> {
  try {
    // Rate limiting
    await globalRateLimiter.waitForToken('approve_transactions', 30000);

    // Build query string
    const queryParams = new URLSearchParams();
    if (params.chainIndex) queryParams.append('chainIndex', params.chainIndex);
    if (params.chainId) queryParams.append('chainId', params.chainId);
    if (params.tokenContractAddress) queryParams.append('tokenContractAddress', params.tokenContractAddress);
    if (params.approveAmount) queryParams.append('approveAmount', params.approveAmount);

    const requestPath = `${TRADE_ROUTER.APPROVE_TRANSACTIONS}?${queryParams.toString()}`;
    const endpoint = `${BASE_ENDPOINT}${requestPath}`;

    // Generate HMAC signature
    const headers = generateHeaderKey("GET", requestPath, "");

    // Execute with timeout
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
        secureLog.error("OKX API Error in approve_transactions", {
          status: response.status,
          body: errorBody,
        });
        throw new SecureError(
          `Failed to approve: ${response.statusText}`,
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
      secureLog.error("SecureError in approve_transactions:", error.toSafeString());
      throw error;
    }
    secureLog.error("Error in approve_transactions:", error);
    throw new SecureError("Failed to approve transactions: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
