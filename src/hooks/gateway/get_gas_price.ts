import { GATEWAY_ROUTER } from "../../shared";
import { GetGasPriceParams } from "../../shared/types/params/gateway";
import { GetGasPriceResponse } from "../../shared/types/response/gateway";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_gas_price(params: GetGasPriceParams): Promise<GetGasPriceResponse> {
  return await secureApiRequest<GetGasPriceResponse>({
    method: "GET",
    path: GATEWAY_ROUTER.GET_GAS_PRICE,
    queryParams: params,
    rateLimitKey: 'get_gas_price',
  });
}
