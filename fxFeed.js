export function initFXFeed() {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>Live FX Spot</h3>
    <div id="fx-rates">Loading...</div>
  `;

  document.querySelector(".main").prepend(card);

  async function fetchRates() {
    try {
      const res = await fetch(
        "https://api.exchangerate.host/latest?base=USD&symbols=EUR,GBP,JPY"
      );
      const data = await res.json();

      const rates = [
        { pair: "EUR/USD", value: 1 / data.rates.EUR },
        { pair: "GBP/USD", value: 1 / data.rates.GBP },
        { pair: "USD/JPY", value: data.rates.JPY }
      ];

      document.getElementById("fx-rates").innerHTML = rates.map(r => `
        <div style="display:flex; justify-content:space-between;">
          <span>${r.pair}</span>
          <strong>${r.value.toFixed(4)}</strong>
        </div>
      `).join("");

    } catch (err) {
      console.error("FX error", err);
    }
  }

  fetchRates();
  setInterval(fetchRates, 10000);
}