import { GetBalanceResponse } from "../../hooks/trading/account/get_balance";

export interface FormattedBalanceDetail {
  ccy: string;
  available: string;
  frozen: string;
  total: string;
  usdValue: string;
  unrealizedPnl?: string;
  unrealizedPnlRatio?: string;
}

export interface FormattedBalanceResponse {
  totalEquityUsd: string;
  currencies: FormattedBalanceDetail[];
  timestamp: string;
}

/**
 * Formats balance response to include only essential fields
 */
export function formatBalanceResponse(response: GetBalanceResponse): FormattedBalanceResponse {
  if (!response.data || response.data.length === 0) {
    return {
      totalEquityUsd: "0",
      currencies: [],
      timestamp: new Date().toISOString(),
    };
  }

  const accountData = response.data[0];

  const currencies: FormattedBalanceDetail[] = accountData.details
    .map(detail => {
      const totalEq = parseFloat(detail.eq || "0");
      const usdValue = parseFloat(detail.eqUsd || "0");

      // Skip currencies with zero balance
      if (totalEq === 0 && usdValue === 0) {
        return null;
      }

      const formatted: FormattedBalanceDetail = {
        ccy: detail.ccy,
        available: detail.availBal,
        frozen: detail.frozenBal,
        total: detail.eq,
        usdValue: detail.eqUsd,
      };

      // Add P&L info if available
      const spotUpl = detail.spotUpl || detail.upl;
      const spotUplRatio = detail.spotUplRatio || detail.uplLiab;

      if (spotUpl && spotUpl !== "" && spotUpl !== "0") {
        formatted.unrealizedPnl = spotUpl;
        formatted.unrealizedPnlRatio = spotUplRatio;
      }

      return formatted;
    })
    .filter((item): item is FormattedBalanceDetail => item !== null)
    .sort((a, b) => parseFloat(b.usdValue) - parseFloat(a.usdValue)); // Sort by USD value descending

  return {
    totalEquityUsd: accountData.totalEq,
    currencies,
    timestamp: new Date(parseInt(accountData.uTime)).toISOString(),
  };
}
