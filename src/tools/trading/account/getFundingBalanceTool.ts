import { get_funding_balance, GetFundingBalanceParams } from "../../../hooks/trading/asset/get_funding_balance";
import { formatFundingBalanceResponse, FormattedFundingBalanceResponse } from "../../../shared/utils/formatFundingBalance";
import z from "zod";

const TOOL_NAME = "TRADING_GET_FUNDING_BALANCE";

export const getFundingBalanceParams = {
  ccy: {
    type: "string" as const,
    description: "Single currency or multiple currencies separated by comma (e.g., 'BTC' or 'BTC,ETH,USDT'). Leave empty to get all currencies.",
    required: false,
  },
};

export const getFundingBalanceParamsZodSchema = z.object({
  ccy: z.string().optional(),
});

export type GetFundingBalanceParamType = z.infer<typeof getFundingBalanceParamsZodSchema>;

export const getFundingBalanceTool = {
  name: TOOL_NAME,
  description: "Get funding account (main account) balance. This is where deposits/withdrawals go and where you store assets.",
  inputSchema: getFundingBalanceParamsZodSchema,
  handler: async (params: GetFundingBalanceParamType): Promise<FormattedFundingBalanceResponse> => {
    const response = await get_funding_balance(params as GetFundingBalanceParams);
    return formatFundingBalanceResponse(response);
  },
};
