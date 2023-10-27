import clsx from "clsx";
import { styled } from "styled-components";

export enum EColor {
  ORANGE = "orange",
  CREAM = "CREAM",
  SAGE = "sage",
  BLACK = "black",
}

type ColorExampleProps = {
  color?: EColor;
};
export default function ColorExample(props: ColorExampleProps): JSX.Element {
  const { color = EColor.ORANGE } = props;
  return (
    <ColorContainer className={clsx("color-example", color)}></ColorContainer>
  );
}

const ColorContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &.${EColor.ORANGE} {
    background-color: #cd5c08;
  }
  &.${EColor.CREAM} {
    background-color: #fcf9eb;
  }
  &.${EColor.SAGE} {
    background-color: #6a9c89;
  }
  &.${EColor.BLACK} {
    background-color: #353839;
  }
`;
