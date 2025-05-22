export interface Match {
  id: string;
  map: string;
  team_a: string;
  team_b: string;
  team_a_score: number;
  team_b_score: number;
  winner: string;
}

export interface ScoreboardRow {
  player: string;
  team: string;
  kills: number;
  deaths: number;
  assists: number;
  flashAssists: number;
}

export interface Scoreboard {
  id: string;
  matchId: string;
  scoreboardRows: ScoreboardRow[];
}

export interface UploadApiResponse {
  match: Match;
}

export interface ScoreboardApiResponse {
  scoreboard: Scoreboard;
}
