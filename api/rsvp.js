/**
 * POST /api/rsvp
 * Records an "I will attend" click.
 * Uses hashed IP to dedupe (no personal data stored).
 * Returns { ok, alreadyCounted, total }
 */
import { kv } from '@vercel/kv';
import crypto from 'crypto';

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

  try {
    const ip = getIp(req);
    const hash = hashIp(ip);
    const key = `rsvp:ip:${hash}`;

    // Check if already counted
    const exists = await kv.get(key);
    if (exists) {
      const total = (await kv.get('rsvp:total')) || 0;
      return res.status(200).json({ ok: true, alreadyCounted: true, total });
    }

    // Record this IP with timestamp
    await kv.set(key, Date.now());
    // Increment global counter
    const total = await kv.incr('rsvp:total');

    return res.status(200).json({ ok: true, alreadyCounted: false, total });
  } catch (err) {
    console.error('RSVP error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
