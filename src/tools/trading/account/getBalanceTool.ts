import { get_balance, GetBalanceParams } from "../../../hooks/trading/account/get_balance";
import { formatBalanceResponse, FormattedBalanceResponse } from "../../../shared/utils/formatBalance";
import z from "zod";

const TOOL_NAME = "TRADING_GET_BALANCE";

export const getBalanceParams = {
  ccy: {
    type: "string" as const,
    description: "Single currency or multiple currencies separated by comma (e.g., 'BTC' or 'BTC,ETH,USDT'). Leave empty to get all currencies.",
    required: false,
  },
};

export const getBalanceParamsZodSchema = z.object({
  ccy: z.string().optional(),
});

export type GetBalanceParamType = z.infer<typeof getBalanceParamsZodSchema>;

export const getBalanceTool = {
  name: TOOL_NAME,
  description: "Get account balance for trading assets. Shows available balance, frozen balance, equity in USD, and more for each currency.",
  inputSchema: getBalanceParamsZodSchema,
  handler: async (params: GetBalanceParamType): Promise<FormattedBalanceResponse> => {
    const response = await get_balance(params as GetBalanceParams);
    return formatBalanceResponse(response);
  },
};
