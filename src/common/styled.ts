import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Placeholder = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8em;
`;

interface HeaderProps {
  editable?: boolean
}

export const Heading1 = styled.h1<HeaderProps>`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  font-variant: small-caps;
  margin: 0.5em 0;
  cursor: ${props => props.editable ? "pointer" : "text"}
`;

export const Heading2 = styled.h2`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  margin: 1em 0 0.5em;
`;

interface ParagraphProps {
  editable?: boolean
}

export const Paragraph = styled.p<ParagraphProps>`
  text-align: center;
  margin: 1em 0;
  cursor: ${props => props.editable ? "pointer" : "text"}
`;

export const ButtonGroup = styled.div`
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
  padding: 2px 8px;
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

  &:hover {
    color: var(--hover);
  }

  @media (width < 576px) {
    display: block;
  }

  @media (576px <= width) {
    display: inline-block;
  }
`;

export const HeaderLinkExternal = styled.a`
  color: var(--color);
  text-decoration: none;
  padding: 0.5em 0.5em;
  text-shadow: 1px 0px 1px var(--accent);

  &:hover {
    color: var(--hover);
  }

  @media (width < 576px) {
    display: block;
  }

  @media (576px <= width) {
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

  @media (width < 576px) {
    width: 340px;
  }

  @media (576px <= width < 768px) {
    width: 556px;
  }

  @media (768px <= width) {
    width: 748px;
  }
`;

export const Burger = styled.svg`
  float: right;
  cursor: pointer;

  @media (576px <= width) {
    display: none;
  }
`;

export const LogoLarge = styled.svg`
  height: 1.4em;

  @media (width < 576px) {
    display: none;
  }

  @media (576px <= width) {
    display: inline-block;
  }
`;

export const LogoSmall = styled.svg`
  display: block;
  height: 1.15em;

  @media (width < 576px) {
    display: block;
  }

  @media (576px <= width) {
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

export const InlineLabel = styled.label`
  width: 50%;
  display: inline-block;
  text-align: right;
  padding-right: 0.5em;
  box-sizing: border-box;
`;

interface InlineInputProps {
  short?: boolean;
}

export const InlineInput = styled.input<InlineInputProps>`
  display: inline-block;
  margin-left: 0.5em;
  box-sizing: border-box;
  width: ${props => props.short ? '4em' : ''}
`;

export const InputGroup = styled.div`
  margin: 1em 0px;
`;

export const Information = styled.div`
  background-color: var(--background-color-information);
  font-size: 0.8em;
  text-align: center;
  border: 1px solid var(--accent);
  padding: 0.5em;
  margin: 1em 0;
`;

export const Table = styled.table`
  width: 100%;
  border: 1px solid var(--color);
  border-collapse: collapse;
  table-layout: fixed;
`;

export const Tr = styled.tr`
`;

interface ThProps {
  oneFifth?: boolean;
  threeFifths?: boolean;
}

const getThWidth = (props: ThProps): string => {
  if (props.oneFifth) return '20%';
  else if (props.threeFifths) return '60%';
  else return 'auto';
}

export const Th = styled.th<ThProps>`
  border: 1px solid var(--color);
  width: ${props => getThWidth(props)};
  padding: 0.5em;
`;

export const Td = styled.td`
  border: 1px solid var(--color);
  padding: 0.5em;
`;
