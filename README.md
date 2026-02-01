# OKX MCP Server

Model Context Protocol (MCP) server for OKX API integration. Provides comprehensive access to OKX **Trading (CEX)** and **DeFi/DEX** APIs through MCP tools, designed for use with **Claude Code** and **Claude Desktop**.

## Features

### 🏦 Trading API (Centralized Exchange)

- **Account Management**: Get trading, funding, and earn account balances
- **Market Data**: Real-time ticker data, candlesticks (OHLC), multiple timeframes (1m to 1Y)
- **Trading**: Order history with flexible filtering (by instrument, type, state)
- **Asset Valuation**: Total portfolio value across all account types in any currency

### ⛓️ DeFi & DEX API (Decentralized Finance)

The MCP server exposes the following tools to Claude Code:

### Balance Operations

- `get_supported_chain`: Retrieve information on chains supported by the DEX Balance endpoint.
- `get_specific_token_balance`: Retrieve the list of token balances for an address across multiple chains or specified chains.
- `get_total_token_balances`: Retrieve the list of token balances for an address across multiple chains or specified chains.
- `get_total_value`: Retrieve the total balance of all tokens and DeFi assets under an account.

### Gateway Operations

- `get_supported_chain`: Retrieve information on chains supported by Onchain gateway API
- `broadcast_transactions`: Broadcast transactions to the specified blockchain.
- `get_gas_limit`: Retrieve estimated Gas Limit consumption through pre-execution of transaction information.
- `get_gas_price`: Dynamically obtain estimated gas prices for various chains.
- `get_transaction_orders`: Get the list of orders sent from transaction broadcasting API. This supports querying transactions sorted in descending order by time.
- `simulate_transactions`: Simulate a blockchain transaction before executing it to see the expected outcomes and potential risks.

### Index Price Operation

- `get_supported_chain`: Get the list of supported chains for the index.
- `get_historical_index_price`: Query historical prices for a specific token.
- `get_token_index_price`: The index price refers to a currency price calculated from the prices of multiple third-party data sources.

### Market Price Operation

- `get_supported_chain`: Get the list of supported chains for the market.
- `get_trades`: Retrieve the recent transactions of a token.
- `get_batch_token_price`: Retrieve the latest price for multiple tokens.
- `get_candlesticks_history`: Retrieve historical candlestick charts.
- `get_candlesticks`: Retrieve the candlestick charts.
- `get_price`: Retrieve the latest price of a token.

### Trade Operation

- `get_supported_chains`: Retrieve information on chains supported for single-chain exchanges. The request returns supported target chains for cross-chain transactions.
- `approve_transactions`: According to the ERC-20 standard, we need to make sure that the OKX router has permission to spend funds with the user's wallet before making a transaction. This API will generate the relevant data for calling the contract.
- `execute_swap`: Generate the data to call the OKX DEX router to execute a swap.
- `get_liquidity_sources`: Get a list of liquidity that are available for swap in the OKX aggregation protocol.
- `get_quotes`: Get the best quote for a swap through OKX DEX.
- `get_swap_instructions`: Obtain transaction instruction data for redemption or custom assembly in Solana.
- `get_tokens`: It fetches a list of tokens. This interface returns a list of tokens that belong to major platforms or are deemed significant enough by OKX. However, you can still quote and swap other tokens outside of this list on OKX DEX.
- `get_transaction_status`: Get the final transaction status of a single-chain swap using txhash

### Transaction Operation

- `get_supported_chain`: Retrieve information on chains supported by Transaction history API.
- `get_history_by_address`: Query the transaction history under the address dimension, sorted in descending chronological order.
- `get_specific_transaction`: Retrieve details of a transaction based on txHash.

### Trading API Operations (CEX)

**Account & Balance**

- `TRADING_GET_BALANCE`: Get trading account balance for spot/margin/derivatives
- `TRADING_GET_FUNDING_BALANCE`: Get funding (main deposit/withdrawal) account balance
- `TRADING_GET_EARN_BALANCE`: Get earn account balance with interest earnings
- `TRADING_GET_ALL_BALANCES`: Get all account balances (trading + funding + earn) at once
- `TRADING_GET_ASSET_VALUATION`: Get total portfolio valuation in BTC/USDT/USD

**Market Data**

- `TRADING_GET_TICKER`: Get ticker for specific trading pair (BTC-USDT, ETH-USDT, etc.)
- `TRADING_GET_TICKERS`: Get tickers for multiple pairs by type (SPOT/SWAP/FUTURES/OPTION)
- `TRADING_GET_CANDLESTICKS`: Get OHLC candlestick data (1m, 5m, 1H, 1D, 1W, etc.)

**Trading**

- `TRADING_GET_ORDER_HISTORY`: Get historical orders (filled/canceled) with filters

## Prerequisites

