import { TRADING_TRADE_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetOrderHistoryParams {
  instType?: "SPOT" | "MARGIN" | "SWAP" | "FUTURES" | "OPTION"; // Instrument type
  uly?: string; // Underlying
  instFamily?: string; // Instrument family
  instId?: string; // Instrument ID
  ordType?: "market" | "limit" | "post_only" | "fok" | "ioc" | "optimal_limit_ioc"; // Order type
  state?: "canceled" | "filled"; // State
  category?: "twap" | "adl" | "full_liquidation" | "partial_liquidation" | "delivery" | "ddh"; // Category
  after?: string; // Pagination
  before?: string; // Pagination
  limit?: string; // Number of results (max 100, default 100)
}

export interface OrderData {
  instType: string;
  instId: string;
  ccy: string;
  ordId: string;
  clOrdId: string;
  tag: string;
  px: string;
  sz: string;
  ordType: string;
  side: string;
  posSide: string;
  tdMode: string;
  accFillSz: string;
  fillPx: string;
  tradeId: string;
  fillSz: string;
  fillTime: string;
  state: string;
  avgPx: string;
  lever: string;
  tpTriggerPx: string;
  tpOrdPx: string;
  slTriggerPx: string;
  slOrdPx: string;
  feeCcy: string;
  fee: string;
  rebateCcy: string;
  rebate: string;
  category: string;
  uTime: string;
  cTime: string;
}

export interface GetOrderHistoryResponse {
  code: string;
  msg: string;
  data: OrderData[];
}

export async function get_order_history(params?: GetOrderHistoryParams): Promise<GetOrderHistoryResponse> {
  return await secureApiRequest<GetOrderHistoryResponse>({
    method: "GET",
    path: TRADING_TRADE_ROUTER.GET_ORDER_HISTORY,
    ...(params ? { queryParams: params } : {}),
    rateLimitKey: 'get_order_history',
  });
}
