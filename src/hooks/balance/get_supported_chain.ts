import { BALANCE_ROUTER } from "../../shared";
import { secureApiRequest } from "../../shared/utils/apiHelper";
import { GetSupportedChainResponse } from "../../shared/types/response/balance";

export async function get_supported_chain(): Promise<GetSupportedChainResponse> {
  return await secureApiRequest<GetSupportedChainResponse>({
    method: "GET",
    path: BALANCE_ROUTER.GET_SUPPORTED_CHAIN,
    rateLimitKey: 'get_supported_chain_balance',
  });
}
