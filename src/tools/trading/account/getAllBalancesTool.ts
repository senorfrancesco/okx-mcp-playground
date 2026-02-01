import { get_balance } from "../../../hooks/trading/account/get_balance";
import { get_funding_balance } from "../../../hooks/trading/asset/get_funding_balance";
import { get_earn_balance } from "../../../hooks/trading/finance/get_earn_balance";
import { formatBalanceResponse } from "../../../shared/utils/formatBalance";
import { formatFundingBalanceResponse } from "../../../shared/utils/formatFundingBalance";
import { formatEarnBalanceResponse } from "../../../shared/utils/formatEarnBalance";
import z from "zod";

const TOOL_NAME = "TRADING_GET_ALL_BALANCES";

export const getAllBalancesParamsZodSchema = z.object({});

export type GetAllBalancesParamType = z.infer<typeof getAllBalancesParamsZodSchema>;

export interface AllBalancesResponse {
  tradingAccount: {
    totalEquityUsd: string;
    currencies: any[];
    timestamp: string;
  };
  fundingAccount: {
    currencies: any[];
    totalCurrencies: number;
  };
  earnAccount: {
    currencies: any[];
    totalCurrencies: number;
    totalUsdValue?: string;
  };
}

export const getAllBalancesTool = {
  name: TOOL_NAME,
  description: "Get balances from all accounts: Trading (spot/derivatives), Funding (main deposit/withdrawal), and Earn (savings/interest). Provides a complete overview of all your OKX assets.",
  inputSchema: getAllBalancesParamsZodSchema,
  handler: async (_params: GetAllBalancesParamType): Promise<AllBalancesResponse> => {
    // Fetch all balances in parallel
    const [tradingResponse, fundingResponse, earnResponse] = await Promise.all([
      get_balance().catch(() => ({ code: "1", msg: "Error", data: [] })),
      get_funding_balance().catch(() => ({ code: "1", msg: "Error", data: [] })),
      get_earn_balance().catch(() => ({ code: "1", msg: "Error", data: [] })),
    ]);

    const earnAccount = await formatEarnBalanceResponse(earnResponse);

    return {
      tradingAccount: formatBalanceResponse(tradingResponse),
      fundingAccount: formatFundingBalanceResponse(fundingResponse),
      earnAccount,
    };
  },
};
