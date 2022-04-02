import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProvider } from "@/Configs/Provider";
import { AppTopbarLogo } from "@/svgs";
import { Link, LinkIcon } from "../Link";
import { ToggleThemeButton } from "../ToggleThemeButton";

export const TopBar = ({ auth, ...props }) => {
  const myProvider = useProvider();
  const [authmenuopen, setAuthmenuopen] = useState(false);
  var navbar = document.getElementById("topbar");

  useEffect(() => {
    const myMenu = document.getElementById("auth-menu");
    if (myMenu) {
      authmenuopen
        ? myMenu.classList.add("open")
        : myMenu.classList.remove("open");
    }
  }, [authmenuopen]);

  function myFunction() {
    if (window.pageYOffset >= 60) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
  window.onscroll = function () {
    myFunction();
  };

  return (
    <Container id="topbar">
      <Bar>
        {auth && (
          <>
            <Authenticated id="auth-menu">
              {authmenuopen && (
                <AuthMenu>
                  <LinkIcon className="icons" to="#">
                    manage_accounts
                  </LinkIcon>
                  <LinkIcon className="icons" to="/logout">
                    logout
                  </LinkIcon>
                </AuthMenu>
              )}
              <LinkIcon
                to="#"
                onClick={() => {
                  setAuthmenuopen((x) => !x);
                }}
                className="icons"
              >
                {authmenuopen ? "chevron_right" : "chevron_left"}
              </LinkIcon>
            </Authenticated>
            <Link to="/categorias">TodoAPP</Link>
          </>
        )}
        <Public>
          <Link to="/">
            <AppTopbarLogo />
          </Link>
        </Public>
      </Bar>
      <ToggleThemeButton
        className={myProvider.Theme.isDarkMode && "dark"}
        onClick={myProvider.Theme.Toggle}
      />
    </Container>
  );
};

const Container = styled.header`
  transition: all 200ms linear;
  z-index: 1996;
  overflow: hidden;
  position: relative;
  display: flex;
  background-color: ${(props) => props.theme.backgrounds.primary.transparent};
  height: 60px;
  align-items: center;

  @keyframes stickedHandle {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  &.sticky {
    width: 100%;
    top: 0;
    position: fixed;
    animation: stickedHandle 1s cubic-bezier(0.46, 0.83, 0.81, 0.44) forwards;
  }
`;

const Bar = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row-reverse;
  align-items: center;
  margin: 0 0 0 20px;
  grid-gap: 10px;
`;

const Public = styled.div`
  flex-grow: 1;
`;
const Authenticated = styled.div`
  transition: all 1s linear;
  display: flex;
  background-color: hsla(0, 0%, 30%, 0%);
  height: 40px;
  width: min-content;
  padding: 0 10px;
  justify-content: flex-end;
  grid-gap: 10px;
  border-radius: 60px;
  align-items: center;

  &.open {
    background-color: hsla(0, 0%, 30%, 10%);
    width: max-content;
    padding: 0 20px;
  }
`;
const AuthMenu = styled.div`
  z-index: 0;
  display: flex;
  grid-gap: 10px;
`;
