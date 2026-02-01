/**
 * Input validation utilities using Zod schemas
 */
import { z } from "zod";

/**
 * Common validation schemas
 */

// Ethereum address validation
export const ethereumAddressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format");

// Solana address validation
export const solanaAddressSchema = z
  .string()
  .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, "Invalid Solana address format");

// Chain index validation
export const chainIndexSchema = z
  .string()
  .min(1, "Chain index is required")
  .max(10, "Chain index too long");

// Amount validation
export const amountSchema = z
  .string()
  .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  });

// Slippage validation (0-100%)
export const slippageSchema = z
  .string()
  .refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Slippage must be between 0 and 100",
    }
  );

// Transaction hash validation
export const txHashSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/, "Invalid transaction hash");

/**
 * Execute Swap Parameters Validation
 */
export const ExecuteSwapParamsSchema = z.object({
  chainIndex: chainIndexSchema,
  chainId: z.string().optional(),
  amount: amountSchema,
  swapMode: z.enum(["exactIn", "exactOut"]).optional(),
  fromTokenAddress: z.string().min(1, "From token address is required"),
  toTokenAddress: z.string().min(1, "To token address is required"),
  slippage: slippageSchema,
  userWalletAddress: z.string().min(1, "User wallet address is required"),
  swapReceiverAddress: z.string().optional(),
  feePercent: z.string().optional(),
  fromTokenReferrerWalletAddress: z.string().optional(),
  toTokenReferrerWalletAddress: z.string().optional(),
  positiveSlippagePercent: z.string().optional(),
  positiveSlippageFeeAddress: z.string().optional(),
  gasLevel: z.enum(["low", "medium", "high"]).optional(),
  gasPrice: z.string().optional(),
  computeUnitLimit: z.string().optional(),
  computeUnitPrice: z.string().optional(),
  tips: z.string().optional(),
  dexIds: z.string().optional(),
  directRoute: z.boolean().optional(),
  priceImpactProtectionPercentage: z.string().optional(),
  callDataMemo: z.string().max(1000, "Call data memo too long").optional(),
  autoSlippage: z.boolean().optional(),
  maxAutoSlippage: z.string().optional(),
});

/**
 * Broadcast Transaction Parameters Validation
 */
export const BroadcastTransactionParamsSchema = z.object({
  signedTx: z.string().min(1, "Signed transaction is required"),
  chainIndex: chainIndexSchema,
  address: z.string().min(1, "Address is required"),
  extraData: z.string().optional(),
  enableMevProtection: z.boolean().optional(),
  jitoSignedTx: z.string().optional(),
});

/**
 * Get Balance Parameters Validation
 */
export const GetBalanceParamsSchema = z.object({
  address: z.string().min(1, "Address is required"),
  chainIndex: chainIndexSchema.optional(),
  tokenContractAddress: z.string().optional(),
  protocolVersion: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  maxRequestsPerSecond: number;
  maxRequestsPerMinute: number;
  timeoutMs: number;
}

export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  maxRequestsPerSecond: 10,
  maxRequestsPerMinute: 100,
  timeoutMs: 30000, // 30 seconds
};

/**
 * Validate and sanitize user input
 */
export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      throw new Error(
        `Validation failed: ${JSON.stringify(issues, null, 2)}`
      );
    }
    throw error;
  }
};
