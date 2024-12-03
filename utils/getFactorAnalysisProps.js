// utils/getFactorAnalysisProps.js
import { portfolios } from "@/utilites/Constants";

export async function getFactorAnalysisProps() {
  const initPortfolio = portfolios[0]?.value || "";
  const initPortfolioValue = Number(100000.0); // Explicitly set as a number

  return {
    initPortfolio,
    initPortfolioValue: isNaN(initPortfolioValue) ? 100000.0 : initPortfolioValue, // Default to 100000 if NaN
  };
}
