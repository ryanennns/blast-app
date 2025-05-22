import { API_BASE_URL } from "../const.ts";
import type {Match, Round, Scoreboard} from "../types/core.ts";

export const getMatches = async (): Promise<Match[] | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches`);
    const data = await response.json();

    if (!data.matches) {
      return undefined;
    }

    return data.matches;
  } catch (e: unknown) {
    return undefined;
  }
}

export const getMatchScoreboard = async (
  matchId: string,
): Promise<Scoreboard | undefined> => {
  try {
    const scoreboardResponse = await fetch(
      `${API_BASE_URL}/matches/${matchId}/scoreboard`,
    );
    const json = await scoreboardResponse.json();

    if (!json.scoreboard) {
      return undefined;
    }

    return json.scoreboard;
  } catch (e: unknown) {
    return undefined;
  }
};

export const getMatchRounds = async (
  matchId: string,
): Promise<Round[] | undefined> => {
  try {
    const roundsResponse = await fetch(
      `${API_BASE_URL}/matches/${matchId}/rounds`,
    );

    const roundsJson = await roundsResponse.json();

    if (!roundsJson.rounds) {
      return undefined;
    }

    return roundsJson.rounds;
  } catch (e: unknown) {
    return undefined;
  }
};
