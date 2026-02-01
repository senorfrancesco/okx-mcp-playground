import { get_earn_balance, GetEarnBalanceParams } from "../../../hooks/trading/finance/get_earn_balance";
import { formatEarnBalanceResponse, FormattedEarnBalanceResponse } from "../../../shared/utils/formatEarnBalance";
import z from "zod";

const TOOL_NAME = "TRADING_GET_EARN_BALANCE";

export const getEarnBalanceParams = {
  ccy: {
    type: "string" as const,
    description: "Single currency to filter (e.g., 'BTC'). Leave empty to get all currencies.",
    required: false,
  },
};

export const getEarnBalanceParamsZodSchema = z.object({
  ccy: z.string().optional(),
});

export type GetEarnBalanceParamType = z.infer<typeof getEarnBalanceParamsZodSchema>;

export const getEarnBalanceTool = {
  name: TOOL_NAME,
  description: "Get earn account balance with interest earnings. Shows assets deposited in savings/earn products.",
  inputSchema: getEarnBalanceParamsZodSchema,
  handler: async (params: GetEarnBalanceParamType): Promise<FormattedEarnBalanceResponse> => {
    const response = await get_earn_balance(params as GetEarnBalanceParams);
    return formatEarnBalanceResponse(response);
  },
};
