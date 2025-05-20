import FileDropper from "../components/FileDropper.tsx";
import type { ScoreboardRow } from "../types/core.ts";
import { useState } from "react";
import { Scoreboard } from "../components/Scoreboard/Scoreboard.tsx";

export function Home() {
  const [scoreboard, setScoreboard] = useState<Record<string, ScoreboardRow>>(
    {},
  );

  const handleApiResponse = (response: unknown) => {
    setScoreboard(
      (response as { scoreboard: Record<string, ScoreboardRow> }).scoreboard,
    );
  };

  return (
    <>
      <FileDropper onApiResponse={handleApiResponse} />

      <Scoreboard data={scoreboard} />
    </>
  );
}
