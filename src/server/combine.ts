import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getBalanceTool, GetBalanceParamType } from "../tools/trading/account/getBalanceTool";
import { getFundingBalanceTool, GetFundingBalanceParamType } from "../tools/trading/account/getFundingBalanceTool";
import { getEarnBalanceTool, GetEarnBalanceParamType } from "../tools/trading/account/getEarnBalanceTool";
import { getAllBalancesTool, GetAllBalancesParamType } from "../tools/trading/account/getAllBalancesTool";
import { getAssetValuationTool, GetAssetValuationParamType } from "../tools/trading/asset/getAssetValuationTool";
import { getTickerTool, GetTickerParamType } from "../tools/trading/market/getTickerTool";
import { getTickersTool, GetTickersParamType } from "../tools/trading/market/getTickersTool";
import { getCandlesticksTool, GetCandlesticksParamType } from "../tools/trading/market/getCandlesticksTool";
import { getOrderHistoryTool, GetOrderHistoryParamType } from "../tools/trading/trade/getOrderHistoryTool";

/**
 * Combined MCP Server for OKX Trading API
 * Provides tools for account balance, market data, and trading operations
 */
export const combineMcpServer = () => {
  const server = new McpServer({
    name: "OKX_TRADING_MCP_SERVER",
    version: "1.0.0",
  });

  // ==================== ACCOUNT API ====================

  server.tool(
    getBalanceTool.name,
    getBalanceTool.description,
    {
      ccy: {
        type: "string",
        description: "Single currency or multiple currencies separated by comma (e.g., 'BTC' or 'BTC,ETH,USDT'). Leave empty to get all currencies.",
      },
    },
    async (args: any) => {
      const data = await getBalanceTool.handler(args as GetBalanceParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    getFundingBalanceTool.name,
    getFundingBalanceTool.description,
    {
      ccy: {
        type: "string",
        description: "Single currency or multiple currencies separated by comma (e.g., 'BTC' or 'BTC,ETH,USDT'). Leave empty to get all currencies.",
      },
    },
    async (args: any) => {
      const data = await getFundingBalanceTool.handler(args as GetFundingBalanceParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    getEarnBalanceTool.name,
    getEarnBalanceTool.description,
    {
      ccy: {
        type: "string",
        description: "Single currency to filter (e.g., 'BTC'). Leave empty to get all currencies.",
      },
    },
    async (args: any) => {
      const data = await getEarnBalanceTool.handler(args as GetEarnBalanceParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    getAllBalancesTool.name,
    getAllBalancesTool.description,
    {},
    async (args: any) => {
      const data = await getAllBalancesTool.handler(args as GetAllBalancesParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    getAssetValuationTool.name,
    getAssetValuationTool.description,
    {
      ccy: {
        type: "string",
        description: "Asset valuation currency (e.g., 'BTC', 'USDT', 'USD'). Default: BTC",
      },
    },
    async (args: any) => {
      const data = await getAssetValuationTool.handler(args as GetAssetValuationParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  // ==================== MARKET DATA API ====================

  server.tool(
    getTickerTool.name,
    getTickerTool.description,
    {
      instId: {
        type: "string",
        description: "Instrument ID (e.g., 'BTC-USDT', 'ETH-USDT', 'BTC-USD-SWAP')",
        required: true,
      },
    },
    async (args: any) => {
      const data = await getTickerTool.handler(args as GetTickerParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    getTickersTool.name,
    getTickersTool.description,
    {
      instType: {
        type: "string",
        description: "Instrument type: SPOT (spot trading), SWAP (perpetual), FUTURES, or OPTION",
        required: true,
      },
      uly: {
        type: "string",
        description: "Underlying (e.g., 'BTC-USD'). Optional.",
      },
      instFamily: {
        type: "string",
        description: "Instrument family (e.g., 'BTC-USD'). Optional.",
      },
    },
    async (args: any) => {
      const data = await getTickersTool.handler(args as GetTickersParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    getCandlesticksTool.name,
    getCandlesticksTool.description,
    {
      instId: {
        type: "string",
        description: "Instrument ID (e.g., 'BTC-USDT', 'ETH-USDT')",
        required: true,
      },
      bar: {
        type: "string",
        description: "Bar size: 1m, 3m, 5m, 15m, 30m, 1H, 2H, 4H, 6H, 12H, 1D, 1W, 1M, 3M, 6M, 1Y. Default: 1m",
      },
      after: {
        type: "string",
        description: "Pagination - timestamp to get records earlier than this",
      },
      before: {
        type: "string",
        description: "Pagination - timestamp to get records newer than this",
      },
      limit: {
        type: "string",
        description: "Number of results (max 300, default 100)",
      },
    },
    async (args: any) => {
      const data = await getCandlesticksTool.handler(args as GetCandlesticksParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  // ==================== TRADE API ====================

  server.tool(
    getOrderHistoryTool.name,
    getOrderHistoryTool.description,
    {
      instType: {
        type: "string",
        description: "Instrument type: SPOT, MARGIN, SWAP, FUTURES, or OPTION",
      },
      instId: {
        type: "string",
        description: "Instrument ID (e.g., 'BTC-USDT')",
      },
      ordType: {
        type: "string",
        description: "Order type: market, limit, post_only, fok, ioc, optimal_limit_ioc",
      },
      state: {
        type: "string",
        description: "Order state: canceled or filled",
      },
      after: {
        type: "string",
        description: "Pagination - order ID to get records earlier than this",
      },
      before: {
        type: "string",
        description: "Pagination - order ID to get records newer than this",
      },
      limit: {
        type: "string",
        description: "Number of results (max 100, default 100)",
      },
    },
    async (args: any) => {
      const data = await getOrderHistoryTool.handler(args as GetOrderHistoryParamType);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );

  return server;
};

