import { MARKET_PRICE_ROUTER } from "../../shared";
import { GetBatchTokenPriceParams } from "../../shared/types/params/marketPrice";
import { GetBatchTokenPriceResponse } from "../../shared/types/response/marketPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_batch_token_price(params: GetBatchTokenPriceParams): Promise<GetBatchTokenPriceResponse> {
  return await secureApiRequest<GetBatchTokenPriceResponse>({
    method: "POST",
    path: MARKET_PRICE_ROUTER.GET_BATCH_TOKEN_PRICE,
    body: params,
    rateLimitKey: 'get_batch_token_price',
  });
}
