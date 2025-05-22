import type { Scoreboard } from "../types/core.ts";

interface Props {
  scoreboard: Scoreboard;
  winningTeam: string;
}

export function ScoreboardTable({ scoreboard, winningTeam }: Props) {
  const columns = [
    { label: "Player", align: "left" },
    { label: "Team", align: "left" },
    { label: "K", align: "center" },
    { label: "D", align: "center" },
    { label: "A", align: "center" },
    { label: "FA", align: "center" },
    { label: "K/D", align: "center" },
  ];

  const getKDRatio = (kills: number, deaths: number) => {
    return deaths === 0 ? kills.toFixed(1) : (kills / deaths).toFixed(1);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(({ label, align }) => (
              <th
                key={label}
                className={`px-4 py-3 text-sm font-semibold text-gray-700 text-${align}`}
              >
                <div
                  className={`flex items-center ${
                    align === "center" ? "justify-center" : "justify-start"
                  }`}
                >
                  {label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {scoreboard.scoreboardRows
            .sort((a, b) => b.kills - a.kills)
            .map((row, index) => {
              const isWinningTeam = row.team === winningTeam;
              const kd = getKDRatio(row.kills, row.deaths);

              return (
                <tr
                  key={row.player + index}
                  className={`hover:bg-gray-50 transition-colors ${
                    isWinningTeam
                      ? "bg-green-50 border-l-4 border-l-green-400"
                      : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        {row.player}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        isWinningTeam
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {row.team}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-green-600">
                      {row.kills}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-red-600">
                      {row.deaths}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-blue-600">
                      {row.assists}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-yellow-600">
                      {row.flashAssists}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-bold ${
                        parseFloat(kd) >= 1.5
                          ? "text-green-700"
                          : parseFloat(kd) >= 1.0
                            ? "text-gray-700"
                            : "text-red-700"
                      }`}
                    >
                      {kd}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
