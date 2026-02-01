import { TRADING_FINANCE_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetEarnBalanceParams {
  ccy?: string; // Single currency
}

export interface EarnBalanceDetail {
  amt: string;
  ccy: string;
  earnings: string;
  rate: string;
}

export interface GetEarnBalanceResponse {
  code: string;
  msg: string;
  data: EarnBalanceDetail[];
}

export async function get_earn_balance(params?: GetEarnBalanceParams): Promise<GetEarnBalanceResponse> {
  return await secureApiRequest<GetEarnBalanceResponse>({
    method: "GET",
    path: TRADING_FINANCE_ROUTER.GET_EARN_BALANCE,
    ...(params ? { queryParams: params } : {}),
    rateLimitKey: 'get_earn_balance',
  });
}
