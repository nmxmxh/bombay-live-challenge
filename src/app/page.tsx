"use client";

import { Button } from "@/components/button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectGame,
  add_stake,
  lose_stake,
  tie_stake,
  win_stake,
  GameOption,
  play_game,
} from "@/redux/features/game.slice";
import { MutableRefObject, Ref, useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function Page() {
  const gameState = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const [gameStage, setGameStage] = useState<"initial" | "playing" | "result">("initial");
  const [gameResult, setGameResult] = useState<"win" | "tie" | "lose" | "">("");
  const human_choices: MutableRefObject<GameOption[]> = useRef([]);

  function makeBet(bet: GameOption) {
    dispatch(add_stake(bet));
  }

  async function playBet() {
    if (!gameState.bet) return;
    if (!human_choices) return;

    if (gameState.bet_on_paper) human_choices.current.push("paper");
    if (gameState.bet_on_rock) human_choices.current.push("rock");
    if (gameState.bet_on_scissors) human_choices.current.push("scissors");

    dispatch(play_game(human_choices.current));
    setGameStage("playing");
  }

  useEffect(() => {
    if (!gameState.result) setGameStage("initial");

    if (gameState.result === "win") {
      if (!gameState.human_plays) return;
      if (human_choices.current.includes(gameState?.human_plays)) {
        if (human_choices.current.length > 1) {
          dispatch(win_stake("double win"));
        } else dispatch(win_stake("single win"));

        setGameResult("win");
        setGameStage("result");
        human_choices.current = [];
      } else {
        dispatch(lose_stake());
        setGameResult("lose");
        setGameStage("result");
        human_choices.current = [];
      }
    }

    if (gameState.result === "tie") {
      dispatch(tie_stake());
      setGameResult("tie");
      setGameStage("result");
      human_choices.current = [];
    }

    if (gameState.result === "lose") {
      dispatch(lose_stake());
      setGameResult("lose");
      setGameStage("result");
      human_choices.current = [];
    }
  }, [gameState.result]);

  const gameText = `${
    gameResult === "win"
      ? `${gameState.human_plays} WON. <n/>WINS ${gameState.winnings}`
      : gameResult === "tie"
      ? "PLAYER TIED"
      : gameResult === "lose"
      ? "PLAYER LOSES"
      : ""
  }`;

  return (
    <Style.Container>
      <section className="game-comms">
        {gameStage === "initial" && <h1>PICK YOUR POSITIONS</h1>}
        {gameStage === "playing" && (
          <h1>
            {gameState.computer_plays} vs {gameState.human_plays}
          </h1>
        )}
        {gameStage === "result" && <h1>{gameText}</h1>}
      </section>
      <section className="game-options">
        <Button
          disable={gameState.bet_on_paper && gameState.bet_on_scissors ? true : false}
          name="rock"
          makeBet={makeBet}
        >
          <span>{gameState.bet_on_rock.toLocaleString()}</span>
          <p>ROCK</p>
        </Button>
        <Button
          disable={gameState.bet_on_scissors && gameState.bet_on_rock ? true : false}
          name="paper"
          makeBet={makeBet}
        >
          <span>{gameState.bet_on_paper.toLocaleString()}</span>
          <p>PAPER</p>
        </Button>
        <Button
          disable={gameState.bet_on_paper && gameState.bet_on_rock ? true : false}
          name="scissors"
          makeBet={makeBet}
        >
          <span>{gameState.bet_on_scissors.toLocaleString()}</span>
          <p>SCISSORS</p>
        </Button>
      </section>
      <button
        disabled={!gameState.bet_on_paper && !gameState.bet_on_rock && !gameState.bet_on_scissors}
        className="game-play"
        onClick={playBet}
      >
        PLAY
      </button>
    </Style.Container>
  );
}

export const Style = {
  Container: styled.main`
    height: 92.5%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;

    .game-comms {
      width: 75%;
      height: 30%;
      color: white;
      padding: 2.5%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-align: center;

      h1 {
        font-size: 100%;
        text-transform: uppercase;
      }
    }

    button.game-play {
      height: 7.5%;
      width: 15%;
      color: white;
      margin: 5%;
      border: 1px solid white;
    }

    .game-options {
      height: 30%;
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
};
