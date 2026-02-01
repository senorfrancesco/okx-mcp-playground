import { GATEWAY_ROUTER } from "../../shared";
import { secureApiRequest } from "../../shared/utils/apiHelper";
import { GetSupportedChainResponse } from "../../shared/types/response/gateway";

export async function get_supported_chain(): Promise<GetSupportedChainResponse> {
  return await secureApiRequest<GetSupportedChainResponse>({
    method: "GET",
    path: GATEWAY_ROUTER.GET_SUPPORTED_CHAIN,
    rateLimitKey: 'get_supported_chain_gateway',
  });
}
