import { AuthButton, LogoDisplay } from "@/Components";
import styled from "styled-components";
import { FacebookIcon, GithubIcon, GoogleIcon } from "@/svgs";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

import { useCallback, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Auth } from "@/Configs/Firebase-config";
import { useProvider } from "@/Configs/Provider";

const Guide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: -1;
  margin-top: 20px;
  left: 0;
  right: 0;
`;
const SubGuide = styled.div`
  display: block;
  width: 100%;
`;

const Container = styled.main`
  transition: all ease-in-out 1s;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgrounds.logo.transparent};
  border: 1px solid ${(props) => props.theme.colors.logo};
  max-width: 600px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  backdrop-filter: blur(10px);

  animation: Xcs forwards 1s;
  @keyframes Xcs {
    0% {
      transform: scale(0);
    }
    1% {
      transform: scale(0.001);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 650px) {
    max-width: 90%;
  }
`;

const Logo = styled.div`
  margin: 40px 0;
`;

const Content = styled.section`
  transition: all ease-in-out 1s;
  display: flex;
  margin: 20px;

  @media (max-width: 580px) {
    transform: scale(0.9);
  }

  @media (max-width: 500px) {
    transform: scale(0.9);
    flex-direction: column;
    align-items: center;
    width: 80%;
    justify-content: space-around;

    & button {
      transition: all ease-in-out 1s;
      width: 80%;
    }
  }
`;

export const Login = (props) => {
  const myProvider = useProvider();
  const NavigateMe = useNavigate();

  const handleGoogleLogin = useCallback(async () => {
    signInWithPopup(Auth, new GoogleAuthProvider());
  }, [window.history]);

  const handleFacebookLogin = useCallback(async () => {
    signInWithPopup(Auth, new FacebookAuthProvider());
  }, [window.history]);

  const handleGithubLogin = useCallback(async () => {
    signInWithPopup(Auth, new GithubAuthProvider());
  }, [window.history]);

  return (
    <Guide>
      {myProvider.Auth.User && <Navigate to={"/"} replace />}
      <SubGuide>
        <Container>
          <Logo>
            <LogoDisplay />
          </Logo>

          <Content>
            <AuthButton before={<GoogleIcon />} onClick={handleGoogleLogin}>
              Google
            </AuthButton>
            <AuthButton before={<FacebookIcon />} onClick={handleFacebookLogin}>
              Facebook
            </AuthButton>
            <AuthButton before={<GithubIcon />} onClick={handleGithubLogin}>
              GitHub
            </AuthButton>
          </Content>
        </Container>
      </SubGuide>
    </Guide>
  );
};
