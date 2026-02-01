import { TRADE_ROUTER } from "../../shared";
import { GetLiquiditySourcesParams } from "../../shared/types/params/trade";
import { GetLiquiditySourcesResponse } from "../../shared/types/response/trade";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_liquidity_sources(params: GetLiquiditySourcesParams): Promise<GetLiquiditySourcesResponse> {
  return await secureApiRequest<GetLiquiditySourcesResponse>({
    method: "GET",
    path: TRADE_ROUTER.GET_LIQUIDITY_SOURCES,
    queryParams: params,
    rateLimitKey: 'get_liquidity_sources',
  });
}
