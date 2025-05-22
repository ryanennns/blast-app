import type {Round} from "../types/core.ts";
import {X} from "lucide-react";

interface Props {
  round: Round;
  onExit: () => void;
}

export function RoundDataContainer({ round, onExit }: Props) {
  return (
      <div className="relative mt-4 border rounded-lg p-4 max-w-xl mx-auto bg-gray-50">
        <button
            onClick={onExit}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16}/>
        </button>

        <h4 className="font-bold mb-2 text-gray-800">
          Round {round.number} – {round.winner} won by{" "}
          {round.winMethod}
        </h4>

        <ul className="text-sm text-gray-700 space-y-1">
          {round.kills
              .sort((a, b) => a.order - b.order)
              .map((kill, i) => (
                  <li key={i}>
                    {kill.killer} → {kill.killed} ({kill.weapon}
                    {kill.headshot ? " 💥" : ""})
                  </li>
              ))}
        </ul>

        {round.assists.length > 0 && (
            <div className="mt-3">
              <h5 className="font-semibold text-sm text-gray-800">Assists</h5>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                {round.assists.map((a, i) => (
                    <li key={i}>
                      {a.assister} → {a.killed}
                    </li>
                ))}
              </ul>
            </div>
        )}

        {round.flashAssists.length > 0 && (
            <div className="mt-3">
              <h5 className="font-semibold text-sm text-gray-800">Flash Assists</h5>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                {round.flashAssists.map((f, i) => (
                    <li key={i}>⚡{f.assister} → {f.killed}</li>
                ))}
              </ul>
            </div>
        )}
      </div>

  );
}