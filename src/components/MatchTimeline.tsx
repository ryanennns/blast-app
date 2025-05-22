import type { Round } from "../types/core.ts";

interface Props {
  rounds: Round[];
}

export function MatchTimeline({ rounds }: Props) {
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
      {half.map((round, i) => (
        <div
          key={round.id || i}
          className={`w-12 p-2 rounded-lg border text-center ${getTeamColor(round.winner)} hover:shadow transition-shadow`}
        >
          <div className="flex justify-between items-center mb-1 text-xs">
            <span
              className={`px-1.5 py-0.5 rounded font-bold ${getTeamBadge(round.winner)}`}
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

  return (
    <div className="py-4">
      <h3 className="text-center text-lg font-bold text-gray-800 mb-2">
        Match Timeline
      </h3>
      {renderRow(firstHalf)}
      {secondHalf.length > 0 && renderRow(secondHalf)}
    </div>
  );
}
