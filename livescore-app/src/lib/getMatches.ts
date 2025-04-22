// src/lib/getMatches.ts

export async function getMatches() {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  const res = await fetch(`https://api.football-data.org/v4/matches`, {
    headers: {
      "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY!,
    },
    next: { revalidate: 60 }, // opcional: ISR
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Error Football-Data:", res.status, text);
    throw new Error("API error: " + res.status);
  }

  const data = await res.json();

  const allowedCompetitionCodes = [
    "PL", // Premier League
    "PD", // La Liga
    "BL1", // Bundesliga
    "SA", // Serie A
    "FL1", // Ligue 1
    "DED", // Eredivisie
    "PPL", // Primeira Liga
    "CL", // Champions League
  ];

  const filteredMatches = data.matches.filter((match: any) =>
    allowedCompetitionCodes.includes(match.competition.code)
  );

  return filteredMatches;
  // return data.matches;
}
