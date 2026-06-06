/**
 * GET /api/stats?key=<ADMIN_KEY>
 * Returns the total RSVP count.
 * Requires admin key to prevent public access.
 */
import { kv } from '@vercel/kv';

const ADMIN_KEY = process.env.ADMIN_KEY || 'asser-yara-2026';

export default async function handler(req, res) {
  const key = req.query.key || req.headers['x-admin-key'];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const total = (await kv.get('rsvp:total')) || 0;

    // Get all rsvp:ip:* keys to count unique IPs and get last timestamp
    const keys = await kv.keys('rsvp:ip:*');
    const lastTimestamps = await Promise.all(keys.map(k => kv.get(k)));

    const timestamps = lastTimestamps.filter(Boolean).sort((a, b) => b - a);
    const latest = timestamps[0] || null;

    return res.status(200).json({
      total,
      uniqueIps: keys.length,
      latestTimestamp: latest,
      latestDate: latest ? new Date(latest).toISOString() : null,
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
