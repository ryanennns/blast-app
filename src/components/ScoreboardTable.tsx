import type {Scoreboard} from "../types/core.ts";

interface Props {
  scoreboard: Scoreboard | null;
}

export function ScoreboardTable({scoreboard}: Props) {
  if (!scoreboard) {
    return (
        <div className="text-center text-gray-500">
          <p>Loading scoreboard...</p>
        </div>
    )
  }

  return (
      <>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Player</th>
            <th className="px-4 py-2 text-left text-gray-600">Team</th>
            <th className="px-4 py-2 text-left text-gray-600">Kills</th>
            <th className="px-4 py-2 text-left text-gray-600">Deaths</th>
            <th className="px-4 py-2 text-left text-gray-600">Assists</th>
            <th className="px-4 py-2 text-left text-gray-600">
              Flash Assists
            </th>
          </tr>
          </thead>
          <tbody>
          {scoreboard?.scoreboardRows.map((row) => (
              <tr key={row.player} className="border-b border-gray-200">
                <td className="px-4 py-2">{row.player}</td>
                <td className="px-4 py-2">{row.team}</td>
                <td className="px-4 py-2">{row.kills}</td>
                <td className="px-4 py-2">{row.deaths}</td>
                <td className="px-4 py-2">{row.assists}</td>
                <td className="px-4 py-2">{row.flashAssists}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </>
  )
}