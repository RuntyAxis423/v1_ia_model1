import { NEWSAPI_KEY } from "~/lib/load_keys.py"; // Simulate loading from Python file

export async function fetchLatestNews(q: string) {
  // In a real app, use process.env.NEWSAPI_KEY
  const apiKey = NEWSAPI_KEY; // Replace with process.env.NEWSAPI_KEY in a real deployment

  const url = `https://newsapi.org/v2/everything?` +
              `q=${encodeURIComponent(q)}&language=es&sortBy=publishedAt&pageSize=1&apiKey=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`News API error: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();
    if (!data.articles?.length) return null;
    const { title, url: link, source, publishedAt } = data.articles[0];
    return { title, link, source: source.name, date: publishedAt.slice(0,10) };
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}
