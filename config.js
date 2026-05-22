export const ROLES = {
  SALES: "Sales",
  STRUCTURING: "Structuring",
  RISK: "Risk",
  COMPLIANCE: "Compliance",
  MANAGEMENT: "Management"
};

export const PERMISSIONS = {
  dealEntry: [ROLES.SALES],
  pricing: [ROLES.STRUCTURING, ROLES.RISK],
  scenarioAnalysis: [ROLES.STRUCTURING, ROLES.RISK],
  riskMonitoring: [ROLES.RISK],
  complianceChecks: [ROLES.COMPLIANCE],
  reporting: [ROLES.MANAGEMENT]
};
