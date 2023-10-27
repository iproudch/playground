import { styled } from "styled-components";
import { color } from "../styles/styles";
import { Link, Outlet } from "react-router-dom";
const Menu = [
  {
    id: "1",
    title: "Home",
    path: "/",
  },
  {
    id: "2",
    title: "Projects",
    path: "/projects",
  },
  {
    id: "3",
    title: "Library",
    path: "/library",
  },
];
export default function ApplicationLayout(): JSX.Element {
  return (
    <>
      <SidebarContainer className="sidebar">
        <Title>Playground</Title>
        <MenuList>
          {Menu.map((item) => (
            <Link key={item.id} to={item.path}>
              <MenuItem>{item.title}</MenuItem>
            </Link>
          ))}
        </MenuList>
      </SidebarContainer>
      <ContentContainer className="content-container">
        <Content className={"default-layout-content"}>
          <Outlet />
        </Content>
      </ContentContainer>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  flex: 1;
  padding: 0;
  gap: 32px;
  width: 100%;
  background: ${color.white};
  border-radius: 8px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 32px;
  flex: 1;
  overflow: hidden;
  justify-content: stretch;
  background: ${color.gray};
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
  }
`;

const Title = styled.div`
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
`;
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`;

const MenuItem = styled.span`
  &.active {
    color: ${color.orange};
  }
`;

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: ${color.black};
  color: ${color.white};
  @media (max-width: 768px) {
    width: 150px;
  }
  @media (max-width: 420x) {
    width: 50px;
  }
`;
