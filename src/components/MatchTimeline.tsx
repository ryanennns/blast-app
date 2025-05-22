import { useState } from "react";
import type { Round } from "../types/core.ts";
import { RoundDataContainer } from "./RoundDataContainer.tsx";

interface Props {
  rounds: Round[];
}

export function MatchTimeline({ rounds }: Props) {
  const [selectedRoundId, setSelectedRoundId] = useState<string | null>(null);

  const getWinMethodIcon = (method: string) => {
    switch (method) {
      case "kills":
        return "💀";
      case "defusal":
        return "🔧";
      case "bomb":
        return "💣";
      default:
        return "🏆";
    }
  };

  const getTeamColor = (team: "T" | "CT") => {
    return team === "T"
      ? "bg-orange-100 border-orange-200"
      : "bg-blue-100 border-blue-200";
  };

  const getTeamBadge = (team: "T" | "CT") => {
    return team === "T" ? "bg-orange-500 text-white" : "bg-blue-500 text-white";
  };

  const firstHalf = rounds.slice(0, 15);
  const secondHalf = rounds.slice(15);

  const renderRow = (half: Round[]) => (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {half.map((round) => (
        <div
          key={round.id}
          onClick={() =>
            setSelectedRoundId((prev) => (prev === round.id ? null : round.id))
          }
          className={`cursor-pointer w-12 p-2 rounded-lg border text-center ${getTeamColor(round.winner)} hover:shadow transition-shadow ${
            selectedRoundId === round.id ? "ring-2 ring-gray-400" : ""
          }`}
        >
          <div className="flex justify-between items-center mb-1 text-xs">
            <span
              className={`px-1.5 py-0.5 rounded font-bold ${getTeamBadge(
                round.winner,
              )}`}
            >
              {round.winner}
            </span>
          </div>
          <div className="text-xs text-gray-700 flex justify-center gap-1 items-center">
            <span>{getWinMethodIcon(round.winMethod)}</span>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            {round.kills.length} kills
          </div>
        </div>
      ))}
    </div>
  );

  const selectedRound = rounds.find((r) => r.id === selectedRoundId);

  return (
    <div className="py-4">
      {!selectedRound && renderRow(firstHalf)}
      {!selectedRound && secondHalf.length > 0 && renderRow(secondHalf)}

      {selectedRound && (
        <RoundDataContainer
          round={selectedRound}
          onExit={() => setSelectedRoundId(null)}
        />
      )}
    </div>
  );
}
