/**
 * GET /api/stats?key=<ADMIN_KEY>
 * Returns total RSVP count + last RSVP timestamp.
 */
import { redis, diagnose } from './_redis.js';

const ADMIN_KEY = process.env.ADMIN_KEY || 'asser-yara-2026';

export default async function handler(req, res) {
  const key = req.query.key || req.headers['x-admin-key'];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const total = (await redis.get('rsvp:total')) || 0;
    const keys = await redis.keys('rsvp:ip:*');
    const timestamps = await Promise.all(keys.map(k => redis.get(k)));
    const sortedTs = timestamps.filter(Boolean).sort((a, b) => b - a);
    const latest = sortedTs[0] || null;

    return res.status(200).json({
      total,
      uniqueIps: keys.length,
      latestTimestamp: latest,
      latestDate: latest ? new Date(latest).toISOString() : null,
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({
      error: 'Database error',
      message: err.message,
      diagnostic: diagnose(),
    });
  }
}
