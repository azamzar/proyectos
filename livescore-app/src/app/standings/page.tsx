"use client";

import React, { useState, useEffect } from "react";
import { getStandings } from "../../lib/getStandings"; // Asegúrate de la ruta correcta
import Navbar from "../components/Navbar"; // Asegúrate de la ruta correcta

interface TeamStanding {
  position: number;
  team: {
    name: string;
    crest: string; // football-data usa 'crest' para el logo
    id: number;
  };
  playedGames: number;
  form?: string; // Puede que no siempre esté presente
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

// Definimos una interfaz para la estructura completa de la clasificación si es necesario
interface CompetitionStandings {
  stage: string;
  type: string;
  table: TeamStanding[];
}

const competitionCodes = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "BL1", name: "Bundesliga" },
  { code: "SA", name: "Serie A" },
  { code: "FL1", name: "Ligue 1" },
  { code: "DED", name: "Eredivisie" },
  { code: "PPL", name: "Primeira Liga" },
  { code: "CL", name: "Champions League" },

  // Agrega aquí los códigos de las competiciones que quieras mostrar
];

const defaultCompetitionCode = "PD";

// Define las reglas de clasificación y descenso para cada liga
// Estos son ejemplos basados en formatos comunes, ¡verifica las reglas exactas para la temporada!
const qualificationRules: {
  [key: string]: {
    championsLeague?: number[]; // Posiciones de acceso directo a Champions
    championsLeagueQual?: number[]; // Posiciones de clasificación a Champions (si aplica)
    europaLeague?: number[]; // Posiciones de acceso directo a Europa League
    europaConferenceLeague?: number[]; // Posiciones de acceso directo a Conference League
    relegation?: number[]; // Posiciones de descenso
    relegationPlayOff?: number[]; // Posiciones de promoción de descenso (si aplica)
  };
} = {
  PL: {
    championsLeague: [1, 2, 3, 4, 5],
    europaLeague: [6],
    europaConferenceLeague: [7],
    relegation: [18, 19, 20],
  },
  PD: {
    championsLeague: [1, 2, 3, 4, 5],
    europaLeague: [6],
    europaConferenceLeague: [7],
    relegation: [18, 19, 20],
  },
  BL1: {
    championsLeague: [1, 2, 3, 4],
    europaLeague: [5, 6],
    relegation: [17, 18],
    relegationPlayOff: [16],
  },
  SA: {
    championsLeague: [1, 2, 3, 4],
    europaLeague: [5, 6],
    europaConferenceLeague: [7],
    relegation: [18, 19, 20],
  },
  FL1: {
    championsLeague: [1, 2],
    championsLeagueQual: [3],
    europaLeague: [4],
    europaConferenceLeague: [5],
    relegation: [17, 18],
    relegationPlayOff: [16],
  },
  DED: {
    championsLeague: [1, 2],
    europaLeague: [3],
    europaConferenceLeague: [4],
    relegation: [17, 18],
    relegationPlayOff: [16],
  },
  PPL: {
    championsLeague: [1, 2],
    europaLeague: [3],
    europaConferenceLeague: [4],
    relegation: [17, 18],
    relegationPlayOff: [16],
  },
  CL: {
    championsLeague: [1, 2, 3, 4, 5, 6, 7, 8], // siguiente ronda
    europaLeague: [9, 10, 11, 12, 13, 14, 15, 16], // playoff
  },
};

