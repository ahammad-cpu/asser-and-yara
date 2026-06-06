/**
 * Universal Redis adapter — works with ANY Vercel Redis / Upstash env var combo:
 *
 *   Upstash REST API:  KV_REST_API_URL + KV_REST_API_TOKEN
 *                      UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   Vercel KV (legacy): KV_URL (TCP)
 *   New Vercel Redis:   REDIS_URL (TCP, with auth embedded)
 *
 * Exposes a tiny interface: get / set / incr / keys
 */

const restUrl =
  process.env.KV_REST_API_URL ||
  process.env.UPSTASH_REDIS_REST_URL;

const restToken =
  process.env.KV_REST_API_TOKEN ||
  process.env.UPSTASH_REDIS_REST_TOKEN;

const tcpUrl =
  process.env.REDIS_URL ||
  process.env.KV_URL;

let _client = null;
let _mode = null;
let _initErr = null;

async function init() {
  if (_client || _initErr) return;
  try {
    if (restUrl && restToken) {
      const { Redis } = await import('@upstash/redis');
      _client = new Redis({ url: restUrl, token: restToken });
      _mode = 'rest';
    } else if (tcpUrl) {
      const { default: IORedis } = await import('ioredis');
      _client = new IORedis(tcpUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
        connectTimeout: 5000,
        tls: tcpUrl.startsWith('rediss://') ? {} : undefined,
      });
      await _client.connect();
      _mode = 'tcp';
    } else {
      _initErr = new Error('no_credentials');
    }
  } catch (err) {
    _initErr = err;
  }
}

export const redis = {
  async get(key) {
    await init();
    if (!_client) throw _initErr || new Error('no_redis');
    const v = await _client.get(key);
    return typeof v === 'string' && /^-?\d+$/.test(v) ? Number(v) : v;
  },
  async set(key, value) {
    await init();
    if (!_client) throw _initErr || new Error('no_redis');
    return _client.set(key, String(value));
  },
  async incr(key) {
    await init();
    if (!_client) throw _initErr || new Error('no_redis');
    return _client.incr(key);
  },
  async keys(pattern) {
    await init();
    if (!_client) throw _initErr || new Error('no_redis');
    return _client.keys(pattern);
  },
};

export function diagnose() {
  return {
    detected: {
      KV_REST_API_URL: !!process.env.KV_REST_API_URL,
      KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
      UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
      REDIS_URL: !!process.env.REDIS_URL,
      KV_URL: !!process.env.KV_URL,
    },
    mode: _mode,
    initError: _initErr ? _initErr.message : null,
  };
}
