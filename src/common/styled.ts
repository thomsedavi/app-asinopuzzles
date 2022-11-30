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
  margin: 0.25em 0;
  padding: 0.25em;
  cursor: ${props => props.editable ? "pointer" : "auto"};
  border: ${props => props.editable ? "1px solid var(--accent-faded)" : "1px solid transparent"};
`;

export const Heading2 = styled.h2`
  text-align: center;
  text-shadow: 0.05em 0.05em var(--accent);
  margin: 0.5em 0 0.25em;
  padding: 0.25em;
`;

interface ParagraphProps {
  editable?: boolean
}

export const Paragraph = styled.p<ParagraphProps>`
  text-align: center;
  margin: 0.25em 0;
  padding: 0.25em;
  cursor: ${props => props.editable ? "pointer" : "auto"};
  border: ${props => props.editable ? "1px solid var(--accent-faded)" : "1px solid transparent"};
`;

export const Code = styled.code`
  background: var(--background-color-information);
`;

export const ParagraphAccent = styled.p`
  color: var(--accent-pale);
  text-align: center;
  margin: 0;
  font-size: 0.9em;
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const Input = styled.input`
  font-size: 1em;
  width: 80%;
`;

export const EditIcon = styled.span`
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
  padding: 4px 10px;
  font-family: inherit;

  &:hover {
    background: var(--hover);
  }

  &:disabled {
    background: var(--disabled);
  }
`;

interface ToggleButtonProps {
  width?: string;
}

export const ToggleButton = styled.button<ToggleButtonProps>`
  margin: 0.5em 0 0.5em auto;
  display: block;
  border: none;
  box-shadow: 0.2em 0.2em var(--accent);
  background: var(--color);
  color: var(--background-color);
  cursor: pointer;
  font-size: 0.8em;
  padding: 4px 10px;
  font-family: inherit;
  width: ${props => props.width ?? 'auto'};

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
  color: var(--failure);
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
    width: 21em;
  }

  @media (576px <= width < 768px) {
    width: 35em;
  }

  @media (768px <= width) {
    width: 37em;
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
  padding: 0.5em;
  margin: 1em 0;
`;

interface TableProps {
  width?: string | number;
  smallWidth?: string | number;
  mediumWidth?: string | number;
  largeWidth?: string | number;
}

export const Table = styled.table<TableProps>`
  border: 1px solid var(--color);
  border-collapse: collapse;
  table-layout: fixed;
  margin: 0 auto;

  @media (width < 576px) {
    width: ${props => props.smallWidth ?? props.width ?? 'auto'};
  }

  @media (576px <= width < 768px) {
    width: ${props => props.mediumWidth ?? props.width ?? 'auto'};
  }

  @media (768px <= width) {
    width: ${props => props.largeWidth ?? props.width ?? 'auto'};
  }
`;

export const ColumnGroup = styled.colgroup`
`;

interface ColumnProps {
  width?: string | number;
  smallWidth?: string | number;
  mediumWidth?: string | number;
  largeWidth?: string | number;
}

export const Column = styled.col<ColumnProps>`
  @media (width < 576px) {
    width: ${props => props.smallWidth ?? props.width ?? 'auto'};
  }

  @media (576px <= width < 768px) {
    width: ${props => props.mediumWidth ?? props.width ?? 'auto'};
  }

  @media (768px <= width) {
    width: ${props => props.largeWidth ?? props.width ?? 'auto'};
  }
`;

export const TableRow = styled.tr`
`;

export const TableHeader = styled.th`
  border: 1px solid var(--color);
  padding: 0.5em;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
`;

interface TableCellProps {
  editable?: boolean;
  editing?: boolean;
  noBorderRight?: boolean;
  noBorderLeft?: boolean;
  noPaddingRight?: boolean;
  noPaddingLeft?: boolean;
}

export const TableCell = styled.td<TableCellProps>`
  border: 1px solid var(--color);
  padding: ${props => props.editing ? "0.4em" : "0.5em"};
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: ${props => props.editable ? "pointer" : "auto"};
  border-right: ${props => props.noBorderRight ? "none" : "auto"};
  border-left: ${props => props.noBorderLeft ? "none" : "auto"};
  padding-right: ${props => props.noPaddingRight ? 0 : props.editing ? "0.4em" : "0.5em"};
  padding-left: ${props => props.noPaddingLeft ? 0 : props.editing ? "0.4em" : "0.5em"};
`;

export const TableCellAction = styled.span`
  cursor: pointer;
`;

export const TableCellInput = styled.input`
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
`;

export const FailureSpan = styled.span`
  font-weight: 700;

  @media (prefers-color-scheme: dark) {
    color: var(--accent-pale);
  }

  @media (prefers-color-scheme: light) {
    color: var(--opposite-pale);
  }
`;

export const SuccessSpan = styled.span`
  font-weight: 700;
  
  @media (prefers-color-scheme: dark) {
    color: var(--opposite-pale);
  }

  @media (prefers-color-scheme: light) {
    color: var(--accent-pale);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--overlay-color);
`;