import { renderSidebar } from "./components/sidebar.js";
import { renderDashboard } from "./components/dashboard.js";
import { ROLES } from "./config.js";
import { initFXFeed } from "./modules/fxFeed.js";

import { initVolFeed } from "./modules/volFeed.js";

const user = {
  name: "Alex Lawson",
  role: ROLES.STRUCTURING
};

const app = document.getElementById("app");
app.classList.add("app");

renderSidebar(app);
renderDashboard(app);

// Live FX (all users)
document.addEventListener("DOMContentLoaded", () => {
  initFXFeed();
  initNewsFeed(); ✅ ADD THIS
});


// Vol (structuring + risk only)
if ([ROLES.STRUCTURING, ROLES.RISK].includes(user.role)) {
  initVolFeed();
}