- Node.js (v18 or higher)
- OKX API credentials:
  - **DeFi/DEX API**: Get at [OKX Web3 Developer Portal](https://web3.okx.com/ro/build/dev-portal)
  - **Trading API**: Get at [OKX API Settings](https://www.okx.com/account/my-api)
- Claude Desktop or Claude Code CLI

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/memetus/okx-mcp-playground
   cd okx-mcp-playground
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   npm i
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Build the project with Smithery:
   ```bash
   npm run build:smithery
   ```

## Configuration

### Getting OKX API Credentials

**For Trading API (CEX):**

1. Log in to [OKX](https://www.okx.com)
2. Go to **Profile** → **API** → **Create API Key**
3. Set permissions (Read/Trade/Withdraw)
4. Save your API Key, Secret Key, and Passphrase

**For DeFi/DEX API:**

1. Visit [OKX Web3 Developer Portal](https://web3.okx.com/ro/build/dev-portal)
2. Create a project and get your Project ID

### Environment Variables

Create a `.env` file in your project root:

```env
# Trading API (CEX) - Required for trading operations
OKX_API_KEY="your-api-key"
OKX_API_SECRET="your-secret-key"
OKX_PASSPHRASE="your-passphrase"

# DeFi/DEX API - Required for Web3 operations
OKX_PROJECT_ID="your-project-id"

# Optional
OKX_SIMULATED="false"
```

### Configure Claude Desktop

To configure Claude Desktop to use this MCP server:

1. Open Claude Desktop
2. Navigate to the Claude Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

3. Add the MCP server configuration:

```json
{
  "mcpServers": {
    "okx": {
      "command": "node",
      "args": ["C:/path/to/okx-mcp-playground/dist/index.js"],
      "env": {
        "OKX_API_KEY": "your-api-key",
        "OKX_API_SECRET": "your-secret-key",
        "OKX_PASSPHRASE": "your-passphrase",
        "OKX_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

Or use with npx:

```json
{
  "mcpServers": {
    "okx": {
      "command": "npx",
      "args": ["-y", "okx-mcp-playground"],
      "env": {
        "OKX_API_KEY": "your-api-key",
        "OKX_API_SECRET": "your-secret-key",
        "OKX_PASSPHRASE": "your-passphrase",
        "OKX_PROJECT_ID": "your-project-id"
      }
    }
  }
}
```

### Configure Claude Code

For Claude Code CLI, add to your MCP settings:

```bash
# The server will automatically read from .env file
node dist/index.js
```

## Usage Examples

### With Claude Desktop / Claude Code

After configuration, you can ask Claude:

**Trading (CEX):**

```
"Show me my OKX trading account balance"
"Get the current BTC-USDT price"
"Show me BTC-USDT 1-hour candlesticks for the last 24 hours"
"Get my order history for ETH-USDT"
"What's my total portfolio value in USDT?"
"Show me all SPOT market tickers"
```

**DeFi/DEX:**

```
"Get my token balance on Ethereum"
"Get a quote for swapping 1 ETH to USDT on Polygon"
"What's the gas price on Arbitrum?"
"Show me transaction history for address 0x..."
"Get the current price of PEPE token"
```

## Development

### Setup for Development

```bash
# Clone the repository
git clone https://github.com/memetus/okx-mcp-playground.git
cd okx-mcp-playground

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Build
npm run build

# Run tests
npm test

# Run locally
node dist/index.js
```

### Project Structure

```
okx-mcp-playground/
├── src/
│   ├── hooks/              # API hook implementations
│   │   ├── balance/        # DeFi balance operations
│   │   ├── gateway/        # Transaction gateway
│   │   ├── indexPrice/     # Index prices
│   │   ├── marketPrice/    # Market prices (DEX)
│   │   ├── trade/          # DEX trading
│   │   ├── trading/        # CEX trading API
│   │   └── transaction/    # Transaction history
│   ├── tools/              # MCP tool definitions
│   │   └── trading/        # Trading API tools
│   ├── server/             # MCP server setup
│   │   └── combine.ts      # Tool registration
│   └── shared/             # Shared utilities
│       ├── constants/      # API endpoints
│       ├── env/            # Environment validation
│       └── utils/          # Helpers (security, rate limiting)
├── test/                   # Test files
└── dist/                   # Compiled output
```

## Security

⚠️ **Important Security Notes:**

- Never commit `.env` file or API credentials to Git
- Use API keys with minimum required permissions
- Enable IP whitelisting in OKX API settings
- Use passphrase protection for production keys
- Consider using separate API keys for testing/production
- Enable 2FA on your OKX account
- Store credentials securely (use secret management tools)

## Troubleshooting

### "Invalid signature" error

- Verify API credentials are correct
- Check system time is synchronized
- Ensure Secret Key and Passphrase match the API Key

### "Rate limit exceeded"

- OKX has rate limits per endpoint
- The server includes built-in rate limiting
- Wait before retrying or use batch endpoints

### Connection issues

- Check internet connection
- Verify OKX API is accessible in your region
- Check firewall/proxy settings
- Try disabling VPN if enabled

### Claude Desktop not seeing tools

- Restart Claude Desktop after config changes
- Check config file JSON syntax is valid
- Verify file paths in config are absolute paths
- Check server logs for errors

## API Documentation

- [OKX Trading API Docs](https://www.okx.com/docs-v5/en/)
- [OKX Web3 DeFi API Docs](https://www.okx.com/web3/build/docs/waas/dex-introduction)
- [Model Context Protocol](https://modelcontextprotocol.io)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Add more Trading API endpoints (place orders, cancel orders)
- [ ] Add WebSocket support for real-time data
- [ ] Implement caching for frequently accessed data
- [ ] Add more comprehensive error handling
- [ ] Support for multiple API key profiles

## License

MIT

## Disclaimer

This is an **unofficial** OKX API integration. Use at your own risk.

- Always test with small amounts first
- Verify all transactions before execution
- The authors are not responsible for any financial losses
- Not affiliated with or endorsed by OKX

## Links

- [GitHub Repository](https://github.com/memetus/okx-mcp-playground)
- [Issue Tracker](https://github.com/memetus/okx-mcp-playground/issues)
- [OKX Official Website](https://www.okx.com)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Code](https://github.com/anthropics/claude-code)

## Support

For issues and questions:

- Open an issue on [GitHub Issues](https://github.com/memetus/okx-mcp-playground/issues)
- Check [OKX API Documentation](https://www.okx.com/docs-v5/en/)
- Review [MCP Documentation](https://modelcontextprotocol.io/docs)
