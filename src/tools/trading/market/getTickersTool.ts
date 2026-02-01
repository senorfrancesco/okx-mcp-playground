import { get_tickers, GetTickersParams, GetTickersResponse } from "../../../hooks/trading/market/get_tickers";
import z from "zod";

const TOOL_NAME = "TRADING_GET_TICKERS";

export const getTickersParams = {
  instType: {
    type: "string" as const,
    description: "Instrument type: SPOT (spot trading), SWAP (perpetual), FUTURES, or OPTION",
    required: true,
  },
  uly: {
    type: "string" as const,
    description: "Underlying (e.g., 'BTC-USD'). Optional.",
    required: false,
  },
  instFamily: {
    type: "string" as const,
    description: "Instrument family (e.g., 'BTC-USD'). Optional.",
    required: false,
  },
};

export const getTickersParamsZodSchema = z.object({
  instType: z.enum(["SPOT", "SWAP", "FUTURES", "OPTION"]),
  uly: z.string().optional(),
  instFamily: z.string().optional(),
});

export type GetTickersParamType = z.infer<typeof getTickersParamsZodSchema>;

export const getTickersTool = {
  name: TOOL_NAME,
  description: "Get ticker information for all trading pairs of a specific type (SPOT, SWAP, FUTURES, OPTION). Returns prices, volumes, and 24h stats for multiple instruments.",
  inputSchema: getTickersParamsZodSchema,
  handler: async (params: GetTickersParamType): Promise<GetTickersResponse> => {
    return await get_tickers(params as GetTickersParams);
  },
};
