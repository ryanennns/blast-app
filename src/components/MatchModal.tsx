import { X, Trophy, MapPin } from "lucide-react";
import { useMount } from "react-use";
import { API_BASE_URL } from "../const.ts";
import { useState } from "react";
import type { Scoreboard } from "../types/core.ts";
import {ScoreboardTable} from "./ScoreboardTable.tsx";

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
            <X size={20}/>
          </button>

          <div className="text-center space-y-4">
            <div className="inline-flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-1"/>
              {match.map.toUpperCase()}
            </div>

            <div className="text-2xl font-bold">
              {match.team_a}
              <span className="mx-2 text-gray-400">vs</span>
              {match.team_b}
            </div>

            <div className="text-xl font-mono">
              {match.team_a_score} - {match.team_b_score}
            </div>

            <div
                className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mt-2">
              <Trophy size={16} className="mr-2"/>
              {match.winner} wins
            </div>
          </div>

          <div>
            <div className="max-w-2xl mx-auto mt-6">
              <ScoreboardTable scoreboard={scoreboard}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
