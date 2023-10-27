import { styled } from "styled-components";
import React from "react";

type CardProps = {
  children: React.ReactNode;
};
export default function Card(props: CardProps): JSX.Element {
  const { children } = props;
  return <CardContainer>{children}</CardContainer>;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #ffffff;
  margin: 2rem;
  padding: 1rem;
  width: 100%;
`;
