import { get_candlesticks, GetCandlesticksParams, GetCandlesticksResponse } from "../../../hooks/trading/market/get_candlesticks";
import z from "zod";

const TOOL_NAME = "TRADING_GET_CANDLESTICKS";

export const getCandlesticksParams = {
  instId: {
    type: "string" as const,
    description: "Instrument ID (e.g., 'BTC-USDT', 'ETH-USDT')",
    required: true,
  },
  bar: {
    type: "string" as const,
    description: "Bar size: 1m, 3m, 5m, 15m, 30m, 1H, 2H, 4H, 6H, 12H, 1D, 1W, 1M, 3M, 6M, 1Y. Default: 1m",
    required: false,
  },
  after: {
    type: "string" as const,
    description: "Pagination - timestamp to get records earlier than this",
    required: false,
  },
  before: {
    type: "string" as const,
    description: "Pagination - timestamp to get records newer than this",
    required: false,
  },
  limit: {
    type: "string" as const,
    description: "Number of results (max 300, default 100)",
    required: false,
  },
};

export const getCandlesticksParamsZodSchema = z.object({
  instId: z.string(),
  bar: z.enum(["1m", "3m", "5m", "15m", "30m", "1H", "2H", "4H", "6H", "12H", "1D", "1W", "1M", "3M", "6M", "1Y"]).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
  limit: z.string().optional(),
});

export type GetCandlesticksParamType = z.infer<typeof getCandlesticksParamsZodSchema>;

export const getCandlesticksTool = {
  name: TOOL_NAME,
  description: "Get candlestick/OHLC data for technical analysis. Returns open, high, low, close, and volume for specified timeframes.",
  inputSchema: getCandlesticksParamsZodSchema,
  handler: async (params: GetCandlesticksParamType): Promise<GetCandlesticksResponse> => {
    return await get_candlesticks(params as GetCandlesticksParams);
  },
};
