import { TRANSACTION_ROUTER } from "../../shared";
import { GetSpecificTransactionParams } from "../../shared/types/params/transaction";
import { GetSpecificTransactionResponse } from "../../shared/types/response/transaction";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_specific_transaction(params: GetSpecificTransactionParams): Promise<GetSpecificTransactionResponse> {
  return await secureApiRequest<GetSpecificTransactionResponse>({
    method: "GET",
    path: TRANSACTION_ROUTER.GET_SPECIFIC_TRANSACTION,
    queryParams: params,
    rateLimitKey: 'get_specific_transaction',
  });
}
