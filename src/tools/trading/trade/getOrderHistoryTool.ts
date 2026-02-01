import { get_order_history, GetOrderHistoryParams, GetOrderHistoryResponse } from "../../../hooks/trading/trade/get_order_history";
import z from "zod";

const TOOL_NAME = "TRADING_GET_ORDER_HISTORY";

export const getOrderHistoryParams = {
  instType: {
    type: "string" as const,
    description: "Instrument type: SPOT, MARGIN, SWAP, FUTURES, or OPTION",
    required: false,
  },
  instId: {
    type: "string" as const,
    description: "Instrument ID (e.g., 'BTC-USDT')",
    required: false,
  },
  ordType: {
    type: "string" as const,
    description: "Order type: market, limit, post_only, fok, ioc, optimal_limit_ioc",
    required: false,
  },
  state: {
    type: "string" as const,
    description: "Order state: canceled or filled",
    required: false,
  },
  after: {
    type: "string" as const,
    description: "Pagination - order ID to get records earlier than this",
    required: false,
  },
  before: {
    type: "string" as const,
    description: "Pagination - order ID to get records newer than this",
    required: false,
  },
  limit: {
    type: "string" as const,
    description: "Number of results (max 100, default 100)",
    required: false,
  },
};

export const getOrderHistoryParamsZodSchema = z.object({
  instType: z.enum(["SPOT", "MARGIN", "SWAP", "FUTURES", "OPTION"]).optional(),
  instId: z.string().optional(),
  ordType: z.enum(["market", "limit", "post_only", "fok", "ioc", "optimal_limit_ioc"]).optional(),
  state: z.enum(["canceled", "filled"]).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
  limit: z.string().optional(),
});

export type GetOrderHistoryParamType = z.infer<typeof getOrderHistoryParamsZodSchema>;

export const getOrderHistoryTool = {
  name: TOOL_NAME,
  description: "Get historical orders (completed orders - filled or canceled). Shows order details, fill prices, fees, timestamps, and more.",
  inputSchema: getOrderHistoryParamsZodSchema,
  handler: async (params: GetOrderHistoryParamType): Promise<GetOrderHistoryResponse> => {
    return await get_order_history(params as GetOrderHistoryParams);
  },
};
