import { Redis } from '@upstash/redis';

/**
 * Works with either env var pair:
 *  - KV_REST_API_URL / KV_REST_API_TOKEN          (Vercel Redis / KV)
 *  - UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN (Upstash direct)
 */
const url =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL;

const token =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.warn('[redis] missing env vars — RSVP counting will fail');
}

export const redis = url && token
  ? new Redis({ url, token })
  : null;
