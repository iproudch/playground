import { styled } from "styled-components";
import { color } from "../styles/styles";
import { Link, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import { IMenu } from "../interfaces/IApp";
import { useMemo } from "react";
const Menu: IMenu[] = [
  {
    id: "1",
    title: "Home",
    path: "/",
  },
  {
    id: "2",
    title: "Projects",
    path: "/projects",
    subMenu: [
      {
        id: "pj-1",
        title: "PDF Viewer",
        path: "/projects/pdf",
      },
      // {
      //   id: "pj-2",
      //   title: "Project 2",
      //   path: "/projects/2",
      // },
    ],
  },
  {
    id: "3",
    title: "Library",
    path: "/library",
  },
];
export default function ApplicationLayout(): JSX.Element {
  const { pathname } = useLocation();

  const showSubMenu = useMemo(() => {
    return pathname.includes("/projects");
  }, [pathname]);

  return (
    <>
      <SidebarContainer className="sidebar">
        <Title>Playground</Title>
        <MenuList>
          {Menu.map((item) => (
            <MenuItemContainer key={item.id}>
              <div>
                <Link to={item.path}>
                  <MenuItem
                    className={clsx({ active: pathname === item.path })}
                  >
                    {item.title}
                  </MenuItem>
                </Link>
                {showSubMenu && (
                  <MenuList>
                    {item.subMenu?.map((subItem) => (
                      <SubMenu key={subItem.id}>
                        <Link to={subItem.path}>
                          <MenuItem
                            className={clsx({
                              active: pathname === subItem.path,
                            })}
                          >
                            {subItem.title}
                          </MenuItem>
                        </Link>
                      </SubMenu>
                    ))}
                  </MenuList>
                )}
              </div>
            </MenuItemContainer>
          ))}
        </MenuList>
        <License>Proud © Copyright 2023</License>
      </SidebarContainer>

      <ContentContainer className="content-container">
        <Content className={"default-layout-content"}>
          <Outlet />
        </Content>
      </ContentContainer>
    </>
  );
}

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding:  0 8px;
    
}`;

const License = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 1rem;
  bottom: 0;
  position: absolute;
  width: 200px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  flex: 1;
  padding: 16px;
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

  a {
    text-decoration: none;
    color: ${color.white};
  }

  a:hover {
    color: #96d5bd;
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: none;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  &.active {
    font-weight: 500;
    color: ${color.white};
    background: ${color.sage};
    border-radius: 2px;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100dvh;
  height: auto;
  width: 250px;
  background: ${color.black};
  color: ${color.white};

  @media (max-width: 768px) {
    width: 150px;
  }
  @media (max-width: 420x) {
    width: 50px;
  }
`;
