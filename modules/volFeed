export function initVolFeed() {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h3>FX Volatility Surface</h3>
    <div id="vol-data"></div>
  `;

  document.querySelector(".main").appendChild(card);

  const data = [
    { pair: "EUR/USD", t: "1M", atm: 7.3, rr: -0.4, bf: 0.2 },
    { pair: "EUR/USD", t: "3M", atm: 7.8, rr: -0.5, bf: 0.3 },
    { pair: "GBP/USD", t: "1M", atm: 8.6, rr: -0.6, bf: 0.3 },
    { pair: "USD/JPY", t: "1M", atm: 9.1, rr: 0.8, bf: 0.4 }
  ];

  document.getElementById("vol-data").innerHTML = data.map(v => `
    <div style="display:flex; justify-content:space-between;">
      <span>${v.pair} ${v.t}</span>
      <span>${v.atm}% / ${v.rr} / ${v.bf}</span>
    </div>
  `).join("");
}
