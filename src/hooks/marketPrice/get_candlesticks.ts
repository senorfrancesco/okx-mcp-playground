import { MARKET_PRICE_ROUTER } from "../../shared";
import { GetCandlesticksParams } from "../../shared/types/params/marketPrice";
import { GetCandleSticksResponse } from "../../shared/types/response/marketPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_candlesticks(params: GetCandlesticksParams): Promise<GetCandleSticksResponse> {
  return await secureApiRequest<GetCandleSticksResponse>({
    method: "GET",
    path: MARKET_PRICE_ROUTER.GET_CANDLESTICKS,
    queryParams: params,
    rateLimitKey: 'get_candlesticks',
  });
}
