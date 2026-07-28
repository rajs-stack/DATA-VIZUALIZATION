const cleanNumber = value => {
  if (value == null) return NaN;
  const cleaned = value.toString().replace(/[$,%]/g, "").trim();
  return cleaned === "" ? NaN : +cleaned;
};

const cleanPercent = value => {
  if (value == null) return NaN;
  const cleaned = value.toString().replace(/[%]/g, "").trim();
  return cleaned === "" ? NaN : +cleaned;
};

export const METRIC_LABELS = {
  year: "Year",
  critics: "Critics Score",
  audience: "Audience Score",
  worldwideGross: "Worldwide Gross ($m)",
  budget: "Budget ($m)",
  budgetRecovered: "Budget Recovered (%)",
  domesticGross: "Domestic Gross ($m)",
  openingWeekend: "Opening Weekend ($m)",
  internationalGross: "International Gross ($m)",
  openingGrossPercent: "Gross from Opening Weekend (%)",
  openingBudgetPercent: "Budget Opening Weekend (%)",
};

export async function loadData() {
  const rawRows = await d3.csv("./data/marvel.csv");

  return rawRows
    .map(row => ({
      film: row["film"],
      category: row["category"],
      year: cleanNumber(row["year"]),
      worldwideGross: cleanNumber(row["worldwide gross"]),
      budgetRecovered: cleanPercent(row["% budget recovered"]),
      critics: cleanPercent(row["critics % score"]),
      audience: cleanPercent(row["audience % score"]),
      budget: cleanNumber(row["budget"]),
      domesticGross: cleanNumber(row["domestic gross ($m)"]),
      internationalGross: cleanNumber(row["international gross ($m)"]),
      openingWeekend: cleanNumber(row["opening weekend ($m)"]),
      secondWeekend: cleanNumber(row["second weekend ($m)"]),
      dropOff: cleanPercent(row["1st vs 2nd weekend drop off"]),
      openingGrossPercent: cleanPercent(row["% gross from opening weekend"]),
      openingBudgetPercent: cleanPercent(row["% budget opening weekend"]),
      source: row["source"],
    }))
    .filter(row => !Number.isNaN(row.year));
}
