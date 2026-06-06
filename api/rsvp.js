/**
 * POST /api/rsvp
 * Records an "I will attend" click.
 * Uses hashed IP to dedupe (no personal data stored).
 * Returns { ok, alreadyCounted, total }
 */
import crypto from 'crypto';
import { redis } from './_redis.js';

const SALT = process.env.IP_SALT || 'asser-yara-2026-salt';

function hashIp(ip) {
  return crypto.createHash('sha256').update(ip + SALT).digest('hex').slice(0, 24);
}

function getIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '0.0.0.0'
  );
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!redis) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const ip = getIp(req);
    const hash = hashIp(ip);
    const key = `rsvp:ip:${hash}`;

    const exists = await redis.get(key);
    if (exists) {
      const total = (await redis.get('rsvp:total')) || 0;
      return res.status(200).json({ ok: true, alreadyCounted: true, total });
    }

    await redis.set(key, Date.now());
    const total = await redis.incr('rsvp:total');

    return res.status(200).json({ ok: true, alreadyCounted: false, total });
  } catch (err) {
    console.error('RSVP error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
