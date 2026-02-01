import { get_ticker, GetTickerParams, GetTickerResponse } from "../../../hooks/trading/market/get_ticker";
import z from "zod";

const TOOL_NAME = "TRADING_GET_TICKER";

export const getTickerParams = {
  instId: {
    type: "string" as const,
    description: "Instrument ID (e.g., 'BTC-USDT', 'ETH-USDT', 'BTC-USD-SWAP')",
    required: true,
  },
};

export const getTickerParamsZodSchema = z.object({
  instId: z.string(),
});

export type GetTickerParamType = z.infer<typeof getTickerParamsZodSchema>;

export const getTickerTool = {
  name: TOOL_NAME,
  description: "Get ticker information for a specific trading pair. Returns last price, bid/ask, 24h high/low, volume, and more.",
  inputSchema: getTickerParamsZodSchema,
  handler: async (params: GetTickerParamType): Promise<GetTickerResponse> => {
    return await get_ticker(params as GetTickerParams);
  },
};
