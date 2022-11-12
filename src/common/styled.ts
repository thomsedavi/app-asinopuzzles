import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Heading1 = styled.h1`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  font-variant: small-caps;
  margin: 1em 0 0.5em;
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
`;

export const TextAreaContainer = styled.div`
  position: relative;
  width: 21em;
  margin: 0 auto;
`;

export const TextArea = styled.textarea`
  display: inline-block;
`;

export const ButtonIcon = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const TextAreaCancel = styled(ButtonIcon)`
  bottom: 1.8em;
`;

export const TextAreaSave = styled(ButtonIcon)`
  bottom: 0.4em;
`;

export const Navigation = styled.nav`
  box-shadow: 0 0 0.5em var(--shadow);
`;

export const HeaderLinkInternal = styled(Link)`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
`;

export const HeaderLinkExternal = styled.a`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
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
