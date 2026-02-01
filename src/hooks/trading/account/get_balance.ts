import { TRADING_ACCOUNT_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetBalanceParams {
  ccy?: string; // Single currency or multiple currencies separated by comma
}

export interface BalanceDetail {
  availBal: string;
  availEq: string;
  cashBal: string;
  ccy: string;
  crossLiab: string;
  disEq: string;
  eq: string;
  eqUsd: string;
  fixedBal: string;
  frozenBal: string;
  interest: string;
  isoEq: string;
  isoLiab: string;
  isoUpl: string;
  liab: string;
  maxLoan: string;
  mgnRatio: string;
  notionalLever: string;
  ordFrozen: string;
  spotInUseAmt: string;
  stgyEq: string;
  twap: string;
  uTime: string;
  upl: string;
  uplLiab: string;
  spotUpl?: string;
  spotUplRatio?: string;
  totalPnl?: string;
  totalPnlRatio?: string;
}

export interface GetBalanceResponse {
  code: string;
  msg: string;
  data: Array<{
    adjEq: string;
    details: BalanceDetail[];
    imr: string;
    isoEq: string;
    mgnRatio: string;
    mmr: string;
    notionalUsd: string;
    ordFroz: string;
    totalEq: string;
    uTime: string;
  }>;
}

export async function get_balance(params?: GetBalanceParams): Promise<GetBalanceResponse> {
  return await secureApiRequest<GetBalanceResponse>({
    method: "GET",
    path: TRADING_ACCOUNT_ROUTER.GET_BALANCE,
    ...(params ? { queryParams: params } : {}),
    rateLimitKey: 'get_balance',
  });
}
