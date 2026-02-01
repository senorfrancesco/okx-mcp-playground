import { BALANCE_ROUTER } from "../../shared";
import { GetTotalValueParams } from "../../shared/types/params/balance";
import { GetTotalValueResponse } from "../../shared/types/response/balance";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_total_value(params: GetTotalValueParams): Promise<GetTotalValueResponse> {
  return await secureApiRequest<GetTotalValueResponse>({
    method: "GET",
    path: BALANCE_ROUTER.GET_TOTAL_VALUE,
    queryParams: params,
    rateLimitKey: 'get_total_value',
  });
}
