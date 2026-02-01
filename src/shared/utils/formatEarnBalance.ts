import { GetEarnBalanceResponse } from "../../hooks/trading/finance/get_earn_balance";
import { get_ticker } from "../../hooks/trading/market/get_ticker";

export interface FormattedEarnBalanceDetail {
  ccy: string;
  amount: string;
  earnings: string;
  rate: string;
  usdValue: string | undefined;
}

export interface FormattedEarnBalanceResponse {
  currencies: FormattedEarnBalanceDetail[];
  totalCurrencies: number;
  totalUsdValue: string;
}

/**
 * Formats earn balance response with USD values for each currency
 */
export async function formatEarnBalanceResponse(response: GetEarnBalanceResponse): Promise<FormattedEarnBalanceResponse> {
  if (!response.data || response.data.length === 0) {
    return {
      currencies: [],
      totalCurrencies: 0,
      totalUsdValue: "0.00",
    };
  }

  // Get prices for all currencies in parallel
  const pricePromises = response.data.map(async (detail) => {
    try {
      const tickerResponse = await get_ticker({ instId: `${detail.ccy}-USDT` });
      if (tickerResponse.data && tickerResponse.data.length > 0) {
        return {
          ccy: detail.ccy,
          price: parseFloat(tickerResponse.data[0].last),
        };
      }
    } catch (error) {
      // If ticker fails (e.g., pair doesn't exist), return null price
      return { ccy: detail.ccy, price: null };
    }
    return { ccy: detail.ccy, price: null };
  });

  const prices = await Promise.all(pricePromises);
  const priceMap = new Map(prices.map(p => [p.ccy, p.price]));

  let totalUsdValue = 0;

  const currencies: FormattedEarnBalanceDetail[] = response.data
    .filter(detail => parseFloat(detail.amt || "0") > 0) // Skip currencies with zero balance
    .map(detail => {
      const amount = parseFloat(detail.amt || "0");
      const price = priceMap.get(detail.ccy);
      const usdValue = price !== null && price !== undefined ? amount * price : undefined;

      if (usdValue !== undefined) {
        totalUsdValue += usdValue;
      }

      return {
        ccy: detail.ccy,
        amount: detail.amt,
        earnings: detail.earnings,
        rate: detail.rate,
        usdValue: usdValue !== undefined ? usdValue.toFixed(2) : undefined,
      };
    })
    .sort((a, b) => {
      // Sort by USD value if available, otherwise by amount
      const aValue = a.usdValue ? parseFloat(a.usdValue) : parseFloat(a.amount);
      const bValue = b.usdValue ? parseFloat(b.usdValue) : parseFloat(b.amount);
      return bValue - aValue;
    });

  return {
    currencies,
    totalCurrencies: currencies.length,
    totalUsdValue: totalUsdValue.toFixed(2),
  };
}
