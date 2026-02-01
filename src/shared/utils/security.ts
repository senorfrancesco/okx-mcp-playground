/**
 * Security utilities for sanitizing logs and protecting sensitive data
 */

/**
 * Patterns for sensitive data that should be redacted from logs
 */
const SENSITIVE_PATTERNS = [
  // API Keys and Secrets
  /("OK-ACCESS-KEY":\s*")[^"]*"/gi,
  /("OK-ACCESS-SIGN":\s*")[^"]*"/gi,
  /("OK-ACCESS-PASSPHRASE":\s*")[^"]*"/gi,
  /("OK-ACCESS-PROJECT":\s*")[^"]*"/gi,
  /("OKX_API_KEY":\s*")[^"]*"/gi,
  /("OKX_API_SECRET":\s*")[^"]*"/gi,
  /("OKX_PASSPHRASE":\s*")[^"]*"/gi,
  /("OKX_PROJECT_ID":\s*")[^"]*"/gi,

  // Ethereum addresses (partial redaction)
  /(0x[a-fA-F0-9]{40})/g,

  // Private keys
  /("privateKey":\s*")[^"]*"/gi,
  /("signedTx":\s*")[^"]*"/gi,

  // Passwords and tokens
  /("password":\s*")[^"]*"/gi,
  /("token":\s*")[^"]*"/gi,
  /("bearer":\s*)[^\s]*/gi,
];

/**
 * Sanitize error objects and strings to remove sensitive information
 * @param data Any data that might contain sensitive information
 * @returns Sanitized version safe for logging
 */
export const sanitizeForLogging = (data: any): string => {
  let sanitized: string;

  // Convert to string if not already
  if (typeof data === 'string') {
    sanitized = data;
  } else if (data instanceof Error) {
    sanitized = JSON.stringify({
      name: data.name,
      message: data.message,
      stack: data.stack,
    }, null, 2);
  } else {
    try {
      sanitized = JSON.stringify(data, null, 2);
    } catch (e) {
      sanitized = String(data);
    }
  }

  // Apply all sanitization patterns
  SENSITIVE_PATTERNS.forEach((pattern) => {
    if (pattern.source.includes('0x[a-fA-F0-9]{40}')) {
      // Partially redact addresses (show first 6 and last 4 chars)
      sanitized = sanitized.replace(pattern, (match) => {
        return `${match.substring(0, 6)}...${match.substring(match.length - 4)}`;
      });
    } else {
      // Fully redact other sensitive data
      sanitized = sanitized.replace(pattern, '$1***REDACTED***"');
    }
  });

  return sanitized;
};

/**
 * Safe console.error that automatically sanitizes output
 */
export const secureLog = {
  error: (message: string, data?: any) => {
    console.error(message, data ? sanitizeForLogging(data) : '');
  },

  warn: (message: string, data?: any) => {
    console.warn(message, data ? sanitizeForLogging(data) : '');
  },

  info: (message: string, data?: any) => {
    console.log(message, data ? sanitizeForLogging(data) : '');
  },
};

/**
 * Custom error class with sanitized logging
 */
export class SecureError extends Error {
  public readonly statusCode?: number;
  public readonly details?: any;

  constructor(message: string, statusCode?: number, details?: any) {
    super(message);
    this.name = 'SecureError';
    if (statusCode !== undefined) {
      this.statusCode = statusCode;
    }
    if (details !== undefined) {
      this.details = details;
    }
  }

  /**
   * Get sanitized error for logging
   */
  toSafeString(): string {
    return sanitizeForLogging({
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    });
  }
}
