import { INDEX_PRICE_ROUTER } from "../../shared";
import { GetTokenIndexPriceParams } from "src/shared/types/params/indexPrice";
import { GetTokenIndexPriceResponse } from "src/shared/types/response/indexPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_token_index_price(params: GetTokenIndexPriceParams): Promise<GetTokenIndexPriceResponse> {
  return await secureApiRequest<GetTokenIndexPriceResponse>({
    method: "POST",
    path: INDEX_PRICE_ROUTER.GET_TOKEN_INDEX_PRICE,
    body: params,
    rateLimitKey: 'get_token_index_price',
  });
}
