import type { ScoreboardRow } from "../../types/core.ts";

interface Props {
  playerName: string;
  stats: ScoreboardRow;
}

export function ScoreboardRow({ playerName, stats }: Props) {
  return (
    <tr
      key={playerName}
      className="border-b hover:bg-gray-50 transition-colors"
    >
      <td className="p-3 font-medium">{playerName}</td>
      <td className="p-3">{stats.kills}</td>
      <td className="p-3">{stats.deaths}</td>
      <td className="p-3">{stats.assists}</td>
      <td className="p-3">{stats.flashAssists}</td>
      <td className="p-3">
        {stats.deaths > 0
          ? (stats.kills / stats.deaths).toFixed(2)
          : stats.kills > 0
            ? "∞"
            : "0.00"}
      </td>
    </tr>
  );
}
