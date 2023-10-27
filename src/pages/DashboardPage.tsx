import { styled } from "styled-components";

export default function DashboardPage(): JSX.Element {
  return (
    <HomepageContainer>
      <Title>About Playground</Title>
      <Content>
        Playground is a React app build with vite for showing example of
        whatever library or tools that i interested or using in real world{" "}
        <br />
        project demo and production build is coming soon!
      </Content>
    </HomepageContainer>
  );
}

const Title = styled.div`
  display: flex;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
