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

export interface Kill {
  killer: string;
  killed: string;
  weapon: string;
  headshot: boolean;
  order: number;
}

export interface Assist {
  assister: string;
  killed: string;
  order: number;
}

export interface FlashAssist {
  assister: string;
  killed: string;
  order: number;
}

export interface Round {
  id: string;
  number: number;
  winner: "T" | "CT";
  matchId: string;
  halfId: string;
  winMethod: "kills" | "defusal" | "bomb";
  kills: Kill[];
  assists: Assist[];
  flashAssists: FlashAssist[];
}
