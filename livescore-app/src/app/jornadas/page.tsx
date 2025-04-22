"use client";

import React, { useState, useEffect } from "react";
import { getRoundMatches } from "../../lib/getRoundMatches";
import { getCompetitionDetails } from "../../lib/getCompetitionDetails";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";

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

const defaultCompetitionCode = competitionCodes[1].code; // 👈 Seleccionamos una por defecto (ej. La Liga)

export default function Jornadas() {
  // Inicializamos selectedCompetition con el código por defecto, pero selectedRound como vacío
  const [selectedCompetition, setSelectedCompetition] = useState<string>(
    defaultCompetitionCode
  );
  const [selectedRound, setSelectedRound] = useState<number | string>(""); // Empezará vacío
  const [matches, setMatches] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableRounds, setAvailableRounds] = useState<number[]>(
    Array.from({ length: 38 }, (_, i) => i + 1)
  ); // Estado para las jornadas disponibles
  // Nuevo useEffect para obtener la jornada actual cuando se carga la página o cambia la competición seleccionada
  useEffect(() => {
    const fetchCurrentMatchday = async () => {
      if (selectedCompetition) {
        try {
          const details = await getCompetitionDetails(selectedCompetition);
          if (
            details &&
            details.currentSeason &&
            details.currentSeason.currentMatchday
          ) {
            const currentMatchday = details.currentSeason.currentMatchday;
            setSelectedRound(currentMatchday); // Establecer la jornada actual como seleccionada por defecto
            // Podrías obtener el número total de jornadas de details.currentSeason.matchdays si está disponible y actualizar availableRounds
            if (details.currentSeason.matchdays) {
              setAvailableRounds(
                Array.from(
                  { length: details.currentSeason.matchdays },
                  (_, i) => i + 1
                )
              );
            } else {
              // Si no está disponible, usamos un número fijo o intentamos deducirlo de los partidos
              setAvailableRounds(Array.from({ length: 38 }, (_, i) => i + 1)); // Número fijo si no hay datos
            }
          } else {
            setSelectedRound(""); // Si no se puede obtener la jornada actual, dejar vacío
            console.warn(
              "No se pudo obtener la jornada actual para la competición:",
              selectedCompetition
            );
            setAvailableRounds(Array.from({ length: 38 }, (_, i) => i + 1)); // Usar número fijo si falla
          }
        } catch (err) {
          console.error("Error fetching current matchday:", err);
          setSelectedRound(""); // Si hay error, dejar vacío
          setAvailableRounds(Array.from({ length: 38 }, (_, i) => i + 1)); // Usar número fijo si falla
        }
      }
    };

    fetchCurrentMatchday();
    // Dependencia: ejecutarse cuando cambie la competición seleccionada
  }, [selectedCompetition]);

  // useEffect existente para cargar los partidos, ahora se ejecutará cuando selectedRound se establezca (ya sea por defecto o por selección del usuario)
  useEffect(() => {
    const fetchRoundMatchesData = async () => {
      if (selectedCompetition && selectedRound) {
        setLoading(true);
        setError(null);
        setMatches(null); // Limpiar partidos anteriores
        try {
          const currentYear = new Date().getFullYear(); // Obtén el año actual (verifica si 2024 o 2025 es correcto para la API)
          // Considera obtener el año de la temporada actual de los detalles de la competición si está disponible
          const yearToFetch = 2024; // <-- Ajusta esto según lo que funcione con la API para la temporada actual (probablemente 2024)

          const data = await getRoundMatches(
            selectedCompetition,
            yearToFetch, // Usar el año ajustado
            parseInt(selectedRound as string)
          );
          setMatches(data);
        } catch (err: any) {
          setError("Error al cargar los partidos de la jornada.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setMatches(null);
      }
    };

    fetchRoundMatchesData();
    // Dependencia: ejecutarse cuando cambie la competición seleccionada o la jornada seleccionada
  }, [selectedCompetition, selectedRound]);

  const handleCompetitionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCompetition(event.target.value);
    // No reseteamos selectedRound aquí porque el useEffect de arriba lo establecerá a la jornada actual de la nueva liga
  };

  const handleRoundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRound(event.target.value);
  };

  // Botones para cambiar de jornada
  const handlePreviousRound = () => {
    const current = parseInt(selectedRound as string);
    if (current > 1) setSelectedRound(current - 1);
  };

  const handleNextRound = () => {
    const current = parseInt(selectedRound as string);
    if (current < availableRounds.length) setSelectedRound(current + 1);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-900 dark:text-gray-100">
          Resultados por Jornada 📅
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div>
            <label
              htmlFor="competition"
              className="block mb-2 text-gray-700 dark:text-gray-300"
            >
              Selecciona una liga:
            </label>
            <select
              id="competition"
              value={selectedCompetition}
              onChange={handleCompetitionChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            >
              <option value="">-- Selecciona --</option>
              {competitionCodes.map((comp) => (
                <option key={comp.code} value={comp.code}>
                  {comp.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="round"
              className="block mb-2 text-gray-700 dark:text-gray-300"
            >
              Selecciona la jornada:
            </label>
            <select
              id="round"
              value={selectedRound}
              onChange={handleRoundChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
              disabled={!selectedCompetition || availableRounds.length === 0} // Deshabilita si no hay liga seleccionada o jornadas
            >
              <option value="">-- Selecciona --</option>
              {availableRounds.map((round) => (
                <option key={round} value={round}>
                  {round}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Botones de navegación entre jornadas */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            onClick={handlePreviousRound}
            disabled={parseInt(selectedRound as string) <= 1}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Anterior
          </button>
          <button
            onClick={handleNextRound}
            disabled={
              parseInt(selectedRound as string) >= availableRounds.length
            }
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        </div>
        {/* ... (El resto del renderizado: mensajes de carga, error, y lista de partidos) ... */}
        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Cargando partidos de la jornada...{" "}
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>} {" "}
        {matches && matches.length > 0 ? (
          <div className="mt-6">
            <h3 className="font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Partidos de la Jornada {selectedRound}
            </h3>
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                teamA={match.homeTeam.name}
                teamB={match.awayTeam.name}
                logoA={match.homeTeam.crest}
                logoB={match.awayTeam.crest}
                scoreA={match.score.fullTime.home ?? null} // Usa null para scores no disponibles
                scoreB={match.score.fullTime.away ?? null} // Usa null para scores no disponibles
                time={new Date(match.utcDate).toLocaleString("es-ES", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                status={match.status} // 👈 Asegúrate de pasar el status aquí
              />
            ))}
          </div>
        ) : matches &&
          matches.length === 0 &&
          selectedCompetition &&
          selectedRound ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No hay partidos para la jornada {selectedRound} en{" "}
            {competitionCodes.find((c) => c.code === selectedCompetition)?.name}
            .
          </p>
        ) : null}
      </div>
    </>
  );
}
