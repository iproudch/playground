import { styled } from "styled-components";

export type StyleColors = Record<string, string>;

export const color: StyleColors = {
  black: '#353839',
  orange: '#cd5c08',
  cream: '#fcf9eb',
  sage: '#6a9c89',
  white: '#ffffff',
  gray: '#fafafa',
}

export const Title = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: 700;
`;