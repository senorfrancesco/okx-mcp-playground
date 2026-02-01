import { INDEX_PRICE_ROUTER } from "../../shared";
import { secureApiRequest } from "../../shared/utils/apiHelper";
import { GetSupportedChainResponse } from "../../shared/types/response/indexPrice";

export async function get_supported_chain(): Promise<GetSupportedChainResponse> {
  return await secureApiRequest<GetSupportedChainResponse>({
    method: "GET",
    path: INDEX_PRICE_ROUTER.GET_SUPPORTED_CHAIN,
    rateLimitKey: 'get_supported_chain_indexprice',
  });
}
