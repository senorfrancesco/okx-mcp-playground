import { TRADING_MARKET_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetTickersParams {
  instType: "SPOT" | "SWAP" | "FUTURES" | "OPTION"; // Instrument type
  uly?: string; // Underlying (e.g., BTC-USD)
  instFamily?: string; // Instrument family (e.g., BTC-USD)
}

export interface TickerData {
  instType: string;
  instId: string;
  last: string;
  lastSz: string;
  askPx: string;
  askSz: string;
  bidPx: string;
  bidSz: string;
  open24h: string;
  high24h: string;
  low24h: string;
  volCcy24h: string;
  vol24h: string;
  ts: string;
  sodUtc0: string;
  sodUtc8: string;
}

export interface GetTickersResponse {
  code: string;
  msg: string;
  data: TickerData[];
}

export async function get_tickers(params: GetTickersParams): Promise<GetTickersResponse> {
  return await secureApiRequest<GetTickersResponse>({
    method: "GET",
    path: TRADING_MARKET_ROUTER.GET_TICKERS,
    queryParams: params,
    rateLimitKey: 'get_tickers',
  });
}
