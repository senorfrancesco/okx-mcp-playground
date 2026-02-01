import { describe, it, expect, beforeAll } from 'vitest';
import dotenv from 'dotenv';
import { get_supported_chain as getBalanceSupportedChain } from '../src/hooks/balance/get_supported_chain';
import { get_price } from '../src/hooks/marketPrice/get_price';

// Load test environment variables
dotenv.config({ path: '.env.test' });

describe('OKX API Integration Tests', () => {
  beforeAll(() => {
    // Verify environment variables are set
    const requiredEnvVars = ['OKX_API_KEY', 'OKX_API_SECRET', 'OKX_PASSPHRASE'];
    const missing = requiredEnvVars.filter(key => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables in .env.test: ${missing.join(', ')}\n` +
        'Please create .env.test file with your OKX API credentials.'
      );
    }
  });

  describe('Balance API', () => {
    it('should fetch supported chains', async () => {
      const result = await getBalanceSupportedChain();

      expect(result).toBeDefined();
      expect(result).toHaveProperty('code');
      expect(result).toHaveProperty('data');

      console.log('✅ Balance - Supported Chains:', JSON.stringify(result, null, 2));
    }, 30000); // 30 second timeout
  });

  describe('Market Price API', () => {
    it('should fetch ETH price', async () => {
      const result = await get_price({
        chainId: '1', // Ethereum mainnet
        tokenContractAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // Native ETH
      });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('code');
      expect(result).toHaveProperty('data');

      if (result.data && Array.isArray(result.data) && result.data[0]) {
        expect(result.data[0]).toHaveProperty('price');
        console.log('✅ Market Price - ETH Price:', result.data[0].price);
      }

      console.log('✅ Full Response:', JSON.stringify(result, null, 2));
    }, 30000);
  });

  describe('Authentication', () => {
    it('should have valid API credentials format', () => {
      expect(process.env.OKX_API_KEY).toBeTruthy();
      expect(process.env.OKX_API_SECRET).toBeTruthy();
      expect(process.env.OKX_PASSPHRASE).toBeTruthy();

      console.log('✅ Environment variables loaded correctly');
    });
  });
});
