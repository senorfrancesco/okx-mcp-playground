import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

describe('MCP Server Configuration', () => {
  it('should have all required environment variables', () => {
    const requiredVars = {
      OKX_API_KEY: process.env.OKX_API_KEY,
      OKX_API_SECRET: process.env.OKX_API_SECRET,
      OKX_PASSPHRASE: process.env.OKX_PASSPHRASE,
    };

    Object.entries(requiredVars).forEach(([key, value]) => {
      expect(value, `${key} should be set in .env.test`).toBeTruthy();
      expect(value, `${key} should not be placeholder`).not.toBe('your-api-key-here');
      expect(value, `${key} should not be placeholder`).not.toBe('your-api-secret-here');
      expect(value, `${key} should not be placeholder`).not.toBe('your-passphrase-here');
    });

    console.log('✅ All required environment variables are set');
  });

  it('should generate valid config for claude_code_config.json', () => {
    const config = {
      mcpServers: {
        "okx-mcp-playground": {
          command: "node",
          args: ["D:\\DIPLOM\\proj\\okx-mcp-playground\\dist\\index.js"],
          env: {
            OKX_API_KEY: process.env.OKX_API_KEY,
            OKX_API_SECRET: process.env.OKX_API_SECRET,
            OKX_PASSPHRASE: process.env.OKX_PASSPHRASE,
          }
        }
      }
    };

    expect(config.mcpServers['okx-mcp-playground'].command).toBe('node');
    expect(config.mcpServers['okx-mcp-playground'].args).toHaveLength(1);
    expect(config.mcpServers['okx-mcp-playground'].env.OKX_API_KEY).toBeTruthy();

    console.log('\n✅ Generated config for claude_code_config.json:\n');
    console.log(JSON.stringify(config, null, 2));
  });
});
