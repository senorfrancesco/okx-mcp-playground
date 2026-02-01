import { TRANSACTION_ROUTER } from "../../shared";
import { GetHitoryByAddressParams } from "../../shared/types/params/transaction";
import { GetHistoryByAddressResponse } from "../../shared/types/response/transaction";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_history_by_address(params: GetHitoryByAddressParams): Promise<GetHistoryByAddressResponse> {
  return await secureApiRequest<GetHistoryByAddressResponse>({
    method: "GET",
    path: TRANSACTION_ROUTER.GET_HISTORY_BY_ADDRESS,
    queryParams: params,
    rateLimitKey: 'get_history_by_address',
  });
}
