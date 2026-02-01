import { MARKET_PRICE_ROUTER } from "../../shared";
import { GetPriceParams } from "../../shared/types/params/marketPrice";
import { GetPriceResponse } from "../../shared/types/response/marketPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_price(params: GetPriceParams): Promise<GetPriceResponse> {
  return await secureApiRequest<GetPriceResponse>({
    method: "POST",
    path: MARKET_PRICE_ROUTER.GET_PRICE,
    body: params,
    rateLimitKey: 'get_price',
  });
}
