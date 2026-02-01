import { TRADE_ROUTER } from "../../shared";
import { GetSupportedChainsParams } from "../../shared/types/params/trade";
import { GetSupportedChainsResponse } from "../../shared/types/response/trade";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_supported_chains(params: GetSupportedChainsParams): Promise<GetSupportedChainsResponse> {
  return await secureApiRequest<GetSupportedChainsResponse>({
    method: "GET",
    path: TRADE_ROUTER.GET_SUPPORTED_CHAIN,
    queryParams: params,
    rateLimitKey: 'get_supported_chains',
  });
}
