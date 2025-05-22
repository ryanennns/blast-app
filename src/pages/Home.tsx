import FileDropper from "../components/FileDropper.tsx";
import { useMount } from "react-use";
import { useState } from "react";
import type { Match } from "../types/core.ts";
import { MatchCard } from "../components/MatchCard/MatchCard.tsx";
import { Footer } from "../components/Footer.tsx";

export function Home() {
  const [matchesData, setMatchesData] = useState<Match[]>([]);

  const handleApiResponse = (response: unknown) => {
    console.log(response);
  };

  useMount(() => {
    const fetchMatches = async () => {
      const response = await fetch("http://127.0.0.1:3900/matches");
      const data = await response.json();
      setMatchesData(data.matches);
      console.log(data);
    };

    fetchMatches();
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="text-center p-4">
            <h2 className="text-xl md:text-3xl font-bold text-indigo-900">
              Welcome to CSLogger
            </h2>
            <h4>A Counter-Strike log parser</h4>
          </div>
          <FileDropper onApiResponse={handleApiResponse} />

          <div className="p-2 flex gap-4">
            {matchesData.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
