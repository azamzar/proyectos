import { getMatches } from "../lib/getMatches";
import MatchCard from "./components/MatchCard";
import Navbar from "./components/Navbar";
import { Match } from "./types/match";

export default async function Home() {
  const matches: Match[] = await getMatches();

  const filteredMatches = matches.filter(
    (match) => match.status !== "CANCELLED"
  );

  return (
    <>
      <Navbar />
      <main className="p-4 sm:p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center tracking-tight text-gray-900 dark:text-gray-100">
          Partidos de hoy ⚽
        </h1>

        {filteredMatches.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No hay partidos hoy.
          </p>
        ) : (
          filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              teamA={match.homeTeam.name}
              teamB={match.awayTeam.name}
              logoA={match.homeTeam.crest}
              logoB={match.awayTeam.crest}
              scoreA={match.score.fullTime.home ?? 0}
              scoreB={match.score.fullTime.away ?? 0}
              time={new Date(match.utcDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              status={match.status}
            />
          ))
        )}
      </main>
    </>
  );
}
