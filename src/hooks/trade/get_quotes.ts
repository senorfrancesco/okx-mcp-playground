import { TRADE_ROUTER } from "../../shared";
import { GetQuotesParams } from "../../shared/types/params/trade";
import { GetQuotesResponse } from "../../shared/types/response/trade";
import { secureApiRequest } from "../../shared/utils/apiHelper";

export async function get_quotes(params: GetQuotesParams): Promise<GetQuotesResponse> {
  return await secureApiRequest<GetQuotesResponse>({
    method: "GET",
    path: TRADE_ROUTER.GET_QUOTES,
    queryParams: params,
    rateLimitKey: 'get_quotes',
  });
}
