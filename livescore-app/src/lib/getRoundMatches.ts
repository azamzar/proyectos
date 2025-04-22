export async function getRoundMatches(
  competitionCode: string,
  year: number,
  round: number
) {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY;

  try {
    const response = await fetch(
      `/api/football-data/competitions/${competitionCode}/matches?season=${year}&matchday=${round}`, // 👈 Cambia 'round' a 'matchday'
      {
        headers: {
          "X-Auth-Token": apiKey || "",
        },
      }
    );

    if (!response.ok) {
      console.error(`Error fetching round matches: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.matches;
  } catch (error) {
    console.error("Error fetching round matches:", error);
    return null;
  }
}
