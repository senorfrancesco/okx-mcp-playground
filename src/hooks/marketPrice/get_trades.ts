import { MARKET_PRICE_ROUTER } from "../../shared";
import { GetTradesResponse } from "../../shared/types/response/marketPrice";
import { GetTradesParams } from "../../shared/types/params/marketPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_trades(params: GetTradesParams): Promise<GetTradesResponse> {
  return await secureApiRequest<GetTradesResponse>({
    method: "GET",
    path: MARKET_PRICE_ROUTER.GET_TRADES,
    queryParams: params,
    rateLimitKey: 'get_trades',
  });
}
