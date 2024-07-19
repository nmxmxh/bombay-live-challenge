"use client";

import styled from "styled-components";
import { useAppSelector } from "@/lib/hooks";
import { selectGame } from "@/redux/features/game.slice";
import AnimatedNumbers from "react-animated-numbers";

export default function Header() {
  const gameState = useAppSelector(selectGame);
  const bet = gameState.bet_on_paper + gameState.bet_on_rock + gameState.bet_on_scissors;

  return (
    <Style.Container>
      <div className="header-content">
        <p>
          BALANCE:{" "}
          <AnimatedNumbers
            includeComma
            transitions={() => ({
              type: "spring",
              duration: 0.5,
            })}
            animateToNumber={gameState.balance}
          />
        </p>
        <p>
          BET:{" "}
          <AnimatedNumbers
            includeComma
            transitions={() => ({
              type: "spring",
              duration: 0.5,
            })}
            animateToNumber={bet}
          />
        </p>
        <p>
          WIN:{" "}
          <AnimatedNumbers
            includeComma
            transitions={() => ({
              type: "spring",
              duration: 0.5,
            })}
            animateToNumber={gameState.winnings}
          />
        </p>
      </div>
    </Style.Container>
  );
}

export const Style = {
  Container: styled.header`
    width: 100%;
    height: 7.5%;
    display: grid;
    place-items: center;
    background-color: #060505;
    border-bottom: 0.5px solid white;

    div.header-content {
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;

      p {
        width: 30%;
        text-align: center;
        display: flex;
        justify-content: center;
        margin: auto;

        span {
          margin-left: 10px;
        }
      }
    }
  `,
};
