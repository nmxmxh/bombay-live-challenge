import { GameOption } from "@/redux/features/game.slice";
import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  name: GameOption;
  disable: boolean;
  makeBet: (stake: GameOption) => void;
  children: ReactNode;
}

export function Button(props: ButtonProps) {
  const { disable, name, makeBet, children } = props;

  function handleClick() {
    makeBet(name);
  }
  return (
    <Style.Container disabled={disable} onClick={handleClick}>
      {children}
    </Style.Container>
  );
}

const Style = {
  Container: styled.button`
    width: 30%;
    height: 100%;
    border: 1px solid white;
    opacity: 0.75;
    color: white;
    padding: 5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    span,
    p {
      width: 100%;
      text-align: left;
    }

    span {
      font-size: 300%;
      margin-bottom: 5%;
      font-size: 300;
    }

    p {
      font-size: 125%;
      font-weight: 800;
    }
  `,
};
