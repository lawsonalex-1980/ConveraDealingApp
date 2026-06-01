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

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");

    const data = await res.json();

    // ✅ Correct logging syntax
    console.log("FX API response:", data);

    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid FX data");
    }

    const rates = [
      { pair: "EUR/USD", value: 1 / data.rates.EUR },
      { pair: "GBP/USD", value: 1 / data.rates.GBP },
      { pair: "USD/JPY", value: data.rates.JPY }
    ];

    container.innerHTML = rates.map(r => `
      <div style="display:flex; justify-content:space-between;">
        <span>${r.pair}</span>
        <strong>${r.value.toFixed(4)}</strong>
      </div>
    `).join("");

  } catch (err) {
    console.error("FX error", err);

    container.innerHTML = `
      <div style="color:red;">
        FX feed error
      </div>
    `;
  }
}
  fetchRates();
  setInterval(fetchRates, 10000);
}
