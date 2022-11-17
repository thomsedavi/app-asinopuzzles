import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Placeholder = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8em;
`;

export const Heading1 = styled.h1`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  font-variant: small-caps;
  margin: 0.5em 0;
`;

export const Heading2 = styled.h2`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  margin: 1em 0 0.5em;
`;

export const Paragraph = styled.p`
  text-align: center;
  margin: 0.5em 0;
`;

export const ButtonContainer = styled.div`
  text-align: center;
`;

export const Input = styled.input`
  font-size: 1em;
  width: 80%;
`;

export const EditIcon = styled.span`
  cursor: pointer;
  text-shadow: none;
`;

export const Button = styled.button`
  margin: 0.5em;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 1em;
  padding: 1px 6px;
  font-family: inherit;

  &:hover {
    background: var(--hover);
  }

  &:disabled {
    background: var(--disabled);
  }
`;

export const ButtonLink = styled(Link)`
  margin: 0.5em;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 1em;
  text-decoration: none;
  padding: 1px 6px;
  display: inline-block;

  &:hover {
    background: var(--hover);
  }

  &:disabled {
    background: var(--disabled);
  }
`;

export const TextArea = styled.textarea`
  display: block;
  margin: 0.5em auto;
`;

export const Navigation = styled.nav`
  box-shadow: 0 0 0.5em var(--shadow);
`;

export const ErrorMessage = styled.div`
  text-align: center;
  color: var(--error);
`;

export const HeaderLinkInternal = styled(NavLink)`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
  text-shadow: 1px 0px 1px var(--accent);

  @media (max-width: 575px) {
    display: block;
  }

  @media (min-width: 576px) {
    display: inline-block;
  }
`;

export const HeaderLinkExternal = styled.a`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
  text-shadow: 1px 0px 1px var(--accent);

  @media (max-width: 575px) {
    display: block;
  }

  @media (min-width: 576px) {
    display: inline-block;
  }
`;

export const TextLink = styled.a`
  color: var(--accent-pale);
  font-weight: 700;
  text-decoration: none;
`;

export const Container = styled.div`
  margin: 0 auto;

  @media (max-width: 575px) {
    width: 340px;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 556px;
  }

  @media (min-width: 768px) {
    width: 748px;
  }
`;

export const Burger = styled.svg`
  float: right;
  cursor: pointer;

  @media (min-width: 576px) {
    display: none;
  }
`;

export const LogoLarge = styled.svg`
  @media (max-width: 575px) {
    display: none;
  }

  @media (min-width: 576px) {
    height: 1.4em;
  }
`;

export const LogoSmall = styled.svg`
  @media (max-width: 575px) {
    height: 1.15em;
  }

  @media (min-width: 576px) {
    display: none;
  }
`;

export const PathAccent = styled.path`
  fill: var(--accent);
`;

export const PathFill = styled.path`
  fill: var(--color);

  ${Burger}:hover & {
    fill: var(--hover);
  }

  ${LogoLarge}:hover & {
    fill: var(--hover);
  }

  ${LogoSmall}:hover & {
    fill: var(--hover);
  }
`;