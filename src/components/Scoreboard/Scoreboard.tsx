import type { ScoreboardRow as ScoreboardRowData } from "../../types/core.ts";
import { ScoreboardRow } from "./ScoreboardRow.tsx";

interface Props {
  data: Record<string, ScoreboardRowData>;
}

export function Scoreboard({ data }: Props) {
  // Sort players by kills in descending order
  const sortedPlayers = Object.entries(data).sort(
    (a, b) => b[1].kills - a[1].kills,
  );

  const columns = [
    "Player",
    "Kills",
    "Deaths",
    "Assists",
    "Flash Assists",
    "K/D Ratio",
  ];

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((column, index) => (
                <th
                  key={column + index}
                  className="p-3 font-semibold text-gray-700 border-b"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map(([playerName, stats], index) => (
              <ScoreboardRow
                playerName={playerName}
                stats={stats}
                key={`${playerName}-${index}`}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
