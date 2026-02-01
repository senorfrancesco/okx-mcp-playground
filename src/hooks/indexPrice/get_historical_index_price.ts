import { INDEX_PRICE_ROUTER } from "../../shared";
import { GetHistoricalIndexPriceParams } from "../../shared/types/params/indexPrice";
import { GetHistoricalIndexPriceResponse } from "../../shared/types/response/indexPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_historical_index_price(params: GetHistoricalIndexPriceParams): Promise<GetHistoricalIndexPriceResponse> {
  return await secureApiRequest<GetHistoricalIndexPriceResponse>({
    method: "POST",
    path: INDEX_PRICE_ROUTER.GET_HISTORICAL_INDEX_PRICE,
    queryParams: params,
    rateLimitKey: 'get_historical_index_price',
  });
}
