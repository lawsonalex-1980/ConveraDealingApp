console.log("FX script loaded");
export function initFXFeed() {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>Live FX Spot</h3>
    <div id="fx-rates">Loading...</div>
    <div id="fx-timestamp" style="font-size:12px; opacity:0.6; margin-top:8px;"></div>
  `;

  document.querySelector(".main").prepend(card);

  let previousRates = {};

  function getDirectionSymbol(current, previous) {
    if (!previous) return "→";
    if (current > previous) return "▲";
    if (current < previous) return "▼";
    return "→";
  }

  function getDirectionColor(current, previous) {
    if (!previous) return "#64748b";
    if (current > previous) return "#16a34a";
    if (current < previous) return "#dc2626";
    return "#64748b";
  }

  async function fetchRates() {
    const container = document.getElementById("fx-rates");
    const timestamp = document.getElementById("fx-timestamp");

    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      if (!data || !data.rates) throw new Error("Invalid FX data");

      const rates = [
        { pair: "EUR/USD", value: 1 / data.rates.EUR },
        { pair: "GBP/USD", value: 1 / data.rates.GBP },
        { pair: "USD/JPY", value: data.rates.JPY }
      ];

      container.innerHTML = rates.map(r => {
        const prev = previousRates[r.pair];
        const direction = getDirectionSymbol(r.value, prev);
        const color = getDirectionColor(r.value, prev);

        return `
          <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #e2e8f0;">
            <span>${r.pair}</span>
            <strong>
              ${r.value.toFixed(4)}
              <span style="color:${color}; margin-left:6px;">${direction}</span>
            </strong>
          </div>
        `;
      }).join("");

      // store previous values
      rates.forEach(r => {
        previousRates[r.pair] = r.value;
      });

      timestamp.innerText = `Updated: ${new Date().toLocaleTimeString()}`;

    } catch (err) {
      console.error("FX error", err);

      container.innerHTML = `
        <div style="color:#dc2626;">
          Unable to load FX rates
        </div>
      `;

      timestamp.innerText = "";
    }
  }

  fetchRates();
  setInterval(fetchRates, 10000);
}
