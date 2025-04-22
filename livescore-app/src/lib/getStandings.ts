// ../../lib/getStandings.ts
export async function getStandings(competitionCode: string) {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY; // Tu API key

  try {
    // Utilizamos la ruta del proxy
    const response = await fetch(
      `/api/football-data/competitions/${competitionCode}/standings`,
      {
        headers: {
          "X-Auth-Token": apiKey || "",
        },
      }
    );

    if (!response.ok) {
      console.error(`Error fetching standings: ${response.status}`);
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // La API de football-data devuelve un array 'standings'.
    // Cada objeto en ese array puede representar una etapa (ej. tabla general, local, visitante).
    // A menudo, la tabla general está en el primer elemento.
    // console.log("Standings API Response:", data); // Log para ver la estructura completa
    return data; // Devolvemos la respuesta completa para poder acceder a standings[0].table
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error; // Relanzamos el error para que el componente lo capture
  }
}
