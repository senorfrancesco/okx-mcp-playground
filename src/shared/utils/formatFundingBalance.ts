import { GetFundingBalanceResponse } from "../../hooks/trading/asset/get_funding_balance";

export interface FormattedFundingBalanceDetail {
  ccy: string;
  available: string;
  frozen: string;
  total: string;
}

export interface FormattedFundingBalanceResponse {
  currencies: FormattedFundingBalanceDetail[];
  totalCurrencies: number;
}

/**
 * Formats funding balance response to include only essential fields
 */
export function formatFundingBalanceResponse(response: GetFundingBalanceResponse): FormattedFundingBalanceResponse {
  if (!response.data || response.data.length === 0) {
    return {
      currencies: [],
      totalCurrencies: 0,
    };
  }

  const currencies: FormattedFundingBalanceDetail[] = response.data
    .map(detail => {
      const total = parseFloat(detail.bal || "0");

      // Skip currencies with zero balance
      if (total === 0) {
        return null;
      }

      return {
        ccy: detail.ccy,
        available: detail.availBal,
        frozen: detail.frozenBal,
        total: detail.bal,
      };
    })
    .filter((item): item is FormattedFundingBalanceDetail => item !== null)
    .sort((a, b) => parseFloat(b.total) - parseFloat(a.total)); // Sort by total descending

  return {
    currencies,
    totalCurrencies: currencies.length,
  };
}
