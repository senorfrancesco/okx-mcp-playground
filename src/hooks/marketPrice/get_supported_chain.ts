import { MARKET_PRICE_ROUTER } from "../../shared";
import { GetSupportedChainParams } from "src/shared/types/params/marketPrice";
import { GetSupportedChainResponse } from "../../shared/types/response/marketPrice";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_supported_chain(params: GetSupportedChainParams): Promise<GetSupportedChainResponse> {
  return await secureApiRequest<GetSupportedChainResponse>({
    method: "GET",
    path: MARKET_PRICE_ROUTER.GET_SUPPORTED_CHAIN,
    queryParams: params,
    rateLimitKey: 'get_supported_chain_marketprice',
  });
}
