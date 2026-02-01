import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config({ path: '.env.test' });

describe('OKX Trading API Test (not Web3)', () => {
  it('should test regular OKX Trading API access', async () => {
    const apiKey = process.env.OKX_API_KEY!;
    const apiSecret = process.env.OKX_API_SECRET!;
    const passphrase = process.env.OKX_PASSPHRASE!;

    // Test Trading API endpoint (not DEX)
    const method = 'GET';
    const requestPath = '/api/v5/account/balance';
    const timestamp = new Date().toISOString();

    const message = timestamp + method + requestPath;
    const signature = crypto
      .createHmac('sha256', apiSecret)
      .update(message)
      .digest('base64');

    const response = await fetch(`https://www.okx.com${requestPath}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': apiKey,
        'OK-ACCESS-SIGN': signature,
        'OK-ACCESS-PASSPHRASE': passphrase,
        'OK-ACCESS-TIMESTAMP': timestamp,
      },
    });

    const result = await response.json();

    console.log('\n=== OKX Trading API Test ===');
    console.log('Status:', response.status, response.statusText);
    console.log('Response:', JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('\n✅ Ваш API ключ работает для TRADING API');
      console.log('❌ НО для этого MCP проекта нужен WEB3 DEX API ключ!');
      console.log('\n📝 Получите Web3 ключ здесь:');
      console.log('   https://web3.okx.com/ro/build/dev-portal');
    } else {
      console.log('\n❌ API ключ не работает. Проверьте credentials.');
    }

    expect(result).toBeDefined();
  }, 30000);
});
