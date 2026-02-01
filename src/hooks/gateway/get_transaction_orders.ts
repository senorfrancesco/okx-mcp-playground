import { GATEWAY_ROUTER } from "../../shared";
import { GetTransactionOrdersParams } from "../../shared/types/params/gateway";
import { GetTransactionOrdersResponse } from "../../shared/types/response/gateway";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_transaction_orders(params: GetTransactionOrdersParams): Promise<GetTransactionOrdersResponse> {
  return await secureApiRequest<GetTransactionOrdersResponse>({
    method: "GET",
    path: GATEWAY_ROUTER.GET_TRANSACTION_ORDER,
    queryParams: params,
    rateLimitKey: 'get_transaction_orders',
  });
}
