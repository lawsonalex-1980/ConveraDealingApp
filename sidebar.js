
export function renderSidebar(app) {
  const sidebar = document.createElement("div");
  sidebar.className = "sidebar";

  sidebar.innerHTML = `
    <h3>Hedging Tools</h3>

    <div class="button" onclick="openTool('zerovar')">ZeroVar Platform</div>
    <div class="button" onclick="openTool('quotesheet')">Quote Sheet</div>
    <div class="button" onclick="openTool('ev')">EV Tool</div>

    <h3 style="margin-top:20px;">Workflow</h3>

    <div class="menu-item">Deal Entry</div>
    <div class="menu-item">Pricing</div>
    <div class="menu-item">Scenario Analysis</div>
    <div class="menu-item">Risk Monitoring</div>
    <div class="menu-item">Compliance</div>
  `;

  app.appendChild(sidebar);

  window.openTool = (tool) => {
    const links = {
      zerovar: "https://platform.zerovar.com/",
      quotesheet: "https://fx-hedging-quotesheet.netlify.app/",
      ev: "https://converacom.sharepoint.com/"
    };

    window.open(links[tool], "_blank");
  };
}
