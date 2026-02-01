import {
  BASE_ENDPOINT,
  GATEWAY_ROUTER,
  generateHeaderKey,
} from "../../shared";
import { SimulateTransactionParams } from "../../shared/types/params/gateway";
import { SimulateTransactionsResponse } from "../../shared/types/response/gateway";
import { secureLog, SecureError } from "../../shared/utils/security";
import { globalRateLimiter } from "../../shared/utils/rateLimiter";

export async function simulate_transactions(params: SimulateTransactionParams): Promise<SimulateTransactionsResponse> {
  try {
    await globalRateLimiter.waitForToken('simulate_transactions', 30000);

    const requestPath = GATEWAY_ROUTER.SIMULATE_TRANSACTIONS;
    const requestBody = JSON.stringify({
      fromAddress: params.fromAddress,
      toAddress: params.toAddress,
      chainIndex: params.chainIndex,
      txAmount: params.txAmount,
      extJson: params.extJson,
      priorityFee: params.priorityFee,
      gasPrice: params.gasPrice,
    });

    const endpoint = `${BASE_ENDPOINT}${requestPath}`;
    const headers = generateHeaderKey("POST", requestPath, requestBody);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: requestBody,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorBody = await response.text();
        secureLog.error("OKX API Error in simulate_transactions", {
          status: response.status,
          body: errorBody,
        });
        throw new SecureError(
          `Failed to simulate: ${response.statusText}`,
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
      secureLog.error("SecureError in simulate_transactions:", error.toSafeString());
      throw error;
    }
    secureLog.error("Error in simulate_transactions:", error);
    throw new SecureError("Failed to simulate transactions: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}
