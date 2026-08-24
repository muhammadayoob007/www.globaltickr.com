// Vercel serverless function — fetches real financial-news RSS server-side
// (no browser CORS) and returns the raw feed same-origin at /api/news.
const FEEDS = [
  ['https://feeds.marketwatch.com/marketwatch/topstories/', 'MarketWatch'],
  ['https://www.cnbc.com/id/100003114/device/rss/rss.html', 'CNBC'],
  ['https://www.investing.com/rss/news_25.rss', 'Investing.com'],
  ['https://finance.yahoo.com/news/rssindex', 'Yahoo Finance']
];
export default async function handler(req, res) {
  for (const [url, src] of FEEDS) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (GlobalTickr news proxy)' } });
      if (!r.ok) continue;
      const xml = await r.text();
      if (xml.indexOf('<item') >= 0) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
        res.setHeader('X-News-Source', src);
        return res.status(200).send(xml);
      }
    } catch (e) {}
  }
  res.status(502).json({ error: 'news feed unavailable' });
}
