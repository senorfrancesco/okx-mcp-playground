import { BALANCE_ROUTER } from "../../shared";
import { GetSpecificTokenBalanceParams } from "../../shared/types/params/balance";
import { GetSpecificTokenBalanceResponse } from "../../shared/types/response/balance";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_specific_token_balance(params: GetSpecificTokenBalanceParams): Promise<GetSpecificTokenBalanceResponse> {
  return await secureApiRequest<GetSpecificTokenBalanceResponse>({
    method: "POST",
    path: BALANCE_ROUTER.GET_SPECIFIC_TOKEN_BALANCE,
    body: params,
    rateLimitKey: 'get_specific_token_balance',
  });
}
