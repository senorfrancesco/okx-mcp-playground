import { MARKET_PRICE_ROUTER } from "../../shared";
import { GetCandlesticksHistoryParams } from "../../shared/types/params/marketPrice";
import { GetCandlesticksHistoryResponse } from "../../shared/types/response/marketPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_candlesticks_history(params: GetCandlesticksHistoryParams): Promise<GetCandlesticksHistoryResponse> {
  return await secureApiRequest<GetCandlesticksHistoryResponse>({
    method: "GET",
    path: MARKET_PRICE_ROUTER.GET_CANDLESTICKS_HISTORY,
    queryParams: params,
    rateLimitKey: 'get_candlesticks_history',
  });
}
