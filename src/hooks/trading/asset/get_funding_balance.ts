import { TRADING_ASSET_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetFundingBalanceParams {
  ccy?: string; // Single currency or multiple currencies separated by comma
}

export interface FundingBalanceDetail {
  availBal: string;
  bal: string;
  ccy: string;
  frozenBal: string;
}

export interface GetFundingBalanceResponse {
  code: string;
  msg: string;
  data: FundingBalanceDetail[];
}

export async function get_funding_balance(params?: GetFundingBalanceParams): Promise<GetFundingBalanceResponse> {
  return await secureApiRequest<GetFundingBalanceResponse>({
    method: "GET",
    path: TRADING_ASSET_ROUTER.GET_FUNDING_BALANCE,
    ...(params ? { queryParams: params } : {}),
    rateLimitKey: 'get_funding_balance',
  });
}
