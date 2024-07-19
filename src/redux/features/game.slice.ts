import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import _, { result } from "lodash";

export type GameOption = "rock" | "paper" | "scissors";

export interface GameState {
  balance: number;
  bet: number;
  bet_on_rock: number;
  bet_on_paper: number;
  bet_on_scissors: number;
  winnings: number;
  human_plays: GameOption | "";
  computer_plays: GameOption | "";
  result: "tie" | "win" | "lose" | "";
}

const game_array: GameOption[] = ["rock", "paper", "scissors"];

const initialState: GameState = {
  balance: 5000,
  bet: 0,
  bet_on_rock: 0,
  bet_on_paper: 0,
  bet_on_scissors: 0,
  winnings: 0,
  human_plays: "",
  computer_plays: "",
  result: "",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    add_stake: (state, action: PayloadAction<GameOption>) => {
      if (state.balance <= state.bet_on_paper + state.bet_on_rock + state.bet_on_scissors)
        return {
          ...state,
          result: "",
        };
      if (action.payload === "paper") {
        return {
          ...state,
          bet_on_paper: state.bet_on_paper + 500,
          bet: state.bet + 500,
          result: "",
        };
      }

      if (action.payload === "rock") {
        return {
          ...state,
          bet_on_rock: state.bet_on_rock + 500,
          bet: state.bet + 500,
          result: "",
        };
      }

      if (action.payload === "scissors") {
        return {
          ...state,
          bet_on_scissors: state.bet_on_scissors + 500,
          bet: state.bet + 500,
          result: "",
        };
      }
    },
    lose_stake: (state) => {
      return {
        ...state,
        bet: 0,
        bet_on_paper: 0,
        bet_on_scissors: 0,
        bet_on_rock: 0,
        winnings: 0,
        balance: state.balance - state.bet,
      };
    },
    win_stake: (state, action: PayloadAction<"single win" | "double win">) => {
      let newWinnings = state.bet * (action.payload === "single win" ? 14 : 3);
      let newBalance = state.balance + newWinnings - state.bet;
      return {
        ...state,
        bet: 0,
        bet_on_paper: 0,
        bet_on_scissors: 0,
        bet_on_rock: 0,
        balance: newBalance,
        winnings: newWinnings,
      };
    },
    tie_stake: (state) => {
      return {
        ...state,
        bet: 0,
        bet_on_paper: 0,
        bet_on_scissors: 0,
        bet_on_rock: 0,
        balance: state.balance,
      };
    },
    play_game: (state, action: PayloadAction<GameOption[]>) => {
      if (!action.payload.length) return state;
      const computer_plays = game_array[_.random(0, 2)];
      const human_plays = game_array[_.random(0, 2)];

      const game_result = RockPaperScissors(computer_plays, human_plays);
      if (!game_result) return state;

      return {
        ...state,
        computer_plays,
        human_plays,
        result: game_result,
      };
    },
  },
});

export const { add_stake, lose_stake, tie_stake, win_stake, play_game } = gameSlice.actions;
export const selectGame = (state: RootState): GameState => state.game;

export default gameSlice.reducer;

function RockPaperScissors(computer_played: GameOption, human_played: GameOption) {
  if (computer_played === human_played) return "tie";

  if (computer_played === "rock") {
    if (human_played === "paper") return "win";
    else return "lose";
  }

  if (computer_played === "paper") {
    if (human_played === "scissors") return "win";
    else return "lose";
  }

  if (computer_played === "scissors") {
    if (human_played === "rock") return "win";
    else return "lose";
  }
}
