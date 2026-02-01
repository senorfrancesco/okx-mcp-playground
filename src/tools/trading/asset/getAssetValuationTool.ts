import { get_asset_valuation, GetAssetValuationParams, GetAssetValuationResponse } from "../../../hooks/trading/asset/get_asset_valuation";
import z from "zod";

const TOOL_NAME = "TRADING_GET_ASSET_VALUATION";

export const getAssetValuationParams = {
  ccy: {
    type: "string" as const,
    description: "Asset valuation currency (e.g., 'BTC', 'USDT', 'USD'). Default: BTC",
    required: false,
  },
};

export const getAssetValuationParamsZodSchema = z.object({
  ccy: z.string().optional(),
});

export type GetAssetValuationParamType = z.infer<typeof getAssetValuationParamsZodSchema>;

export const getAssetValuationTool = {
  name: TOOL_NAME,
  description: "Get total asset valuation across all accounts (trading, funding, earn). Returns balance breakdown by account type in specified currency.",
  inputSchema: getAssetValuationParamsZodSchema,
  handler: async (params: GetAssetValuationParamType): Promise<GetAssetValuationResponse> => {
    return await get_asset_valuation(params as GetAssetValuationParams);
  },
};
