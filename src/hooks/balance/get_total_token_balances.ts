import { BALANCE_ROUTER } from "../../shared";
import { GetTotalTokenBalancesParams } from "../../shared/types/params/balance";
import { GetTotalTokenBalancesResponse } from "../../shared/types/response/balance";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_total_token_balances(params: GetTotalTokenBalancesParams): Promise<GetTotalTokenBalancesResponse> {
  return await secureApiRequest<GetTotalTokenBalancesResponse>({
    method: "GET",
    path: BALANCE_ROUTER.GET_TOTAL_TOKEN_BALANCES,
    queryParams: params,
    rateLimitKey: 'get_total_token_balances',
  });
}