export default function StandingsPage() {
  const [selectedCompetition, setSelectedCompetition] = useState<string>(
    defaultCompetitionCode
  );
  const [standingsData, setStandingsData] = useState<
    CompetitionStandings[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      if (selectedCompetition) {
        setLoading(true);
        setError(null);
        setStandingsData(null);
        try {
          const data = await getStandings(selectedCompetition);
          setStandingsData(data.standings);
        } catch (err: any) {
          setError("Error al cargar la clasificación.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setStandingsData(null);
      }
    };

    fetchStandings();
  }, [selectedCompetition]);

  const handleCompetitionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCompetition(event.target.value);
  };

  const currentStandingsTable =
    standingsData && standingsData.length > 0 ? standingsData[0].table : null;

  // Función para obtener las clases CSS basadas en la posición y la liga seleccionada
  const getPositionClasses = (position: number) => {
    const rules = qualificationRules[selectedCompetition];
    if (!rules) return ""; // No hay reglas definidas para esta liga

    if (rules.championsLeague && rules.championsLeague.includes(position)) {
      return "bg-green-200 dark:bg-green-700"; // Verde para Champions League
    }
    if (
      rules.championsLeagueQual &&
      rules.championsLeagueQual.includes(position)
    ) {
      return "bg-green-100 dark:bg-green-600"; // Verde más claro para Clasif. Champions
    }
    if (rules.europaLeague && rules.europaLeague.includes(position)) {
      return "bg-blue-200 dark:bg-blue-700"; // Azul para Europa League
    }
    if (
      rules.europaConferenceLeague &&
      rules.europaConferenceLeague.includes(position)
    ) {
      return "bg-yellow-100 dark:bg-yellow-600"; // Amarillo claro para Conference League
    }
    if (rules.relegation && rules.relegation.includes(position)) {
      return "bg-red-200 dark:bg-red-700"; // Rojo para Descenso
    }
    if (rules.relegationPlayOff && rules.relegationPlayOff.includes(position)) {
      return "bg-orange-200 dark:bg-orange-700"; // Naranja para Promoción
    }

    return ""; // Sin clase si no está en ninguna categoría especial
  };

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-900 dark:text-gray-100">
          Clasificaciones 📊
        </h1>
        <div className="mb-6 flex justify-center">
          <label
            htmlFor="competition"
            className="mr-4 text-gray-700 dark:text-gray-300"
          >
            Selecciona una liga:
          </label>
          <select
            id="competition"
            value={selectedCompetition}
            onChange={handleCompetitionChange}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
          >
            <option value="">-- Selecciona --</option>
            {competitionCodes.map((comp) => (
              <option key={comp.code} value={comp.code}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Cargando clasificación...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {currentStandingsTable && currentStandingsTable.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-300">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <th className="py-2 px-3 text-left">Pos.</th>
                  <th className="py-2 px-3 text-left">Equipo</th>
                  <th className="py-2 px-3 text-right">PJ</th>
                  <th className="py-2 px-3 text-right hidden sm:table-cell">
                    G
                  </th>
                  <th className="py-2 px-3 text-right hidden sm:table-cell">
                    E
                  </th>
                  <th className="py-2 px-3 text-right hidden sm:table-cell">
                    P
                  </th>
                  <th className="py-2 px-3 text-right hidden sm:table-cell">
                    GF
                  </th>
                  <th className="py-2 px-3 text-right hidden sm:table-cell">
                    GC
                  </th>
                  <th className="py-2 px-3 text-right hidden sm:table-cell">
                    DG
                  </th>
                  <th className="py-2 px-3 text-right font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody>
                {currentStandingsTable.map((team) => (
                  <tr
                    key={team.team.id}
                    // Aplicamos las clases condicionales aquí
                    className={`border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 ${getPositionClasses(
                      team.position
                    )}`}
                  >
                    <td className="py-2 px-3">{team.position}</td>
                    <td className="py-2 px-3 flex items-center gap-2">
                      {team.team.crest && (
                        <img
                          src={team.team.crest}
                          alt={team.team.name}
                          className="w-5 h-5"
                        />
                      )}
                      {team.team.name}
                    </td>
                    <td className="py-2 px-3 text-right">{team.playedGames}</td>
                    <td className="py-2 px-3 text-right hidden sm:table-cell">
                      {team.won}
                    </td>
                    <td className="py-2 px-3 text-right hidden sm:table-cell">
                      {team.draw}
                    </td>
                    <td className="py-2 px-3 text-right hidden sm:table-cell">
                      {team.lost}
                    </td>
                    <td className="py-2 px-3 text-right hidden sm:table-cell">
                      {team.goalsFor}
                    </td>
                    <td className="py-2 px-3 text-right hidden sm:table-cell">
                      {team.goalsAgainst}
                    </td>
                    <td className="py-2 px-3 text-right hidden sm:table-cell">
                      {team.goalDifference}
                    </td>
                    <td className="py-2 px-3 text-right font-semibold">
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          selectedCompetition &&
          !loading &&
          !error && (
            <p className="text-center text-gray-600 dark:text-gray-300">
              No hay clasificación disponible para esta liga.
            </p>
          )
        )}
      </div>
    </>
  );
}
