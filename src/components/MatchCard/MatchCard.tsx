import type { Match } from "../../types/core.ts";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const isTeamAWinner = match.winner === match.team_a;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 max-w-md">
      <div className="text-center mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {match.map.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div
          className={`text-center flex-1 ${isTeamAWinner ? "text-green-600" : "text-gray-600"}`}
        >
          <div
            className={`font-semibold text-lg ${isTeamAWinner ? "font-bold" : ""}`}
          >
            {match.team_a}
          </div>
          <div
            className={`text-2xl font-bold mt-1 ${isTeamAWinner ? "text-green-700" : "text-gray-700"}`}
          >
            {match.team_a_score}
          </div>
        </div>

        <div className="px-4">
          <span className="text-gray-400 font-medium">VS</span>
        </div>

        <div
          className={`text-center flex-1 ${!isTeamAWinner ? "text-green-600" : "text-gray-600"}`}
        >
          <div
            className={`font-semibold text-lg ${!isTeamAWinner ? "font-bold" : ""}`}
          >
            {match.team_b}
          </div>
          <div
            className={`text-2xl font-bold mt-1 ${!isTeamAWinner ? "text-green-700" : "text-gray-700"}`}
          >
            {match.team_b_score}
          </div>
        </div>
      </div>

      <div className="text-center">
        <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
          🏆 {match.winner}
        </span>
      </div>

      <div className="text-center mt-3">
        <span className="text-xs text-gray-400">{match.id}</span>
      </div>
    </div>
  );
};
