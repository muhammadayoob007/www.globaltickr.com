// Vercel serverless function — fetches the real ForexFactory weekly
// economic calendar server-side (no browser CORS / geo limits) and
// returns it same-origin to the page. Auto-detected by Vercel at /api/calendar
export default async function handler(req, res) {
  try {
    const r = await fetch('https://nfs.faireconomy.media/ff_calendar_thisweek.json', {
      headers: { 'User-Agent': 'Mozilla/5.0 (GlobalTickr calendar proxy)' }
    });
    if (!r.ok) throw new Error('feed status ' + r.status);
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    // cache at the edge for 5 min, serve stale while refreshing
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: 'calendar feed unavailable' });
  }
}
