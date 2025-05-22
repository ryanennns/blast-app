import { X, Trophy, MapPin } from "lucide-react";
import { useMount } from "react-use";
import { API_BASE_URL } from "../const.ts";
import { useMemo, useState } from "react";
import type { Round, Scoreboard } from "../types/core.ts";
import { ScoreboardTable } from "./ScoreboardTable.tsx";
import { ToggleButton } from "./ToggleButton.tsx";
import { MatchTimeline } from "./MatchTimeline.tsx";

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
  const fakeScoreboard = useMemo<Scoreboard>(() => {
    const fakeScoreboardRow = {
      player: "--",
      team: "--",
      kills: 0,
      deaths: 0,
      assists: 0,
      flashAssists: 0,
    };

    const fakeRows = Array(10)
      .fill(null)
      .map(() => ({ ...fakeScoreboardRow }));

    return {
      id: "--",
      matchId: "--",
      scoreboardRows: fakeRows,
    };
  }, []);

  const [scoreboard, setScoreboard] = useState<Scoreboard>(fakeScoreboard);
  const [rounds, setRounds] = useState<Round[]>([]);
  const toggleButtonOptions = [
    { label: "Scoreboard", value: "scoreboard" },
    { label: "Timeline", value: "timeline" },
  ];
  const [activeTab, setActiveTab] = useState("scoreboard");

  useMount(async () => {
    const scoreboardResponse = await fetch(
      `${API_BASE_URL}/matches/${match.id}/scoreboard`,
    );
    const json = await scoreboardResponse.json();
    setScoreboard(json.scoreboard);

    const roundsResponse = await fetch(
      `${API_BASE_URL}/matches/${match.id}/rounds`,
    );

    const roundsJson = await roundsResponse.json();
    setRounds(roundsJson.rounds);
  });

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex max-w-5xl m-auto items-center justify-center p-4">
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

          {activeTab === "scoreboard" && (
            <div>
              <div className="p-2 max-w-2xl mx-auto">
                <ScoreboardTable
                  scoreboard={scoreboard}
                  winningTeam={match.winner}
                />
              </div>
            </div>
          )}

          {activeTab === "timeline" && (
            <>
              <MatchTimeline rounds={rounds} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
