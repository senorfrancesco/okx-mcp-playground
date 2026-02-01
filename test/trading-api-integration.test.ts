import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';
import { get_balance } from '../src/hooks/trading/account/get_balance';
import { get_ticker } from '../src/hooks/trading/market/get_ticker';
import { get_tickers } from '../src/hooks/trading/market/get_tickers';
import { get_candlesticks } from '../src/hooks/trading/market/get_candlesticks';

dotenv.config({ path: '.env.test' });

describe('OKX Trading API Integration Tests', () => {
  describe('Account API', () => {
    it('should get account balance', async () => {
      const result = await get_balance();

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);

      if (result.data.length > 0 && result.data[0].details.length > 0) {
        const firstCurrency = result.data[0].details[0];
        console.log('\n✅ Account Balance Test:');
        console.log(`   Currency: ${firstCurrency.ccy}`);
        console.log(`   Available: ${firstCurrency.availBal}`);
        console.log(`   Equity USD: ${firstCurrency.eqUsd}`);
      }
    }, 30000);

    it('should get specific currency balance (BTC)', async () => {
      const result = await get_balance({ ccy: 'BTC' });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');

      console.log('\n✅ BTC Balance:', JSON.stringify(result.data, null, 2));
    }, 30000);
  });

  describe('Market Data API', () => {
    it('should get BTC-USDT ticker', async () => {
      const result = await get_ticker({ instId: 'BTC-USDT' });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();
      expect(result.data.length).toBeGreaterThan(0);

      const ticker = result.data[0];
      console.log('\n✅ BTC-USDT Ticker:');
      console.log(`   Last Price: ${ticker.last}`);
      console.log(`   24h High: ${ticker.high24h}`);
      console.log(`   24h Low: ${ticker.low24h}`);
      console.log(`   24h Volume: ${ticker.vol24h}`);
    }, 30000);

    it('should get all SPOT tickers', async () => {
      const result = await get_tickers({ instType: 'SPOT' });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();
      expect(result.data.length).toBeGreaterThan(0);

      console.log(`\n✅ Total SPOT tickers: ${result.data.length}`);
      console.log('   First 3 tickers:');
      result.data.slice(0, 3).forEach(ticker => {
        console.log(`   - ${ticker.instId}: ${ticker.last}`);
      });
    }, 30000);

    it('should get BTC-USDT candlesticks (1H)', async () => {
      const result = await get_candlesticks({
        instId: 'BTC-USDT',
        bar: '1H',
        limit: '5',
      });

      expect(result).toBeDefined();
      expect(result.code).toBe('0');
      expect(result.data).toBeDefined();
      expect(result.data.length).toBeGreaterThan(0);

      console.log('\n✅ BTC-USDT 1H Candlesticks (last 5):');
      result.data.forEach((candle, idx) => {
        const [ts, o, h, l, c, vol] = candle;
        const date = new Date(parseInt(ts));
        console.log(`   ${idx + 1}. ${date.toISOString()}: O:${o} H:${h} L:${l} C:${c} V:${vol}`);
      });
    }, 30000);
  });
});
