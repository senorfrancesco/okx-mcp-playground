import { TRADING_MARKET_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetCandlesticksParams {
  instId: string; // Instrument ID (e.g., BTC-USDT)
  bar?: "1m" | "3m" | "5m" | "15m" | "30m" | "1H" | "2H" | "4H" | "6H" | "12H" | "1D" | "1W" | "1M" | "3M" | "6M" | "1Y"; // Bar size, default 1m
  after?: string; // Pagination - return records earlier than the requested ts
  before?: string; // Pagination - return records newer than the requested ts
  limit?: string; // Number of results per request (max 300, default 100)
}

export interface GetCandlesticksResponse {
  code: string;
  msg: string;
  data: Array<[
    string, // Timestamp
    string, // Open
    string, // High
    string, // Low
    string, // Close
    string, // Volume (contracts)
    string, // Volume (currency)
    string, // Volume (currency, quote)
    string  // Confirm (0: not complete, 1: complete)
  ]>;
}

export async function get_candlesticks(params: GetCandlesticksParams): Promise<GetCandlesticksResponse> {
  return await secureApiRequest<GetCandlesticksResponse>({
    method: "GET",
    path: TRADING_MARKET_ROUTER.GET_CANDLESTICKS,
    queryParams: params,
    rateLimitKey: 'get_candlesticks',
  });
}
