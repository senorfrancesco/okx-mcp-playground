/**
 * OKX Trading API Endpoints
 * Documentation: https://www.okx.com/docs-v5/en/
 */

export type TradingAccountRouterKeys =
  | "GET_BALANCE"
  | "GET_POSITIONS"
  | "GET_ACCOUNT_CONFIG"
  | "GET_MAX_SIZE"
  | "GET_LEVERAGE_INFO";

export type TradingAssetRouterKeys =
  | "GET_FUNDING_BALANCE"
  | "GET_ASSET_VALUATION"
  | "TRANSFER";

export type TradingFinanceRouterKeys =
  | "GET_EARN_BALANCE"
  | "GET_SAVINGS_BALANCE";

export type TradingMarketRouterKeys =
  | "GET_TICKERS"
  | "GET_TICKER"
  | "GET_INDEX_TICKERS"
  | "GET_ORDER_BOOK"
  | "GET_CANDLESTICKS"
  | "GET_CANDLESTICKS_HISTORY"
  | "GET_TRADES"
  | "GET_MARK_PRICE";

export type TradingTradeRouterKeys =
  | "PLACE_ORDER"
  | "PLACE_MULTIPLE_ORDERS"
  | "CANCEL_ORDER"
  | "CANCEL_MULTIPLE_ORDERS"
  | "GET_ORDER_DETAILS"
  | "GET_ORDER_LIST"
  | "GET_ORDER_HISTORY"
  | "GET_TRANSACTION_DETAILS";

/**
 * Account API - Balance, positions, account configuration
 */
export const TRADING_ACCOUNT_ROUTER: Record<TradingAccountRouterKeys, string> = {
  GET_BALANCE: "/api/v5/account/balance",
  GET_POSITIONS: "/api/v5/account/positions",
  GET_ACCOUNT_CONFIG: "/api/v5/account/config",
  GET_MAX_SIZE: "/api/v5/account/max-size",
  GET_LEVERAGE_INFO: "/api/v5/account/leverage-info",
};

/**
 * Market Data API - Tickers, order books, candlesticks
 */
export const TRADING_MARKET_ROUTER: Record<TradingMarketRouterKeys, string> = {
  GET_TICKERS: "/api/v5/market/tickers",
  GET_TICKER: "/api/v5/market/ticker",
  GET_INDEX_TICKERS: "/api/v5/market/index-tickers",
  GET_ORDER_BOOK: "/api/v5/market/books",
  GET_CANDLESTICKS: "/api/v5/market/candles",
  GET_CANDLESTICKS_HISTORY: "/api/v5/market/history-candles",
  GET_TRADES: "/api/v5/market/trades",
  GET_MARK_PRICE: "/api/v5/market/mark-price",
};

/**
 * Trade API - Place orders, cancel orders, get order history
 */
export const TRADING_TRADE_ROUTER: Record<TradingTradeRouterKeys, string> = {
  PLACE_ORDER: "/api/v5/trade/order",
  PLACE_MULTIPLE_ORDERS: "/api/v5/trade/batch-orders",
  CANCEL_ORDER: "/api/v5/trade/cancel-order",
  CANCEL_MULTIPLE_ORDERS: "/api/v5/trade/cancel-batch-orders",
  GET_ORDER_DETAILS: "/api/v5/trade/order",
  GET_ORDER_LIST: "/api/v5/trade/orders-pending",
  GET_ORDER_HISTORY: "/api/v5/trade/orders-history",
  GET_TRANSACTION_DETAILS: "/api/v5/trade/fills",
};

/**
 * Asset API - Funding account balance, transfers
 */
export const TRADING_ASSET_ROUTER: Record<TradingAssetRouterKeys, string> = {
  GET_FUNDING_BALANCE: "/api/v5/asset/balances",
  GET_ASSET_VALUATION: "/api/v5/asset/asset-valuation",
  TRANSFER: "/api/v5/asset/transfer",
};

/**
 * Finance API - Earn/Savings account balance
 */
export const TRADING_FINANCE_ROUTER: Record<TradingFinanceRouterKeys, string> = {
  GET_EARN_BALANCE: "/api/v5/finance/savings/balance",
  GET_SAVINGS_BALANCE: "/api/v5/finance/savings/balance",
};
