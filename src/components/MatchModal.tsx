import { X, Trophy, MapPin } from "lucide-react";
import { useMount } from "react-use";
import { API_BASE_URL } from "../const.ts";
import { useState } from "react";
import type { Scoreboard } from "../types/core.ts";
import { ScoreboardTable } from "./ScoreboardTable.tsx";
import { ToggleButton } from "./ToggleButton.tsx";

interface Match {
  id: string;
  map: string;
  team_a: string;
  team_b: string;
  team_a_score: number;
  team_b_score: number;
  winner: string;
}

interface Props {
  match: Match;
  open: boolean;
  onClose: () => void;
}

export function MatchModal({ match, open, onClose }: Props) {
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null);
  const toggleButtonOptions = [
    { label: "Scoreboard", value: "scoreboard" },
    { label: "Timeline", value: "timeline" },
  ];
  const [activeTab, setActiveTab] = useState("scoreboard");

  useMount(async () => {
    const response = await fetch(
      `${API_BASE_URL}/matches/${match.id}/scoreboard`,
    );
    const json = await response.json();
    setScoreboard(json.scoreboard);
  });

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1" />
              {match.map.toUpperCase()} {" : "}
              {match.team_a_score} - {match.team_b_score}
            </div>

            <div className="text-2xl font-bold flex items-center justify-center space-x-2">
              {match.winner === match.team_a && (
                <Trophy size={18} className="text-green-600" />
              )}
              <span
                className={
                  match.winner === match.team_a ? "text-green-600" : ""
                }
              >
                {match.team_a}
              </span>

              <span className="text-gray-400">vs</span>

              <span
                className={
                  match.winner === match.team_b ? "text-green-600" : ""
                }
              >
                {match.team_b}
              </span>
              {match.winner === match.team_b && (
                <Trophy size={18} className="text-green-600" />
              )}
            </div>

            <div className="flex justify-center">
              <ToggleButton
                options={toggleButtonOptions}
                value={activeTab}
                onChange={setActiveTab}
              />
            </div>
          </div>

          <div>
            <div className="p-2 max-w-2xl mx-auto flex flex-row">
              <ScoreboardTable
                scoreboard={scoreboard}
                winningTeam={match.winner}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
