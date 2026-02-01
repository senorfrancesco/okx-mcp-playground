import { GATEWAY_ROUTER } from "../../shared";
import { GetGasLimitParams } from "../../shared/types/params/gateway";
import { GetGasLimitResponse } from "../../shared/types/response/gateway";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_gas_limit(params: GetGasLimitParams): Promise<GetGasLimitResponse> {
  return await secureApiRequest<GetGasLimitResponse>({
    method: "POST",
    path: GATEWAY_ROUTER.GET_GAS_LIMIT,
    body: params,
    rateLimitKey: 'get_gas_limit',
  });
}
