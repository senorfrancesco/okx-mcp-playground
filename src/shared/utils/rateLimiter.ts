/**
 * Simple rate limiter implementation
 */

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

export class RateLimiter {
  private buckets: Map<string, TokenBucket> = new Map();
  private maxTokens: number;
  private refillRate: number; // tokens per second

  constructor(maxRequestsPerSecond: number = 10) {
    this.maxTokens = maxRequestsPerSecond;
    this.refillRate = maxRequestsPerSecond;
  }

  /**
   * Check if request is allowed and consume a token
   * @param key Identifier for the rate limit (e.g., 'global', endpoint name)
   * @returns true if request is allowed, false if rate limited
   */
  async tryAcquire(key: string = 'global'): Promise<boolean> {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = {
        tokens: this.maxTokens,
        lastRefill: now,
      };
      this.buckets.set(key, bucket);
    }

    // Refill tokens based on time elapsed
    const timeElapsed = (now - bucket.lastRefill) / 1000; // seconds
    const tokensToAdd = timeElapsed * this.refillRate;
    bucket.tokens = Math.min(this.maxTokens, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    // Check if we have tokens available
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }

    return false;
  }

  /**
   * Wait until a token is available (with timeout)
   * @param key Identifier for the rate limit
   * @param timeoutMs Maximum time to wait in milliseconds
   */
  async waitForToken(key: string = 'global', timeoutMs: number = 30000): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeoutMs) {
      if (await this.tryAcquire(key)) {
        return;
      }
      // Wait a bit before trying again
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    throw new Error(`Rate limit timeout: Could not acquire token within ${timeoutMs}ms`);
  }

  /**
   * Reset all rate limit buckets
   */
  reset(): void {
    this.buckets.clear();
  }
}

// Global rate limiter instance
export const globalRateLimiter = new RateLimiter(10); // 10 requests per second
