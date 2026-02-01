import { TRADING_MARKET_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetTickerParams {
  instId: string; // Instrument ID (e.g., BTC-USDT, ETH-USDT)
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

export interface GetTickerResponse {
  code: string;
  msg: string;
  data: TickerData[];
}

export async function get_ticker(params: GetTickerParams): Promise<GetTickerResponse> {
  return await secureApiRequest<GetTickerResponse>({
    method: "GET",
    path: TRADING_MARKET_ROUTER.GET_TICKER,
    queryParams: params,
    rateLimitKey: 'get_ticker',
  });
}
