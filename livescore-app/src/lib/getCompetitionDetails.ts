// ../../lib/getCompetitionDetails.ts
export async function getCompetitionDetails(competitionCode: string) {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY; // Tu API key

  try {
    // Utilizamos la ruta del proxy si configuraste uno
    const response = await fetch(
      `/api/football-data/competitions/${competitionCode}`,
      {
        headers: {
          "X-Auth-Token": apiKey || "",
        },
      }
    );

    if (!response.ok) {
      console.error(`Error fetching competition details: ${response.status}`);
      const errorText = await response.text();
      console.error("API Error Response (Competition Details):", errorText);
      throw new Error(
        `API error fetching competition details: ${response.status}`
      );
    }

    const data = await response.json();
    // console.log("Competition Details API Response:", data); // Log para ver la estructura
    return data; // La respuesta contiene los detalles de la competición
  } catch (error) {
    console.error("Error fetching competition details:", error);
    throw error;
  }
}
