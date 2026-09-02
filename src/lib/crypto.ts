/**
 * Secure SHA-256 Password Hashing Utility using the native Web Crypto API
 */

// Pre-computed SHA-256 hash of the default initial password ("admin123")
export const DEFAULT_ADMIN_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPasswordHash(plainText: string, expectedHash: string): Promise<boolean> {
  const computed = await hashPassword(plainText);
  return computed === expectedHash;
}
