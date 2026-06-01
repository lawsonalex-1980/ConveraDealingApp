export function initNewsFeed() {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>Market News</h3>
    <div id="news-feed">Loading...</div>
  `;

  document.querySelector(".main").prepend(card);

  async function fetchNews() {
    const container = document.getElementById("news-feed");

    try {
      // ✅ Use RSS via CORS proxy
      const rssUrl = "https://www.fxstreet.com/rss/news";
      const proxy = "https://api.allorigins.win/raw?url=";

      const res = await fetch(proxy + encodeURIComponent(rssUrl));
      const text = await res.text();

      // ✅ Parse XML
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");

      const items = xml.querySelectorAll("item");

      const news = Array.from(items).slice(0, 5).map(item => ({
        title: item.querySelector("title")?.textContent,
        link: item.querySelector("link")?.textContent,
        date: item.querySelector("pubDate")?.textContent
      }));

      container.innerHTML = news.map(n => `
        <div style="padding:8px 0; border-bottom:1px solid #e2e8f0;">
          <a href="${n.link}" target="_blank" style="text-decoration:none;">
            <strong>${n.title}</strong>
          </a>
          <div style="font-size:11px; opacity:0.6;">
            ${new Date(n.date).toLocaleTimeString()}
          </div>
        </div>
      `).join("");

    } catch (err) {
      console.error("News error", err);

      container.innerHTML = `
        <div style="color:red;">
          Unable to load news
        </div>
      `;
    }
  }

  fetchNews();
  setInterval(fetchNews, 30000); // refresh every 30s
}
