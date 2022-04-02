import styled from "styled-components";
import { Link as Linkto } from "react-router-dom";

export const Link = styled(Linkto)`
  appearance: none;
  nav-index: -1;
  transition: all 200ms ease-in;
  color: ${(props) => props.theme.colors.logo};
  font-size: 20px;
  text-decoration: none;
  text-shadow: 0 0 2px ${(props) => props.theme.colors.logo};
  filter: brightness(0.7);

  &:hover {
    filter: brightness(1);
  }
`;

export const LinkIcon = styled(Link)`
  user-select: none;
  nav-index: -1;
  font-size: 30px;
  &:hover {
    text-decoration: none;
  }
`;
