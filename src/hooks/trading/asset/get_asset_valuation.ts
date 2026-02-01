import { TRADING_ASSET_ROUTER } from "../../../shared/constants/trading-endpoint";
import { secureApiRequest } from "../../../shared/utils/apiHelper";

export interface GetAssetValuationParams {
  ccy?: string; // Asset valuation currency (e.g., 'BTC', 'USDT'). Default: BTC
}

export interface AssetValuationDetails {
  classic?: string;  // [Deprecated] Classic account
  earn?: string;     // Earn account
  funding?: string;  // Funding account
  trading?: string;  // Trading account
}

export interface AssetValuationData {
  details: AssetValuationDetails;
  totalBal: string;  // Total balance
  ts: string;        // Timestamp
}

export interface GetAssetValuationResponse {
  code: string;
  msg: string;
  data: AssetValuationData[];
}

export async function get_asset_valuation(params?: GetAssetValuationParams): Promise<GetAssetValuationResponse> {
  return await secureApiRequest<GetAssetValuationResponse>({
    method: "GET",
    path: TRADING_ASSET_ROUTER.GET_ASSET_VALUATION,
    ...(params ? { queryParams: params } : {}),
    rateLimitKey: 'get_asset_valuation',
  });
}
