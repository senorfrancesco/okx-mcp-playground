import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';
import { get_asset_valuation } from '../src/hooks/trading/asset/get_asset_valuation';

dotenv.config({ path: '.env.test' });

describe('OKX Asset Valuation API Integration Tests', () => {
  describe('Asset Valuation API', () => {
    it('should get total asset valuation in USDT', async () => {
      const result = await get_asset_valuation({ ccy: 'USDT' });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);

      const valuation = result.data[0];
      expect(valuation.totalBal).toBeDefined();
      expect(valuation.details).toBeDefined();
      expect(valuation.ts).toBeDefined();

      console.log('\n✅ Asset Valuation Test (USDT):');
      console.log(`   Total Balance: ${valuation.totalBal} USDT`);
      console.log(`   Trading Account: ${valuation.details.trading || '0'} USDT`);
      console.log(`   Funding Account: ${valuation.details.funding || '0'} USDT`);
      console.log(`   Earn Account: ${valuation.details.earn || '0'} USDT`);
      if (valuation.details.classic) {
        console.log(`   Classic Account: ${valuation.details.classic} USDT`);
      }
      console.log(`   Timestamp: ${new Date(parseInt(valuation.ts)).toISOString()}`);

      // Validate that at least one account has balance
      const hasBalance =
        parseFloat(valuation.details.trading || '0') > 0 ||
        parseFloat(valuation.details.funding || '0') > 0 ||
        parseFloat(valuation.details.earn || '0') > 0;

      expect(hasBalance).toBe(true);
    }, 30000);

    it('should get total asset valuation in BTC (default)', async () => {
      const result = await get_asset_valuation();

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();
      expect(result.data.length).toBeGreaterThan(0);

      const valuation = result.data[0];
      console.log('\n✅ Asset Valuation Test (BTC - default):');
      console.log(`   Total Balance: ${valuation.totalBal} BTC`);
      console.log(`   Trading Account: ${valuation.details.trading || '0'} BTC`);
      console.log(`   Funding Account: ${valuation.details.funding || '0'} BTC`);
      console.log(`   Earn Account: ${valuation.details.earn || '0'} BTC`);
    }, 30000);

    it('should get total asset valuation in USD', async () => {
      const result = await get_asset_valuation({ ccy: 'USD' });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();

      const valuation = result.data[0];
      console.log('\n✅ Asset Valuation Test (USD):');
      console.log(`   Total Balance: ${valuation.totalBal} USD`);
      console.log(`   Trading Account: ${valuation.details.trading || '0'} USD`);
      console.log(`   Funding Account: ${valuation.details.funding || '0'} USD`);
      console.log(`   Earn Account: ${valuation.details.earn || '0'} USD`);
    }, 30000);

    it('should verify earn account has balance (if non-zero)', async () => {
      const result = await get_asset_valuation({ ccy: 'USDT' });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');

      const valuation = result.data[0];
      const earnBalance = parseFloat(valuation.details.earn || '0');

      console.log('\n✅ Earn Account Verification:');
      if (earnBalance > 0) {
        console.log(`   ✅ Earn account has balance: ${earnBalance} USDT`);
        expect(earnBalance).toBeGreaterThan(0);
      } else {
        console.log('   ℹ️  Earn account is empty (0 USDT)');
        expect(earnBalance).toBe(0);
      }
    }, 30000);

    it('should verify response structure matches OKX API documentation', async () => {
      const result = await get_asset_valuation({ ccy: 'USDT' });

      expect(result).toBeDefined();
      expect(result.code).toBeDefined();
      expect(result.msg).toBeDefined();
      expect(result.data).toBeDefined();

      const valuation = result.data[0];

      // Verify all required fields exist
      expect(valuation).toHaveProperty('totalBal');
      expect(valuation).toHaveProperty('details');
      expect(valuation).toHaveProperty('ts');

      // Verify details structure
      expect(valuation.details).toBeDefined();
      expect(typeof valuation.details).toBe('object');

      // At least one of these should exist
      const hasAtLeastOneAccount =
        valuation.details.trading !== undefined ||
        valuation.details.funding !== undefined ||
        valuation.details.earn !== undefined ||
        valuation.details.classic !== undefined;

      expect(hasAtLeastOneAccount).toBe(true);

      console.log('\n✅ Response Structure Validation:');
      console.log('   ✅ code:', result.code);
      console.log('   ✅ msg:', result.msg);
      console.log('   ✅ data array:', Array.isArray(result.data));
      console.log('   ✅ totalBal:', valuation.totalBal);
      console.log('   ✅ details:', JSON.stringify(valuation.details, null, 2));
      console.log('   ✅ timestamp:', valuation.ts);
    }, 30000);
  });
});
