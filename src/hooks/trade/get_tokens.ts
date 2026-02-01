import { TRADE_ROUTER } from "../../shared";
import { GetTokensParams } from "../../shared/types/params/trade";
import { GetTokensResponse } from "../../shared/types/response/trade";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_tokens(params: GetTokensParams): Promise<GetTokensResponse> {
  return await secureApiRequest<GetTokensResponse>({
    method: "GET",
    path: TRADE_ROUTER.GET_TOKENS,
    queryParams: params,
    rateLimitKey: 'get_tokens',
  });
}
