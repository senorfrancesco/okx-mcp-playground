import { TRADE_ROUTER } from "../../shared";
import { GetTransactionStatusParams } from "../../shared/types/params/trade";
import { GetTransactionStatusResponse } from "../../shared/types/response/trade";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_transaction_status(params: GetTransactionStatusParams): Promise<GetTransactionStatusResponse> {
  return await secureApiRequest<GetTransactionStatusResponse>({
    method: "GET",
    path: TRADE_ROUTER.GET_TRANSACTION_STATUS,
    queryParams: params,
    rateLimitKey: 'get_transaction_status',
  });
}
