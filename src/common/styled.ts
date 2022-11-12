import { Link } from 'react-router-dom';
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

export const Button = styled.button`
  margin: 0.5em;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 1em;

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

export const HeaderLinkInternal = styled(Link)`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;

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

  @media (max-width: 575px) {
    display: block;
  }

  @media (min-width: 576px) {
    display: inline-block;
  }
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
