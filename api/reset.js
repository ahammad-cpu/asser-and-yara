/**
 * POST /api/reset?key=<ADMIN_KEY>
 * Clears all RSVPs — useful before sending invites
 * to remove test data.
 */
import { redis } from './_redis.js';

const ADMIN_KEY = process.env.ADMIN_KEY || 'asser-yara-2026';

export default async function handler(req, res) {
  const key = req.query.key || req.headers['x-admin-key'];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST' });
  }

  try {
    const keys = await redis.keys('rsvp:ip:*');
    for (const k of keys) {
      await redis.set(k, ''); // wipe individual entries
    }
    await redis.set('rsvp:total', 0);

    return res.status(200).json({
      ok: true,
      cleared: keys.length,
      message: `Cleared ${keys.length} RSVPs. Total reset to 0.`,
    });
  } catch (err) {
    console.error('Reset error:', err);
    return res.status(500).json({ error: 'Reset failed', message: err.message });
  }
}
