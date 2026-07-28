const parsePercent = (text) => {
  if (!text && text !== 0) return NaN;
  const cleaned = String(text).replace(/%/g, "").trim();
  return cleaned === "" ? NaN : Number(cleaned);
};

const parseNumber = (text) => {
  if (!text && text !== 0) return NaN;
  const cleaned = String(text).replace(/[$,]/g, "").trim();
  return cleaned === "" ? NaN : Number(cleaned);
};

const buildDate = (year) => {
  const num = Number(year);
  if (Number.isNaN(num) || num <= 0) return null;
  return new Date(num, 0, 1);
};

export async function loadMovieData() {
  const rawData = await d3.csv("./DATA/Mrvel.csv");

  return rawData
    .map((row) => {
      const releasedAt = buildDate(row["year"]);
      const budget = parseNumber(row["budget"]);
      const worldwideGross = parseNumber(row["worldwide gross"]);
      const domesticGross = parseNumber(row["domestic gross ($m)"]);
      const internationalGross = parseNumber(row["international gross ($m)"]);
      const totalGross = domesticGross + internationalGross;
      const budgetRecovered = parsePercent(row["% budget recovered"]);
      const critics = parsePercent(row["critics % score"]);
      const audience = parsePercent(row["audience % score"]);

      return {
        film: row["film"],
        category: row["category"],
        releasedAt,
        year: row["year"],
        budget,
        worldwideGross,
        budgetRecovered: Number.isNaN(budgetRecovered) && budget > 0 && worldwideGross >= 0
          ? (worldwideGross / budget) * 100
          : budgetRecovered,
        critics,
        audience,
        domesticGross,
        internationalGross,
        domesticPercent: totalGross > 0 ? (domesticGross / totalGross) * 100 : NaN,
        internationalPercent: totalGross > 0 ? (internationalGross / totalGross) * 100 : NaN,
      };
    })
    .filter((movie) => movie.releasedAt && !Number.isNaN(movie.budgetRecovered));
}
