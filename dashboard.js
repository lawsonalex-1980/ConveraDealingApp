export function renderDashboard(app) {
  const main = document.createElement("div");
  main.className = "main";

  main.innerHTML = `
    <div class="card">
      <h3>Desk Snapshot</h3>
      Active Deals: 18<br/>
      Expiring Hedges (7d): 4<br/>
      Pending Approvals: 6
    </div>
  `;

  app.appendChild(main);
}