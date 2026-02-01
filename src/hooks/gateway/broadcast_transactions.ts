import {
  BASE_ENDPOINT,
  GATEWAY_ROUTER,
  generateHeaderKey,
} from "../../shared";
import { BroadcastTransactionsParams } from "../../shared/types/params/gateway";
import { BroadcastTransactionsResponse } from "../../shared/types/response/gateway";
import { BroadcastTransactionParamsSchema, validateInput } from "../../shared/utils/validation";
import { secureLog, SecureError } from "../../shared/utils/security";
import { globalRateLimiter } from "../../shared/utils/rateLimiter";

export async function broadcast_transactions(params: BroadcastTransactionsParams): Promise<BroadcastTransactionsResponse> {
  try {
    // ✅ Step 1: Validate critical transaction parameters
    const validated = validateInput(BroadcastTransactionParamsSchema, params);

    // ✅ Step 2: Rate limiting (critical for broadcast to prevent spam)
    await globalRateLimiter.waitForToken('broadcast_transactions', 30000);

    // ✅ Step 3: Build request
    const requestPath = GATEWAY_ROUTER.BRODCAST_TRANSACTIONS;
    const requestBody = JSON.stringify({
      signedTx: validated.signedTx,
      chainIndex: validated.chainIndex,
      address: validated.address,
      extraData: validated.extraData,
      enableMevProtection: validated.enableMevProtection,
      jitoSignedTx: validated.jitoSignedTx,
    });

    const endpoint = `${BASE_ENDPOINT}${requestPath}`;

    // ✅ Step 4: Generate proper HMAC signature for POST request
    const headers = generateHeaderKey("POST", requestPath, requestBody);

    // ✅ Step 5: Execute request with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000); // 60s for broadcast

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: requestBody,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // ✅ Step 6: Enhanced error handling
      if (!response.ok) {
        const errorBody = await response.text();
        secureLog.error("OKX API Error in broadcast_transactions", {
          status: response.status,
          statusText: response.statusText,
          body: errorBody,
        });

        throw new SecureError(
          `Failed to broadcast transaction: ${response.statusText}`,
          response.status,
          errorBody
        );
      }

      const result = await response.json();

      // ✅ Log successful broadcast (without exposing signedTx)
      secureLog.info("Transaction broadcast successful", {
        chainIndex: validated.chainIndex,
        address: validated.address,
      });

      return result;
    } catch (fetchError: any) {
      clearTimeout(timeout);

      if (fetchError.name === 'AbortError') {
        throw new SecureError("Request timeout: broadcast took longer than 60 seconds", 408);
      }

      throw fetchError;
    }
  } catch (error) {
    // ✅ Step 7: Secure logging
    if (error instanceof SecureError) {
      secureLog.error("SecureError in broadcast_transactions:", error.toSafeString());
      throw error;
    }

    secureLog.error("Unexpected error in broadcast_transactions:", error);
    throw new SecureError("Failed to broadcast transaction: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
