import FileDropper from "../components/FileDropper.tsx";
import { useMount } from "react-use";
import { useState } from "react";
import type { Match, UploadApiResponse } from "../types/core.ts";
import { MatchCard } from "../components/MatchCard.tsx";
import { MatchModal } from "../components/MatchModal.tsx";
import { Footer } from "../components/Footer.tsx";
import {getMatches} from "../services/ApiService.ts";

export function Home() {
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const handleApiResponse = (response: UploadApiResponse) => {
    const newMatch = response.match;
    setMatchesData((prevMatches) => [...prevMatches, newMatch]);
  };

  useMount(() => {
    const fetchMatches = async () => {
      const matches = await getMatches();

      if (matches === undefined) {
        // handle error
        return;
      }

      setMatchesData(matches);
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
            <FileDropper onApiResponse={handleApiResponse} />
          </div>

          <div className="p-2 flex flex-wrap gap-4 justify-center">
            {matchesData.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onClick={() => setSelectedMatch(match)}
              />
            ))}
          </div>
        </div>

        <Footer />

        {selectedMatch && (
          <MatchModal
            match={selectedMatch}
            open={!!selectedMatch}
            onClose={() => setSelectedMatch(null)}
          />
        )}
      </div>
    </>
  );
}
